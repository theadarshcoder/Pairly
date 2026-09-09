import { z } from 'zod';
import { BaseSlideSchema } from './base.schema.js';

export const SortItemSchema = z.object({
  id: z.string().min(1),
  text: z.string().trim().min(1).max(200),
  correctRank: z.number().int().nonnegative(), // 0-indexed or 1-indexed target position
  details: z.string().max(200).optional(),
});
export type SortItem = z.infer<typeof SortItemSchema>;

export const SequentialSortingSlideSchema = BaseSlideSchema.extend({
  type: z.literal('sequential-sorting'),
  items: z.array(SortItemSchema).min(2).max(10),
  explanation: z.string().max(1000).optional(),
});
export type SequentialSortingSlide = z.infer<typeof SequentialSortingSlideSchema>;

/**
 * Socket payload: emitted by audience participant submitting their sorted order
 */
export const SortSubmitPayloadSchema = z.object({
  slideId: z.string().min(1),
  orderedItemIds: z.array(z.string().min(1)).min(2),
});
export type SortSubmitPayload = z.infer<typeof SortSubmitPayloadSchema>;

/**
 * Aggregated state: flushed by server to presenter for inversion analysis view
 */
export const SortAggregatePayloadSchema = z.object({
  slideId: z.string().min(1),
  totalSubmissions: z.number().int().nonnegative(),
  itemAverageRanks: z.record(z.string(), z.number().nonnegative()),
  inversionDistribution: z.record(z.string(), z.number().int().nonnegative()), // stringified inversion count -> count of submissions
  exactMatchesCount: z.number().int().nonnegative(),
});
export type SortAggregatePayload = z.infer<typeof SortAggregatePayloadSchema>;
