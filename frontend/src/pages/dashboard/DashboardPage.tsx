/**
 * DashboardPage — Issue 25: Professor home route shell.
 * Static mockup — deep links won't 404.
 */
export default function DashboardPage() {
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
        Dashboard
      </h1>
      <p style={{ color: 'var(--fg-muted, #9A9AA4)', fontSize: '14px' }}>
        Professor home — decks, syllabus, concept decay. Coming soon.
      </p>
      <nav style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
        <a href="/dashboard/syllabus" style={{ color: 'var(--accent, #7C5CFF)', fontSize: '14px' }}>
          Syllabus Upload
        </a>
        <a href="/dashboard/decay" style={{ color: 'var(--accent, #7C5CFF)', fontSize: '14px' }}>
          Concept Decay
        </a>
      </nav>
    </div>
  );
}
