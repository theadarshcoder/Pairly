import { useRef, useCallback } from 'react';

/**
 * useThrottled — Issue 21: Throttles a value to update at most once per interval.
 *
 * The participant counter must be debounced to ~1 Hz. The count comes from
 * slow state (Zustand), not from the 10 Hz frame. The digit-roll animation
 * must restart only on the 1 Hz update, not on every socket frame — otherwise
 * the counter strobes.
 *
 * Usage:
 *   const throttledCount = useThrottled(participantCount, 1000);
 */
export function useThrottled<T>(value: T, intervalMs: number = 1000): T {
  const lastUpdateRef = useRef(Date.now());
  const lastValueRef = useRef(value);

  const now = Date.now();
  if (now - lastUpdateRef.current >= intervalMs) {
    lastUpdateRef.current = now;
    lastValueRef.current = value;
  }

  return lastValueRef.current;
}
