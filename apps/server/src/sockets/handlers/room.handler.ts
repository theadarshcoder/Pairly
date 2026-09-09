import type { Socket, Server } from 'socket.io';
import type {
  ClientToServerEvents, ServerToClientEvents, SocketData,
  RoomJoinPayload,
} from '@pairly/schemas';
import { RoomJoinPayloadSchema } from '@pairly/schemas';
import type { RoomManager } from '../rooms/RoomManager.js';
import { AggregationBuffer } from '../buffer/AggregationBuffer.js';
import { flushScheduler } from '../buffer/FlushScheduler.js';
import { logger } from '../../lib/logger.js';

type PairlySocket = Socket<ClientToServerEvents, ServerToClientEvents, Record<string, never>, SocketData>;
type PairlyServer = Server<ClientToServerEvents, ServerToClientEvents, Record<string, never>, SocketData>;

// Per-room buffer registry — keyed by roomCode
const roomBuffers = new Map<string, AggregationBuffer>();

export function registerRoomHandlers(
  socket: PairlySocket,
  io: PairlyServer,
  roomManager: RoomManager,
): void {
  socket.on('room:join', async (payload: RoomJoinPayload, ack) => {
    const parsed = RoomJoinPayloadSchema.safeParse(payload);
    if (!parsed.success) {
      socket.emit('room:error', { code: 'VALIDATION_ERROR', message: 'Invalid join payload' });
      ack?.({ success: false, error: 'Invalid payload' });
      return;
    }

    const { roomCode, nickname } = parsed.data;

    try {
      const room = roomManager.getRoom(roomCode);
      roomManager.addParticipant(roomCode, socket.id);

      socket.data.roomCode = roomCode;
      if (nickname) socket.data.nickname = nickname;

      await socket.join(roomCode);

      // Initialize buffer for current slide if not already
      if (!roomBuffers.has(roomCode)) {
        const buffer = new AggregationBuffer();
        const currentSlide = room.slides[room.currentSlideIndex];
        if (currentSlide) buffer.initSlide(currentSlide.id, currentSlide.type);
        roomBuffers.set(roomCode, buffer);
        flushScheduler.start(roomCode, buffer, io);
      }

      // Broadcast updated participant count to room
      const count = roomManager.getParticipantCount(roomCode);
      io.to(roomCode).emit('room:participant_count', { count });

      const currentSlide = room.slides[room.currentSlideIndex];

      socket.emit('room:joined', {
        roomCode,
        role: socket.data.role,
        participantId: socket.data.participantId,
        session: {
          id: room.sessionId,
          roomCode,
          title: 'Pairly Session',
          status: room.status,
          currentSlideIndex: room.currentSlideIndex,
          totalSlides: room.slides.length,
          currentSlide,
        },
      });

      ack?.({ success: true });
      logger.info({ roomCode, socketId: socket.id, role: socket.data.role }, 'Socket joined room');
    } catch (err: any) {
      socket.emit('room:error', { code: err.code ?? 'INTERNAL_ERROR', message: err.message });
      ack?.({ success: false, error: err.message });
    }
  });

  socket.on('disconnect', () => {
    const roomCode = socket.data.roomCode;
    if (!roomCode) return;

    roomManager.removeParticipant(roomCode, socket.id);
    const count = roomManager.getParticipantCount(roomCode);
    io.to(roomCode).emit('room:participant_count', { count });

    logger.info({ roomCode, socketId: socket.id }, 'Socket disconnected from room');
  });
}

export { roomBuffers };
