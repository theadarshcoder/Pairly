/**
 * SlideTitle — Issue 7: Single owner of the question title.
 *
 * The question title is rendered ONLY by PresenterPage via this component.
 * SlideRenderer and all slide-level presenter components (PresenterHeatmap,
 * PresenterTopAnswers, etc.) must NOT re-render the question title.
 * They render only the interaction surface below it.
 *
 * Typography: Serif (Source Serif 4), clamp(2.5rem, 5.2vw, 6rem),
 * letter-spacing: -0.03em, weight 500.
 */

interface SlideTitleProps {
  title: string;
  subtitle?: string;
}

export function SlideTitle({ title, subtitle }: SlideTitleProps) {
  return (
    <div
      style={{
        textAlign: 'center',
        padding: 'var(--sp-6, 24px) var(--sp-8, 32px) var(--sp-4, 16px)',
      }}
    >
      <h1
        className="serif-title"
        style={{
          fontFamily: 'var(--font-serif, Georgia)',
          fontSize: 'clamp(2.5rem, 5.2vw, 6rem)',
          letterSpacing: '-0.03em',
          fontWeight: 500,
          color: 'var(--fg, #F2F2F4)',
          lineHeight: 1.1,
          margin: 0,
        }}
      >
        {title}
      </h1>
      {subtitle && (
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(1rem, 1.4vw, 1.5rem)',
            fontWeight: 500,
            letterSpacing: '0.02em',
            color: 'var(--fg-muted, #9A9AA4)',
            marginTop: 'var(--sp-3, 12px)',
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
