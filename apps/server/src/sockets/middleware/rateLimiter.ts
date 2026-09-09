import type { Socket } from 'socket.io';
import type { SocketData } from '@pairly/schemas';
import { env } from '../../config/env.js';
import { RateLimitedError } from '../../lib/errors.js';

interface RateLimitEntry {
  count: number;
  windowStart: number;
}

// Per-socket rate limiter using in-process Map
const limiters = new Map<string, RateLimitEntry>();

/**
 * Per-socket event rate limiter.
 * Applies a sliding-window counter of events per SOCKET_RATE_LIMIT_WINDOW_MS.
 * If exceeded, the socket receives a rate_limited error event.
 */
export function applyRateLimiter(socket: Socket<any, any, any, SocketData>): void {
  socket.onAny(() => {
    const now = Date.now();
    const entry = limiters.get(socket.id) ?? { count: 0, windowStart: now };

    if (now - entry.windowStart > env.SOCKET_RATE_LIMIT_WINDOW_MS) {
      entry.count = 0;
      entry.windowStart = now;
    }

    entry.count++;
    limiters.set(socket.id, entry);

    if (entry.count > env.SOCKET_RATE_LIMIT_EVENTS) {
      socket.emit('room:error', {
        code: 'RATE_LIMITED',
        message: 'Too many events. Please slow down.',
      });
      throw new RateLimitedError();
    }
  });

  // Clean up on disconnect
  socket.on('disconnect', () => {
    limiters.delete(socket.id);
  });
}
