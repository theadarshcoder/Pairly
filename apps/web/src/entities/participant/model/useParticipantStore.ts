import { create } from 'zustand';
import type { UserRole } from '@pairly/schemas';

interface ParticipantState {
  participantId: string | null;
  role: UserRole | null;
  nickname: string | null;
  // Actions
  setParticipantId: (id: string) => void;
  setRole: (role: UserRole) => void;
  setNickname: (nickname: string) => void;
  setParticipant: (p: { participantId: string; role: UserRole; nickname: string }) => void;
  reset: () => void;
}

export const useParticipantStore = create<ParticipantState>((set) => ({
  participantId: null,
  role: null,
  nickname: null,

  setParticipantId: (participantId) => set({ participantId }),
  setRole: (role) => set({ role }),
  setNickname: (nickname) => set({ nickname }),
  setParticipant: ({ participantId, role, nickname }) => set({ participantId, role, nickname }),
  reset: () => set({ participantId: null, role: null, nickname: null }),
}));
