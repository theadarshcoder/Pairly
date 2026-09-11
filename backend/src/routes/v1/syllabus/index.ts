import type { FastifyPluginAsync } from 'fastify';
import { SyllabusUploadRequestSchema } from '@pairly/schemas';
import { parseSyllabus } from '../../../services/syllabus.service.js';

const syllabusRoute: FastifyPluginAsync = async (fastify) => {
  fastify.post('/parse', {
    schema: {
      tags: ['syllabus'],
      summary: 'Parse syllabus text into structured slides via AI pipeline',
      security: [{ bearerAuth: [] }],
    },
    preHandler: fastify.authenticate,
    handler: async (request, reply) => {
      const parsed = SyllabusUploadRequestSchema.safeParse(request.body);
      if (!parsed.success) {
        return reply.status(400).send({
          error: 'Invalid request',
          details: parsed.error.flatten().fieldErrors,
        });
      }

      const output = await parseSyllabus(parsed.data);
      return reply.send({ output });
    },
  });
};

export default syllabusRoute;
