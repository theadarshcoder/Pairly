import type { FastifyPluginAsync } from 'fastify';
import { z } from 'zod';
import { issueHostToken } from '../../../services/auth.service.js';

const AuthTokenBodySchema = z.object({
  email: z.string().email(),
  hostSecret: z.string().min(8),
});

const authRoute: FastifyPluginAsync = async (fastify) => {
  fastify.post('/token', {
    schema: {
      tags: ['auth'],
      summary: 'Issue a host JWT token',
      body: {
        type: 'object',
        required: ['email', 'hostSecret'],
        properties: {
          email: { type: 'string', format: 'email' },
          hostSecret: { type: 'string', minLength: 8 },
        },
      },
      response: {
        200: {
          type: 'object',
          properties: {
            token: { type: 'string' },
            expiresIn: { type: 'string' },
          },
        },
        401: { type: 'object', properties: { error: { type: 'string' } } },
      },
    },
    handler: async (request, reply) => {
      const parsed = AuthTokenBodySchema.safeParse(request.body);
      if (!parsed.success) {
        return reply.status(400).send({ error: 'Invalid request body' });
      }

      const token = await issueHostToken(fastify, parsed.data.email, parsed.data.hostSecret);
      if (!token) {
        return reply.status(401).send({ error: 'Invalid credentials' });
      }

      return reply.send({ token, expiresIn: '7d' });
    },
  });
};

export default authRoute;
