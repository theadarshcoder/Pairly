/**
 * question.schema.ts — Issue 17: Q&A thread shape.
 *
 * Used by the Semantic Q&A dedup slide type.
 * Defines the shape of clustered question threads.
 */
import { z } from 'zod';

export const QuestionThreadSchema = z.object({
  clusterId: z.string(),
  /** The representative question text shown to the presenter */
  representative: z.string(),
  /** Number of students who asked a semantically similar question */
  weight: z.number().int().nonnegative(),
  /** Whether the presenter has marked this as answered */
  answered: z.boolean().default(false),
  /** Individual questions in this cluster (for drill-down) */
  questions: z.array(z.object({
    id: z.string(),
    text: z.string(),
    participantId: z.string().optional(),
    timestamp: z.number(),
    upvotes: z.number().int().nonnegative().default(0),
  })).default([]),
});

export const QuestionFeedSchema = z.object({
  slideId: z.string(),
  threads: z.array(QuestionThreadSchema),
  totalQuestions: z.number().int().nonnegative(),
});

// ── Inferred types ──
export type QuestionThread = z.infer<typeof QuestionThreadSchema>;
export type QuestionFeed = z.infer<typeof QuestionFeedSchema>;
