import type {
  ReviewGradePayload,
  PeerReviewAggregatePayload,
  PeerReviewPhase,
  AnswerGradeSummary,
} from '@pairly/schemas';

export interface PeerReviewCardCumulative {
  answerId: string;
  reviewCount: number;
  totalScoreSum: number;
  criteriaSums: Record<string, number>;
  criteriaCounts: Record<string, number>;
  scoreDistribution?: Record<string, number>;
  recentFeedback?: string[];
}

/**
 * Pure aggregator function: transforms bounded cumulative card states
 * into a fixed-size PeerReviewAggregatePayload for the presenter.
 *
 * Payload size is strictly O(cards * criteria), never growing with audience size.
 */
export function aggregatePeerReview(
  slideId: string,
  cardsOrGrades: PeerReviewCardCumulative[] | ReviewGradePayload[],
  activePhase: PeerReviewPhase = 'grading',
  totalReviewsSubmitted?: number,
  recentReviewsCount: number = 0,
): PeerReviewAggregatePayload {
  // Check if inputs are already bounded cumulative cards
  const isCumulative =
    cardsOrGrades.length === 0 ||
    ('reviewCount' in cardsOrGrades[0]! && 'criteriaSums' in cardsOrGrades[0]!);

  if (isCumulative) {
    const cards = cardsOrGrades as PeerReviewCardCumulative[];
    const summaries: AnswerGradeSummary[] = cards.map((card) => {
      const criteriaAverages: Record<string, number> = {};
      const criterionIds = Object.keys(card.criteriaSums);

      for (const cId of criterionIds) {
        const count = card.criteriaCounts[cId] ?? 0;
        const sum = card.criteriaSums[cId] ?? 0;
        criteriaAverages[cId] = count > 0 ? Number((sum / count).toFixed(2)) : 0;
      }

      // Calculate overall average score
      const criteriaValues = Object.values(criteriaAverages);
      const averageScore =
        criteriaValues.length > 0
          ? Number((criteriaValues.reduce((a, b) => a + b, 0) / criteriaValues.length).toFixed(2))
          : 0;

      return {
        answerId: card.answerId,
        reviewCount: card.reviewCount,
        averageScore,
        criteriaAverages,
        scoreDistribution: card.scoreDistribution ?? {},
        recentFeedback: card.recentFeedback ?? [],
      };
    });

    const total =
      totalReviewsSubmitted ??
      cards.reduce((sum, c) => sum + c.reviewCount, 0);

    return {
      slideId,
      summaries,
      totalReviewsSubmitted: total,
      activePhase,
      recentReviewsCount,
    };
  }

  // Fallback / legacy support for raw ReviewGradePayload[]
  const rawGrades = cardsOrGrades as ReviewGradePayload[];
  const answerGrades = new Map<string, ReviewGradePayload[]>();
  for (const grade of rawGrades) {
    if (!answerGrades.has(grade.answerId)) answerGrades.set(grade.answerId, []);
    answerGrades.get(grade.answerId)!.push(grade);
  }

  const summaries: AnswerGradeSummary[] = [...answerGrades.entries()].map(([answerId, gradeList]) => {
    const criteriaAccumulator: Record<string, number[]> = {};
    const scoreDistribution: Record<string, number> = {};
    const recentFeedback: string[] = [];

    for (const g of gradeList) {
      for (const [criterionId, score] of Object.entries(g.scores)) {
        if (!criteriaAccumulator[criterionId]) criteriaAccumulator[criterionId] = [];
        criteriaAccumulator[criterionId]!.push(score);
        const rounded = String(Math.round(score));
        scoreDistribution[rounded] = (scoreDistribution[rounded] ?? 0) + 1;
      }
      if (g.feedback?.trim()) {
        recentFeedback.push(g.feedback.trim());
      }
    }

    const criteriaAverages: Record<string, number> = {};
    for (const [cId, scores] of Object.entries(criteriaAccumulator)) {
      criteriaAverages[cId] = Number(
        (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2),
      );
    }

    const criteriaValues = Object.values(criteriaAverages);
    const averageScore =
      criteriaValues.length > 0
        ? Number((criteriaValues.reduce((a, b) => a + b, 0) / criteriaValues.length).toFixed(2))
        : 0;

    return {
      answerId,
      reviewCount: gradeList.length,
      averageScore,
      criteriaAverages,
      scoreDistribution,
      recentFeedback: recentFeedback.slice(-5),
    };
  });

  return {
    slideId,
    summaries,
    totalReviewsSubmitted: totalReviewsSubmitted ?? rawGrades.length,
    activePhase,
    recentReviewsCount: recentReviewsCount || rawGrades.length,
  };
}
