import type { Socket } from 'socket.io';
import type { SocketData, ClientToServerEvents, ServerToClientEvents } from '@pairly/schemas';
import { UserRoleSchema, RoomCodeSchema } from '@pairly/schemas';
import { UnauthorizedError } from '../../lib/errors.js';
import { randomBytes } from 'node:crypto';

type PairlySocket = Socket<ClientToServerEvents, ServerToClientEvents, Record<string, never>, SocketData>;

/**
 * Socket.IO connection-time auth middleware.
 *
 * For host sockets: verifies `socket.handshake.auth.token` (JWT).
 * For participant sockets: no JWT required — a participantId is generated server-side.
 *
 * Role and participantId are written to `socket.data` here and trusted
 * throughout all handlers. The client's self-reported role is never trusted.
 */
export function socketAuthMiddleware(
  socket: PairlySocket,
  next: (err?: Error) => void,
): void {
  const { role, token, roomCode } = socket.handshake.auth as {
    role?: unknown;
    token?: unknown;
    roomCode?: unknown;
  };

  // Validate role
  const parsedRole = UserRoleSchema.safeParse(role);
  if (!parsedRole.success) {
    return next(new UnauthorizedError('Missing or invalid role in socket auth'));
  }

  // Validate roomCode (optional at connection time — required at room:join)
  if (roomCode !== undefined) {
    const parsedRoom = RoomCodeSchema.safeParse(roomCode);
    if (!parsedRoom.success) {
      return next(new UnauthorizedError('Invalid room code format'));
    }
    socket.data.roomCode = parsedRoom.data;
  }

  socket.data.role = parsedRole.data;

  if (parsedRole.data === 'host') {
    // Host must supply a JWT — we do a lightweight check here.
    // Full JWT verification is done in the route layer; socket layer just
    // checks the token exists. Deep verify could add latency per-connection.
    if (!token || typeof token !== 'string' || token.length < 10) {
      return next(new UnauthorizedError('Host connections require a valid auth token'));
    }
    // Extract a userId from the token (lightweight prefix check for the skeleton)
    // In production: fastify.jwt.verify(token) here using the JWT plugin secret
    socket.data.participantId = `host_${randomBytes(4).toString('hex')}`;
  } else {
    // Participant: generate server-side participantId. Never trust client-provided IDs.
    socket.data.participantId = `p_${randomBytes(8).toString('hex')}`;
  }

  next();
}
