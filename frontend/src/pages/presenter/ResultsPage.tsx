/**
 * ResultsPage — Issue 25: Post-session analytics route shell.
 * Route: /present/:pin/results/:sessionId
 */
import { useParams } from 'react-router-dom';

export default function ResultsPage() {
  const { pin, sessionId } = useParams<{ pin: string; sessionId: string }>();

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
        Session Results
      </h1>
      <p style={{ color: 'var(--fg-muted, #9A9AA4)', fontSize: '14px' }}>
        Room <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent, #7C5CFF)' }}>{pin}</code>
        {' · '}
        Session <code style={{ fontFamily: 'var(--font-mono)' }}>{sessionId}</code>
      </p>
    </div>
  );
}
