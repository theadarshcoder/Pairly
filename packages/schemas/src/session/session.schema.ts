import { z } from 'zod';
import { SlideSchema } from '../slides/index.js';

export const SessionStatusSchema = z.enum(['idle', 'active', 'paused', 'ended']);
export type SessionStatus = z.infer<typeof SessionStatusSchema>;

export const RoomCodeSchema = z
  .string()
  .trim()
  .toUpperCase()
  .min(4)
  .max(10)
  .regex(/^[A-Z0-9-]+$/);
export type RoomCode = z.infer<typeof RoomCodeSchema>;

export const SessionSchema = z.object({
  id: z.string().min(1),
  roomCode: RoomCodeSchema,
  title: z.string().trim().min(1).max(120),
  hostId: z.string().min(1),
  status: SessionStatusSchema.default('idle'),
  currentSlideIndex: z.number().int().nonnegative().default(0),
  slides: z.array(SlideSchema).default([]),
  conceptTags: z.array(z.string().min(1)).default([]),
  participantCount: z.number().int().nonnegative().default(0),
  createdAt: z.number().int().nonnegative().default(() => Date.now()),
  startedAt: z.number().int().nonnegative().optional(),
  endedAt: z.number().int().nonnegative().optional(),
});
export type Session = z.infer<typeof SessionSchema>;

/**
 * Lightweight session snapshot sent to participants on room join
 */
export const SessionSnapshotSchema = z.object({
  id: z.string().min(1),
  roomCode: RoomCodeSchema,
  title: z.string().min(1),
  status: SessionStatusSchema,
  currentSlideIndex: z.number().int().nonnegative(),
  totalSlides: z.number().int().nonnegative(),
  currentSlide: SlideSchema.optional(),
});
export type SessionSnapshot = z.infer<typeof SessionSnapshotSchema>;
