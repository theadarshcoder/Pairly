import { z } from 'zod';

const EnvSchema = z.object({
  PORT: z.coerce.number().int().positive().default(4000),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),

  // MongoDB
  MONGO_URI: z.string().url().default('mongodb://127.0.0.1:27017/pairly'),
  MONGO_DB_NAME: z.string().min(1).default('pairly'),

  // Auth
  JWT_SECRET: z.string().min(16, 'JWT_SECRET must be at least 16 characters'),
  JWT_EXPIRES_IN: z.string().default('7d'),

  // AI
  ANTHROPIC_API_KEY: z.string().min(1).default('sk-ant-placeholder'),

  // CORS
  FRONTEND_URL: z.string().url().default('http://localhost:5173'),

  // Socket rate limiting
  SOCKET_RATE_LIMIT_EVENTS: z.coerce.number().int().positive().default(50),
  SOCKET_RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(10_000),

  // Aggregation buffer flush interval (milliseconds)
  FLUSH_INTERVAL_MS: z.coerce.number().int().positive().default(100),
});

export type Env = z.infer<typeof EnvSchema>;

const parsed = EnvSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:');
  console.error(parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env: Env = parsed.data;
