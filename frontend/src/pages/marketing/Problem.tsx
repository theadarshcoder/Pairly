import { RevealSection } from './useReveal.js';

export function Problem() {
  return (
    <section
      style={{
        padding: '240px 32px',
        display: 'flex',
        justifyContent: 'center',
        boxSizing: 'border-box',
      }}
    >
      <RevealSection
        style={{
          maxWidth: 640,
          width: '100%',
          textAlign: 'center',
        }}
      >
        {/* Eyebrow: Instrument Serif italic, 16px, var(--fg-light-muted), lowercase */}
        <span
          style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontStyle: 'italic',
            fontSize: 16,
            color: 'var(--fg-light-muted)',
            display: 'block',
            marginBottom: 20,
          }}
        >
          The problem
        </span>

        {/* Headline: Instrument Serif, 44px, letter-spacing: -0.025em, line-height 1.2 */}
        <h2
          style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: 44,
            fontWeight: 400,
            letterSpacing: '-0.025em',
            lineHeight: 1.2,
            color: 'var(--fg-light)',
            margin: 0,
          }}
        >
          Multiple choice tells you if they got it. It doesn't tell you how they think.
        </h2>

        {/* Body: Inter, 17px, var(--fg-light-muted), line-height 1.75, max-width 560px, margin-top: 32px */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 17,
            color: 'var(--fg-light-muted)',
            lineHeight: 1.75,
            maxWidth: 560,
            margin: '32px auto 0',
          }}
        >
          A student who guesses right and a student who worked it out look identical on a bar chart.
          You find out who's who on the exam. That's too late.
        </p>
      </RevealSection>
    </section>
  );
}
