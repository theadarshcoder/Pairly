import { describe, it, expect } from 'vitest';
import {
  UserRoleSchema,
  SlideSchema,
  NetworkMatchingSlideSchema,
  SpatialHotspotSlideSchema,
  SequentialSortingSlideSchema,
  PeerReviewSlideSchema,
  QnaDedupSlideSchema,
  HotspotTapPayloadSchema,
  HotspotBatchFlushPayloadSchema,
  MatchConnectPayloadSchema,
  SortSubmitPayloadSchema,
  ReviewGradePayloadSchema,
  QuestionAskPayloadSchema,
  RoomJoinPayloadSchema,
  SlideAdvancePayloadSchema,
  BufferFlushPayloadSchema,
  SyllabusOutputSchema,
  SessionSchema,
  Slide,
} from '../src/index.js';

describe('@pairly/schemas', () => {
  describe('User Roles', () => {
    it('should accept valid roles: host and participant', () => {
      expect(UserRoleSchema.parse('host')).toBe('host');
      expect(UserRoleSchema.parse('participant')).toBe('participant');
    });

    it('should reject unauthorized role values', () => {
      expect(() => UserRoleSchema.parse('admin')).toThrow();
      expect(() => UserRoleSchema.parse('moderator')).toThrow();
      expect(() => UserRoleSchema.parse('')).toThrow();
    });
  });

  describe('Slide Schemas & Discriminated Union', () => {
    it('should validate a Network Matching slide', () => {
      const slide = {
        id: 'slide-nm-1',
        title: 'Distributed Systems Matching',
        prompt: 'Connect each consensus algorithm to its primary author/system.',
        type: 'network-matching',
        conceptTags: ['distributed-systems', 'consensus'],
        leftItems: [
          { id: 'l1', label: 'Paxos' },
          { id: 'l2', label: 'Raft' },
        ],
        rightItems: [
          { id: 'r1', label: 'Leslie Lamport' },
          { id: 'r2', label: 'Ongaro & Ousterhout' },
        ],
        correctPairs: [
          { leftId: 'l1', rightId: 'r1' },
          { leftId: 'l2', rightId: 'r2' },
        ],
      };

      const parsed = SlideSchema.parse(slide);
      expect(parsed.type).toBe('network-matching');
      if (parsed.type === 'network-matching') {
        expect(parsed.correctPairs).toHaveLength(2);
      }
    });

    it('should validate a Spatial Hotspot slide', () => {
      const slide = {
        id: 'slide-sh-1',
        title: 'Anatomy Diagram Hotspot',
        prompt: 'Tap on the hippocampus in this brain scan.',
        type: 'spatial-hotspot',
        imageUrl: 'https://example.com/brain-scan.png',
        aspectRatio: 1.33,
        targetRegions: [
          {
            id: 'h1',
            label: 'Hippocampus',
            x: 0.45,
            y: 0.62,
            radius: 0.08,
            isCorrect: true,
          },
        ],
      };

      const parsed = SlideSchema.parse(slide);
      expect(parsed.type).toBe('spatial-hotspot');
      if (parsed.type === 'spatial-hotspot') {
        expect(parsed.targetRegions[0].x).toBe(0.45);
      }
    });

    it('should validate a Sequential Sorting slide', () => {
      const slide = {
        id: 'slide-ss-1',
        title: 'TCP Handshake Order',
        prompt: 'Sort the TCP 3-way handshake packets in temporal order.',
        type: 'sequential-sorting',
        items: [
          { id: 'p1', text: 'SYN', correctRank: 0 },
          { id: 'p2', text: 'SYN-ACK', correctRank: 1 },
          { id: 'p3', text: 'ACK', correctRank: 2 },
        ],
      };

      const parsed = SlideSchema.parse(slide);
      expect(parsed.type).toBe('sequential-sorting');
      if (parsed.type === 'sequential-sorting') {
        expect(parsed.items).toHaveLength(3);
      }
    });

    it('should validate a Peer Review Swarm slide', () => {
      const slide = {
        id: 'slide-pr-1',
        title: 'Architecture Review',
        prompt: 'Review the following student design for an in-memory buffer.',
        type: 'peer-review-swarm',
        rubric: [
          { id: 'r1', title: 'Correctness', minScore: 1, maxScore: 5 },
          { id: 'r2', title: 'Performance', minScore: 1, maxScore: 5 },
        ],
        answerCards: [
          { id: 'a1', content: 'Use an in-process Map flushed every 100ms with setInterval.' },
        ],
        currentPhase: 'grading',
      };

      const parsed = SlideSchema.parse(slide);
      expect(parsed.type).toBe('peer-review-swarm');
    });

    it('should validate a Q&A Dedup slide', () => {
      const slide = {
        id: 'slide-qna-1',
        title: 'Open Questions',
        prompt: 'Ask any questions regarding today lecture.',
        type: 'qna-dedup',
        topic: 'Distributed Systems',
        allowAnonymous: true,
        isLocked: false,
      };

      const parsed = SlideSchema.parse(slide);
      expect(parsed.type).toBe('qna-dedup');
    });

    it('should reject invalid slide types', () => {
      const invalidSlide = {
        id: 'bad-1',
        title: 'Bad Slide',
        prompt: 'Invalid',
        type: 'unknown-slide-type',
      };
      expect(() => SlideSchema.parse(invalidSlide)).toThrow();
    });
  });

  describe('Participant Action Socket Payloads', () => {
    it('should validate hotspot:tap with normalized coordinates [0, 1]', () => {
      const validTap = {
        slideId: 'slide-sh-1',
        x: 0.354,
        y: 0.812,
        timestamp: Date.now(),
      };
      expect(HotspotTapPayloadSchema.parse(validTap)).toMatchObject({
        x: 0.354,
        y: 0.812,
      });
    });

    it('should reject hotspot:tap with out-of-bounds coordinates', () => {
      expect(() =>
        HotspotTapPayloadSchema.parse({
          slideId: 'slide-1',
          x: 1.05, // > 1
          y: 0.5,
        })
      ).toThrow();

      expect(() =>
        HotspotTapPayloadSchema.parse({
          slideId: 'slide-1',
          x: 0.5,
          y: -0.01, // < 0
        })
      ).toThrow();
    });

    it('should validate match:connect payload', () => {
      const payload = {
        slideId: 'slide-nm-1',
        leftId: 'l1',
        rightId: 'r2',
        isConnecting: true,
      };
      expect(MatchConnectPayloadSchema.parse(payload)).toEqual(payload);
    });

    it('should validate sort:submit payload', () => {
      const payload = {
        slideId: 'slide-ss-1',
        orderedItemIds: ['p1', 'p2', 'p3'],
      };
      expect(SortSubmitPayloadSchema.parse(payload)).toEqual(payload);
    });

    it('should validate review:grade payload', () => {
      const payload = {
        slideId: 'slide-pr-1',
        answerId: 'a1',
        scores: { r1: 5, r2: 4 },
        feedback: 'Clean architecture design!',
      };
      expect(ReviewGradePayloadSchema.parse(payload)).toEqual(payload);
    });

    it('should validate question:ask payload', () => {
      const payload = {
        slideId: 'slide-qna-1',
        text: 'Why does Mentimeter flush votes at 10 FPS?',
        isAnonymous: true,
      };
      expect(QuestionAskPayloadSchema.parse(payload)).toMatchObject({
        text: 'Why does Mentimeter flush votes at 10 FPS?',
        isAnonymous: true,
      });
    });
  });

  describe('Host Controls & Room Payloads', () => {
    it('should validate room:join payload with uppercase room code', () => {
      const payload = {
        roomCode: 'PAIR-123',
        role: 'host',
        nickname: 'Professor Ada',
      };
      const parsed = RoomJoinPayloadSchema.parse(payload);
      expect(parsed.roomCode).toBe('PAIR-123');
      expect(parsed.role).toBe('host');
    });

    it('should validate slide:advance directions', () => {
      expect(
        SlideAdvancePayloadSchema.parse({
          roomCode: 'PAIR-123',
          direction: 'next',
        })
      ).toBeDefined();

      expect(
        SlideAdvancePayloadSchema.parse({
          roomCode: 'PAIR-123',
          direction: 'to',
          targetIndex: 3,
        })
      ).toBeDefined();
    });
  });

  describe('Aggregation Buffer 10 FPS Flush Payload', () => {
    it('should validate hotspot 10 FPS buffer flush batch', () => {
      const flushPayload = {
        slideId: 'slide-sh-1',
        slideType: 'spatial-hotspot',
        timestamp: 1690000000000,
        data: {
          type: 'spatial-hotspot',
          payload: {
            slideId: 'slide-sh-1',
            batch: [
              { x: 0.12, y: 0.34, timestamp: 1690000000010 },
              { x: 0.15, y: 0.38, timestamp: 1690000000050 },
            ],
            totalTaps: 42,
          },
        },
      };

      const parsed = BufferFlushPayloadSchema.parse(flushPayload);
      expect(parsed.slideType).toBe('spatial-hotspot');
      expect(parsed.data.type).toBe('spatial-hotspot');
      expect(parsed.data.payload.totalTaps).toBe(42);
    });
  });

  describe('AI Syllabus Output Contract', () => {
    it('should validate a full parsed syllabus response with slides', () => {
      const syllabusFixture = {
        courseTitle: 'CS 162: Operating Systems',
        lessonTitle: 'Concurrency & Deadlocks',
        summary: 'Comprehensive introduction to mutual exclusion, semaphores, and Coffman deadlock conditions.',
        learningObjectives: [
          'Understand deadlock conditions',
          'Evaluate mutual exclusion algorithms',
        ],
        conceptTags: ['concurrency', 'deadlock', 'semaphores', 'mutex'],
        slides: [
          {
            id: 'ai-slide-1',
            title: 'Deadlock Conditions Match',
            prompt: 'Match each Coffman condition to its formal definition.',
            type: 'network-matching',
            conceptTags: ['deadlock'],
            leftItems: [
              { id: 'c1', label: 'Mutual Exclusion' },
              { id: 'c2', label: 'Hold and Wait' },
            ],
            rightItems: [
              { id: 'd1', label: 'Resources cannot be shared' },
              { id: 'd2', label: 'Process holds resource while waiting' },
            ],
            correctPairs: [
              { leftId: 'c1', rightId: 'd1' },
              { leftId: 'c2', rightId: 'd2' },
            ],
          },
          {
            id: 'ai-slide-2',
            title: 'Lock Acquisition Sequence',
            prompt: 'Order the steps to safely acquire locks and prevent circular wait.',
            type: 'sequential-sorting',
            conceptTags: ['concurrency'],
            items: [
              { id: 's1', text: 'Identify lock ordering hierarchy', correctRank: 0 },
              { id: 's2', text: 'Acquire lock with lower ID first', correctRank: 1 },
              { id: 's3', text: 'Acquire lock with higher ID', correctRank: 2 },
            ],
          },
        ],
      };

      const parsed = SyllabusOutputSchema.parse(syllabusFixture);
      expect(parsed.courseTitle).toBe('CS 162: Operating Systems');
      expect(parsed.slides).toHaveLength(2);
      expect(parsed.slides[0].type).toBe('network-matching');
      expect(parsed.slides[1].type).toBe('sequential-sorting');
    });
  });

  describe('Session Model', () => {
    it('should validate a complete session object', () => {
      const session = {
        id: 'sess-123',
        roomCode: 'CS162-L1',
        title: 'Lecture 1: Intro to Operating Systems',
        hostId: 'prof-ada',
        status: 'active',
        currentSlideIndex: 0,
        slides: [],
        conceptTags: ['os', 'kernels'],
        participantCount: 150,
      };

      const parsed = SessionSchema.parse(session);
      expect(parsed.roomCode).toBe('CS162-L1');
      expect(parsed.status).toBe('active');
    });
  });
});
