import type { HotspotTapPayload, HotspotBatchFlushPayload } from '@pairly/schemas';

/**
 * Pure aggregator function: bounded cumulative density grid + ephemeral 100ms delta taps
 * producing the strictly bounded HotspotBatchFlushPayload for the presenter.
 * Stateless, no side effects, trivially unit-testable.
 */
export function aggregateHotspot(
  slideId: string,
  densityGrid: number[],
  recentTaps: HotspotTapPayload[],
  totalTaps: number,
  regionHits: Record<string, number> = {},
): HotspotBatchFlushPayload {
  // Find maximum density to normalize the 50x50 grid to [0..1] range for D3 contour calculation
  let maxDensity = 0;
  for (let i = 0; i < densityGrid.length; i++) {
    const val = densityGrid[i];
    if (val !== undefined && val > maxDensity) {
      maxDensity = val;
    }
  }

  const normalizedGrid =
    maxDensity > 0
      ? densityGrid.map((v) => Number((v / maxDensity).toFixed(4)))
      : densityGrid;

  const points = recentTaps.map((tap) => ({
    x: Number(Math.max(0, Math.min(1, tap.x)).toFixed(4)),
    y: Number(Math.max(0, Math.min(1, tap.y)).toFixed(4)),
    timestamp: tap.timestamp ?? Date.now(),
  }));

  return {
    slideId,
    totalTaps,
    densityGrid: normalizedGrid,
    recentTaps: points,
    batch: points,
    regionHits,
  };
}
