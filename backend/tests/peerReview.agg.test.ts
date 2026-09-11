import { describe, it, expect } from 'vitest';
import { AggregationBuffer } from '../src/sockets/buffer/AggregationBuffer.js';
import { aggregatePeerReview } from '../src/sockets/buffer/aggregators/peerReview.agg.js';

describe('Peer Review Bounded Cumulative Aggregation Pipeline', () => {
  it('should initialize bounded cumulative answer card state', () => {
    const buffer = new AggregationBuffer();
    buffer.initSlide('slide-pr-1', 'peer-review-swarm', ['distributed-systems'], undefined, [
      { id: 'a1', content: 'Use Raft with 3 nodes' },
      { id: 'a2', content: 'Use Paxos with leader lease' },
    ]);

    const drained = buffer.drainSlide('slide-pr-1');
    expect(drained).toBeDefined();
    expect(drained!.peerReviewState.cards.size).toBe(2);
    expect(drained!.peerReviewState.totalReviewsSubmitted).toBe(0);
    expect(drained!.peerReviewState.recentReviewsCount).toBe(0);
    expect(drained!.peerReviewState.activePhase).toBe('grading');

    const card1 = drained!.peerReviewState.cards.get('a1')!;
    expect(card1.reviewCount).toBe(0);
    expect(card1.totalScoreSum).toBe(0);
    expect(card1.recentFeedback).toEqual([]);
  });

  it('should update cumulative counters in O(1) without raw array unbounded growth', () => {
    const buffer = new AggregationBuffer();
    buffer.initSlide('slide-pr-1', 'peer-review-swarm', [], undefined, [
      { id: 'a1', content: 'Answer A' },
      { id: 'a2', content: 'Answer B' },
    ]);

    // Push 3 reviews for card a1
    buffer.pushReviewGrade('slide-pr-1', {
      slideId: 'slide-pr-1',
      answerId: 'a1',
      scores: { correctness: 5, clarity: 4 },
      feedback: 'Great explanation!',
    });

    buffer.pushReviewGrade('slide-pr-1', {
      slideId: 'slide-pr-1',
      answerId: 'a1',
      scores: { correctness: 3, clarity: 4 },
      feedback: 'Good, but needs more detail.',
    });

    const firstDrain = buffer.drainSlide('slide-pr-1');
    expect(firstDrain!.peerReviewState.totalReviewsSubmitted).toBe(2);
    expect(firstDrain!.peerReviewState.recentReviewsCount).toBe(2);

    const card1 = firstDrain!.peerReviewState.cards.get('a1')!;
    expect(card1.reviewCount).toBe(2);
    // Correctness sum: 5 + 3 = 8
    expect(card1.criteriaSums['correctness']).toBe(8);
    expect(card1.criteriaCounts['correctness']).toBe(2);
    // Clarity sum: 4 + 4 = 8
    expect(card1.criteriaSums['clarity']).toBe(8);
    expect(card1.criteriaCounts['clarity']).toBe(2);
    expect(card1.scoreDistribution).toEqual({ '3': 1, '4': 2, '5': 1 });
    expect(card1.recentFeedback).toHaveLength(2);

    // Ephemeral delta is reset on drain, but cumulative state persists
    const secondDrain = buffer.drainSlide('slide-pr-1');
    expect(secondDrain!.peerReviewState.recentReviewsCount).toBe(0);
    expect(secondDrain!.peerReviewState.totalReviewsSubmitted).toBe(2);

    // Submit a 3rd review in a new 100ms interval
    buffer.pushReviewGrade('slide-pr-1', {
      slideId: 'slide-pr-1',
      answerId: 'a1',
      scores: { correctness: 4, clarity: 4 },
    });

    const thirdDrain = buffer.drainSlide('slide-pr-1');
    expect(thirdDrain!.peerReviewState.recentReviewsCount).toBe(1);
    // Cumulative total is 3, NOT just 1!
    expect(thirdDrain!.peerReviewState.totalReviewsSubmitted).toBe(3);
    const updatedCard1 = thirdDrain!.peerReviewState.cards.get('a1')!;
    expect(updatedCard1.reviewCount).toBe(3);
    // Correctness: 5 + 3 + 4 = 12 / 3 = 4.0 average
    expect(updatedCard1.criteriaSums['correctness']).toBe(12);
  });

  it('should bound feedback array to maximum 5 items (FIFO ring buffer)', () => {
    const buffer = new AggregationBuffer();
    buffer.initSlide('slide-pr-1', 'peer-review-swarm', [], undefined, [
      { id: 'a1', content: 'Card' },
    ]);

    for (let i = 1; i <= 10; i++) {
      buffer.pushReviewGrade('slide-pr-1', {
        slideId: 'slide-pr-1',
        answerId: 'a1',
        scores: { r1: 5 },
        feedback: `Feedback #${i}`,
      });
    }

    const drained = buffer.drainSlide('slide-pr-1');
    const card = drained!.peerReviewState.cards.get('a1')!;
    expect(card.reviewCount).toBe(10);
    // Bounded to 5 items max
    expect(card.recentFeedback.length).toBe(5);
    // Most recent items first
    expect(card.recentFeedback[0]).toBe('Feedback #10');
  });

  it('should aggregate cumulative card state into fixed-size PeerReviewAggregatePayload', () => {
    const cards = [
      {
        answerId: 'a1',
        reviewCount: 4,
        totalScoreSum: 36,
        criteriaSums: { accuracy: 18, style: 18 },
        criteriaCounts: { accuracy: 4, style: 4 },
        scoreDistribution: { '4': 4, '5': 4 },
        recentFeedback: ['Well done', 'Clear'],
      },
      {
        answerId: 'a2',
        reviewCount: 2,
        totalScoreSum: 14,
        criteriaSums: { accuracy: 8, style: 6 },
        criteriaCounts: { accuracy: 2, style: 2 },
        scoreDistribution: { '3': 2, '4': 2 },
        recentFeedback: ['Needs work'],
      },
    ];

    const payload = aggregatePeerReview('slide-pr-1', cards, 'grading', 6, 2);

    expect(payload.slideId).toBe('slide-pr-1');
    expect(payload.totalReviewsSubmitted).toBe(6);
    expect(payload.recentReviewsCount).toBe(2);
    expect(payload.summaries).toHaveLength(2);

    const s1 = payload.summaries[0]!;
    expect(s1.answerId).toBe('a1');
    expect(s1.reviewCount).toBe(4);
    expect(s1.criteriaAverages['accuracy']).toBe(4.5); // 18 / 4
    expect(s1.criteriaAverages['style']).toBe(4.5);
    expect(s1.averageScore).toBe(4.5);
    expect(s1.scoreDistribution).toEqual({ '4': 4, '5': 4 });

    const s2 = payload.summaries[1]!;
    expect(s2.answerId).toBe('a2');
    expect(s2.criteriaAverages['accuracy']).toBe(4.0);
    expect(s2.criteriaAverages['style']).toBe(3.0);
    expect(s2.averageScore).toBe(3.5);
  });
});
