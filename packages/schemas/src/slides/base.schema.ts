import { z } from 'zod';

export const BaseSlideSchema = z.object({
  id: z.string().min(1),
  title: z.string().trim().min(1).max(120),
  prompt: z.string().trim().min(1).max(500),
  conceptTags: z.array(z.string().min(1)).default([]),
  timerSeconds: z.number().int().positive().optional(),
  order: z.number().int().nonnegative().default(0),
  notes: z.string().max(1000).optional(),
  createdAt: z.number().int().nonnegative().optional(),
});
export type BaseSlide = z.infer<typeof BaseSlideSchema>;
