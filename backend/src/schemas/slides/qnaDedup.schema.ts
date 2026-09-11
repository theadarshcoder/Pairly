import { z } from 'zod';
import { BaseSlideSchema } from './base.schema.js';

export const QnaDedupSlideSchema = BaseSlideSchema.extend({
  type: z.literal('qna-dedup'),
  topic: z.string().trim().max(150).optional(),
  allowAnonymous: z.boolean().default(true),
  isModerated: z.boolean().default(false),
  isLocked: z.boolean().default(false),
});
export type QnaDedupSlide = z.infer<typeof QnaDedupSlideSchema>;

/**
 * Socket payload: emitted by audience participant to ask a question
 */
export const QuestionAskPayloadSchema = z.object({
  slideId: z.string().min(1),
  text: z.string().trim().min(3).max(500),
  isAnonymous: z.boolean().default(false),
  authorNickname: z.string().trim().max(30).optional(),
});
export type QuestionAskPayload = z.infer<typeof QuestionAskPayloadSchema>;

/**
 * Socket payload: emitted by audience participant to upvote a question
 */
export const QuestionUpvotePayloadSchema = z.object({
  slideId: z.string().min(1),
  questionId: z.string().min(1),
  removeUpvote: z.boolean().default(false),
});
export type QuestionUpvotePayload = z.infer<typeof QuestionUpvotePayloadSchema>;

/**
 * An individual question item
 */
export const QuestionItemSchema = z.object({
  id: z.string().min(1),
  text: z.string().min(1),
  authorNickname: z.string().optional(),
  isAnonymous: z.boolean(),
  upvotes: z.number().int().nonnegative().default(0),
  timestamp: z.number().int().nonnegative(),
  isAnswered: z.boolean().default(false),
});
export type QuestionItem = z.infer<typeof QuestionItemSchema>;

/**
 * Clustered question group produced by AI embedding & nearest-neighbor clustering
 */
export const QuestionClusterSchema = z.object({
  clusterId: z.string().min(1),
  representativeQuestion: QuestionItemSchema,
  duplicateCount: z.number().int().nonnegative().default(0),
  duplicateQuestions: z.array(QuestionItemSchema).default([]),
  totalUpvotes: z.number().int().nonnegative(),
  lastActivityTimestamp: z.number().int().nonnegative(),
});
export type QuestionCluster = z.infer<typeof QuestionClusterSchema>;

/**
 * Aggregated state: flushed by server to presenter and audience feed
 */
export const QnaFeedPayloadSchema = z.object({
  slideId: z.string().min(1),
  clusters: z.array(QuestionClusterSchema),
  totalQuestionsCount: z.number().int().nonnegative(),
  isLocked: z.boolean(),
});
export type QnaFeedPayload = z.infer<typeof QnaFeedPayloadSchema>;
