import type { Socket, Server } from 'socket.io';
import type { Db } from 'mongodb';
import type { ClientToServerEvents, ServerToClientEvents, SocketData, SessionControlPayload } from '@pairly/schemas';
import { SessionControlPayloadSchema } from '@pairly/schemas';
import type { RoomManager } from '../rooms/RoomManager.js';
import { flushScheduler } from '../buffer/FlushScheduler.js';
import { roomBuffers } from './room.handler.js';
import { endSession } from '../../services/session.service.js';
import { logger } from '../../lib/logger.js';

type PairlySocket = Socket<ClientToServerEvents, ServerToClientEvents, Record<string, never>, SocketData>;
type PairlyServer = Server<ClientToServerEvents, ServerToClientEvents, Record<string, never>, SocketData>;

export function registerSessionHandlers(
  socket: PairlySocket,
  io: PairlyServer,
  roomManager: RoomManager,
  db?: Db,
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

        case 'end': {
          roomManager.updateRoom(roomCode, { status: 'ended' });
          flushScheduler.stop(roomCode);
          io.to(roomCode).emit('session:state', { status: 'ended', currentSlideIndex: room.currentSlideIndex });

          // Persist aggregated session data at session end — one bulk write to MongoDB
          const buffer = roomBuffers.get(roomCode);
          const finalSlideStates = buffer?.getFinalSessionSummary() ?? {};
          if (db && room.sessionId) {
            endSession(db, room.sessionId, { finalSlideStates }).catch((err) => {
              logger.error({ err, sessionId: room.sessionId, roomCode }, 'Failed to persist session end state to MongoDB');
            });
          }
          roomBuffers.delete(roomCode);
          break;
        }
      }

      logger.info({ roomCode, action, role: socket.data.role }, 'Session control event');
    } catch (err: any) {
      socket.emit('room:error', { code: err.code ?? 'INTERNAL_ERROR', message: err.message });
    }
  });
}
