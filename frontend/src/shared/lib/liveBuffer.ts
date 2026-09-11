/**
 * liveBuffer.ts — Issue 3: Non-reactive module for high-frequency data.
 *
 * WHY: High-frequency data (10 Hz socket frames from 300 students) must NOT
 * touch React state or the tree re-renders 10× per second. This module is the
 * write target for all real-time frame data. Canvas/SVG paint loops read from
 * `live` directly via `requestAnimationFrame`, checking `live.rev` to know
 * when new data is available.
 *
 * The singleton `live` object holds the latest frame data. `bindLive(socket)`
 * listens for incoming frames, validates with the shared Zod schema, writes
 * to `live`, and increments `live.rev`.
 *
 * Zustand is for slow state only (session, slide, participants, connection).
 * Nothing that updates above 2 Hz goes into Zustand. See STATE_ARCHITECTURE.md.
 */

import type { Socket } from 'socket.io-client';
import { SlideFrameSchema } from '@pairly/schemas';

// ── Types ───────────────────────────────────────────────────────────────────

export interface MatchEdge {
  sourceId: string;
  targetId: string;
  weight: number;
  correct: boolean | null;
}

export interface LiveBuffer {
  /** Monotonically increasing revision counter. Compared by useLiveCanvas. */
  rev: number;

  /** Spatial Hotspot: flattened 50×50 density grid (2500 cells) */
  hotspots: Float32Array;
  hotspotTotalTaps: number;

  /** Multiple choice votes: map of optionId -> count */
  multipleChoiceCounts: Record<string, number>;

  /** Network Matching: accumulated edges */
  edges: MatchEdge[];

  /** Sequential Sorting: distribution matrix [item][position] = count */
  sortDist: number[][];

  /** Peer Review: aggregated scores per answer card */
  reviewSummaries: Record<string, {
    reviewCount: number;
    avgScore: number;
    criteriaSums: Record<string, number>;
    criteriaCounts: Record<string, number>;
  }>;

  /** Q&A Dedup: clustered question threads */
  qnaClusters: Array<{
    clusterId: string;
    representative: string;
    weight: number;
    answered: boolean;
  }>;
}

// ── Singleton ───────────────────────────────────────────────────────────────

export const live: LiveBuffer = {
  rev: 0,
  hotspots: new Float32Array(0),
  hotspotTotalTaps: 0,
  multipleChoiceCounts: {},
  edges: [],
  sortDist: [],
  reviewSummaries: {},
  qnaClusters: [],
};

// ── Binding ─────────────────────────────────────────────────────────────────

/**
 * Binds a socket to write incoming frames into the live buffer.
 * Returns a cleanup function to unbind.
 *
 * In dev mode, the mocked socket writes directly into liveBuffer,
 * not Zustand. This is the canonical entry point.
 */
export function bindLive(socket: Socket): () => void {
  function onSlideFrame(raw: unknown) {
    const parsed = SlideFrameSchema.safeParse(raw);
    if (!parsed.success) {
      console.warn('[liveBuffer] dropped malformed frame', parsed.error);
      return;
    }
    const frame = parsed.data as any;
    if (frame.type === 'hotspot:batch' || frame.type === 'spatial-hotspot-frame') {
      if (frame.hotspotDensityGrid) {
        live.hotspots = new Float32Array(frame.hotspotDensityGrid);
      }
      if (typeof frame.hotspotTotalTaps === 'number') {
        live.hotspotTotalTaps = frame.hotspotTotalTaps;
      }
    } else if (frame.type === 'match:update') {
      live.edges = frame.edges;
    } else if (frame.type === 'sort:update') {
      live.sortDist = frame.distribution;
    } else if (frame.type === 'review:update') {
      live.reviewSummaries = frame.answerSummaries;
    } else if (frame.type === 'qna:update') {
      live.qnaClusters = frame.clusters;
    } else if (frame.type === 'multiple-choice-frame') {
      live.multipleChoiceCounts = frame.counts;
    }
    live.rev++;
  }

  function onHotspotBatch(payload: unknown) {
    const raw = (typeof payload === 'object' && payload !== null && !('type' in payload))
      ? { type: 'hotspot:batch', ...(payload as object) }
      : payload;

    const parsed = SlideFrameSchema.safeParse(raw);
    if (!parsed.success) {
      // Fallback if raw shape slightly diverges
      const data = payload as any;
      if (data?.hotspotDensityGrid) {
        live.hotspots = new Float32Array(data.hotspotDensityGrid);
      }
      if (typeof data?.hotspotTotalTaps === 'number') {
        live.hotspotTotalTaps = data.hotspotTotalTaps;
      }
      live.rev++;
      return;
    }
    const data = parsed.data as any;
    if (data.hotspotDensityGrid) {
      live.hotspots = new Float32Array(data.hotspotDensityGrid);
    }
    if (typeof data.hotspotTotalTaps === 'number') {
      live.hotspotTotalTaps = data.hotspotTotalTaps;
    }
    live.rev++;
  }

  function onMatchEdges(payload: unknown) {
    const raw = (typeof payload === 'object' && payload !== null && !('type' in payload))
      ? { type: 'match:update', ...(payload as object) }
      : payload;
    const parsed = SlideFrameSchema.safeParse(raw);
    if (parsed.success && parsed.data.type === 'match:update') {
      live.edges = parsed.data.edges;
    } else {
      const data = payload as any;
      if (Array.isArray(data?.edges)) {
        live.edges = data.edges;
      }
    }
    live.rev++;
  }

  function onSortDist(payload: unknown) {
    const raw = (typeof payload === 'object' && payload !== null && !('type' in payload))
      ? { type: 'sort:update', ...(payload as object) }
      : payload;
    const parsed = SlideFrameSchema.safeParse(raw);
    if (parsed.success && parsed.data.type === 'sort:update') {
      live.sortDist = parsed.data.distribution;
    } else {
      const data = payload as any;
      if (Array.isArray(data?.distribution)) {
        live.sortDist = data.distribution;
      }
    }
    live.rev++;
  }

  function onReviewUpdate(payload: unknown) {
    const raw = (typeof payload === 'object' && payload !== null && !('type' in payload))
      ? { type: 'review:update', ...(payload as object) }
      : payload;
    const parsed = SlideFrameSchema.safeParse(raw);
    if (parsed.success && parsed.data.type === 'review:update') {
      live.reviewSummaries = parsed.data.answerSummaries;
    } else {
      const data = payload as any;
      if (data?.answerSummaries) {
        live.reviewSummaries = data.answerSummaries;
      }
    }
    live.rev++;
  }

  function onQnaClusters(payload: unknown) {
    const raw = (typeof payload === 'object' && payload !== null && !('type' in payload))
      ? { type: 'qna:update', ...(payload as object) }
      : payload;
    const parsed = SlideFrameSchema.safeParse(raw);
    if (parsed.success && parsed.data.type === 'qna:update') {
      live.qnaClusters = parsed.data.clusters;
    } else {
      const data = payload as any;
      if (Array.isArray(data?.clusters)) {
        live.qnaClusters = data.clusters;
      }
    }
    live.rev++;
  }

  function onMultipleChoiceFrame(payload: unknown) {
    const raw = (typeof payload === 'object' && payload !== null && !('type' in payload))
      ? { type: 'multiple-choice-frame', ...(payload as object) }
      : payload;
    const parsed = SlideFrameSchema.safeParse(raw);
    if (parsed.success && parsed.data.type === 'multiple-choice-frame') {
      live.multipleChoiceCounts = parsed.data.counts;
    } else {
      const data = payload as any;
      if (data?.counts) {
        live.multipleChoiceCounts = data.counts;
      }
    }
    live.rev++;
  }

  socket.on('slide:frame', onSlideFrame);
  socket.on('hotspot:batch', onHotspotBatch);
  socket.on('match:update', onMatchEdges);
  socket.on('sort:update', onSortDist);
  socket.on('review:update', onReviewUpdate);
  socket.on('qna:update', onQnaClusters);
  socket.on('multiple-choice:frame', onMultipleChoiceFrame);
  socket.on('multiple-choice:update', onMultipleChoiceFrame);

  return () => {
    socket.off('slide:frame', onSlideFrame);
    socket.off('hotspot:batch', onHotspotBatch);
    socket.off('match:update', onMatchEdges);
    socket.off('sort:update', onSortDist);
    socket.off('review:update', onReviewUpdate);
    socket.off('qna:update', onQnaClusters);
    socket.off('multiple-choice:frame', onMultipleChoiceFrame);
    socket.off('multiple-choice:update', onMultipleChoiceFrame);
  };
}
