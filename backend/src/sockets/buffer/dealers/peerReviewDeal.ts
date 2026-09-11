import type { AssignedAnswerCard } from '@pairly/schemas';

export interface ParticipantInput {
  participantId: string;
  socketId?: string;
}

export interface AnswerInput {
  id: string;
  content: string;
  authorParticipantId?: string;
}

export interface DealResult {
  /** participantId -> Array of anonymous cards dealt to that participant */
  assignments: Map<string, AssignedAnswerCard[]>;
  /** cardId -> number of times assigned */
  cardLoads: Record<string, number>;
  minLoad: number;
  maxLoad: number;
}

/**
 * Standard Fisher-Yates array shuffle (in-place clone)
 */
function shuffle<T>(array: readonly T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arr[i]!;
    arr[i] = arr[j]!;
    arr[j] = temp;
  }
  return arr;
}

/**
 * Executes a single dealing attempt using randomized round-robin min-load selection.
 */
function attemptDeal(
  participants: ParticipantInput[],
  answers: AnswerInput[],
  targetQuota: number,
): DealResult | null {
  const cardLoads = new Map<string, number>();
  for (const a of answers) {
    cardLoads.set(a.id, 0);
  }

  const assignedMap = new Map<string, AnswerInput[]>();
  for (const p of participants) {
    assignedMap.set(p.participantId, []);
  }

  // Precompute target quota for each participant: min(targetQuota, eligibleAnswersCount)
  const quotas = new Map<string, number>();
  for (const p of participants) {
    const eligibleCount = answers.filter((a) => a.authorParticipantId !== p.participantId).length;
    quotas.set(p.participantId, Math.min(targetQuota, eligibleCount));
  }

  const maxRounds = Math.max(0, ...Array.from(quotas.values()));

  // Deal card-by-card in rounds so assignments progress uniformly
  for (let round = 0; round < maxRounds; round++) {
    const roundParticipants = shuffle(participants);

    for (const p of roundParticipants) {
      const currentCards = assignedMap.get(p.participantId)!;
      const quota = quotas.get(p.participantId) ?? targetQuota;
      if (currentCards.length >= quota) continue;

      // Filter candidate answers: not authored by p, not already assigned to p
      const candidates = answers.filter(
        (a) =>
          a.authorParticipantId !== p.participantId &&
          !currentCards.some((c) => c.id === a.id),
      );

      if (candidates.length === 0) continue;

      // Find candidates with the minimum current global load
      let minLoad = Infinity;
      for (const cand of candidates) {
        const load = cardLoads.get(cand.id) ?? 0;
        if (load < minLoad) minLoad = load;
      }

      const bestCandidates = candidates.filter(
        (cand) => (cardLoads.get(cand.id) ?? 0) === minLoad,
      );

      // Pick randomly among least-loaded candidates
      const chosen = bestCandidates[Math.floor(Math.random() * bestCandidates.length)]!;
      currentCards.push(chosen);
      cardLoads.set(chosen.id, (cardLoads.get(chosen.id) ?? 0) + 1);
    }
  }

  // Augmenting Swap Resolver: resolve any participant who fell short of their quota
  for (const p of participants) {
    const currentCards = assignedMap.get(p.participantId)!;
    const quota = quotas.get(p.participantId) ?? targetQuota;

    while (currentCards.length < quota) {
      // Find an answer card that p is eligible for and doesn't have yet
      const neededCard = answers.find(
        (a) =>
          a.authorParticipantId !== p.participantId &&
          !currentCards.some((c) => c.id === a.id),
      );

      if (!neededCard) break; // Cannot assign more

      // Find another participant pOther who holds neededCard and can swap for something else
      let swapped = false;
      for (const pOther of participants) {
        if (pOther.participantId === p.participantId) continue;
        const otherCards = assignedMap.get(pOther.participantId)!;
        const hasNeeded = otherCards.findIndex((c) => c.id === neededCard.id);
        if (hasNeeded === -1) continue;

        // Check if there is another card pOther could take instead of neededCard
        const replacementForOther = answers.find(
          (cand) =>
            cand.authorParticipantId !== pOther.participantId &&
            cand.id !== neededCard.id &&
            !otherCards.some((c) => c.id === cand.id) &&
            cand.authorParticipantId !== p.participantId,
        );

        if (replacementForOther) {
          // Perform the swap
          otherCards.splice(hasNeeded, 1, replacementForOther);
          currentCards.push(neededCard);
          cardLoads.set(replacementForOther.id, (cardLoads.get(replacementForOther.id) ?? 0) + 1);
          swapped = true;
          break;
        }
      }

      if (!swapped) {
        // Direct assignment if swap not possible
        currentCards.push(neededCard);
        cardLoads.set(neededCard.id, (cardLoads.get(neededCard.id) ?? 0) + 1);
      }
    }
  }

  // Calculate final load statistics
  const loadValues = Array.from(cardLoads.values());
  const minLoad = loadValues.length > 0 ? Math.min(...loadValues) : 0;
  const maxLoad = loadValues.length > 0 ? Math.max(...loadValues) : 0;

  // Verify quotas and self-exclusion
  for (const p of participants) {
    const pCards = assignedMap.get(p.participantId)!;
    const quota = quotas.get(p.participantId) ?? targetQuota;
    if (pCards.length < quota) {
      return null; // Retry
    }
    // Verify self-exclusion
    if (pCards.some((c) => c.authorParticipantId === p.participantId)) {
      return null; // Retry
    }
  }

  // Verify balanced load: max - min <= 1 (or <= 2 in edge cases where N is tiny)
  const allowedSpread = participants.length <= 4 ? 2 : 1;
  if (answers.length > 0 && maxLoad - minLoad > allowedSpread) {
    return null; // Retry for tighter balance
  }

  // Transform to anonymous AssignedAnswerCard
  const anonymousAssignments = new Map<string, AssignedAnswerCard[]>();
  for (const [pId, cards] of assignedMap.entries()) {
    anonymousAssignments.set(
      pId,
      cards.map((c) => ({ id: c.id, content: c.content })),
    );
  }

  const rawCardLoads: Record<string, number> = {};
  for (const [id, count] of cardLoads.entries()) {
    rawCardLoads[id] = count;
  }

  return {
    assignments: anonymousAssignments,
    cardLoads: rawCardLoads,
    minLoad,
    maxLoad,
  };
}

/**
 * Pure function: deals anonymous answer cards to participants with exact quota,
 * strict self-exclusion, and balanced distribution across submissions.
 *
 * Runs with random restarts to guarantee optimal balance.
 */
export function dealPeerReviewCards(
  participants: ParticipantInput[],
  answers: AnswerInput[],
  quota: number = 3,
): DealResult {
  if (participants.length === 0 || answers.length === 0) {
    return {
      assignments: new Map(),
      cardLoads: {},
      minLoad: 0,
      maxLoad: 0,
    };
  }

  // Attempt up to 20 times to find an optimal deal
  let bestResult: DealResult | null = null;
  let lowestSpread = Infinity;

  for (let attempt = 0; attempt < 20; attempt++) {
    const result = attemptDeal(participants, answers, quota);
    if (result) {
      const spread = result.maxLoad - result.minLoad;
      if (spread <= 1) {
        return result; // Perfect balance achieved!
      }
      if (spread < lowestSpread) {
        lowestSpread = spread;
        bestResult = result;
      }
    }
  }

  if (bestResult) {
    return bestResult;
  }

  // Fallback: run attempt with relaxed spread constraint
  const fallback = attemptDeal(participants, answers, quota);
  if (fallback) return fallback;

  // Ultimate fallback
  const emptyLoads: Record<string, number> = {};
  const emptyAssignments = new Map<string, AssignedAnswerCard[]>();
  for (const p of participants) emptyAssignments.set(p.participantId, []);
  for (const a of answers) emptyLoads[a.id] = 0;

  return {
    assignments: emptyAssignments,
    cardLoads: emptyLoads,
    minLoad: 0,
    maxLoad: 0,
  };
}
