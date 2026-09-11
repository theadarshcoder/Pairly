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
  registerMultipleChoiceHandlers,
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

  // Seed default demo room for development and verification
  roomManager.createRoom({
    roomCode: 'DEMO-1234',
    sessionId: 'demo-session-1',
    hostSocketId: '',
    participantSocketIds: new Set(),
    currentSlideIndex: 0,
    status: 'active',
    slides: [
      {
        id: 'slide-mc-1',
        title: 'Which data pipeline avoids React state re-renders?',
        prompt: 'Select the architecture design that guarantees zero Zustand updates at 10 Hz:',
        type: 'multiple-choice',
        order: 0,
        options: [
          { id: 'opt-a', label: 'Zustand Store + useSelector' },
          { id: 'opt-b', label: 'liveBuffer + useLiveCanvas' },
          { id: 'opt-c', label: 'React.useState at root' },
          { id: 'opt-d', label: 'Framer Motion layoutId' },
        ],
      } as any,
      {
        id: 'slide-hotspot-brain',
        title: 'Brain Anatomy Hotspot',
        prompt: 'Tap on the Frontal Lobe (responsible for executive functions and motor control).',
        type: 'spatial-hotspot',
        imageUrl: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=1200&q=80',
        aspectRatio: 1.5,
        conceptTags: ['neuroanatomy'],
        order: 0,
        targetRegions: [
          {
            id: 'region-frontal',
            label: 'Frontal Lobe',
            x: 0.35,
            y: 0.4,
            radius: 0.15,
            isCorrect: true,
            feedback: 'Spot on! The frontal lobe is located directly behind the forehead.',
          },
          {
            id: 'region-occipital',
            label: 'Occipital Lobe',
            x: 0.75,
            y: 0.6,
            radius: 0.12,
            isCorrect: false,
            feedback: 'Not quite — this is the occipital lobe (visual processing center).',
          },
        ],
        maxTapsPerParticipant: 5,
        explanation:
          'The frontal lobe is the largest lobe of the human brain, regulating decision making and voluntary movement.',
      },
      {
        id: 'slide-peer-consensus',
        title: 'Distributed Consensus Architecture Critique',
        prompt: 'Evaluate student proposals for mitigating split-brain in a 3-datacenter distributed system.',
        type: 'peer-review-swarm',
        conceptTags: ['distributed-systems', 'consensus', 'fault-tolerance'],
        order: 1,
        rubric: [
          {
            id: 'crit-correctness',
            title: 'Correctness',
            description: 'Guarantees safety under network partition without data corruption',
            minScore: 1,
            maxScore: 5,
            weight: 1.5,
          },
          {
            id: 'crit-availability',
            title: 'Availability',
            description: 'Maximizes uptime for healthy partitions without split-brain risk',
            minScore: 1,
            maxScore: 5,
            weight: 1.0,
          },
          {
            id: 'crit-latency',
            title: 'Latency Overhead',
            description: 'Minimizes round trips for normal operations',
            minScore: 1,
            maxScore: 5,
            weight: 0.8,
          },
        ],
        answerCards: [
          {
            id: 'ans-1',
            content:
              'Deploy a 5-node Raft cluster: 2 nodes in DC-A, 2 nodes in DC-B, and 1 tie-breaker witness node in DC-C. Any partition requires a strict majority of 3 nodes to commit writes.',
            authorNickname: 'Student Alice',
          },
          {
            id: 'ans-2',
            content:
              'Use active-passive: DC-A is primary. If DC-A loses ping connectivity to DC-B for 2 seconds, DC-B unconditionally promotes itself to primary and begins accepting writes.',
            authorNickname: 'Student Bob',
          },
          {
            id: 'ans-3',
            content:
              'Implement Paxos leader leases with GPS/PTP atomic clock bounds. If a lease expires and leader cannot renew across quorum, writes freeze until the partition heals.',
            authorNickname: 'Student Charlie',
          },
          {
            id: 'ans-4',
            content:
              'Rely on asynchronous cross-DC replication with eventual consistency and last-write-wins timestamp resolution. Discard conflicts using vector clocks during partition heal.',
            authorNickname: 'Student Diana',
          },
        ],
        currentPhase: 'grading',
        minReviewsRequired: 2,
        explanation:
          'Distributed consensus across datacenters requires strict quorum and odd-numbered witness nodes to avoid dual-master split-brain data corruption.',
      },
    ],
  });

  const demoRoom = roomManager.getRoom('DEMO-1234');
  roomManager.createRoom({
    ...demoRoom,
    roomCode: 'DEMO',
    participantSocketIds: new Set(),
  });

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
    registerSessionHandlers(socket, io, roomManager, fastify.db);
    registerSlideHandlers(socket, io, roomManager);
    registerHotspotHandlers(socket, io);
    registerMatchingHandlers(socket, io);
    registerSortingHandlers(socket, io);
    registerPeerReviewHandlers(socket, io);
    registerQnaHandlers(socket, io);
    registerMultipleChoiceHandlers(socket, io);
  });

  // ── Graceful shutdown ─────────────────────────────────────────────────────
  fastify.addHook('onClose', (instance, done) => {
    flushScheduler.stopAll();
    instance.io.close(done);
  });

  fastify.log.info('Socket.IO gateway registered');
};

export default fp(socketGateway, { name: 'socket-gateway', dependencies: ['auth', 'db'] });
