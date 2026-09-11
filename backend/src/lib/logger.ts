import pino from 'pino';
import { env } from '../config/env.js';

const transport =
  env.NODE_ENV === 'development'
    ? pino.transport({
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'HH:MM:ss',
          ignore: 'pid,hostname',
        },
      })
    : undefined;

export const logger = pino(
  {
    level: env.NODE_ENV === 'production' ? 'info' : 'debug',
    redact: ['req.headers.authorization', '*.password', '*.token', '*.secret'],
  },
  transport,
);

export type Logger = typeof logger;
