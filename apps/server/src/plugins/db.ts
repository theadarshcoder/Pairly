import { MongoClient, Db } from 'mongodb';
import fp from 'fastify-plugin';
import type { FastifyPluginAsync } from 'fastify';
import { env } from '../config/env.js';

declare module 'fastify' {
  interface FastifyInstance {
    db: Db;
    mongoClient: MongoClient;
  }
}

const dbPlugin: FastifyPluginAsync = async (fastify) => {
  const client = new MongoClient(env.MONGO_URI, {
    maxPoolSize: 20,
    minPoolSize: 5,
    serverSelectionTimeoutMS: 5000,
  });

  await client.connect();
  const db = client.db(env.MONGO_DB_NAME);

  fastify.decorate('db', db);
  fastify.decorate('mongoClient', client);

  fastify.addHook('onClose', async () => {
    fastify.log.info('Closing MongoDB connection...');
    await client.close();
  });

  fastify.log.info({ db: env.MONGO_DB_NAME }, 'MongoDB connected');
};

export default fp(dbPlugin, { name: 'db' });
