/**
 * SyllabusPage — Issue 25: AI Syllabus-to-Quiz pipeline route shell.
 * Static mockup for now.
 */
export default function SyllabusPage() {
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
        Syllabus Upload
      </h1>
      <p style={{ color: 'var(--fg-muted, #9A9AA4)', fontSize: '14px' }}>
        Drag-and-drop your syllabus module (PDF/DOCX/text) to generate a quiz deck.
      </p>
    </div>
  );
}
