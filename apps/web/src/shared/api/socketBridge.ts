import { socket } from './socket.js';
import type { RoomJoinedPayload } from '@pairly/schemas';
import { useConnectionStore } from '@entities/connection/model/useConnectionStore.js';
import { useSessionStore } from '@entities/session/model/useSessionStore.js';
import { useParticipantStore } from '@entities/participant/model/useParticipantStore.js';

/**
 * socketBridge — the ONLY place in the app that calls socket.on().
 *
 * Registers all server-to-client event listeners exactly once.
 * Each listener dispatches to the appropriate Zustand store.
 *
 * This prevents:
 * - Duplicate listeners from component mount/unmount cycles
 * - Business logic scattered across components
 * - Memory leaks from unregistered listeners
 *
 * Call initSocketBridge() once in providers.tsx, after stores are ready.
 * Call destroySocketBridge() on logout/app unmount.
 */
export function initSocketBridge(): () => void {
  const connectionStore = useConnectionStore.getState();
  const sessionStore = useSessionStore.getState();
  const participantStore = useParticipantStore.getState();

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

  socket.on('connect', onConnect);
  socket.on('disconnect', onDisconnect);
  socket.on('connect_error', onConnectError);

  // ── Room & session events ─────────────────────────────────────────────────
  function onRoomJoined(payload: RoomJoinedPayload) {
    sessionStore.setSession(payload.session);
    participantStore.setRole(payload.role);
    participantStore.setParticipantId(payload.participantId);
    connectionStore.setRoomCode(payload.roomCode);
    connectionStore.setStatus('in-room');
  }

  function onParticipantCount(payload: { count: number }) {
    sessionStore.setParticipantCount(payload.count);
  }

  function onSlideChange(payload: Parameters<typeof sessionStore.setCurrentSlide>[0]) {
    sessionStore.setCurrentSlide(payload);
  }

  function onSessionState(payload: { status: string; currentSlideIndex: number }) {
    sessionStore.setStatus(payload.status as any);
  }

  function onRoomError(payload: { code: string; message: string }) {
    connectionStore.setLastError(payload);
  }

  socket.on('room:joined', onRoomJoined as any);
  socket.on('room:participant_count', onParticipantCount);
  socket.on('slide:change', onSlideChange as any);
  socket.on('session:state', onSessionState);
  socket.on('room:error', onRoomError);

  // ── Cleanup function — call on unmount/logout ─────────────────────────────
  return () => {
    socket.off('connect', onConnect);
    socket.off('disconnect', onDisconnect);
    socket.off('connect_error', onConnectError);
    socket.off('room:joined', onRoomJoined as any);
    socket.off('room:participant_count', onParticipantCount);
    socket.off('slide:change', onSlideChange as any);
    socket.off('session:state', onSessionState);
    socket.off('room:error', onRoomError);
  };
}
