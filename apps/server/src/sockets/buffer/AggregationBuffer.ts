import type { HotspotTapPayload, MatchConnectPayload, SortSubmitPayload, ReviewGradePayload, QuestionItem } from '@pairly/schemas';

type SlideType = 'spatial-hotspot' | 'network-matching' | 'sequential-sorting' | 'peer-review-swarm' | 'qna-dedup';

interface SlideBuffer {
  slideId: string;
  type: SlideType;
  conceptTags: string[];
  // Each buffer holds the raw event arrays for its slide type
  hotspotTaps: HotspotTapPayload[];
  matchEvents: MatchConnectPayload[];
  sortSubmissions: SortSubmitPayload[];
  reviewGrades: ReviewGradePayload[];
  questions: QuestionItem[];
  qnaLocked: boolean;
}

/**
 * Per-room, per-slide in-memory aggregation buffer.
 *
 * One AggregationBuffer instance exists per active room.
 * The FlushScheduler calls flush() on every instance at 10 FPS (every 100ms).
 *
 * Design constraints (from ARCHITECTURE.md §6b):
 * - No Redis: Map<roomCode, AggregationBuffer> is in-process only.
 * - Redis upgrade: Replace Map storage here when multi-instance is needed.
 */
export class AggregationBuffer {
  private readonly slideBuffers = new Map<string, SlideBuffer>();

  initSlide(slideId: string, type: SlideType, conceptTags: string[] = []): void {
    if (!this.slideBuffers.has(slideId)) {
      this.slideBuffers.set(slideId, {
        slideId,
        type,
        conceptTags,
        hotspotTaps: [],
        matchEvents: [],
        sortSubmissions: [],
        reviewGrades: [],
        questions: [],
        qnaLocked: false,
      });
    }
  }

  pushHotspotTap(slideId: string, tap: HotspotTapPayload): void {
    this.slideBuffers.get(slideId)?.hotspotTaps.push(tap);
  }

  pushMatchEvent(slideId: string, event: MatchConnectPayload): void {
    this.slideBuffers.get(slideId)?.matchEvents.push(event);
  }

  pushSortSubmission(slideId: string, submission: SortSubmitPayload): void {
    this.slideBuffers.get(slideId)?.sortSubmissions.push(submission);
  }

  pushReviewGrade(slideId: string, grade: ReviewGradePayload): void {
    this.slideBuffers.get(slideId)?.reviewGrades.push(grade);
  }

  pushQuestion(slideId: string, question: QuestionItem): void {
    this.slideBuffers.get(slideId)?.questions.push(question);
  }

  setQnaLocked(slideId: string, locked: boolean): void {
    const buf = this.slideBuffers.get(slideId);
    if (buf) buf.qnaLocked = locked;
  }

  /**
   * Drain and return all buffered events for a slide, resetting ephemeral arrays.
   * Questions and match state are NOT reset — they accumulate across flush cycles.
   */
  drainSlide(slideId: string): SlideBuffer | undefined {
    const buf = this.slideBuffers.get(slideId);
    if (!buf) return undefined;

    const snapshot: SlideBuffer = {
      ...buf,
      hotspotTaps: [...buf.hotspotTaps],
      matchEvents: [...buf.matchEvents],
      sortSubmissions: [...buf.sortSubmissions],
      reviewGrades: [...buf.reviewGrades],
      questions: [...buf.questions],
    };

    // Reset ephemeral arrays (taps, new events since last flush)
    buf.hotspotTaps = [];
    buf.matchEvents = [];
    buf.sortSubmissions = [];
    buf.reviewGrades = [];
    // Questions accumulate — not reset on flush (they're a live feed)

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
        totalTaps: buf.hotspotTaps.length,
        totalMatches: buf.matchEvents.length,
        totalSorts: buf.sortSubmissions.length,
        totalGrades: buf.reviewGrades.length,
        questions: buf.questions,
      };
    }
    return summary;
  }

  clear(): void {
    this.slideBuffers.clear();
  }
}
