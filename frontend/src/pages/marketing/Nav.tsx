import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Nav() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 64,
        background: scrolled ? 'rgba(251, 251, 250, 0.8)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--hairline-light)' : '1px solid transparent',
        transition: 'background 200ms ease, border-bottom-color 200ms ease, backdrop-filter 200ms ease',
        zIndex: 200,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          height: '100%',
          margin: '0 auto',
          padding: '0 32px',
          display: 'flex',
          alignItems: 'center',
          boxSizing: 'border-box',
        }}
      >
        {/* Left: Wordmark */}
        <span
          onClick={() => navigate('/')}
          style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: 22,
            fontWeight: 400,
            letterSpacing: '-0.01em',
            color: 'var(--fg-light)',
            cursor: 'pointer',
            userSelect: 'none',
          }}
        >
          Pairly
        </span>

        {/* Center-left (after 40px gap): Links */}
        <nav style={{ display: 'flex', gap: 28, marginLeft: 40 }}>
          {[
            { label: 'Features', href: '#features' },
            { label: 'How it works', href: '#how-it-works' },
            { label: 'Pricing', href: '#pricing' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
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
              {label}
            </a>
          ))}
        </nav>

        {/* Right: Actions */}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 20 }}>
          <button
            onClick={() => navigate('/join/DEMO')}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--fg-light)',
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              fontWeight: 400,
              cursor: 'pointer',
              padding: '6px 10px',
              transition: 'opacity 150ms ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            Log in
          </button>
          <button
            onClick={() => navigate('/join/DEMO')}
            style={{
              height: 36,
              padding: '0 18px',
              background: 'var(--fg-light)',
              color: 'var(--bg-light)',
              border: 'none',
              borderRadius: 9999,
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'opacity 150ms ease, transform 150ms ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.88')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            Get started
          </button>
        </div>
      </div>
    </header>
  );
}
