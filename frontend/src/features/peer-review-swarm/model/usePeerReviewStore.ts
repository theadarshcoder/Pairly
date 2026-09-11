import { create } from 'zustand';
import type {
  PeerReviewAggregatePayload,
  AnswerGradeSummary,
  AssignedAnswerCard,
  PeerReviewPhase,
} from '@pairly/schemas';

interface PeerReviewState {
  /** Assigned anonymous cards dealt to current participant for grading */
  assignedCardsBySlide: Record<string, AssignedAnswerCard[]>;
  /** Index of current card participant is viewing / grading */
  currentCardIndexBySlide: Record<string, number>;
  /** Tracks which cards have been graded by participant */
  submittedCardIdsBySlide: Record<string, Record<string, boolean>>;
  /** Tracks whether participant submitted an answer in submission phase */
  answerSubmittedBySlide: Record<string, boolean>;

  // Presenter / swarm aggregation flush state
  summariesBySlide: Record<string, AnswerGradeSummary[]>;
  totalReviewsBySlide: Record<string, number>;
  activePhaseBySlide: Record<string, PeerReviewPhase>;
  recentReviewsCountBySlide: Record<string, number>;
  lastFlushTimestamp: number;

  // Actions
  setAssignedCards: (slideId: string, cards: AssignedAnswerCard[]) => void;
  setCurrentCardIndex: (slideId: string, index: number) => void;
  markCardGraded: (slideId: string, answerId: string) => void;
  setAnswerSubmitted: (slideId: string, submitted: boolean) => void;
  setPhase: (slideId: string, phase: PeerReviewPhase) => void;
  handleFlush: (payload: PeerReviewAggregatePayload) => void;
  resetSlide: (slideId: string) => void;
  clear: () => void;
}

export const usePeerReviewStore = create<PeerReviewState>((set) => ({
  assignedCardsBySlide: {},
  currentCardIndexBySlide: {},
  submittedCardIdsBySlide: {},
  answerSubmittedBySlide: {},
  summariesBySlide: {},
  totalReviewsBySlide: {},
  activePhaseBySlide: {},
  recentReviewsCountBySlide: {},
  lastFlushTimestamp: 0,

  setAssignedCards: (slideId, cards) =>
    set((state) => ({
      assignedCardsBySlide: {
        ...state.assignedCardsBySlide,
        [slideId]: cards,
      },
      currentCardIndexBySlide: {
        ...state.currentCardIndexBySlide,
        [slideId]: state.currentCardIndexBySlide[slideId] ?? 0,
      },
    })),

  setCurrentCardIndex: (slideId, index) =>
    set((state) => ({
      currentCardIndexBySlide: {
        ...state.currentCardIndexBySlide,
        [slideId]: index,
      },
    })),

  markCardGraded: (slideId, answerId) =>
    set((state) => {
      const slideSubmitted = state.submittedCardIdsBySlide[slideId] ?? {};
      const newSubmitted = { ...slideSubmitted, [answerId]: true };
      const currentCards = state.assignedCardsBySlide[slideId] ?? [];
      const currentIndex = state.currentCardIndexBySlide[slideId] ?? 0;
      const nextIndex = Math.min(currentIndex + 1, Math.max(0, currentCards.length - 1));

      return {
        submittedCardIdsBySlide: {
          ...state.submittedCardIdsBySlide,
          [slideId]: newSubmitted,
        },
        currentCardIndexBySlide: {
          ...state.currentCardIndexBySlide,
          [slideId]: nextIndex,
        },
      };
    }),

  setAnswerSubmitted: (slideId, submitted) =>
    set((state) => ({
      answerSubmittedBySlide: {
        ...state.answerSubmittedBySlide,
        [slideId]: submitted,
      },
    })),

  setPhase: (slideId, phase) =>
    set((state) => ({
      activePhaseBySlide: {
        ...state.activePhaseBySlide,
        [slideId]: phase,
      },
    })),

  handleFlush: (payload) =>
    set((state) => ({
      summariesBySlide: {
        ...state.summariesBySlide,
        [payload.slideId]: payload.summaries,
      },
      totalReviewsBySlide: {
        ...state.totalReviewsBySlide,
        [payload.slideId]: payload.totalReviewsSubmitted,
      },
      activePhaseBySlide: {
        ...state.activePhaseBySlide,
        [payload.slideId]: payload.activePhase,
      },
      recentReviewsCountBySlide: {
        ...state.recentReviewsCountBySlide,
        [payload.slideId]: payload.recentReviewsCount ?? 0,
      },
      lastFlushTimestamp: Date.now(),
    })),

  resetSlide: (slideId) =>
    set((state) => {
      const { [slideId]: _a, ...restAssigned } = state.assignedCardsBySlide;
      const { [slideId]: _i, ...restIdx } = state.currentCardIndexBySlide;
      const { [slideId]: _s, ...restSub } = state.submittedCardIdsBySlide;
      const { [slideId]: _ans, ...restAns } = state.answerSubmittedBySlide;
      const { [slideId]: _sum, ...restSum } = state.summariesBySlide;
      const { [slideId]: _t, ...restTot } = state.totalReviewsBySlide;
      const { [slideId]: _p, ...restPh } = state.activePhaseBySlide;
      const { [slideId]: _r, ...restRec } = state.recentReviewsCountBySlide;
      return {
        assignedCardsBySlide: restAssigned,
        currentCardIndexBySlide: restIdx,
        submittedCardIdsBySlide: restSub,
        answerSubmittedBySlide: restAns,
        summariesBySlide: restSum,
        totalReviewsBySlide: restTot,
        activePhaseBySlide: restPh,
        recentReviewsCountBySlide: restRec,
      };
    }),

  clear: () =>
    set({
      assignedCardsBySlide: {},
      currentCardIndexBySlide: {},
      submittedCardIdsBySlide: {},
      answerSubmittedBySlide: {},
      summariesBySlide: {},
      totalReviewsBySlide: {},
      activePhaseBySlide: {},
      recentReviewsCountBySlide: {},
      lastFlushTimestamp: 0,
    }),
}));
