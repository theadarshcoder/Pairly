import type { Socket, Server } from 'socket.io';
import type { ClientToServerEvents, ServerToClientEvents, SocketData, SessionControlPayload } from '@pairly/schemas';
import { SessionControlPayloadSchema } from '@pairly/schemas';
import type { RoomManager } from '../rooms/RoomManager.js';
import { flushScheduler } from '../buffer/FlushScheduler.js';
import { logger } from '../../lib/logger.js';

type PairlySocket = Socket<ClientToServerEvents, ServerToClientEvents, Record<string, never>, SocketData>;
type PairlyServer = Server<ClientToServerEvents, ServerToClientEvents, Record<string, never>, SocketData>;

export function registerSessionHandlers(
  socket: PairlySocket,
  io: PairlyServer,
  roomManager: RoomManager,
): void {
  socket.on('session:control', (payload: SessionControlPayload) => {
    const parsed = SessionControlPayloadSchema.safeParse(payload);
    if (!parsed.success) {
      socket.emit('room:error', { code: 'VALIDATION_ERROR', message: 'Invalid session control payload' });
      return;
    }

    const { roomCode, action } = parsed.data;

    try {
      const room = roomManager.getRoom(roomCode);

      switch (action) {
        case 'start':
          roomManager.updateRoom(roomCode, { status: 'active', startedAt: Date.now() });
          io.to(roomCode).emit('session:state', { status: 'active', currentSlideIndex: room.currentSlideIndex });
          break;

        case 'pause':
          roomManager.updateRoom(roomCode, { status: 'paused' });
          io.to(roomCode).emit('session:state', { status: 'paused', currentSlideIndex: room.currentSlideIndex });
          break;

        case 'resume':
          roomManager.updateRoom(roomCode, { status: 'active' });
          io.to(roomCode).emit('session:state', { status: 'active', currentSlideIndex: room.currentSlideIndex });
          break;

        case 'end':
          roomManager.updateRoom(roomCode, { status: 'ended' });
          flushScheduler.stop(roomCode);
          io.to(roomCode).emit('session:state', { status: 'ended', currentSlideIndex: room.currentSlideIndex });
          // TODO: trigger session.service.endSession() bulk write after emitting
          break;
      }

      logger.info({ roomCode, action, role: socket.data.role }, 'Session control event');
    } catch (err: any) {
      socket.emit('room:error', { code: err.code ?? 'INTERNAL_ERROR', message: err.message });
    }
  });
}
