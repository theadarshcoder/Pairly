import { useEffect, useRef, useState, type ReactNode } from 'react';

/** Hook: runs callback once when element enters viewport */
export function useRevealOnScroll(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

/** Wrapper component that reveals children on scroll */
export function RevealSection({
  children,
  style,
  className,
  threshold = 0.2,
  immediate,
}: {
  children: ReactNode;
  style?: React.CSSProperties;
  className?: string;
  threshold?: number;
  immediate?: boolean;
}) {
  const { ref, visible } = useRevealOnScroll(threshold);
  const show = immediate || visible;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 600ms cubic-bezier(0.16, 1, 0.3, 1), transform 600ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {children}
    </div>
  );
}

/** Eyebrow checkmark that draws itself on scroll entry (14x14, --accent-light, 1.5px width) */
export function EyebrowCheck({ visible }: { visible: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--accent-light)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ marginLeft: 8, verticalAlign: 'middle', flexShrink: 0 }}
    >
      <polyline
        points="4 12 10 18 20 6"
        strokeDasharray="24"
        strokeDashoffset={visible ? 0 : 24}
        style={{
          transition: 'stroke-dashoffset 450ms cubic-bezier(0.16, 1, 0.3, 1)',
          transitionDelay: '250ms',
        }}
      />
    </svg>
  );
}
