import { z } from 'zod';
import { BaseSlideSchema } from './base.schema.js';

export const TargetHotspotRegionSchema = z.object({
  id: z.string().min(1),
  label: z.string().trim().max(100).optional(),
  x: z.number().min(0).max(1), // normalized 0..1
  y: z.number().min(0).max(1), // normalized 0..1
  radius: z.number().min(0.01).max(1).default(0.05), // normalized radius
  isCorrect: z.boolean().default(true),
  feedback: z.string().max(300).optional(),
});
export type TargetHotspotRegion = z.infer<typeof TargetHotspotRegionSchema>;

export const SpatialHotspotSlideSchema = BaseSlideSchema.extend({
  type: z.literal('spatial-hotspot'),
  imageUrl: z.string().min(1),
  imageAlt: z.string().max(200).optional(),
  aspectRatio: z.number().positive().optional(), // width / height, e.g. 16/9 = 1.777
  targetRegions: z.array(TargetHotspotRegionSchema).default([]),
  maxTapsPerParticipant: z.number().int().positive().default(1),
  explanation: z.string().max(1000).optional(),
});
export type SpatialHotspotSlide = z.infer<typeof SpatialHotspotSlideSchema>;

/**
 * Socket payload: emitted by audience participant when tapping the image on /join
 */
export const HotspotTapPayloadSchema = z.object({
  slideId: z.string().min(1),
  x: z.number().min(0).max(1), // strictly normalized coordinates
  y: z.number().min(0).max(1),
  timestamp: z.number().int().nonnegative().optional(),
});
export type HotspotTapPayload = z.infer<typeof HotspotTapPayloadSchema>;

/**
 * Coordinate point inside aggregated batch
 */
export const HotspotPointSchema = z.object({
  x: z.number().min(0).max(1),
  y: z.number().min(0).max(1),
  timestamp: z.number().int().nonnegative(),
  participantId: z.string().optional(),
});
export type HotspotPoint = z.infer<typeof HotspotPointSchema>;

/**
 * Aggregated state: flushed by server buffer @ 10 FPS to presenter for D3 heatmap recalculation.
 * The server maintains a bounded 50x50 cumulative density grid (2500 numbers).
 * Ephemeral delta taps in the last 100ms are provided in recentTaps / batch for transient ripple animations.
 */
export const HotspotBatchFlushPayloadSchema = z.object({
  slideId: z.string().min(1),
  totalTaps: z.number().int().nonnegative(),
  // 50x50 fixed cumulative density grid (2500 normalized values [0..1])
  densityGrid: z.array(z.number()).default(() => new Array(2500).fill(0)),
  // Ephemeral recent taps from the last 100ms interval for transient ripple pings
  recentTaps: z.array(HotspotPointSchema).default([]),
  // Backward compatibility alias for existing tests
  batch: z.array(HotspotPointSchema).default([]),
  regionHits: z.record(z.string(), z.number().int().nonnegative()).default({}),
});
export type HotspotBatchFlushPayload = z.infer<typeof HotspotBatchFlushPayloadSchema>;

