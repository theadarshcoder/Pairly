import { useRef, useEffect, useState, type ReactNode } from 'react';

/**
 * StageScaler — the SINGLE source of truth for presenter stage scaling.
 *
 * Issue 1: All stage scaling logic lives here. PresenterLayout renders
 * <StageScaler> and nothing else. No other component computes scale.
 *
 * Issue 33: Thumbnails in the dock are fixed at 96×54px and do NOT
 * scale with the stage. The dock is viewport-fixed (Issue 2).
 *
 * How it works:
 * - A fixed 1920×1080 inner container holds the stage content.
 * - A ResizeObserver on the parent computes:
 *     scale = min(parentW / 1920, parentH / 1080)
 * - The scale is applied via `transform: scale(var(--stage-scale))`
 *   with `transform-origin: center`.
 * - `--stage-scale` is exposed as a CSS custom property on the wrapper
 *   so overlays inside the stage can read it.
 *
 * NOTE: `transform: scale(min(100vw/1920, 100vh/1080))` is INVALID CSS.
 * The scale MUST be JS-computed via ResizeObserver.
 */

const STAGE_W = 1920;
const STAGE_H = 1080;

interface StageScalerProps {
  children: ReactNode;
  /** CSS class for the outer wrapper */
  className?: string;
}

export function StageScaler({ children, className }: StageScalerProps) {
  const parentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = parentRef.current;
    if (!el) return;

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width === 0 || height === 0) continue;
        const s = Math.min(width / STAGE_W, height / STAGE_H);
        setScale(s);
      }
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={parentRef}
      className={className}
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
        // Issue 2: height budget = 100vh - dock height
        // The dock is viewport-fixed outside this container.
      }}
    >
      <div
        style={{
          width: `${STAGE_W}px`,
          height: `${STAGE_H}px`,
          transform: `scale(${scale})`,
          transformOrigin: 'center',
          // Expose --stage-scale so overlays inside can read it
          ['--stage-scale' as string]: scale,
          position: 'relative',
        }}
      >
        {children}
      </div>
    </div>
  );
}
