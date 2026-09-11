/**
 * frame.schema.ts — Issue 17: The 10 Hz socket payload shape.
 *
 * This is the schema for high-frequency frames sent by the server's
 * FlushScheduler at 10 FPS. Socket handlers must validate incoming
 * frames with SlideFrameSchema.safeParse — invalid frames are dropped
 * silently (never crash the client).
 *
 * Used by:
 *   - Frontend: liveBuffer.ts (bindLive validates frames)
 *   - Backend: FlushScheduler.ts (emits validated payloads)
 *   - Mocked socket: dev fixtures
 */
import { z } from 'zod';

// ── Individual frame payloads ─────────────────────────────────────────────

export const HotspotFrameSchema = z.object({
  type: z.literal('hotspot:batch'),
  slideId: z.string(),
  hotspotDensityGrid: z.array(z.number()),
  hotspotTotalTaps: z.number().int().nonnegative(),
  hotspotRegionHits: z.record(z.string(), z.number().int().nonnegative()).optional(),
  /** Ephemeral: recent taps in the last 100ms for transient animations */
  hotspotRecentTaps: z.array(z.object({
    x: z.number(),
    y: z.number(),
  })).optional(),
});

export const MatchFrameSchema = z.object({
  type: z.literal('match:update'),
  slideId: z.string(),
  edges: z.array(z.object({
    sourceId: z.string(),
    targetId: z.string(),
    weight: z.number().nonnegative(),
    correct: z.boolean().nullable(),
  })),
});

export const SortFrameSchema = z.object({
  type: z.literal('sort:update'),
  slideId: z.string(),
  distribution: z.array(z.array(z.number().int().nonnegative())),
  inversionRate: z.number().min(0).max(1).optional(),
});

export const ReviewFrameSchema = z.object({
  type: z.literal('review:update'),
  slideId: z.string(),
  answerSummaries: z.record(z.string(), z.object({
    reviewCount: z.number().int().nonnegative(),
    avgScore: z.number(),
    criteriaSums: z.record(z.string(), z.number()),
    criteriaCounts: z.record(z.string(), z.number().int().nonnegative()),
  })),
  recentReviewsCount: z.number().int().nonnegative().default(0),
});

export const QnaFrameSchema = z.object({
  type: z.literal('qna:update'),
  slideId: z.string(),
  clusters: z.array(z.object({
    clusterId: z.string(),
    representative: z.string(),
    weight: z.number().int().nonnegative(),
    answered: z.boolean(),
  })),
});

import { MultipleChoiceFrame } from '../slides/multipleChoice.schema.js';

// ── Discriminated union ────────────────────────────────────────────────────

/** Discriminated union of all 10 Hz frame types */
export const SlideFrameSchema = z.discriminatedUnion('type', [
  HotspotFrameSchema,
  MatchFrameSchema,
  SortFrameSchema,
  ReviewFrameSchema,
  QnaFrameSchema,
  MultipleChoiceFrame,
]);

// ── Inferred types ─────────────────────────────────────────────────────────

export type HotspotFrame = z.infer<typeof HotspotFrameSchema>;
export type MatchFrame = z.infer<typeof MatchFrameSchema>;
export type SortFrame = z.infer<typeof SortFrameSchema>;
export type ReviewFrame = z.infer<typeof ReviewFrameSchema>;
export type QnaFrame = z.infer<typeof QnaFrameSchema>;
export type SlideFrame = z.infer<typeof SlideFrameSchema>;
export { MultipleChoiceFrame };
