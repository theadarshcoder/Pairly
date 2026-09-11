// High-frequency data flows through liveBuffer, never Zustand. See STATE_ARCHITECTURE.md.
import { socket } from './socket.js';
import type {
  RoomJoinedPayload,
  PeerReviewAggregatePayload,
  ReviewAssignedCardsPayload,
  ReviewPhaseChangePayload,
} from '@pairly/schemas';
import { useConnectionStore } from '@entities/connection/model/useConnectionStore.js';
import { useSessionStore } from '@entities/session/model/useSessionStore.js';
import { useParticipantStore } from '@entities/participant/model/useParticipantStore.js';
import { usePeerReviewStore } from '@features/peer-review-swarm/model/usePeerReviewStore.js';
import { bindLive } from '@shared/lib/liveBuffer.js';
import { wireOfflineQueue, enqueue } from '@shared/lib/offlineQueue.js';

/**
 * Route outbound writes through socket if connected, or through offline queue if disconnected.
 */
export function emitSafe(event: string, payload: unknown): void {
  if (!socket.connected) {
    enqueue(event, payload);
  } else {
    (socket.emit as any)(event, payload);
  }
}

/**
 * socketBridge — the ONLY place in the app that calls socket.on().
 *
 * Registers all server-to-client event listeners exactly once.
 * Slow state (<=2 Hz) dispatches to the appropriate Zustand store.
 * High-frequency data (10 Hz) is bound directly into liveBuffer via bindLive.
 * Offline events are queued via wireOfflineQueue.
 *
 * Call initSocketBridge() once in providers.tsx, after stores are ready.
 * Call destroySocketBridge() on logout/app unmount.
 */
export function initSocketBridge(): () => void {
  const connectionStore = useConnectionStore.getState();
  const sessionStore = useSessionStore.getState();
  const participantStore = useParticipantStore.getState();
  const peerReviewStore = usePeerReviewStore.getState();

  // Wire non-reactive live data pipeline & offline queue
  const unbindLive = bindLive(socket);
  const unbindQueue = wireOfflineQueue(socket);

  // ── Connection lifecycle ──────────────────────────────────────────────────
  function onConnect() {
    connectionStore.setStatus('connected');
    connectionStore.setSocketId(socket.id ?? null);
  }

  function onDisconnect(reason: string) {
    connectionStore.setStatus('disconnected');
    connectionStore.setSocketId(null);
  }

  function onConnectError() {
    connectionStore.setStatus('error');
  }

  // ── Session & Room events ─────────────────────────────────────────────────
  function onRoomJoined(payload: RoomJoinedPayload) {
    connectionStore.setStatus('in-room');
    sessionStore.setSession(payload.session);
    participantStore.setParticipant({
      participantId: payload.participantId,
      role: payload.role,
      nickname: (payload as any).nickname ?? 'Participant',
    });
  }

  function onParticipantCount(payload: { count: number }) {
    sessionStore.setParticipantCount(payload.count);
  }

  function onSlideChange(payload: { currentSlideIndex: number; slide: any; totalSlides: number }) {
    sessionStore.setCurrentSlide(payload);
  }

  function onSessionState(payload: { status: any }) {
    sessionStore.setStatus(payload.status);
  }

  function onRoomError(payload: { code: string; message: string }) {
    connectionStore.setLastError(payload);
  }

  // ── Slide feature real-time flushes (slow state) ──────────────────────────
  function onReviewUpdate(payload: PeerReviewAggregatePayload) {
    usePeerReviewStore.getState().handleFlush(payload);
  }

  function onReviewAssignedCards(payload: ReviewAssignedCardsPayload) {
    usePeerReviewStore.getState().setAssignedCards(payload.slideId, payload.cards);
  }

  function onReviewPhaseChange(payload: ReviewPhaseChangePayload) {
    usePeerReviewStore.getState().setPhase(payload.slideId, payload.phase);
  }

  socket.on('connect', onConnect);
  socket.on('disconnect', onDisconnect);
  socket.on('connect_error', onConnectError);
  socket.on('room:joined', onRoomJoined as any);
  socket.on('room:participant_count', onParticipantCount);
  socket.on('slide:change', onSlideChange as any);
  socket.on('session:state', onSessionState);
  socket.on('room:error', onRoomError);
  socket.on('review:update', onReviewUpdate as any);
  socket.on('review:assigned_cards', onReviewAssignedCards as any);
  socket.on('review:phase_change', onReviewPhaseChange as any);

  // ── Cleanup function — call on unmount/logout ─────────────────────────────
  return () => {
    unbindLive();
    unbindQueue();
    socket.off('connect', onConnect);
    socket.off('disconnect', onDisconnect);
    socket.off('connect_error', onConnectError);
    socket.off('room:joined', onRoomJoined as any);
    socket.off('room:participant_count', onParticipantCount);
    socket.off('slide:change', onSlideChange as any);
    socket.off('session:state', onSessionState);
    socket.off('room:error', onRoomError);
    socket.off('review:update', onReviewUpdate as any);
    socket.off('review:assigned_cards', onReviewAssignedCards as any);
    socket.off('review:phase_change', onReviewPhaseChange as any);
  };
}
