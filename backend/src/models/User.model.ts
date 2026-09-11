import type { Db, Collection, Document } from 'mongodb';

export interface UserDocument extends Document {
  _id?: string;
  email: string;
  passwordHash: string;
  displayName: string;
  createdAt: number;
  lastLoginAt?: number;
}

export function getUserCollection(db: Db): Collection<UserDocument> {
  return db.collection<UserDocument>('users');
}
