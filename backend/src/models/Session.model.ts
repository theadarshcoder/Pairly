import type { Db, Collection, WithId, Document } from 'mongodb';
import type { Session } from '@pairly/schemas';

export interface SessionDocument extends Omit<Session, 'id'>, Document {
  _id?: string;
  createdAt: number;
  endedAt?: number;
  rawInteractionLog?: unknown[];
}

export function getSessionCollection(db: Db): Collection<SessionDocument> {
  return db.collection<SessionDocument>('sessions');
}
