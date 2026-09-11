import type { FastifyPluginAsync } from 'fastify';
import { z } from 'zod';
import { createSession, getSessionById } from '../../../services/session.service.js';

const CreateSessionBodySchema = z.object({
  title: z.string().min(1).max(120),
  conceptTags: z.array(z.string()).optional(),
});

const sessionsRoute: FastifyPluginAsync = async (fastify) => {
  // POST /api/v1/sessions — create a new session (host only)
  fastify.post('/', {
    schema: {
      tags: ['sessions'],
      summary: 'Create a new session',
      security: [{ bearerAuth: [] }],
    },
    preHandler: fastify.authenticate,
    handler: async (request, reply) => {
      const parsed = CreateSessionBodySchema.safeParse(request.body);
      if (!parsed.success) {
        return reply.status(400).send({ error: 'Invalid request body' });
      }

      const user = request.user;
      const session = await createSession(fastify.db, {
        title: parsed.data.title,
        hostId: user.sub,
        conceptTags: parsed.data.conceptTags,
      });

      // Register the new room in the RoomManager so socket joins can find it
      fastify.roomManager.createRoom({
        roomCode: session.roomCode,
        sessionId: session.id,
        hostSocketId: '',
        participantSocketIds: new Set(),
        currentSlideIndex: 0,
        slides: [],
        status: 'idle',
      });

      return reply.status(201).send({
        session: {
          id: session.id,
          roomCode: session.roomCode,
          title: session.title,
          status: session.status,
          presenterUrl: `/presenter?room=${session.roomCode}`,
          joinUrl: `/join?room=${session.roomCode}`,
        },
      });
    },
  });

  // GET /api/v1/sessions/:id
  fastify.get<{ Params: { id: string } }>('/:id', {
    schema: { tags: ['sessions'], summary: 'Get a session by ID' },
    preHandler: fastify.authenticate,
    handler: async (request, reply) => {
      const session = await getSessionById(fastify.db, request.params.id);
      return reply.send({ session });
    },
  });
};

export default sessionsRoute;
