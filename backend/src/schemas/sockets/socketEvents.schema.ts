import { z } from 'zod';
import { UserRoleSchema } from '../common/roles.schema.js';
import { RoomCodeSchema, SessionSnapshotSchema, SessionStatusSchema } from '../session/session.schema.js';
import { SlideSchema, SlideTypeSchema } from '../slides/index.js';
import {
  HotspotTapPayloadSchema,
  HotspotBatchFlushPayloadSchema,
} from '../slides/spatialHotspot.schema.js';
import {
  MatchConnectPayloadSchema,
  NetworkMatchAggregatePayloadSchema,
} from '../slides/networkMatching.schema.js';
import {
  SortSubmitPayloadSchema,
  SortAggregatePayloadSchema,
} from '../slides/sequentialSorting.schema.js';
import {
  ReviewGradePayloadSchema,
  PeerReviewAggregatePayloadSchema,
  ReviewSubmitAnswerPayloadSchema,
  ReviewPhaseControlPayloadSchema,
  ReviewAssignedCardsPayloadSchema,
  ReviewPhaseChangePayloadSchema,
} from '../slides/peerReview.schema.js';
import {
  QuestionAskPayloadSchema,
  QuestionUpvotePayloadSchema,
  QnaFeedPayloadSchema,
} from '../slides/qnaDedup.schema.js';

// ==========================================
// 1. Client to Server Payloads
// ==========================================

export const RoomJoinPayloadSchema = z.object({
  roomCode: RoomCodeSchema,
  role: UserRoleSchema,
  participantId: z.string().optional(),
  nickname: z.string().trim().max(30).optional(),
  hostToken: z.string().optional(),
});
export type RoomJoinPayload = z.infer<typeof RoomJoinPayloadSchema>;

export const SlideAdvancePayloadSchema = z.object({
  roomCode: RoomCodeSchema,
  direction: z.enum(['next', 'prev', 'to']),
  targetIndex: z.number().int().nonnegative().optional(),
});
export type SlideAdvancePayload = z.infer<typeof SlideAdvancePayloadSchema>;

export const SessionControlPayloadSchema = z.object({
  roomCode: RoomCodeSchema,
  action: z.enum(['start', 'pause', 'resume', 'end']),
});
export type SessionControlPayload = z.infer<typeof SessionControlPayloadSchema>;

export const SlideLockPayloadSchema = z.object({
  roomCode: RoomCodeSchema,
  slideId: z.string().min(1),
  isLocked: z.boolean(),
});
export type SlideLockPayload = z.infer<typeof SlideLockPayloadSchema>;

// ==========================================
// 2. Server to Client Payloads
// ==========================================

export const RoomJoinedPayloadSchema = z.object({
  roomCode: RoomCodeSchema,
  role: UserRoleSchema,
  participantId: z.string().min(1),
  session: SessionSnapshotSchema,
});
export type RoomJoinedPayload = z.infer<typeof RoomJoinedPayloadSchema>;

export const RoomParticipantCountPayloadSchema = z.object({
  count: z.number().int().nonnegative(),
});
export type RoomParticipantCountPayload = z.infer<typeof RoomParticipantCountPayloadSchema>;

export const RoomErrorPayloadSchema = z.object({
  code: z.string().min(1),
  message: z.string().min(1),
  details: z.unknown().optional(),
});
export type RoomErrorPayload = z.infer<typeof RoomErrorPayloadSchema>;

export const SlideChangePayloadSchema = z.object({
  currentSlideIndex: z.number().int().nonnegative(),
  slide: SlideSchema,
  totalSlides: z.number().int().nonnegative(),
});
export type SlideChangePayload = z.infer<typeof SlideChangePayloadSchema>;

export const SessionStatePayloadSchema = z.object({
  status: SessionStatusSchema,
  currentSlideIndex: z.number().int().nonnegative(),
});
export type SessionStatePayload = z.infer<typeof SessionStatePayloadSchema>;

/**
 * Generic 10 FPS buffer flush wrapper emitted to room/presenter
 */
export const BufferFlushPayloadSchema = z.object({
  slideId: z.string().min(1),
  slideType: SlideTypeSchema,
  timestamp: z.number().int().nonnegative(),
  data: z.discriminatedUnion('type', [
    z.object({ type: z.literal('spatial-hotspot'), payload: HotspotBatchFlushPayloadSchema }),
    z.object({ type: z.literal('network-matching'), payload: NetworkMatchAggregatePayloadSchema }),
    z.object({ type: z.literal('sequential-sorting'), payload: SortAggregatePayloadSchema }),
    z.object({ type: z.literal('peer-review-swarm'), payload: PeerReviewAggregatePayloadSchema }),
    z.object({ type: z.literal('qna-dedup'), payload: QnaFeedPayloadSchema }),
  ]),
});
export type BufferFlushPayload = z.infer<typeof BufferFlushPayloadSchema>;

// ==========================================
// 3. Socket.IO Event Interfaces
// ==========================================

export interface ClientToServerEvents {
  // Room lifecycle & Host controls
  'room:join': (payload: RoomJoinPayload, ack?: (response: { success: boolean; error?: string }) => void) => void;
  'session:control': (payload: SessionControlPayload) => void;
  'slide:advance': (payload: SlideAdvancePayload) => void;
  'slide:lock': (payload: SlideLockPayload) => void;

  // Participant interactions
  'hotspot:tap': (payload: z.infer<typeof HotspotTapPayloadSchema>) => void;
  'match:connect': (payload: z.infer<typeof MatchConnectPayloadSchema>) => void;
  'sort:submit': (payload: z.infer<typeof SortSubmitPayloadSchema>) => void;
  'review:grade': (payload: z.infer<typeof ReviewGradePayloadSchema>) => void;
  'review:submit_answer': (payload: z.infer<typeof ReviewSubmitAnswerPayloadSchema>) => void;
  'review:phase': (payload: z.infer<typeof ReviewPhaseControlPayloadSchema>) => void;
  'question:ask': (payload: z.infer<typeof QuestionAskPayloadSchema>) => void;
  'question:upvote': (payload: z.infer<typeof QuestionUpvotePayloadSchema>) => void;
}

export interface ServerToClientEvents {
  // Room & Session state broadcasts
  'room:joined': (payload: RoomJoinedPayload) => void;
  'room:participant_count': (payload: RoomParticipantCountPayload) => void;
  'room:error': (payload: RoomErrorPayload) => void;
  'slide:change': (payload: SlideChangePayload) => void;
  'session:state': (payload: SessionStatePayload) => void;

  // Real-time 10 FPS aggregation buffer flushes
  'buffer:flush': (payload: BufferFlushPayload) => void;
  'hotspot:batch': (payload: z.infer<typeof HotspotBatchFlushPayloadSchema>) => void;
  'match:update': (payload: z.infer<typeof NetworkMatchAggregatePayloadSchema>) => void;
  'sort:update': (payload: z.infer<typeof SortAggregatePayloadSchema>) => void;
  'review:update': (payload: z.infer<typeof PeerReviewAggregatePayloadSchema>) => void;
  'review:assigned_cards': (payload: z.infer<typeof ReviewAssignedCardsPayloadSchema>) => void;
  'review:phase_change': (payload: z.infer<typeof ReviewPhaseChangePayloadSchema>) => void;
  'qna:feed': (payload: z.infer<typeof QnaFeedPayloadSchema>) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  role: z.infer<typeof UserRoleSchema>;
  roomCode: string;
  participantId: string;
  nickname?: string;
}
