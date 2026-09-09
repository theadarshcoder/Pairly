import { z } from 'zod';
import { BaseSlideSchema } from './base.schema.js';

export const RubricCriterionSchema = z.object({
  id: z.string().min(1),
  title: z.string().trim().min(1).max(100),
  description: z.string().max(300).optional(),
  minScore: z.number().int().default(1),
  maxScore: z.number().int().default(5),
  weight: z.number().positive().default(1),
});
export type RubricCriterion = z.infer<typeof RubricCriterionSchema>;

export const PeerReviewAnswerCardSchema = z.object({
  id: z.string().min(1),
  content: z.string().trim().min(1).max(1000),
  authorNickname: z.string().max(50).optional(),
});
export type PeerReviewAnswerCard = z.infer<typeof PeerReviewAnswerCardSchema>;

export const PeerReviewPhaseSchema = z.enum(['submission', 'grading', 'reveal']);
export type PeerReviewPhase = z.infer<typeof PeerReviewPhaseSchema>;

export const PeerReviewSlideSchema = BaseSlideSchema.extend({
  type: z.literal('peer-review-swarm'),
  rubric: z.array(RubricCriterionSchema).min(1).max(5),
  answerCards: z.array(PeerReviewAnswerCardSchema).default([]),
  currentPhase: PeerReviewPhaseSchema.default('grading'),
  minReviewsRequired: z.number().int().positive().default(2),
  explanation: z.string().max(1000).optional(),
});
export type PeerReviewSlide = z.infer<typeof PeerReviewSlideSchema>;

/**
 * Socket payload: emitted by audience participant when submitting grades for an answer card
 */
export const ReviewGradePayloadSchema = z.object({
  slideId: z.string().min(1),
  answerId: z.string().min(1),
  scores: z.record(z.string(), z.number()), // criterionId -> score
  feedback: z.string().trim().max(500).optional(),
});
export type ReviewGradePayload = z.infer<typeof ReviewGradePayloadSchema>;

/**
 * Summary for a graded answer
 */
export const AnswerGradeSummarySchema = z.object({
  answerId: z.string().min(1),
  reviewCount: z.number().int().nonnegative(),
  averageScore: z.number().nonnegative(),
  criteriaAverages: z.record(z.string(), z.number().nonnegative()),
});
export type AnswerGradeSummary = z.infer<typeof AnswerGradeSummarySchema>;

/**
 * Aggregated state: flushed to presenter to display top answers and grade distribution
 */
export const PeerReviewAggregatePayloadSchema = z.object({
  slideId: z.string().min(1),
  summaries: z.array(AnswerGradeSummarySchema),
  totalReviewsSubmitted: z.number().int().nonnegative(),
  activePhase: PeerReviewPhaseSchema,
});
export type PeerReviewAggregatePayload = z.infer<typeof PeerReviewAggregatePayloadSchema>;
