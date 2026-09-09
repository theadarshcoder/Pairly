export type AppErrorCode =
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'VALIDATION_ERROR'
  | 'CONFLICT'
  | 'ROOM_FULL'
  | 'ROOM_NOT_FOUND'
  | 'SESSION_NOT_ACTIVE'
  | 'RATE_LIMITED'
  | 'INTERNAL_ERROR';

export class AppError extends Error {
  public readonly code: AppErrorCode;
  public readonly statusCode: number;
  public readonly details?: unknown;

  constructor(code: AppErrorCode, message: string, statusCode = 500, details?: unknown) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
  }

  toJSON() {
    return {
      code: this.code,
      message: this.message,
      ...(this.details !== undefined && { details: this.details }),
    };
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super('UNAUTHORIZED', message, 401);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Forbidden') {
    super('FORBIDDEN', message, 403);
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super('NOT_FOUND', `${resource} not found`, 404);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: unknown) {
    super('VALIDATION_ERROR', message, 400, details);
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super('CONFLICT', message, 409);
  }
}

export class RoomFullError extends AppError {
  constructor(roomCode: string) {
    super('ROOM_FULL', `Room ${roomCode} has reached maximum capacity`, 409);
  }
}

export class RoomNotFoundError extends AppError {
  constructor(roomCode: string) {
    super('ROOM_NOT_FOUND', `Room ${roomCode} does not exist`, 404);
  }
}

export class SessionNotActiveError extends AppError {
  constructor() {
    super('SESSION_NOT_ACTIVE', 'Session is not currently active', 400);
  }
}

export class RateLimitedError extends AppError {
  constructor() {
    super('RATE_LIMITED', 'Too many events. Please slow down.', 429);
  }
}

export function isAppError(err: unknown): err is AppError {
  return err instanceof AppError;
}
