export function Footer() {
  const columns = [
    {
      title: 'Product',
      links: ['Spatial Hotspots', 'Network Matching', 'Peer Review', 'Concept Decay', 'Make a quiz'],
    },
    {
      title: 'For teachers',
      links: ['Large lectures', 'Lab sessions', 'Flipped classroom', 'Assessment'],
    },
    {
      title: 'Learn',
      links: ['Docs', 'Guides', 'How Pairly works', 'Status'],
    },
    {
      title: 'Company',
      links: ['About', 'Blog', 'Contact', 'Privacy'],
    },
  ];

  return (
    <footer
      style={{
        background: 'var(--bg-light)',
        borderTop: '1px solid var(--hairline-light)',
        padding: '80px 32px 48px',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
        }}
      >
        {/* Four columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 48,
          }}
        >
          {columns.map((col) => (
            <div key={col.title}>
              <h5
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 12,
                  fontWeight: 500,
                  color: 'var(--fg-light)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  margin: '0 0 20px 0',
                }}
              >
                {col.title}
              </h5>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                }}
              >
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 14,
                        color: 'var(--fg-light-muted)',
                        textDecoration: 'none',
                        transition: 'color 150ms ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--fg-light)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--fg-light-muted)')}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Full-width hairline with 64px gap */}
        <div
          style={{
            marginTop: 64,
            height: 1,
            background: 'var(--hairline-light)',
          }}
        />

        {/* Bottom row: Pairly wordmark left, © 2026 Pairly right */}
        <div
          style={{
            paddingTop: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontSize: 18,
              color: 'var(--fg-light)',
            }}
          >
            Pairly
          </span>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 12,
              fontVariantNumeric: 'tabular-nums',
              color: 'var(--fg-light-subtle)',
            }}
          >
            © 2026 Pairly
          </span>
        </div>
      </div>
    </footer>
  );
}
