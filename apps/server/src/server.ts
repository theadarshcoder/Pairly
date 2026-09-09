import { buildApp } from './app.js';
import { env } from './config/env.js';

async function main() {
  const app = await buildApp();

  try {
    await app.listen({ port: env.PORT, host: '0.0.0.0' });
    app.log.info(
      `🚀 Pairly server running on http://0.0.0.0:${env.PORT}`,
    );
    app.log.info(
      `📖 API docs available at http://localhost:${env.PORT}/api/docs`,
    );
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

// Graceful shutdown
const signals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM'];
signals.forEach((signal) => {
  process.on(signal, async () => {
    console.log(`\n⏹  Received ${signal}, shutting down gracefully...`);
    // Fastify close() triggers all onClose hooks (MongoDB, Socket.IO)
    process.exit(0);
  });
});

main();
