import type { SortSubmitPayload, SortAggregatePayload } from '@pairly/schemas';

/**
 * Pure aggregator function: raw sort:submit events → inversion distribution payload.
 * Computes average rank per item and a distribution of inversion counts.
 */
export function aggregateSorting(
  slideId: string,
  submissions: SortSubmitPayload[],
): SortAggregatePayload {
  if (submissions.length === 0) {
    return {
      slideId,
      totalSubmissions: 0,
      itemAverageRanks: {},
      inversionDistribution: {},
      exactMatchesCount: 0,
    };
  }

  // Average rank per itemId
  const rankAccumulator = new Map<string, number[]>();
  for (const sub of submissions) {
    sub.orderedItemIds.forEach((itemId, rank) => {
      if (!rankAccumulator.has(itemId)) rankAccumulator.set(itemId, []);
      rankAccumulator.get(itemId)!.push(rank);
    });
  }

  const itemAverageRanks: Record<string, number> = {};
  for (const [itemId, ranks] of rankAccumulator.entries()) {
    itemAverageRanks[itemId] = ranks.reduce((a, b) => a + b, 0) / ranks.length;
  }

  // Inversion distribution — placeholder (full Kendall-tau computed in feature layer)
  const inversionDistribution: Record<string, number> = {};

  return {
    slideId,
    totalSubmissions: submissions.length,
    itemAverageRanks,
    inversionDistribution,
    exactMatchesCount: 0, // computed when correct order is known
  };
}
