import { RevealSection } from './useReveal.js';

export function Testimonials() {
  const testimonials = [
    {
      quote:
        '“I thought they got recursion. Two hundred faces said yes. Pairly showed me that three of them actually did.”',
      author: 'Dr. Priya Raman',
      role: 'Computer Science, IIT Madras',
    },
    {
      quote:
        '“I see the same wrong tap from fifteen students before I’ve left the podium. Saves me twenty minutes of lab time every session.”',
      author: 'Prof. Marcus Chen',
      role: 'Mechanical Engineering, NUS',
    },
  ];

  return (
    <section
      style={{
        padding: '200px 32px',
        display: 'flex',
        justifyContent: 'center',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          maxWidth: 720,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 120,
        }}
      >
        {testimonials.map((t, i) => (
          <RevealSection key={i}>
            {/* Quote: Instrument Serif, 28px, var(--fg-light), line-height 1.4, letter-spacing: -0.015em */}
            <blockquote
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: 28,
                fontWeight: 400,
                lineHeight: 1.4,
                letterSpacing: '-0.015em',
                color: 'var(--fg-light)',
                margin: 0,
                padding: 0,
                border: 'none',
              }}
            >
              {t.quote}
            </blockquote>

            {/* Attribution below, 32px margin */}
            <div style={{ marginTop: 32 }}>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  fontWeight: 500,
                  color: 'var(--fg-light)',
                }}
              >
                {t.author}
              </div>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 13,
                  color: 'var(--fg-light-muted)',
                  marginTop: 4,
                }}
              >
                {t.role}
              </div>
            </div>
          </RevealSection>
        ))}
      </div>
    </section>
  );
}
