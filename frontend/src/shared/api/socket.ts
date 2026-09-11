import { io, type Socket } from 'socket.io-client';
import type { ClientToServerEvents, ServerToClientEvents, SocketData } from '@pairly/schemas';
import { env } from '../lib/env.js';

/**
 * Typed Socket.IO singleton.
 *
 * Rules:
 * - `autoConnect: false` — connection is initiated explicitly in socketBridge.ts
 *   after the user joins a room. Never on import.
 * - This is the ONLY place in the entire app where `io()` is called.
 * - Components must NEVER call socket.on() directly — use socketBridge or stores.
 */
export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(env.SOCKET_URL, {
  autoConnect: false,
  withCredentials: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 10_000,
  timeout: 15_000,
  transports: ['websocket', 'polling'], // websocket first, polling fallback
});

export type PairlySocket = typeof socket;
