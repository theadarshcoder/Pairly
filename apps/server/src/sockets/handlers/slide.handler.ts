import type { Socket, Server } from 'socket.io';
import type { ClientToServerEvents, ServerToClientEvents, SocketData, SlideAdvancePayload } from '@pairly/schemas';
import { SlideAdvancePayloadSchema } from '@pairly/schemas';
import type { RoomManager } from '../rooms/RoomManager.js';
import { AggregationBuffer } from '../buffer/AggregationBuffer.js';
import { roomBuffers } from './room.handler.js';
import { logger } from '../../lib/logger.js';

type PairlySocket = Socket<ClientToServerEvents, ServerToClientEvents, Record<string, never>, SocketData>;
type PairlyServer = Server<ClientToServerEvents, ServerToClientEvents, Record<string, never>, SocketData>;

export function registerSlideHandlers(
  socket: PairlySocket,
  io: PairlyServer,
  roomManager: RoomManager,
): void {
  socket.on('slide:advance', (payload: SlideAdvancePayload) => {
    const parsed = SlideAdvancePayloadSchema.safeParse(payload);
    if (!parsed.success) {
      socket.emit('room:error', { code: 'VALIDATION_ERROR', message: 'Invalid slide:advance payload' });
      return;
    }

    const { roomCode, direction, targetIndex } = parsed.data;

    try {
      const room = roomManager.getRoom(roomCode);
      let nextIndex = room.currentSlideIndex;

      if (direction === 'next') {
        nextIndex = Math.min(room.currentSlideIndex + 1, room.slides.length - 1);
      } else if (direction === 'prev') {
        nextIndex = Math.max(room.currentSlideIndex - 1, 0);
      } else if (direction === 'to' && targetIndex !== undefined) {
        nextIndex = Math.max(0, Math.min(targetIndex, room.slides.length - 1));
      }

      if (nextIndex === room.currentSlideIndex) return;

      roomManager.updateRoom(roomCode, { currentSlideIndex: nextIndex });

      const newSlide = room.slides[nextIndex];
      if (!newSlide) return;

      // Initialize buffer for the new slide
      const buffer = roomBuffers.get(roomCode);
      if (buffer) {
        buffer.initSlide(newSlide.id, newSlide.type);
      }

      io.to(roomCode).emit('slide:change', {
        currentSlideIndex: nextIndex,
        slide: newSlide,
        totalSlides: room.slides.length,
      });

      logger.info({ roomCode, direction, nextIndex }, 'Slide advanced');
    } catch (err: any) {
      socket.emit('room:error', { code: err.code ?? 'INTERNAL_ERROR', message: err.message });
    }
  });
}
