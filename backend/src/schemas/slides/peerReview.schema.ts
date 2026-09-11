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
  authorParticipantId: z.string().optional(),
});
export type PeerReviewAnswerCard = z.infer<typeof PeerReviewAnswerCardSchema>;

/**
 * Stripped anonymous card dealt to a participant for grading
 */
export const AssignedAnswerCardSchema = z.object({
  id: z.string().min(1),
  content: z.string().trim().min(1).max(1000),
});
export type AssignedAnswerCard = z.infer<typeof AssignedAnswerCardSchema>;

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
 * Socket payload: emitted by audience participant during submission phase
 */
export const ReviewSubmitAnswerPayloadSchema = z.object({
  slideId: z.string().min(1),
  content: z.string().trim().min(1).max(1000),
});
export type ReviewSubmitAnswerPayload = z.infer<typeof ReviewSubmitAnswerPayloadSchema>;

/**
 * Socket payload: emitted by host to control phase (e.g. trigger shuffle & deal)
 */
export const ReviewPhaseControlPayloadSchema = z.object({
  roomCode: z.string().min(1),
  slideId: z.string().min(1),
  phase: PeerReviewPhaseSchema,
});
export type ReviewPhaseControlPayload = z.infer<typeof ReviewPhaseControlPayloadSchema>;

/**
 * Socket payload: targeted delivery of dealt anonymous cards to a participant
 */
export const ReviewAssignedCardsPayloadSchema = z.object({
  slideId: z.string().min(1),
  cards: z.array(AssignedAnswerCardSchema),
});
export type ReviewAssignedCardsPayload = z.infer<typeof ReviewAssignedCardsPayloadSchema>;

/**
 * Socket payload: broadcast phase change to room
 */
export const ReviewPhaseChangePayloadSchema = z.object({
  slideId: z.string().min(1),
  phase: PeerReviewPhaseSchema,
});
export type ReviewPhaseChangePayload = z.infer<typeof ReviewPhaseChangePayloadSchema>;

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
  scoreDistribution: z.record(z.string(), z.number().int().nonnegative()).default({}),
  recentFeedback: z.array(z.string()).default([]),
});
export type AnswerGradeSummary = z.infer<typeof AnswerGradeSummarySchema>;

/**
 * Aggregated state: flushed to presenter to display top answers and grade distribution
 */
export const PeerReviewAggregatePayloadSchema = z.object({
  slideId: z.string().min(1),
  summaries: z.array(AnswerGradeSummarySchema),
  totalReviewsSubmitted: z.number().int().nonnegative(),
  activePhase: PeerReviewPhaseSchema.default('grading'),
  recentReviewsCount: z.number().int().nonnegative().default(0),
});
export type PeerReviewAggregatePayload = z.infer<typeof PeerReviewAggregatePayloadSchema>;

