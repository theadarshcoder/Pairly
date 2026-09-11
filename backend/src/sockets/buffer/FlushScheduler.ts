import type { Server } from 'socket.io';
import type { ClientToServerEvents, ServerToClientEvents, SocketData } from '@pairly/schemas';
import { AggregationBuffer } from './AggregationBuffer.js';
import { aggregateHotspot } from './aggregators/hotspot.agg.js';
import { aggregateMatching } from './aggregators/matching.agg.js';
import { aggregateSorting } from './aggregators/sorting.agg.js';
import { aggregatePeerReview } from './aggregators/peerReview.agg.js';
import { aggregateQna } from './aggregators/qna.agg.js';
import { FLUSH_INTERVAL_MS } from '../../config/constants.js';
import { logger } from '../../lib/logger.js';

type PairlyServer = Server<ClientToServerEvents, ServerToClientEvents, Record<string, never>, SocketData>;

/**
 * FlushScheduler manages per-room setInterval timers that drain
 * each room's AggregationBuffer and broadcast the result to the room.
 *
 * Lifecycle:
 * - start(roomCode, buffer, io): starts 10 FPS flush for a room
 * - stop(roomCode): clears the interval when session ends
 *
 * Design: One interval per room (not one global interval scanning all rooms).
 * This isolates cost — an inactive room's timer is stopped and won't waste CPU.
 */
export class FlushScheduler {
  private readonly timers = new Map<string, ReturnType<typeof setInterval>>();

  start(roomCode: string, buffer: AggregationBuffer, io: PairlyServer): void {
    if (this.timers.has(roomCode)) return; // already running

    const timer = setInterval(() => {
      for (const slideId of buffer.getActiveSlideIds()) {
        const snapshot = buffer.drainSlide(slideId);
        if (!snapshot) continue;

        const timestamp = Date.now();

        try {
          if (snapshot.type === 'spatial-hotspot' && snapshot.hotspotRecentTaps.length > 0) {
            const payload = aggregateHotspot(
              slideId,
              snapshot.hotspotDensityGrid,
              snapshot.hotspotRecentTaps,
              snapshot.hotspotTotalTaps,
              snapshot.hotspotRegionHits,
            );
            io.to(roomCode).emit('hotspot:batch', payload);
          }

          if (snapshot.type === 'network-matching') {
            const payload = aggregateMatching(slideId, snapshot.matchEvents);
            if (payload.connections.length > 0) {
              io.to(roomCode).emit('match:update', payload);
            }
          }

          if (snapshot.type === 'sequential-sorting' && snapshot.sortSubmissions.length > 0) {
            const payload = aggregateSorting(slideId, snapshot.sortSubmissions);
            io.to(roomCode).emit('sort:update', payload);
          }

          if (
            snapshot.type === 'peer-review-swarm' &&
            (snapshot.peerReviewState.recentReviewsCount > 0 || snapshot.reviewGrades.length > 0)
          ) {
            const cards = Array.from(snapshot.peerReviewState.cards.values());
            const payload = aggregatePeerReview(
              slideId,
              cards,
              snapshot.peerReviewState.activePhase,
              snapshot.peerReviewState.totalReviewsSubmitted,
              snapshot.peerReviewState.recentReviewsCount,
            );
            io.to(roomCode).emit('review:update', payload);
          }

          if (snapshot.type === 'qna-dedup') {
            const payload = aggregateQna(slideId, snapshot.questions, snapshot.qnaLocked);
            io.to(roomCode).emit('qna:feed', payload);
          }

          if (snapshot.type === 'multiple-choice' && snapshot.multipleChoiceRecentVotes > 0) {
            (io.to(roomCode) as any).emit('slide:frame', {
              type: 'multiple-choice-frame',
              counts: snapshot.multipleChoiceCounts,
              totalVotes: snapshot.multipleChoiceTotalVotes,
            });
            (io.to(roomCode) as any).emit('multiple-choice:frame', {
              type: 'multiple-choice-frame',
              counts: snapshot.multipleChoiceCounts,
              totalVotes: snapshot.multipleChoiceTotalVotes,
            });
          }
        } catch (err) {
          logger.error({ err, roomCode, slideId }, 'Error during buffer flush');
        }
      }
    }, FLUSH_INTERVAL_MS);

    this.timers.set(roomCode, timer);
    logger.debug({ roomCode }, `FlushScheduler started @ ${FLUSH_INTERVAL_MS}ms`);
  }

  stop(roomCode: string): void {
    const timer = this.timers.get(roomCode);
    if (timer) {
      clearInterval(timer);
      this.timers.delete(roomCode);
      logger.debug({ roomCode }, 'FlushScheduler stopped');
    }
  }

  stopAll(): void {
    for (const roomCode of this.timers.keys()) {
      this.stop(roomCode);
    }
  }
}

// Singleton — one scheduler shared across all rooms
export const flushScheduler = new FlushScheduler();
