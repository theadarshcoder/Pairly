import fp from 'fastify-plugin';
import fastifyCors from '@fastify/cors';
import type { FastifyPluginAsync } from 'fastify';
import { env } from '../config/env.js';

const corsPlugin: FastifyPluginAsync = async (fastify) => {
  fastify.register(fastifyCors, {
    origin: env.NODE_ENV === 'production' ? env.FRONTEND_URL : true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });
};

export default fp(corsPlugin, { name: 'cors' });
