import { z } from 'zod';
import { SlideSchema } from '../slides/index.js';

/**
 * High-level topic outline item extracted from syllabus text
 */
export const TopicOutlineItemSchema = z.object({
  title: z.string().trim().min(1).max(120),
  keyConcepts: z.array(z.string().min(1)).min(1),
  suggestedSlideTypes: z.array(z.string()).optional(),
});
export type TopicOutlineItem = z.infer<typeof TopicOutlineItemSchema>;

/**
 * Structured output contract for Claude API when transforming syllabus text into Pairly slides.
 * Used for both the tool/schema definition sent to Claude and the runtime Zod validation.
 */
export const SyllabusOutputSchema = z.object({
  courseTitle: z.string().trim().min(1).max(150),
  lessonTitle: z.string().trim().min(1).max(150),
  summary: z.string().trim().min(1).max(1000),
  learningObjectives: z.array(z.string().trim().min(1)).min(1).max(10),
  conceptTags: z.array(z.string().trim().min(1)).min(1).max(20),
  outline: z.array(TopicOutlineItemSchema).optional(),
  slides: z.array(SlideSchema).min(1),
});
export type SyllabusOutput = z.infer<typeof SyllabusOutputSchema>;

/**
 * Request payload for the syllabus ingestion REST endpoint
 */
export const SyllabusUploadRequestSchema = z.object({
  syllabusText: z.string().min(20).max(50000),
  preferredSlideCount: z.number().int().min(1).max(30).default(6),
  targetAudienceLevel: z.enum(['beginner', 'intermediate', 'advanced']).default('intermediate'),
  focusTopics: z.array(z.string()).optional(),
});
export type SyllabusUploadRequest = z.infer<typeof SyllabusUploadRequestSchema>;
