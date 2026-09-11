import type { Socket, Server } from 'socket.io';
import type { ClientToServerEvents, ServerToClientEvents, SocketData } from '@pairly/schemas';
import {
  MatchConnectPayloadSchema,
  SortSubmitPayloadSchema,
  ReviewGradePayloadSchema,
  ReviewSubmitAnswerPayloadSchema,
  ReviewPhaseControlPayloadSchema,
  QuestionAskPayloadSchema,
  QuestionUpvotePayloadSchema,
} from '@pairly/schemas';
import { roomBuffers } from './room.handler.js';
import { dealPeerReviewCards } from '../buffer/dealers/peerReviewDeal.js';
import { aggregatePeerReview } from '../buffer/aggregators/peerReview.agg.js';
import { randomBytes } from 'node:crypto';

type PairlySocket = Socket<ClientToServerEvents, ServerToClientEvents, Record<string, never>, SocketData>;
type PairlyServer = Server<ClientToServerEvents, ServerToClientEvents, Record<string, never>, SocketData>;

export function registerMatchingHandlers(socket: PairlySocket, io: PairlyServer): void {
  socket.on('match:connect', (payload) => {
    const parsed = MatchConnectPayloadSchema.safeParse(payload);
    if (!parsed.success) return;
    const roomCode = socket.data.roomCode;
    if (!roomCode) return;
    roomBuffers.get(roomCode)?.pushMatchEvent(parsed.data.slideId, parsed.data);
  });
}

export function registerSortingHandlers(socket: PairlySocket, io: PairlyServer): void {
  socket.on('sort:submit', (payload) => {
    const parsed = SortSubmitPayloadSchema.safeParse(payload);
    if (!parsed.success) return;
    const roomCode = socket.data.roomCode;
    if (!roomCode) return;
    roomBuffers.get(roomCode)?.pushSortSubmission(parsed.data.slideId, parsed.data);
  });
}

export function registerPeerReviewHandlers(socket: PairlySocket, io: PairlyServer): void {
  // 1. Participant submits an answer in submission phase
  socket.on('review:submit_answer', (payload) => {
    const parsed = ReviewSubmitAnswerPayloadSchema.safeParse(payload);
    if (!parsed.success) return;
    const roomCode = socket.data.roomCode;
    if (!roomCode) return;

    const answerId = `ans_${randomBytes(4).toString('hex')}`;
    roomBuffers.get(roomCode)?.addPeerReviewAnswer(parsed.data.slideId, {
      id: answerId,
      content: parsed.data.content,
      authorNickname: socket.data.nickname,
      authorParticipantId: socket.data.participantId,
    });
  });

  // 2. Host advances phase (e.g. trigger Shuffle-and-Deal when opening grading)
  socket.on('review:phase', async (payload) => {
    const parsed = ReviewPhaseControlPayloadSchema.safeParse(payload);
    if (!parsed.success) return;
    const roomCode = socket.data.roomCode;
    if (!roomCode) return;

    if (socket.data.role !== 'host') {
      socket.emit('room:error', { code: 'FORBIDDEN', message: 'Only hosts can change slide phase' });
      return;
    }

    const buffer = roomBuffers.get(roomCode);
    if (!buffer) return;

    const { slideId, phase } = parsed.data;
    buffer.setPeerReviewPhase(slideId, phase);

    if (phase === 'grading') {
      // ── SHUFFLE-AND-DEAL STEP ─────────────────────────────────────────────
      const socketsInRoom = await io.in(roomCode).fetchSockets();
      const participants = socketsInRoom
        .filter((s) => s.data.role === 'participant')
        .map((s) => ({
          participantId: s.data.participantId,
          socketId: s.id,
        }));

      const answers = buffer.getAllPeerReviewAnswers(slideId);
      const dealResult = dealPeerReviewCards(participants, answers, 3);

      // Store assignments in buffer for access control and reconnection persistence
      const idAssignments = new Map<string, string[]>();
      for (const [pId, cards] of dealResult.assignments.entries()) {
        idAssignments.set(pId, cards.map((c) => c.id));
      }
      buffer.setPeerReviewAssignments(slideId, idAssignments);

      // Targeted socket delivery: each participant receives only their assigned cards
      for (const s of socketsInRoom) {
        if (s.data.role === 'participant') {
          const cards = dealResult.assignments.get(s.data.participantId) ?? [];
          s.emit('review:assigned_cards', { slideId, cards });
        }
      }

      // Broadcast phase change to entire room
      io.to(roomCode).emit('review:phase_change', { slideId, phase: 'grading' });
    } else if (phase === 'reveal') {
      io.to(roomCode).emit('review:phase_change', { slideId, phase: 'reveal' });

      // Immediate flush on reveal so presenter renders the final leaderboard
      const snapshot = buffer.drainSlide(slideId);
      if (snapshot) {
        const cards = Array.from(snapshot.peerReviewState.cards.values());
        const payload = aggregatePeerReview(
          slideId,
          cards,
          'reveal',
          snapshot.peerReviewState.totalReviewsSubmitted,
          0,
        );
        io.to(roomCode).emit('review:update', payload);
      }
    } else {
      io.to(roomCode).emit('review:phase_change', { slideId, phase });
    }
  });

  // 3. Participant submits grade for an assigned answer card
  socket.on('review:grade', (payload) => {
    const parsed = ReviewGradePayloadSchema.safeParse(payload);
    if (!parsed.success) return;
    const roomCode = socket.data.roomCode;
    if (!roomCode) return;

    const buffer = roomBuffers.get(roomCode);
    if (!buffer) return;

    // Verify participant was assigned this card (access control)
    const allowed = buffer.getPeerReviewAssignments(parsed.data.slideId, socket.data.participantId);
    if (allowed && allowed.length > 0 && !allowed.includes(parsed.data.answerId)) {
      socket.emit('room:error', {
        code: 'UNAUTHORIZED_CARD',
        message: 'You are not assigned to review this answer card',
      });
      return;
    }

    buffer.pushReviewGrade(parsed.data.slideId, parsed.data);
  });
}

export function registerQnaHandlers(socket: PairlySocket, io: PairlyServer): void {
  socket.on('question:ask', (payload) => {
    const parsed = QuestionAskPayloadSchema.safeParse(payload);
    if (!parsed.success) return;
    const roomCode = socket.data.roomCode;
    if (!roomCode) return;

    const question = {
      id: `q_${randomBytes(6).toString('hex')}`,
      text: parsed.data.text,
      authorNickname: parsed.data.isAnonymous ? undefined : (parsed.data.authorNickname ?? socket.data.nickname),
      isAnonymous: parsed.data.isAnonymous,
      upvotes: 0,
      timestamp: Date.now(),
      isAnswered: false,
    };
    roomBuffers.get(roomCode)?.pushQuestion(parsed.data.slideId, question);
  });

  socket.on('question:upvote', (payload) => {
    const parsed = QuestionUpvotePayloadSchema.safeParse(payload);
    if (!parsed.success) return;
    // Upvote is handled in-memory in the buffer's question list — no separate push needed for the skeleton
  });
}

export function registerMultipleChoiceHandlers(socket: PairlySocket, io: PairlyServer): void {
  socket.on('mc:vote' as any, (payload: { slideId: string; optionId: string }) => {
    if (!payload?.slideId || !payload?.optionId) return;
    const roomCode = socket.data.roomCode;
    if (!roomCode) return;
    roomBuffers.get(roomCode)?.pushMultipleChoiceVote(payload.slideId, payload.optionId);
  });
}
