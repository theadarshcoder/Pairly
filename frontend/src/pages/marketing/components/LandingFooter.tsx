import React from 'react';
import { Link } from 'react-router-dom';

export function LandingFooter() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--line)',
        backgroundColor: 'var(--paper)',
        padding: '36px 0 44px 0',
      }}
    >
      <div
        className="landing-container"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        {/* Left: Logo */}
        <Link
          to="/"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '1.25rem',
            color: 'var(--ink)',
            textDecoration: 'none',
            letterSpacing: '-0.02em',
          }}
        >
          pairly
        </Link>

        {/* Right: Copyright & Tagline */}
        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.9rem',
            color: 'var(--ink-soft)',
          }}
        >
          © 2026 Pairly. Built for rooms that talk back.
        </div>
      </div>
    </footer>
  );
}
