import type { Socket, Server } from 'socket.io';
import type { ClientToServerEvents, ServerToClientEvents, SocketData } from '@pairly/schemas';
import { HotspotTapPayloadSchema } from '@pairly/schemas';
import { roomBuffers } from './room.handler.js';

type PairlySocket = Socket<ClientToServerEvents, ServerToClientEvents, Record<string, never>, SocketData>;
type PairlyServer = Server<ClientToServerEvents, ServerToClientEvents, Record<string, never>, SocketData>;

export function registerHotspotHandlers(socket: PairlySocket, io: PairlyServer): void {
  socket.on('hotspot:tap', (payload) => {
    const parsed = HotspotTapPayloadSchema.safeParse(payload);
    if (!parsed.success) {
      socket.emit('room:error', { code: 'VALIDATION_ERROR', message: 'Invalid tap coordinates' });
      return;
    }

    const roomCode = socket.data.roomCode;
    if (!roomCode) return;

    roomBuffers.get(roomCode)?.pushHotspotTap(parsed.data.slideId, parsed.data);
  });
}
