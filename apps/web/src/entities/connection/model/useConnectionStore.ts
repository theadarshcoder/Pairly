import { create } from 'zustand';

type ConnectionStatus = 'idle' | 'connecting' | 'connected' | 'in-room' | 'disconnected' | 'error';

interface ConnectionState {
  status: ConnectionStatus;
  socketId: string | null;
  roomCode: string | null;
  latencyMs: number | null;
  lastError: { code: string; message: string } | null;
  // Actions
  setStatus: (status: ConnectionStatus) => void;
  setSocketId: (id: string | null) => void;
  setRoomCode: (code: string) => void;
  setLatency: (ms: number) => void;
  setLastError: (error: { code: string; message: string } | null) => void;
  reset: () => void;
}

export const useConnectionStore = create<ConnectionState>((set) => ({
  status: 'idle',
  socketId: null,
  roomCode: null,
  latencyMs: null,
  lastError: null,

  setStatus: (status) => set({ status }),
  setSocketId: (socketId) => set({ socketId }),
  setRoomCode: (roomCode) => set({ roomCode }),
  setLatency: (latencyMs) => set({ latencyMs }),
  setLastError: (lastError) => set({ lastError }),
  reset: () =>
    set({ status: 'idle', socketId: null, roomCode: null, latencyMs: null, lastError: null }),
}));
