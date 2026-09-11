import { z } from 'zod';

export const MultipleChoiceOption = z.object({
  id: z.string(),
  label: z.string(),
});
export type MultipleChoiceOption = z.infer<typeof MultipleChoiceOption>;

export const MultipleChoiceSlide = z.object({
  type: z.literal('multiple-choice'),
  id: z.string(),
  title: z.string(),
  options: z.array(MultipleChoiceOption).min(2).max(6),
});
export type MultipleChoiceSlide = z.infer<typeof MultipleChoiceSlide>;

export const MultipleChoiceFrame = z.object({
  type: z.literal('multiple-choice-frame'),
  counts: z.record(z.string(), z.number().int().nonnegative()),
  totalVotes: z.number().int().nonnegative(),
});
export type MultipleChoiceFrame = z.infer<typeof MultipleChoiceFrame>;
