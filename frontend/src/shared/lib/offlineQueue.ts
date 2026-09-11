/**
 * offlineQueue.ts — Issue 15: localStorage-backed queue for offline resilience.
 *
 * On socket disconnect, all outgoing writes go to the queue.
 * On reconnect, the queue flushes in order and clears.
 * Each tap gets a client-generated clientTapId (UUID) so the server
 * can deduplicate if a reconnect happens mid-flight.
 *
 * Wired into the socket layer ONCE — no slide type implements this individually.
 */

import type { Socket } from 'socket.io-client';

const STORAGE_KEY = 'pairly_offline_queue';

interface QueuedEvent {
  /** Client-generated UUID for server-side dedup */
  clientTapId: string;
  /** Socket event name */
  event: string;
  /** Payload */
  payload: unknown;
  /** Timestamp when queued */
  queuedAt: number;
}

/** Generate a client-side UUID v4 */
function uuid(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for older browsers
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// ── Queue operations ─────────────────────────────────────────────────────

function loadQueue(): QueuedEvent[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveQueue(queue: QueuedEvent[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(queue));
  } catch {
    // localStorage full or unavailable — drop silently
  }
}

function clearQueue(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

// ── Public API ───────────────────────────────────────────────────────────

/**
 * Enqueue an event for later delivery.
 * Call this when the socket is disconnected.
 */
export function enqueue(event: string, payload: unknown): string {
  const clientTapId = uuid();
  const queue = loadQueue();
  queue.push({
    clientTapId,
    event,
    payload: { ...(payload as Record<string, unknown>), clientTapId },
    queuedAt: Date.now(),
  });
  saveQueue(queue);
  return clientTapId;
}

/**
 * Flush all queued events through the socket, in order.
 * Clears the queue after successful flush.
 */
export function flushQueue(socket: Socket): number {
  const queue = loadQueue();
  if (queue.length === 0) return 0;

  let flushed = 0;
  for (const item of queue) {
    socket.emit(item.event, item.payload);
    flushed++;
  }

  clearQueue();
  return flushed;
}

/**
 * Get the current queue size (for UI display if needed).
 */
export function getQueueSize(): number {
  return loadQueue().length;
}

/**
 * Wire the offline queue into a socket instance.
 * Call once in the socket bridge setup.
 *
 * On disconnect: future emits should use `enqueue()` instead of `socket.emit()`.
 * On reconnect: `flushQueue(socket)` is called automatically.
 */
export function wireOfflineQueue(socket: Socket): () => void {
  function onReconnect() {
    const count = flushQueue(socket);
    if (count > 0) {
      console.log(`[offlineQueue] Flushed ${count} queued events on reconnect`);
    }
  }

  socket.on('connect', onReconnect);

  return () => {
    socket.off('connect', onReconnect);
  };
}
