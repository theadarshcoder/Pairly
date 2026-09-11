import { m } from 'framer-motion';
import { rewardCheckmark } from '@shared/lib/animations.js';

/**
 * RewardCheck — Issue 9: SVG checkmark with stroke-dasharray draw-in.
 *
 * This is the COMPONENT — an SVG checkmark using m.path with
 * variants={rewardCheckmark} from animations.ts.
 *
 * animations.ts exports the variant definition (rewardCheckmark).
 * This file owns the SVG markup. Do NOT duplicate the animation
 * logic here — use the imported variant.
 *
 * Used as "submitted" confirmation across all audience interactions.
 */

interface RewardCheckProps {
  size?: number;
  color?: string;
  /** If true, plays the draw-in animation */
  animate?: boolean;
}

export function RewardCheck({
  size = 24,
  color = 'var(--ok, #2DD4A7)',
  animate = true,
}: RewardCheckProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-label="Submitted"
      role="img"
    >
      {/* Background circle */}
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        opacity={0.2}
      />

      {/* Animated checkmark path */}
      <m.path
        d="M7 12.5l3 3 7-7"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        strokeDasharray="24"
        strokeDashoffset="24"
        variants={rewardCheckmark}
        initial={animate ? 'hidden' : 'visible'}
        animate="visible"
      />
    </svg>
  );
}
