import type { Variants } from 'framer-motion';

/** Fade in from below — for card/modal entrances */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2, ease: 'easeIn' } },
};

/** Slide transition between slides */
export const slideTransition: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } },
  exit: { opacity: 0, x: -60, transition: { duration: 0.25, ease: 'easeIn' } },
};

/** Spring pop — for vote/tap confirmation animations */
export const springPop: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 400, damping: 22 },
  },
};

/** Stagger children container */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

/** Count up pulse (for participant counter updates) */
export const countPulse: Variants = {
  rest: { scale: 1 },
  pulse: {
    scale: [1, 1.15, 1],
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};
