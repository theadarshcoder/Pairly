import type { FastifyPluginAsync } from 'fastify';

const analyticsRoute: FastifyPluginAsync = async (fastify) => {
  fastify.get<{ Params: { sessionId: string } }>('/:sessionId', {
    schema: {
      tags: ['analytics'],
      summary: 'Get concept decay analytics for a session',
      security: [{ bearerAuth: [] }],
    },
    preHandler: fastify.authenticate,
    handler: async (request, reply) => {
      // Stub: full concept decay rollup logic comes later
      return reply.send({
        sessionId: request.params.sessionId,
        conceptDecay: [],
        message: 'Analytics pipeline coming soon',
      });
    },
  });
};

export default analyticsRoute;
