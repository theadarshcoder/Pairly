import { useNavigate } from 'react-router-dom';
import { RevealSection } from './useReveal.js';

export function FinalCTA() {
  const navigate = useNavigate();

  return (
    <section
      style={{
        padding: '240px 32px 200px',
        textAlign: 'center',
        boxSizing: 'border-box',
      }}
    >
      <RevealSection
        style={{
          maxWidth: 720,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Headline: Instrument Serif, 56px, var(--fg-light), letter-spacing: -0.03em */}
        <h2
          style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: 'clamp(36px, 6vw, 56px)',
            fontWeight: 400,
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            color: 'var(--fg-light)',
            margin: 0,
          }}
        >
          Bring the room into view.
        </h2>

        {/* Subtext: Inter 16px var(--fg-light-muted), margin-top: 20px */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 16,
            color: 'var(--fg-light-muted)',
            lineHeight: 1.6,
            marginTop: 20,
            marginBottom: 0,
          }}
        >
          Free for individual educators. Institutional pricing for departments.
        </p>

        {/* Buttons: margin-top: 40px, 16px gap */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginTop: 40,
          }}
        >
          <button
            onClick={() => navigate('/join/DEMO')}
            style={{
              height: 48,
              padding: '0 28px',
              background: 'var(--fg-light)',
              color: 'var(--bg-light)',
              fontFamily: "'Inter', sans-serif",
              fontSize: 15,
              fontWeight: 500,
              borderRadius: 9999,
              border: 'none',
              cursor: 'pointer',
              boxShadow: 'none',
              transition: 'opacity 150ms ease, box-shadow 200ms ease, transform 150ms ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.9';
              e.currentTarget.style.boxShadow = 'var(--shadow-card)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Get started free
          </button>
          <button
            style={{
              height: 48,
              padding: '0 28px',
              background: 'transparent',
              color: 'var(--fg-light)',
              fontFamily: "'Inter', sans-serif",
              fontSize: 15,
              fontWeight: 500,
              borderRadius: 9999,
              border: '1px solid var(--hairline-light-strong)',
              cursor: 'pointer',
              transition: 'background 150ms ease, border-color 150ms ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--surface-light-2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            Talk to us
          </button>
        </div>
      </RevealSection>
    </section>
  );
}
