import type { FastifyInstance } from 'fastify';
import { env } from '../config/env.js';
import type { UserRole } from '@pairly/schemas';

export interface SignTokenPayload {
  sub: string;
  role: UserRole;
  email?: string;
}

/**
 * Sign a JWT for a user (host).
 */
export async function signToken(
  fastify: FastifyInstance,
  payload: SignTokenPayload,
): Promise<string> {
  return fastify.jwt.sign(payload);
}

/**
 * Generate a lightweight host token from email + secret.
 * For the skeleton this just validates the secret matches env.JWT_SECRET.
 * Replace with proper user lookup + password hash comparison later.
 */
export async function issueHostToken(
  fastify: FastifyInstance,
  email: string,
  hostSecret: string,
): Promise<string | null> {
  if (hostSecret !== env.JWT_SECRET) {
    return null;
  }
  return signToken(fastify, {
    sub: `host_${email.replace(/[^a-z0-9]/gi, '_')}`,
    role: 'host',
    email,
  });
}
