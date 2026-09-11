/**
 * ease.ts — Issue 20: Manual canvas easing functions.
 *
 * For heatmap alpha and any canvas-only transition, use these easing
 * functions inside the rAF loop in useLiveCanvas. Apply a time-based
 * interpolation of values (e.g., alpha from 0 → 1 over ~400ms on the
 * first frame after a new slide).
 *
 * Do NOT wrap a canvas in motion.div and expect it to animate.
 * Framer animates React elements, not canvas pixels.
 */

/** Cubic ease-out: decelerating to zero velocity */
export function easeOutCubic(t: number): number {
  const t1 = 1 - t;
  return 1 - t1 * t1 * t1;
}

/** Cubic ease-in: accelerating from zero velocity */
export function easeInCubic(t: number): number {
  return t * t * t;
}

/** Cubic ease-in-out */
export function easeInOutCubic(t: number): number {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/** Clamp progress to [0, 1] and apply easing */
export function easedProgress(
  elapsed: number,
  duration: number,
  easingFn: (t: number) => number = easeOutCubic,
): number {
  const t = Math.min(1, Math.max(0, elapsed / duration));
  return easingFn(t);
}
