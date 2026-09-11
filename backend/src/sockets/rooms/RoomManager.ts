import type { RoomState } from './RoomState.js';
import { RoomNotFoundError, RoomFullError } from '../../lib/errors.js';
import { MAX_ROOM_SIZE } from '../../config/constants.js';

/**
 * Singleton class managing all active rooms in-process.
 * Decorated onto the Fastify instance as fastify.roomManager.
 *
 * Design: This is the ONLY place in the server that owns the room Map.
 * Socket handlers access rooms through this manager — never via a shared global.
 *
 * Redis upgrade path: When horizontal scaling is needed, this class's
 * Map<string, RoomState> becomes calls to a Redis hash. Only this file changes.
 */
export class RoomManager {
  private readonly rooms = new Map<string, RoomState>();

  /** Register a new room after session creation. */
  createRoom(state: RoomState): void {
    this.rooms.set(state.roomCode, state);
  }

  /** Get a room or throw if it doesn't exist. */
  getRoom(roomCode: string): RoomState {
    const room = this.rooms.get(roomCode);
    if (!room) throw new RoomNotFoundError(roomCode);
    return room;
  }

  /** Safely get a room without throwing. */
  findRoom(roomCode: string): RoomState | undefined {
    return this.rooms.get(roomCode);
  }

  /** Check room exists. */
  hasRoom(roomCode: string): boolean {
    return this.rooms.has(roomCode);
  }

  /** Add a participant socket to a room. Enforces MAX_ROOM_SIZE. */
  addParticipant(roomCode: string, socketId: string): void {
    const room = this.getRoom(roomCode);
    if (room.participantSocketIds.size >= MAX_ROOM_SIZE) {
      throw new RoomFullError(roomCode);
    }
    room.participantSocketIds.add(socketId);
  }

  /** Remove a participant socket (on disconnect). */
  removeParticipant(roomCode: string, socketId: string): void {
    const room = this.findRoom(roomCode);
    room?.participantSocketIds.delete(socketId);
  }

  /** Update mutable room state properties. */
  updateRoom(roomCode: string, patch: Partial<Pick<RoomState, 'currentSlideIndex' | 'status' | 'startedAt'>>): void {
    const room = this.getRoom(roomCode);
    Object.assign(room, patch);
  }

  /** Get current participant count for a room. */
  getParticipantCount(roomCode: string): number {
    return this.findRoom(roomCode)?.participantSocketIds.size ?? 0;
  }

  /** Remove room from memory (after session ends and data is persisted). */
  deleteRoom(roomCode: string): void {
    this.rooms.delete(roomCode);
  }

  /** All active room codes — for monitoring/health checks. */
  getActiveRoomCodes(): string[] {
    return [...this.rooms.keys()];
  }
}
