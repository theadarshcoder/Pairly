import fp from 'fastify-plugin';
import fastifySwagger from '@fastify/swagger';
import apiReference from '@scalar/fastify-api-reference';
import type { FastifyPluginAsync } from 'fastify';
import { env } from '../config/env.js';

const swaggerPlugin: FastifyPluginAsync = async (fastify) => {
  if (env.NODE_ENV === 'production') return; // skip docs in prod

  await fastify.register(fastifySwagger, {
    openapi: {
      openapi: '3.1.0',
      info: {
        title: 'Pairly API',
        description: 'REST API for the Pairly real-time interactive lecture platform',
        version: '1.0.0',
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [{ bearerAuth: [] }],
    },
  });

  await fastify.register(apiReference, {
    routePrefix: '/api/docs',
  });
};

export default fp(swaggerPlugin, { name: 'swagger' });
