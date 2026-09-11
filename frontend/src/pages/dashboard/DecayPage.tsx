/**
 * DecayPage — Issue 25: Concept Decay Tracking route shell.
 * Static mockup for now.
 */
export default function DecayPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg, #0A0A0C)',
        color: 'var(--fg, #F2F2F4)',
        fontFamily: 'var(--font-sans)',
        gap: '16px',
      }}
    >
      <h1
        style={{
          fontFamily: 'var(--font-serif, Georgia)',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          letterSpacing: '-0.03em',
          fontWeight: 500,
        }}
      >
        Concept Decay
      </h1>
      <p style={{ color: 'var(--fg-muted, #9A9AA4)', fontSize: '14px' }}>
        15-week heat grid per tagged concept. Retention on the ok → warn → bad ramp.
      </p>
    </div>
  );
}
