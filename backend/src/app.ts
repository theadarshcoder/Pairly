import Fastify from 'fastify';
import AutoLoad from '@fastify/autoload';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { logger } from './lib/logger.js';
import { isAppError } from './lib/errors.js';
import socketGateway from './sockets/gateway.js';
import { env } from './config/env.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Build the Fastify application instance.
 * This function does NOT call listen() — that's done in server.ts.
 * Keeping them separate makes the app importable in tests via fastify.inject().
 */
export async function buildApp() {
  const app = Fastify({
    logger: {
      level: env.NODE_ENV === 'production' ? 'info' : 'debug',
      ...(env.NODE_ENV === 'development' && {
        transport: {
          target: 'pino-pretty',
          options: { colorize: true, translateTime: 'HH:MM:ss', ignore: 'pid,hostname' },
        },
      }),
    },
    ajv: {
      customOptions: {
        strict: false,
        coerceTypes: true,
        removeAdditional: 'all',
      },
    },
  });

  // ── 1. Global plugins (autoloaded from plugins/) ──────────────────────────
  await app.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
    forceESM: true,
  });

  // ── 2. Socket.IO gateway (must come after auth plugin) ────────────────────
  await app.register(socketGateway);

  // ── 3. REST routes (autoloaded from routes/v1/ with /api/v1 prefix) ───────
  await app.register(AutoLoad, {
    dir: join(__dirname, 'routes', 'v1'),
    options: { prefix: '/api/v1' },
    forceESM: true,
  });

  // ── 4. Global error handler ───────────────────────────────────────────────
  app.setErrorHandler((error, _request, reply) => {
    if (isAppError(error)) {
      return reply.status(error.statusCode).send(error.toJSON());
    }
    app.log.error({ err: error }, 'Unhandled error');
    return reply.status(500).send({ code: 'INTERNAL_ERROR', message: 'An unexpected error occurred' });
  });

  // ── 5. 404 handler ────────────────────────────────────────────────────────
  app.setNotFoundHandler((_request, reply) => {
    return reply.status(404).send({ code: 'NOT_FOUND', message: 'Route not found' });
  });

  return app;
}
