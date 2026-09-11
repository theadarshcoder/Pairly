import type { Db } from 'mongodb';
import { randomBytes } from 'node:crypto';
import { getSessionCollection } from '../models/Session.model.js';
import { NotFoundError, ConflictError } from '../lib/errors.js';
import type { Slide } from '@pairly/schemas';

function generateRoomCode(): string {
  return randomBytes(3).toString('hex').toUpperCase();
}

function generateSessionId(): string {
  return `sess_${randomBytes(8).toString('hex')}`;
}

export interface CreateSessionInput {
  title: string;
  hostId: string;
  slides?: Slide[];
  conceptTags?: string[];
}

/**
 * Create a new session with a unique room code.
 */
export async function createSession(db: Db, input: CreateSessionInput) {
  const sessions = getSessionCollection(db);
  const id = generateSessionId();
  let roomCode: string;

  // Ensure unique room code (collision-resistant, but loop for safety)
  let attempts = 0;
  do {
    roomCode = generateRoomCode();
    const existing = await sessions.findOne({ roomCode });
    if (!existing) break;
    attempts++;
    if (attempts > 10) throw new ConflictError('Could not generate unique room code');
  } while (true);

  const now = Date.now();
  const doc = {
    _id: id,
    roomCode,
    title: input.title,
    hostId: input.hostId,
    status: 'idle' as const,
    currentSlideIndex: 0,
    slides: input.slides ?? [],
    conceptTags: input.conceptTags ?? [],
    participantCount: 0,
    createdAt: now,
  };

  await sessions.insertOne(doc as any);
  return { ...doc, id };
}

/**
 * Get a session by ID.
 */
export async function getSessionById(db: Db, id: string) {
  const doc = await getSessionCollection(db).findOne({ _id: id as any });
  if (!doc) throw new NotFoundError(`Session ${id}`);
  return { ...doc, id: doc._id as unknown as string };
}

/**
 * Get a session by room code.
 */
export async function getSessionByRoomCode(db: Db, roomCode: string) {
  const doc = await getSessionCollection(db).findOne({ roomCode });
  if (!doc) throw new NotFoundError(`Room ${roomCode}`);
  return { ...doc, id: doc._id as unknown as string };
}

/**
 * Persist aggregated session data at session end — one bulk write.
 * This is the ONLY write path that touches MongoDB during a live session.
 */
export async function endSession(
  db: Db,
  sessionId: string,
  aggregatedData: { rawInteractionLog?: unknown[]; finalSlideStates?: unknown },
) {
  const sessions = getSessionCollection(db);
  const now = Date.now();

  const result = await sessions.updateOne(
    { _id: sessionId as any },
    {
      $set: {
        status: 'ended',
        endedAt: now,
        ...aggregatedData,
      },
    },
  );

  if (result.matchedCount === 0) {
    throw new NotFoundError(`Session ${sessionId}`);
  }
}
