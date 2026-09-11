/** Buffer flush interval: 10 FPS */
export const FLUSH_INTERVAL_MS = 100 as const;

/** Maximum participants allowed per room */
export const MAX_ROOM_SIZE = 500 as const;

/** Maximum taps buffered per participant per flush cycle */
export const MAX_TAPS_PER_PARTICIPANT = 10 as const;

/** JWT header name expected on REST requests */
export const AUTH_HEADER = 'authorization' as const;

/** Socket.IO namespace for the main Pairly gateway */
export const SOCKET_NAMESPACE = '/' as const;

/** Role used for host (presenter) socket connections */
export const ROLE_HOST = 'host' as const;

/** Role used for participant (audience) socket connections */
export const ROLE_PARTICIPANT = 'participant' as const;

/** Events that only a host socket is permitted to emit */
export const HOST_ONLY_EVENTS: readonly string[] = [
  'session:control',
  'slide:advance',
  'slide:lock',
] as const;
