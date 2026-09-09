import type { Slide } from '@pairly/schemas';

/**
 * In-memory state for a single live room.
 * Never persisted to MongoDB during a live session.
 */
export interface RoomState {
  roomCode: string;
  sessionId: string;
  hostSocketId: string;
  participantSocketIds: Set<string>;
  currentSlideIndex: number;
  slides: Slide[];
  status: 'idle' | 'active' | 'paused' | 'ended';
  startedAt?: number;
}
