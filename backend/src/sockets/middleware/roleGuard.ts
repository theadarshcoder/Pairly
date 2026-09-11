import type { Socket } from 'socket.io';
import type { ClientToServerEvents, ServerToClientEvents, SocketData } from '@pairly/schemas';
import { HOST_ONLY_EVENTS } from '../../config/constants.js';
import { ForbiddenError } from '../../lib/errors.js';

type PairlySocket = Socket<ClientToServerEvents, ServerToClientEvents, Record<string, never>, SocketData>;

/**
 * Role guard middleware — enforces that only 'host' sockets can emit
 * mutating session/slide control events.
 *
 * Applied once per socket on connection, wraps the onAny listener pattern.
 * Server-side enforcement: client role self-reporting is NEVER trusted.
 */
export function applyRoleGuard(socket: PairlySocket): void {
  socket.onAny((event: string) => {
    if (HOST_ONLY_EVENTS.includes(event) && socket.data.role !== 'host') {
      socket.emit('room:error', {
        code: 'FORBIDDEN',
        message: `Event '${event}' requires host role`,
      });
      throw new ForbiddenError(`Participant attempted to emit host-only event: ${event}`);
    }
  });
}
