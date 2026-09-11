/**
 * animations.ts — Framer Motion variants and spring configs.
 *
 * Issue 9: The `rewardCheckmark` variant is defined HERE.
 * RewardCheck.tsx is the COMPONENT that uses it via `variants={rewardCheckmark}`.
 * Do NOT build duplicate stroke-dasharray logic in RewardCheck.tsx.
 * This file owns the animation definition; RewardCheck.tsx owns the SVG markup.
 */

// ── Spring configs ──────────────────────────────────────────────────────────

export const presenterSpring = { type: 'spring', stiffness: 260, damping: 26 } as const;
export const audienceTap = { whileTap: { scale: 0.96 }, transition: { duration: 0.12 } } as const;
export const revealSpring = { type: 'spring', stiffness: 200, damping: 24 } as const;

// ── Variants ────────────────────────────────────────────────────────────────

/** Fade in from below — general-purpose entrance */
export const fadeInUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: presenterSpring,
};

/** Slide transition for presenter stage content */
export const slideTransition = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0, transition: presenterSpring },
  exit: { opacity: 0, x: -40, transition: { duration: 0.15 } },
};

/**
 * Issue 9: Reward checkmark — SVG stroke-dasharray draw-in variant.
 * Borrowed from Craft.do's checkbox animation pattern.
 * Gives a "sense of accomplishment" when a student submits an answer.
 *
 * Usage in RewardCheck.tsx:
 *   <m.path variants={rewardCheckmark} initial="hidden" animate="visible" ... />
 *
 * The path must have: strokeDasharray="24", strokeDashoffset="24"
 */
export const rewardCheckmark = {
  hidden: {
    strokeDashoffset: 24,
    opacity: 0,
  },
  visible: {
    strokeDashoffset: 0,
    opacity: 1,
    transition: {
      strokeDashoffset: { duration: 0.4, ease: 'easeOut' },
      opacity: { duration: 0.15 },
    },
  },
};

/** Spring-based settle for presenter result reveals */
export const revealSettle = {
  initial: { opacity: 0, scale: 0.92, y: 12 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: presenterSpring,
  },
};

/** Digit roll animation for counters (Issue 21) */
export const digitRoll = {
  initial: { opacity: 0, y: -8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 8 },
  transition: { duration: 0.2 },
};

/**
 * Issue 26: Quiet top-3 stack for peer review reveal.
 * Three cards stack in with spring settle, ranked 1–3.
 * No gold/silver/bronze, no fanfare. Institutional-grade insight, not a game show.
 */
export const quietRevealStack = {
  initial: { opacity: 0, y: 24, scale: 0.96 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      ...presenterSpring,
      delay: i * 0.12,
    },
  }),
};
