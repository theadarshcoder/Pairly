import type { FastifyPluginAsync } from 'fastify';

const healthRoute: FastifyPluginAsync = async (fastify) => {
  fastify.get('/', {
    schema: {
      tags: ['health'],
      summary: 'Liveness check',
      response: {
        200: {
          type: 'object',
          properties: {
            status: { type: 'string' },
            uptime: { type: 'number' },
            timestamp: { type: 'number' },
            activeRooms: { type: 'number' },
          },
        },
      },
    },
    handler: async (_req, reply) => {
      return reply.send({
        status: 'ok',
        uptime: process.uptime(),
        timestamp: Date.now(),
        activeRooms: fastify.roomManager?.getActiveRoomCodes().length ?? 0,
      });
    },
  });

  fastify.get('/ready', {
    schema: { tags: ['health'], summary: 'Readiness check (DB connectivity)' },
    handler: async (_req, reply) => {
      try {
        await fastify.db.command({ ping: 1 });
        return reply.send({ status: 'ready', db: 'connected' });
      } catch {
        return reply.status(503).send({ status: 'not ready', db: 'disconnected' });
      }
    },
  });
};

export default healthRoute;
