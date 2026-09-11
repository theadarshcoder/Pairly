import { z } from 'zod';

export const ConceptTagSchema = z.object({
  id: z.string().min(1),
  name: z.string().trim().min(1).max(50),
  category: z.string().trim().min(1).max(50).optional(),
  description: z.string().max(200).optional(),
  color: z.string().regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/).optional(),
  weight: z.number().min(0).max(1).default(1),
});
export type ConceptTag = z.infer<typeof ConceptTagSchema>;
