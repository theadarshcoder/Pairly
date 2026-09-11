import { create } from 'zustand';
import type { HotspotBatchFlushPayload, HotspotPoint } from '@pairly/schemas';

interface HotspotState {
  densityGridBySlide: Record<string, number[]>;
  totalTapsBySlide: Record<string, number>;
  regionHitsBySlide: Record<string, Record<string, number>>;
  recentTapsBySlide: Record<string, HotspotPoint[]>;
  lastBatchTimestamp: number;

  // Actions
  setBatch: (payload: HotspotBatchFlushPayload) => void;
  resetSlide: (slideId: string) => void;
  clear: () => void;
}

/**
 * useHotspotStore — stores bounded 50x50 density grids and counters per slide.
 * Never accumulates unbounded raw events client-side.
 */
export const useHotspotStore = create<HotspotState>((set) => ({
  densityGridBySlide: {},
  totalTapsBySlide: {},
  regionHitsBySlide: {},
  recentTapsBySlide: {},
  lastBatchTimestamp: 0,

  setBatch: (payload) =>
    set((state) => ({
      densityGridBySlide: {
        ...state.densityGridBySlide,
        [payload.slideId]: payload.densityGrid,
      },
      totalTapsBySlide: {
        ...state.totalTapsBySlide,
        [payload.slideId]: payload.totalTaps,
      },
      regionHitsBySlide: {
        ...state.regionHitsBySlide,
        [payload.slideId]: payload.regionHits ?? {},
      },
      recentTapsBySlide: {
        ...state.recentTapsBySlide,
        [payload.slideId]: payload.recentTaps?.length ? payload.recentTaps : payload.batch ?? [],
      },
      lastBatchTimestamp: Date.now(),
    })),

  resetSlide: (slideId) =>
    set((state) => {
      const { [slideId]: _, ...restGrids } = state.densityGridBySlide;
      const { [slideId]: __, ...restTaps } = state.totalTapsBySlide;
      const { [slideId]: ___, ...restHits } = state.regionHitsBySlide;
      const { [slideId]: ____, ...restRecent } = state.recentTapsBySlide;
      return {
        densityGridBySlide: restGrids,
        totalTapsBySlide: restTaps,
        regionHitsBySlide: restHits,
        recentTapsBySlide: restRecent,
      };
    }),

  clear: () =>
    set({
      densityGridBySlide: {},
      totalTapsBySlide: {},
      regionHitsBySlide: {},
      recentTapsBySlide: {},
      lastBatchTimestamp: 0,
    }),
}));
