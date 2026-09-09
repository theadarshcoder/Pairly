/** Typed import.meta.env constants. */
export const env = {
  SOCKET_URL: import.meta.env.VITE_SOCKET_URL as string ?? 'http://localhost:4000',
  API_URL: import.meta.env.VITE_API_URL as string ?? 'http://localhost:4000/api/v1',
  IS_DEV: import.meta.env.DEV,
} as const;
