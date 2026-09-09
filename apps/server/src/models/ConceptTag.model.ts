import type { Db, Collection, Document } from 'mongodb';
import type { ConceptTag } from '@pairly/schemas';

export interface ConceptTagDocument extends Omit<ConceptTag, 'id'>, Document {
  _id?: string;
  sessionIds: string[];
  slideIds: string[];
  exposureCount: number;
  lastSeenAt: number;
}

export function getConceptTagCollection(db: Db): Collection<ConceptTagDocument> {
  return db.collection<ConceptTagDocument>('concept_tags');
}
