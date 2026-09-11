import { useRef, useEffect, useCallback } from 'react';
import { live } from './liveBuffer.js';

/**
 * useLiveCanvas — Issue 3: Hook for rAF-driven canvas painting.
 *
 * Runs a requestAnimationFrame loop. On each frame:
 *   1. Compares live.rev to a local `seen` ref.
 *   2. If unchanged, returns early (no work).
 *   3. If changed, calls the `paint(ctx, live)` callback.
 *   4. Cleans up the rAF on unmount.
 *
 * This ensures canvas rendering is decoupled from React's render cycle.
 * High-frequency data never touches React state.
 *
 * Issue 20: Canvas easing is manual, not Framer.
 * The paint callback can use `ease.ts` for time-based alpha interpolation.
 * Do NOT wrap a canvas in motion.div and expect it to animate.
 * Framer animates React elements, not canvas pixels.
 */

type PaintCallback = (
  ctx: CanvasRenderingContext2D,
  liveData: typeof live,
  /** Time in seconds since the first frame after a rev change */
  dt: number,
) => void;

interface UseLiveCanvasOptions {
  /** Canvas ref */
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  /** Paint function called when live.rev changes */
  paint: PaintCallback;
  /** If true, paints every frame regardless of rev (for animations) */
  continuous?: boolean;
}

export function useLiveCanvas({ canvasRef, paint, continuous = false }: UseLiveCanvasOptions) {
  const seenRevRef = useRef(-1);
  const animFrameRef = useRef(0);
  const transitionStartRef = useRef(0);

  const paintRef = useRef(paint);
  paintRef.current = paint;

  useEffect(() => {
    let running = true;

    function loop(timestamp: number) {
      if (!running) return;

      const canvas = canvasRef.current;
      if (!canvas) {
        animFrameRef.current = requestAnimationFrame(loop);
        return;
      }

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        animFrameRef.current = requestAnimationFrame(loop);
        return;
      }

      const currentRev = live.rev;
      const revChanged = currentRev !== seenRevRef.current;

      if (revChanged) {
        seenRevRef.current = currentRev;
        transitionStartRef.current = timestamp;
      }

      // Only paint if rev changed or continuous mode
      if (revChanged || continuous) {
        const dt = (timestamp - transitionStartRef.current) / 1000;
        paintRef.current(ctx, live, dt);
      }

      animFrameRef.current = requestAnimationFrame(loop);
    }

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      running = false;
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [canvasRef, continuous]);
}
