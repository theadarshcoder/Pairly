import { RevealSection } from './useReveal.js';

export function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Upload your syllabus',
      body: 'Drop in your course material. Pairly builds a quiz, with wrong answers that are actually tempting, not obvious filler.',
    },
    {
      number: '02',
      title: 'Launch the session',
      body: 'Project the QR code. Students scan it, type a name, and they’re in. No app, no account.',
    },
    {
      number: '03',
      title: 'See the room think',
      body: 'Watch the room’s thinking fill the screen. Hold the results until everyone’s answered, then show them all at once.',
    },
  ];

  return (
    <section
      id="how-it-works"
      style={{
        padding: '200px 32px',
        boxSizing: 'border-box',
      }}
    >
      <RevealSection
        style={{
          maxWidth: 1100,
          margin: '0 auto',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 48,
            justifyContent: 'center',
          }}
        >
          {steps.map((s) => (
            <div
              key={s.number}
              style={{
                maxWidth: 320,
                margin: '0 auto',
                width: '100%',
              }}
            >
              {/* Number: Instrument Serif, 72px, var(--fg-light), weight 400, letter-spacing: -0.04em */}
              <div
                style={{
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontSize: 72,
                  fontWeight: 400,
                  letterSpacing: '-0.04em',
                  color: 'var(--fg-light)',
                  lineHeight: 1,
                  userSelect: 'none',
                }}
              >
                {s.number}
              </div>

              {/* Title: Instrument Serif, 26px, var(--fg-light), margin-top: 16px */}
              <h4
                style={{
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontSize: 26,
                  fontWeight: 400,
                  color: 'var(--fg-light)',
                  marginTop: 16,
                  marginBottom: 0,
                  lineHeight: 1.25,
                }}
              >
                {s.title}
              </h4>

              {/* Body: Inter, 15px, var(--fg-light-muted), line-height 1.7, margin-top: 16px */}
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 15,
                  color: 'var(--fg-light-muted)',
                  lineHeight: 1.7,
                  marginTop: 16,
                  marginBottom: 0,
                }}
              >
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </RevealSection>
    </section>
  );
}
