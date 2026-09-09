import type { HotspotTapPayload, HotspotBatchFlushPayload } from '@pairly/schemas';

/**
 * Pure aggregator function: raw hotspot tap events → 10 FPS flush payload.
 * Stateless, no side effects, trivially unit-testable.
 */
export function aggregateHotspot(
  slideId: string,
  taps: HotspotTapPayload[],
): HotspotBatchFlushPayload {
  return {
    slideId,
    batch: taps.map((tap) => ({
      x: tap.x,
      y: tap.y,
      timestamp: tap.timestamp ?? Date.now(),
    })),
    totalTaps: taps.length,
  };
}
