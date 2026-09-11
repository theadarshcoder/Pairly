import { describe, it, expect } from 'vitest';
import { aggregateHotspot } from '../src/sockets/buffer/aggregators/hotspot.agg.js';
import { AggregationBuffer, HOTSPOT_GRID_SIZE } from '../src/sockets/buffer/AggregationBuffer.js';

describe('Spatial Hotspot Aggregation Pipeline', () => {
  it('should initialize a bounded 50x50 density grid with 2500 zeros', () => {
    const buffer = new AggregationBuffer();
    buffer.initSlide('slide-1', 'spatial-hotspot');

    const drained = buffer.drainSlide('slide-1');
    expect(drained).toBeDefined();
    expect(drained!.hotspotDensityGrid.length).toBe(2500);
    expect(drained!.hotspotDensityGrid.every((v) => v === 0)).toBe(true);
    expect(drained!.hotspotTotalTaps).toBe(0);
  });

  it('should update density grid and cumulative counters on pushHotspotTap', () => {
    const buffer = new AggregationBuffer();
    buffer.initSlide('slide-1', 'spatial-hotspot', [], [
      { id: 'target-1', x: 0.5, y: 0.5, radius: 0.1, isCorrect: true },
    ]);

    // Push 3 taps
    buffer.pushHotspotTap('slide-1', { slideId: 'slide-1', x: 0.5, y: 0.5, timestamp: 1000 });
    buffer.pushHotspotTap('slide-1', { slideId: 'slide-1', x: 0.51, y: 0.49, timestamp: 1010 });
    buffer.pushHotspotTap('slide-1', { slideId: 'slide-1', x: 0.1, y: 0.1, timestamp: 1020 });

    const drained = buffer.drainSlide('slide-1');
    expect(drained!.hotspotTotalTaps).toBe(3);
    expect(drained!.hotspotRegionHits['target-1']).toBe(2);
    expect(drained!.hotspotRecentTaps.length).toBe(3);

    // Peak density should be around (gx=25, gy=25)
    const centerIdx = 25 * HOTSPOT_GRID_SIZE + 25;
    expect(drained!.hotspotDensityGrid[centerIdx]).toBeGreaterThan(0);

    // Ephemeral recent taps are reset on drain
    const secondDrain = buffer.drainSlide('slide-1');
    expect(secondDrain!.hotspotRecentTaps.length).toBe(0);
    // Cumulative state remains intact
    expect(secondDrain!.hotspotTotalTaps).toBe(3);
  });

  it('should aggregate into normalized HotspotBatchFlushPayload', () => {
    const grid = new Array(2500).fill(0);
    grid[1275] = 5.0; // center cell has density

    const payload = aggregateHotspot('slide-1', grid, [{ slideId: 'slide-1', x: 0.5, y: 0.5, timestamp: 1234 }], 10, { 'target-1': 8 });

    expect(payload.slideId).toBe('slide-1');
    expect(payload.totalTaps).toBe(10);
    expect(payload.densityGrid.length).toBe(2500);
    // Peak normalized density should be 1.0
    expect(payload.densityGrid[1275]).toBe(1.0);
    expect(payload.regionHits).toEqual({ 'target-1': 8 });
    expect(payload.recentTaps.length).toBe(1);
    expect(payload.batch.length).toBe(1);
  });
});
