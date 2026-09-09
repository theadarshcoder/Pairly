import type { ReviewGradePayload, PeerReviewAggregatePayload } from '@pairly/schemas';

/**
 * Pure aggregator: raw review:grade events → per-answer grade summaries.
 */
export function aggregatePeerReview(
  slideId: string,
  grades: ReviewGradePayload[],
  activePhase: 'submission' | 'grading' | 'reveal' = 'grading',
): PeerReviewAggregatePayload {
  // Group grades by answerId
  const answerGrades = new Map<string, ReviewGradePayload[]>();
  for (const grade of grades) {
    if (!answerGrades.has(grade.answerId)) answerGrades.set(grade.answerId, []);
    answerGrades.get(grade.answerId)!.push(grade);
  }

  const summaries = [...answerGrades.entries()].map(([answerId, gradeList]) => {
    // Aggregate scores per criterion
    const criteriaAccumulator: Record<string, number[]> = {};
    let totalScore = 0;

    for (const g of gradeList) {
      for (const [criterionId, score] of Object.entries(g.scores)) {
        if (!criteriaAccumulator[criterionId]) criteriaAccumulator[criterionId] = [];
        criteriaAccumulator[criterionId]!.push(score);
        totalScore += score;
      }
    }

    const criteriaAverages: Record<string, number> = {};
    for (const [cId, scores] of Object.entries(criteriaAccumulator)) {
      criteriaAverages[cId] = scores.reduce((a, b) => a + b, 0) / scores.length;
    }

    return {
      answerId,
      reviewCount: gradeList.length,
      averageScore: totalScore / gradeList.length,
      criteriaAverages,
    };
  });

  return {
    slideId,
    summaries,
    totalReviewsSubmitted: grades.length,
    activePhase,
  };
}
