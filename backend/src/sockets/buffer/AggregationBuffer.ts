import type {
  HotspotTapPayload,
  TargetHotspotRegion,
  MatchConnectPayload,
  SortSubmitPayload,
  ReviewGradePayload,
  PeerReviewPhase,
  QuestionItem,
  SlideType,
} from '@pairly/schemas';

export const HOTSPOT_GRID_SIZE = 50; // 50x50 = 2500 cells

export interface PeerReviewCardState {
  answerId: string;
  content: string;
  authorNickname?: string;
  authorParticipantId?: string;
  reviewCount: number;
  totalScoreSum: number;
  criteriaSums: Record<string, number>;
  criteriaCounts: Record<string, number>;
  scoreDistribution: Record<string, number>; // "1" -> count, "2" -> count, etc.
  recentFeedback: string[]; // FIFO ring buffer, max 5 items
}

export interface PeerReviewBufferState {
  cards: Map<string, PeerReviewCardState>;
  totalReviewsSubmitted: number;
  recentReviewsCount: number; // Ephemeral delta in 100ms interval, reset on drain
  activePhase: PeerReviewPhase;
  participantAssignments: Map<string, string[]>; // participantId -> answerId[]
}

export interface SlideBuffer {
  slideId: string;
  type: SlideType;
  conceptTags: string[];
  targetRegions?: TargetHotspotRegion[];

  // Bounded spatial hotspot state (O(1) memory bound)
  hotspotDensityGrid: number[]; // exactly 2500 numbers
  hotspotRecentTaps: HotspotTapPayload[]; // ephemeral delta (drained each 100ms)
  hotspotTotalTaps: number;
  hotspotRegionHits: Record<string, number>;

  // Bounded peer review state (O(cards * criteria) memory bound)
  peerReviewState: PeerReviewBufferState;

  // Other slide states
  matchEvents: MatchConnectPayload[];
  sortSubmissions: SortSubmitPayload[];
  reviewGrades: ReviewGradePayload[];
  questions: QuestionItem[];
  qnaLocked: boolean;

  // Multiple Choice dev smoke test state
  multipleChoiceCounts: Record<string, number>;
  multipleChoiceTotalVotes: number;
  multipleChoiceRecentVotes: number;
}

/**
 * Per-room, per-slide in-memory aggregation buffer.
 *
 * One AggregationBuffer instance exists per active room.
 * The FlushScheduler calls flush() on every instance at 10 FPS (every 100ms).
 *
 * Design constraints (from ARCHITECTURE.md §6b):
 * - Bounded state: O(1) memory per slide. Taps update the 50x50 density grid.
 *   Peer reviews update bounded card statistics and score distribution histograms.
 * - No Redis: Map<roomCode, AggregationBuffer> is in-process only.
 */
export class AggregationBuffer {
  private readonly slideBuffers = new Map<string, SlideBuffer>();

  initSlide(
    slideId: string,
    type: SlideType,
    conceptTags: string[] = [],
    targetRegions?: TargetHotspotRegion[],
    initialAnswerCards?: Array<{ id: string; content: string; authorNickname?: string; authorParticipantId?: string }>,
    initialPhase?: PeerReviewPhase,
  ): void {
    if (!this.slideBuffers.has(slideId)) {
      const peerReviewCards = new Map<string, PeerReviewCardState>();
      if (initialAnswerCards) {
        for (const card of initialAnswerCards) {
          peerReviewCards.set(card.id, {
            answerId: card.id,
            content: card.content,
            authorNickname: card.authorNickname,
            authorParticipantId: card.authorParticipantId,
            reviewCount: 0,
            totalScoreSum: 0,
            criteriaSums: {},
            criteriaCounts: {},
            scoreDistribution: {},
            recentFeedback: [],
          });
        }
      }

      this.slideBuffers.set(slideId, {
        slideId,
        type,
        conceptTags,
        targetRegions,
        hotspotDensityGrid: new Array(HOTSPOT_GRID_SIZE * HOTSPOT_GRID_SIZE).fill(0),
        hotspotRecentTaps: [],
        hotspotTotalTaps: 0,
        hotspotRegionHits: {},
        peerReviewState: {
          cards: peerReviewCards,
          totalReviewsSubmitted: 0,
          recentReviewsCount: 0,
          activePhase: initialPhase ?? 'grading',
          participantAssignments: new Map(),
        },
        matchEvents: [],
        sortSubmissions: [],
        reviewGrades: [],
        questions: [],
        qnaLocked: false,
        multipleChoiceCounts: {},
        multipleChoiceTotalVotes: 0,
        multipleChoiceRecentVotes: 0,
      });
    }
  }

  // ── Multiple Choice (Live Wire Test) ─────────────────────────────────────────
  pushMultipleChoiceVote(slideId: string, optionId: string): void {
    const buf = this.slideBuffers.get(slideId);
    if (!buf) return;
    buf.multipleChoiceCounts[optionId] = (buf.multipleChoiceCounts[optionId] ?? 0) + 1;
    buf.multipleChoiceTotalVotes++;
    buf.multipleChoiceRecentVotes++;
  }

  // ── Spatial Hotspot ──────────────────────────────────────────────────────────
  pushHotspotTap(slideId: string, tap: HotspotTapPayload): void {
    const buf = this.slideBuffers.get(slideId);
    if (!buf) return;

    const x = Math.max(0, Math.min(1, tap.x));
    const y = Math.max(0, Math.min(1, tap.y));

    buf.hotspotTotalTaps++;

    const gx = Math.min(HOTSPOT_GRID_SIZE - 1, Math.floor(x * HOTSPOT_GRID_SIZE));
    const gy = Math.min(HOTSPOT_GRID_SIZE - 1, Math.floor(y * HOTSPOT_GRID_SIZE));

    for (let dy = -2; dy <= 2; dy++) {
      for (let dx = -2; dx <= 2; dx++) {
        const nx = gx + dx;
        const ny = gy + dy;
        if (nx >= 0 && nx < HOTSPOT_GRID_SIZE && ny >= 0 && ny < HOTSPOT_GRID_SIZE) {
          const distSq = dx * dx + dy * dy;
          if (distSq <= 4) {
            const weight = Math.exp(-distSq / 1.8);
            const idx = ny * HOTSPOT_GRID_SIZE + nx;
            buf.hotspotDensityGrid[idx] += weight;
          }
        }
      }
    }

    if (buf.targetRegions && buf.targetRegions.length > 0) {
      for (const region of buf.targetRegions) {
        const dist = Math.hypot(x - region.x, y - region.y);
        const radius = region.radius ?? 0.05;
        if (dist <= radius) {
          buf.hotspotRegionHits[region.id] = (buf.hotspotRegionHits[region.id] ?? 0) + 1;
        }
      }
    }

    buf.hotspotRecentTaps.push({
      ...tap,
      x,
      y,
      timestamp: tap.timestamp ?? Date.now(),
    });
  }

  // ── Peer Review Swarm ────────────────────────────────────────────────────────
  addPeerReviewAnswer(
    slideId: string,
    card: { id: string; content: string; authorNickname?: string; authorParticipantId?: string },
  ): void {
    const buf = this.slideBuffers.get(slideId);
    if (!buf) return;
    if (!buf.peerReviewState.cards.has(card.id)) {
      buf.peerReviewState.cards.set(card.id, {
        answerId: card.id,
        content: card.content,
        authorNickname: card.authorNickname,
        authorParticipantId: card.authorParticipantId,
        reviewCount: 0,
        totalScoreSum: 0,
        criteriaSums: {},
        criteriaCounts: {},
        scoreDistribution: {},
        recentFeedback: [],
      });
    }
  }

  setPeerReviewPhase(slideId: string, phase: PeerReviewPhase): void {
    const buf = this.slideBuffers.get(slideId);
    if (buf) {
      buf.peerReviewState.activePhase = phase;
    }
  }

  setPeerReviewAssignments(slideId: string, assignments: Map<string, string[]>): void {
    const buf = this.slideBuffers.get(slideId);
    if (buf) {
      buf.peerReviewState.participantAssignments = new Map(assignments);
    }
  }

  getPeerReviewAssignments(slideId: string, participantId: string): string[] | undefined {
    return this.slideBuffers.get(slideId)?.peerReviewState.participantAssignments.get(participantId);
  }

  getAllPeerReviewAnswers(slideId: string): Array<{ id: string; content: string; authorParticipantId?: string }> {
    const buf = this.slideBuffers.get(slideId);
    if (!buf) return [];
    return Array.from(buf.peerReviewState.cards.values()).map((c) => ({
      id: c.answerId,
      content: c.content,
      authorParticipantId: c.authorParticipantId,
    }));
  }

  pushReviewGrade(slideId: string, grade: ReviewGradePayload): void {
    const buf = this.slideBuffers.get(slideId);
    if (!buf) return;

    let card = buf.peerReviewState.cards.get(grade.answerId);
    if (!card) {
      card = {
        answerId: grade.answerId,
        content: '',
        reviewCount: 0,
        totalScoreSum: 0,
        criteriaSums: {},
        criteriaCounts: {},
        scoreDistribution: {},
        recentFeedback: [],
      };
      buf.peerReviewState.cards.set(grade.answerId, card);
    }

    card.reviewCount++;
    buf.peerReviewState.totalReviewsSubmitted++;
    buf.peerReviewState.recentReviewsCount++;

    for (const [criterionId, score] of Object.entries(grade.scores)) {
      const clamped = Math.max(1, Math.min(5, Math.round(score)));
      card.criteriaSums[criterionId] = (card.criteriaSums[criterionId] ?? 0) + clamped;
      card.criteriaCounts[criterionId] = (card.criteriaCounts[criterionId] ?? 0) + 1;
      card.scoreDistribution[String(clamped)] = (card.scoreDistribution[String(clamped)] ?? 0) + 1;
      card.totalScoreSum += clamped;
    }

    if (grade.feedback?.trim()) {
      card.recentFeedback.unshift(grade.feedback.trim());
      if (card.recentFeedback.length > 5) {
        card.recentFeedback.pop();
      }
    }

    buf.reviewGrades.push(grade);
  }

  // ── Other Slide Handlers ─────────────────────────────────────────────────────
  pushMatchEvent(slideId: string, event: MatchConnectPayload): void {
    this.slideBuffers.get(slideId)?.matchEvents.push(event);
  }

  pushSortSubmission(slideId: string, submission: SortSubmitPayload): void {
    this.slideBuffers.get(slideId)?.sortSubmissions.push(submission);
  }

  pushQuestion(slideId: string, question: QuestionItem): void {
    this.slideBuffers.get(slideId)?.questions.push(question);
  }

  setQnaLocked(slideId: string, locked: boolean): void {
    const buf = this.slideBuffers.get(slideId);
    if (buf) buf.qnaLocked = locked;
  }

  /**
   * Drain and return all buffered events for a slide.
   * Resets ephemeral delta counters without clearing bounded cumulative state.
   */
  drainSlide(slideId: string): SlideBuffer | undefined {
    const buf = this.slideBuffers.get(slideId);
    if (!buf) return undefined;

    const clonedCards = new Map<string, PeerReviewCardState>();
    for (const [id, card] of buf.peerReviewState.cards.entries()) {
      clonedCards.set(id, {
        ...card,
        criteriaSums: { ...card.criteriaSums },
        criteriaCounts: { ...card.criteriaCounts },
        scoreDistribution: { ...card.scoreDistribution },
        recentFeedback: [...card.recentFeedback],
      });
    }

    const peerReviewSnapshot: PeerReviewBufferState = {
      cards: clonedCards,
      totalReviewsSubmitted: buf.peerReviewState.totalReviewsSubmitted,
      recentReviewsCount: buf.peerReviewState.recentReviewsCount,
      activePhase: buf.peerReviewState.activePhase,
      participantAssignments: new Map(buf.peerReviewState.participantAssignments),
    };

    const snapshot: SlideBuffer = {
      ...buf,
      hotspotDensityGrid: [...buf.hotspotDensityGrid],
      hotspotRecentTaps: [...buf.hotspotRecentTaps],
      hotspotRegionHits: { ...buf.hotspotRegionHits },
      peerReviewState: peerReviewSnapshot,
      matchEvents: [...buf.matchEvents],
      sortSubmissions: [...buf.sortSubmissions],
      reviewGrades: [...buf.reviewGrades],
      questions: [...buf.questions],
      multipleChoiceCounts: { ...buf.multipleChoiceCounts },
      multipleChoiceTotalVotes: buf.multipleChoiceTotalVotes,
      multipleChoiceRecentVotes: buf.multipleChoiceRecentVotes,
    };

    // Reset ephemeral arrays and deltas
    buf.hotspotRecentTaps = [];
    buf.peerReviewState.recentReviewsCount = 0;
    buf.matchEvents = [];
    buf.sortSubmissions = [];
    buf.reviewGrades = [];
    buf.multipleChoiceRecentVotes = 0;

    return snapshot;
  }

  getActiveSlideIds(): string[] {
    return [...this.slideBuffers.keys()];
  }

  getFinalSessionSummary(): Record<string, unknown> {
    const summary: Record<string, unknown> = {};
    for (const [slideId, buf] of this.slideBuffers.entries()) {
      summary[slideId] = {
        type: buf.type,
        conceptTags: buf.conceptTags,
        totalTaps: buf.hotspotTotalTaps,
        regionHits: buf.hotspotRegionHits,
        totalReviewsSubmitted: buf.peerReviewState.totalReviewsSubmitted,
        peerReviewCards: Array.from(buf.peerReviewState.cards.values()).map((c) => ({
          answerId: c.answerId,
          reviewCount: c.reviewCount,
          averageScore:
            c.reviewCount > 0
              ? Number((c.totalScoreSum / (c.reviewCount * Math.max(1, Object.keys(c.criteriaSums).length))).toFixed(2))
              : 0,
        })),
        totalMatches: buf.matchEvents.length,
        totalSorts: buf.sortSubmissions.length,
        questions: buf.questions,
      };
    }
    return summary;
  }

  clear(): void {
    this.slideBuffers.clear();
  }
}
