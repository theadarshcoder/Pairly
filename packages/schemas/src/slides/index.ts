import { z } from 'zod';
import { NetworkMatchingSlideSchema } from './networkMatching.schema.js';
import { SpatialHotspotSlideSchema } from './spatialHotspot.schema.js';
import { SequentialSortingSlideSchema } from './sequentialSorting.schema.js';
import { PeerReviewSlideSchema } from './peerReview.schema.js';
import { QnaDedupSlideSchema } from './qnaDedup.schema.js';

export const SlideTypeSchema = z.enum([
  'network-matching',
  'spatial-hotspot',
  'sequential-sorting',
  'peer-review-swarm',
  'qna-dedup',
]);
export type SlideType = z.infer<typeof SlideTypeSchema>;

/**
 * Discriminated union of all 5 slide types based on the 'type' field
 */
export const SlideSchema = z.discriminatedUnion('type', [
  NetworkMatchingSlideSchema,
  SpatialHotspotSlideSchema,
  SequentialSortingSlideSchema,
  PeerReviewSlideSchema,
  QnaDedupSlideSchema,
]);
export type Slide = z.infer<typeof SlideSchema>;

// Export all individual schemas and types
export * from './base.schema.js';
export * from './networkMatching.schema.js';
export * from './spatialHotspot.schema.js';
export * from './sequentialSorting.schema.js';
export * from './peerReview.schema.js';
export * from './qnaDedup.schema.js';
