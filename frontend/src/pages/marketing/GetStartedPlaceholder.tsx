import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';

/**
 * TODO: Replace this placeholder once real authentication and onboarding pages exist.
 * Do NOT route anonymous visitors directly into /presenter or any live host session.
 */
export default function GetStartedPlaceholder() {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode');
  const isLogin = mode === 'login';

  return (
    <div
      className="pairly-marketing-theme"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        backgroundColor: 'var(--paper)',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '480px',
          backgroundColor: 'var(--paper-card)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--line)',
          boxShadow: 'var(--shadow-sm)',
          padding: '44px 36px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.6rem',
            fontWeight: 700,
            color: 'var(--ink)',
            marginBottom: '20px',
          }}
        >
          Pairly
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.85rem',
            fontWeight: 600,
            color: 'var(--ink)',
            lineHeight: 1.2,
            margin: '0 0 12px 0',
          }}
        >
          {isLogin ? 'Log in to Pairly' : 'Create your Pairly account'}
        </h1>

        <p
          style={{
            fontSize: '1.02rem',
            color: 'var(--ink-soft)',
            lineHeight: 1.5,
            margin: '0 0 32px 0',
          }}
        >
          {isLogin
            ? 'Account login is coming soon. Please check back shortly.'
            : 'Sign-up and educator onboarding are coming soon. Please check back shortly.'}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '12px 24px',
              borderRadius: 'var(--radius-pill)',
              backgroundColor: 'var(--ink)',
              color: 'var(--paper)',
              fontWeight: 600,
              fontSize: '0.95rem',
              textDecoration: 'none',
              transition: 'opacity 0.2s',
            }}
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
