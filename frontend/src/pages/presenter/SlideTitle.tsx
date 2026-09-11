import type { ReactNode } from 'react';

export function SlideTitle({ children }: { children?: ReactNode }) {
  if (!children) return null;

  return (
    <h1
      className="slide-title"
      style={{
        fontFamily: 'var(--font-serif)',
        fontWeight: 500,
        fontSize: 'clamp(2.5rem, 5.2vw, 6rem)',
        letterSpacing: '-0.03em',
        lineHeight: 1.05,
        color: 'var(--fg)',
        textAlign: 'center',
        margin: '0 0 var(--sp-8, 32px) 0',
        maxWidth: 1400,
      }}
    >
      {children}
    </h1>
  );
}
