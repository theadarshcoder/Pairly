import { enqueue } from '../../shared/lib/offlineQueue.js';
import { socket } from '../../shared/api/socket.js';

/**
 * Submit an audience action.
 * If socket is connected, emits directly.
 * If disconnected or offline, routes through offline queue.
 */
export function submitAudienceAction(event: string, payload: unknown): void {
  if (!socket.connected) {
    enqueue(event, payload);
  } else {
    (socket.emit as any)(event, payload);
  }
}
