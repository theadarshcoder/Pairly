import fp from 'fastify-plugin';
import { Server } from 'socket.io';
import type { FastifyPluginAsync } from 'fastify';
import type { ClientToServerEvents, ServerToClientEvents, SocketData } from '@pairly/schemas';
import { RoomManager } from './rooms/RoomManager.js';
import { socketAuthMiddleware } from './middleware/auth.middleware.js';
import { applyRoleGuard } from './middleware/roleGuard.js';
import { applyRateLimiter } from './middleware/rateLimiter.js';
import { registerRoomHandlers } from './handlers/room.handler.js';
import { registerSessionHandlers } from './handlers/session.handler.js';
import { registerSlideHandlers } from './handlers/slide.handler.js';
import { registerHotspotHandlers } from './handlers/hotspot.handler.js';
import {
  registerMatchingHandlers,
  registerSortingHandlers,
  registerPeerReviewHandlers,
  registerQnaHandlers,
} from './handlers/feature.handlers.js';
import { flushScheduler } from './buffer/FlushScheduler.js';
import { env } from '../config/env.js';

declare module 'fastify' {
  interface FastifyInstance {
    io: Server<ClientToServerEvents, ServerToClientEvents, Record<string, never>, SocketData>;
    roomManager: RoomManager;
  }
}

const socketGateway: FastifyPluginAsync = async (fastify) => {
  const roomManager = new RoomManager();
  fastify.decorate('roomManager', roomManager);

  const io = new Server<ClientToServerEvents, ServerToClientEvents, Record<string, never>, SocketData>(
    fastify.server,
    {
      cors: {
        origin: env.NODE_ENV === 'production' ? env.FRONTEND_URL : '*',
        methods: ['GET', 'POST'],
        credentials: true,
      },
      connectionStateRecovery: {
        maxDisconnectionDuration: 2 * 60 * 1000, // 2 minutes
        skipMiddlewares: true,
      },
      pingInterval: 25_000,
      pingTimeout: 10_000,
    },
  );

  fastify.decorate('io', io);

  // ── Connection-time auth middleware ───────────────────────────────────────
  io.use(socketAuthMiddleware);

  // ── Per-connection event handling ─────────────────────────────────────────
  io.on('connection', (socket) => {
    fastify.log.debug(
      { socketId: socket.id, role: socket.data.role },
      'Socket connected',
    );

    // Apply per-socket middleware
    applyRoleGuard(socket);
    applyRateLimiter(socket);

    // Register all handler domains
    registerRoomHandlers(socket, io, roomManager);
    registerSessionHandlers(socket, io, roomManager);
    registerSlideHandlers(socket, io, roomManager);
    registerHotspotHandlers(socket, io);
    registerMatchingHandlers(socket, io);
    registerSortingHandlers(socket, io);
    registerPeerReviewHandlers(socket, io);
    registerQnaHandlers(socket, io);
  });

  // ── Graceful shutdown ─────────────────────────────────────────────────────
  fastify.addHook('onClose', (instance, done) => {
    flushScheduler.stopAll();
    instance.io.close(done);
  });

  fastify.log.info('Socket.IO gateway registered');
};

export default fp(socketGateway, { name: 'socket-gateway', dependencies: ['auth'] });
