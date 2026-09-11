import type { QuestionItem, QnaFeedPayload } from '@pairly/schemas';

/**
 * Pure aggregator: raw question items → clustered QnA feed.
 * Full embedding-based clustering is a service-layer concern.
 * This aggregator does simple deduplication by exact text match for now.
 */
export function aggregateQna(
  slideId: string,
  questions: QuestionItem[],
  isLocked: boolean,
): QnaFeedPayload {
  // Sort by upvotes desc, then by timestamp desc
  const sorted = [...questions].sort((a, b) => b.upvotes - a.upvotes || b.timestamp - a.timestamp);

  const clusters = sorted.map((q) => ({
    clusterId: q.id,
    representativeQuestion: q,
    duplicateCount: 0,
    duplicateQuestions: [],
    totalUpvotes: q.upvotes,
    lastActivityTimestamp: q.timestamp,
  }));

  return {
    slideId,
    clusters,
    totalQuestionsCount: questions.length,
    isLocked,
  };
}
