/**
 * haptic.ts — Issue 16: Feature-detect haptics.
 *
 * Never call navigator.vibrate directly. Use this wrapper.
 * The visual feedback (tap-scale, border flash) is the PRIMARY
 * feedback on iOS where vibrate is unsupported.
 */

/**
 * Trigger haptic feedback if supported.
 * @param ms Duration in milliseconds (default: 10)
 */
export const haptic = (ms: number = 10): void => {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    try {
      navigator.vibrate(ms);
    } catch {
      // Silently fail — haptic is supplementary, never critical
    }
  }
};

/** Stronger haptic for confirmations (submit, grade) */
export const hapticConfirm = (): void => haptic(35);

/** Light tap haptic for keystrokes */
export const hapticTap = (): void => haptic(10);
