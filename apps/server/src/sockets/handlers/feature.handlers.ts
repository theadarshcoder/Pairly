import type { Socket, Server } from 'socket.io';
import type { ClientToServerEvents, ServerToClientEvents, SocketData } from '@pairly/schemas';
import { MatchConnectPayloadSchema, SortSubmitPayloadSchema, ReviewGradePayloadSchema, QuestionAskPayloadSchema, QuestionUpvotePayloadSchema } from '@pairly/schemas';
import { roomBuffers } from './room.handler.js';
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
  socket.on('review:grade', (payload) => {
    const parsed = ReviewGradePayloadSchema.safeParse(payload);
    if (!parsed.success) return;
    const roomCode = socket.data.roomCode;
    if (!roomCode) return;
    roomBuffers.get(roomCode)?.pushReviewGrade(parsed.data.slideId, parsed.data);
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
