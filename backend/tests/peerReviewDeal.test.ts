import { describe, it, expect } from 'vitest';
import { dealPeerReviewCards } from '../src/sockets/buffer/dealers/peerReviewDeal.js';

describe('Peer Review Shuffle-and-Deal Engine', () => {
  it('should assign each participant exactly 3 cards, strictly excluding their own answer', () => {
    const participants = [
      { participantId: 'p1' },
      { participantId: 'p2' },
      { participantId: 'p3' },
      { participantId: 'p4' },
      { participantId: 'p5' },
      { participantId: 'p6' },
    ];

    const answers = [
      { id: 'a1', content: 'Answer 1 by p1', authorParticipantId: 'p1' },
      { id: 'a2', content: 'Answer 2 by p2', authorParticipantId: 'p2' },
      { id: 'a3', content: 'Answer 3 by p3', authorParticipantId: 'p3' },
      { id: 'a4', content: 'Answer 4 by p4', authorParticipantId: 'p4' },
      { id: 'a5', content: 'Answer 5 by p5', authorParticipantId: 'p5' },
      { id: 'a6', content: 'Answer 6 by p6', authorParticipantId: 'p6' },
    ];

    const result = dealPeerReviewCards(participants, answers, 3);

    // 1. Quota check: exactly 3 cards per participant
    for (const p of participants) {
      const assigned = result.assignments.get(p.participantId);
      expect(assigned).toBeDefined();
      expect(assigned!.length).toBe(3);

      // 2. Self-exclusion check: participant never has their own answer
      const hasOwnAnswer = assigned!.some((c) => c.id === `a${p.participantId.slice(1)}`);
      expect(hasOwnAnswer).toBe(false);

      // 3. No duplicates check
      const uniqueIds = new Set(assigned!.map((c) => c.id));
      expect(uniqueIds.size).toBe(3);

      // 4. Anonymity check: only id and content present
      for (const card of assigned!) {
        expect(card).toHaveProperty('id');
        expect(card).toHaveProperty('content');
        expect((card as any).authorParticipantId).toBeUndefined();
        expect((card as any).authorNickname).toBeUndefined();
      }
    }

    // 5. Balanced load check: total assignments = 6 * 3 = 18. Each of 6 answers should have exactly 3 assignments
    expect(result.maxLoad - result.minLoad).toBeLessThanOrEqual(1);
    for (const a of answers) {
      expect(result.cardLoads[a.id]).toBe(3);
    }
  });

  it('should maintain balanced load when N participants and M answers differ', () => {
    // 10 participants, 5 answers
    const participants = Array.from({ length: 10 }, (_, i) => ({ participantId: `user_${i}` }));
    const answers = Array.from({ length: 5 }, (_, i) => ({
      id: `ans_${i}`,
      content: `Answer content ${i}`,
      authorParticipantId: i < 5 ? `user_${i}` : undefined,
    }));

    const result = dealPeerReviewCards(participants, answers, 3);

    // Total assignments = 10 * 3 = 30 across 5 cards. Average = 6 per card.
    expect(result.maxLoad - result.minLoad).toBeLessThanOrEqual(1);

    for (const p of participants) {
      const assigned = result.assignments.get(p.participantId)!;
      expect(assigned.length).toBe(3);
      // Verify no self-assignment
      const selfCardId = `ans_${p.participantId.replace('user_', '')}`;
      expect(assigned.some((c) => c.id === selfCardId)).toBe(false);
    }
  });

  it('should adapt quota when candidate answers are fewer than 3', () => {
    // 3 participants, 3 answers. Max possible per person without self is 2.
    const participants = [{ participantId: 'u1' }, { participantId: 'u2' }, { participantId: 'u3' }];
    const answers = [
      { id: 'a1', content: 'A1', authorParticipantId: 'u1' },
      { id: 'a2', content: 'A2', authorParticipantId: 'u2' },
      { id: 'a3', content: 'A3', authorParticipantId: 'u3' },
    ];

    const result = dealPeerReviewCards(participants, answers, 3);

    for (const p of participants) {
      const assigned = result.assignments.get(p.participantId)!;
      // Adapted to 2 cards
      expect(assigned.length).toBe(2);
      expect(assigned.some((c) => c.id === `a${p.participantId.replace('u', '')}`)).toBe(false);
    }

    expect(result.maxLoad - result.minLoad).toBeLessThanOrEqual(1);
  });

  it('should handle pre-seeded instructor answers with no authorParticipantId', () => {
    const participants = [{ participantId: 's1' }, { participantId: 's2' }, { participantId: 's3' }, { participantId: 's4' }];
    const answers = [
      { id: 'seed-1', content: 'Instructor Sample 1' },
      { id: 'seed-2', content: 'Instructor Sample 2' },
      { id: 'seed-3', content: 'Instructor Sample 3' },
      { id: 'seed-4', content: 'Instructor Sample 4' },
    ];

    const result = dealPeerReviewCards(participants, answers, 3);

    for (const p of participants) {
      const assigned = result.assignments.get(p.participantId)!;
      expect(assigned.length).toBe(3);
    }

    // 4 * 3 = 12 assignments / 4 answers = exactly 3 each
    expect(result.maxLoad).toBe(3);
    expect(result.minLoad).toBe(3);
  });

  it('should handle empty inputs gracefully', () => {
    const result = dealPeerReviewCards([], []);
    expect(result.assignments.size).toBe(0);
    expect(result.minLoad).toBe(0);
    expect(result.maxLoad).toBe(0);
  });
});
