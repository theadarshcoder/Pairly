import type { SyllabusOutput, SyllabusUploadRequest } from '@pairly/schemas';
import { SyllabusOutputSchema } from '@pairly/schemas';
import { logger } from '../lib/logger.js';

/**
 * Stub: Parse a syllabus text and return structured slide output.
 * In production, this calls the Claude API with structured output.
 * For the skeleton it returns a hardcoded fixture so the full
 * data pipeline can be exercised end-to-end without an API key.
 */
export async function parseSyllabus(
  input: SyllabusUploadRequest,
): Promise<SyllabusOutput> {
  logger.info({ syllabusLength: input.syllabusText.length }, 'Parsing syllabus (stub)');

  // TODO: Replace with Claude API call using SyllabusOutputSchema as the structured output schema.
  // The same Zod schema is used for:
  //   1. The tool/schema definition sent to Claude
  //   2. The post-response Zod re-validation (defense in depth)
  const stubOutput: SyllabusOutput = SyllabusOutputSchema.parse({
    courseTitle: 'Sample Course',
    lessonTitle: input.syllabusText.slice(0, 60).trim() || 'Untitled Lesson',
    summary: 'AI-generated lesson from syllabus text.',
    learningObjectives: ['Understand the core concepts', 'Apply knowledge interactively'],
    conceptTags: ['concept-1', 'concept-2'],
    slides: [
      {
        id: `slide_${Date.now()}_1`,
        title: 'Concept Matching Activity',
        prompt: 'Match each term to its definition.',
        type: 'network-matching',
        conceptTags: ['concept-1'],
        order: 0,
        leftItems: [
          { id: 'l1', label: 'Term A' },
          { id: 'l2', label: 'Term B' },
        ],
        rightItems: [
          { id: 'r1', label: 'Definition A' },
          { id: 'r2', label: 'Definition B' },
        ],
        correctPairs: [
          { leftId: 'l1', rightId: 'r1' },
          { leftId: 'l2', rightId: 'r2' },
        ],
      },
    ],
  });

  return stubOutput;
}
