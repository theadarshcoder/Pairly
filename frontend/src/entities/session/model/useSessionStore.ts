import { create } from 'zustand';
import type { SessionSnapshot, SessionStatus, Slide } from '@pairly/schemas';

interface SlideChangePayload {
  currentSlideIndex: number;
  slide: Slide;
  totalSlides: number;
}

interface SessionState {
  session: SessionSnapshot | null;
  participantCount: number;
  // Actions
  setSession: (session: SessionSnapshot) => void;
  setStatus: (status: SessionStatus) => void;
  setCurrentSlide: (payload: SlideChangePayload) => void;
  setParticipantCount: (count: number) => void;
  clearSession: () => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  session: null,
  participantCount: 0,

  setSession: (session) => set({ session }),

  setStatus: (status) =>
    set((state) => ({
      session: state.session ? { ...state.session, status } : null,
    })),

  setCurrentSlide: ({ currentSlideIndex, slide, totalSlides }) =>
    set((state) => ({
      session: state.session
        ? { ...state.session, currentSlideIndex, totalSlides, currentSlide: slide }
        : null,
    })),

  setParticipantCount: (count) => set({ participantCount: count }),

  clearSession: () => set({ session: null, participantCount: 0 }),
}));
