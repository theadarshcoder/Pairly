import React, { useState, useEffect } from 'react';
import { useSearchParams, useLocation, Link, useNavigate } from 'react-router-dom';
import { getStoredTheme, applyTheme } from '../../shared/lib/theme.js';

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const planParam = searchParams.get('plan');

  // Determine initial mode based on pathname or search param
  const isInitialLogin = location.pathname === '/login' || searchParams.get('mode') === 'login';
  const [isLogin, setIsLogin] = useState(isInitialLogin);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark' | 'system'>(() => {
    const stored = getStoredTheme();
    return stored || 'light';
  });

  // Prevent background scrolling while on AuthPage
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Sync state if pathname changes (/login vs /signup)
  useEffect(() => {
    if (location.pathname === '/login') {
      setIsLogin(true);
    } else if (location.pathname === '/signup' || location.pathname === '/get-started') {
      setIsLogin(false);
    }
  }, [location.pathname]);

  const switchMode = (loginMode: boolean) => {
    setIsLogin(loginMode);
    const targetPath = loginMode ? '/login' : '/signup';
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('mode');
    const queryString = newParams.toString() ? `?${newParams.toString()}` : '';
    navigate(`${targetPath}${queryString}`, { replace: true });
  };

  const toggleTheme = () => {
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setCurrentTheme(nextTheme);
    applyTheme(nextTheme);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMsg(
        isLogin
          ? 'Welcome back! Redirecting to your dashboard...'
          : 'Account created successfully! Preparing your workspace...'
      );
      setTimeout(() => {
        navigate('/dashboard');
      }, 1100);
    }, 700);
  };

  const planTitles: Record<string, string> = {
    free: 'Free Tier',
    plus: 'Plus Plan ($35/mo)',
    pro: 'Pro Plan ($79/mo)',
    enterprise: 'Enterprise Tier',
  };

  return (
    <div className="resend-auth-viewport">
      {/* Background Ambience: Paper Texture & Organic Silk Wave */}
      <div className="resend-bg-layer" aria-hidden="true">
        {/* Organic silk ribbon wave in the background */}
        <svg
          className="resend-silk-wave"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M-100,500 C300,750 600,200 1100,600 C1300,750 1500,400 1600,200 L1600,0 L-100,0 Z"
            fill="url(#silk-gradient-1)"
            opacity="0.35"
          />
          <path
            d="M-50,650 C400,900 800,450 1200,850 C1400,1050 1550,750 1650,550 L1650,-50 L-50,-50 Z"
            fill="url(#silk-gradient-2)"
            opacity="0.25"
          />
          <defs>
            <linearGradient id="silk-gradient-1" x1="0" y1="0" x2="1440" y2="900" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
              <stop offset="45%" stopColor="#E9E5DD" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#D8D2C5" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="silk-gradient-2" x1="1440" y1="0" x2="0" y2="900" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#F5F0E6" stopOpacity="0.6" />
              <stop offset="60%" stopColor="#DDD6C7" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#C9C2B0" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Tactile Authentic Paper Texture Overlay */}
        <div className="resend-paper-texture" />
      </div>

      {/* Floating Top Navigation: < Home & Theme Switcher */}
      <header className="resend-top-nav">
        <Link to="/" className="resend-home-link" title="Return to Pairly Home">
          <span className="resend-chevron">‹</span>
          <span>Home</span>
        </Link>

        <button
          type="button"
          className="resend-theme-toggle"
          onClick={toggleTheme}
          title={`Switch to ${currentTheme === 'dark' ? 'light' : 'dark'} mode`}
          aria-label="Toggle theme"
        >
          {currentTheme === 'dark' ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>
      </header>

      {/* Main Stage: Resend Centered Floating Layout */}
      <main className="resend-auth-stage">
        <div className="resend-auth-container">
          {/* Logo Badge (Pairly P Lettermark in Rounded Squircle) */}
          <div className="resend-logo-wrapper">
            <div className="resend-logo-badge" title="Pairly">
              <span className="resend-logo-letter">P</span>
            </div>
          </div>

          {/* Plan Pill if user came with selected tier */}
          {planParam && planTitles[planParam] && (
            <div className="resend-plan-indicator">
              <span className="resend-plan-dot" />
              <span>Selected: <strong>{planTitles[planParam]}</strong></span>
            </div>
          )}

          {/* Title */}
          <h1 className="resend-auth-title">
            {isLogin ? 'Log in to Pairly' : 'Create a Pairly account'}
          </h1>

          {/* Subtitle with Inline Switcher Link */}
          <div className="resend-auth-subtitle">
            {isLogin ? (
              <span>
                Don’t have an account?{' '}
                <button
                  type="button"
                  className="resend-switch-btn"
                  onClick={() => switchMode(false)}
                >
                  Sign up.
                </button>
              </span>
            ) : (
              <span>
                Already have an account?{' '}
                <button
                  type="button"
                  className="resend-switch-btn"
                  onClick={() => switchMode(true)}
                >
                  Log in.
                </button>
              </span>
            )}
          </div>

          {/* Success State */}
          {successMsg ? (
            <div className="resend-success-card">
              <div className="resend-success-icon">✓</div>
              <p className="resend-success-text">{successMsg}</p>
            </div>
          ) : (
            <>
              {/* Social Login Grid (Google & GitHub side by side) */}
              <div className="resend-sso-grid">
                <button
                  type="button"
                  className="resend-sso-button"
                  onClick={() => {
                    setIsLoading(true);
                    setTimeout(() => navigate('/dashboard'), 850);
                  }}
                >
                  <svg className="resend-sso-icon" width="16" height="16" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Log in with Google</span>
                </button>

                <button
                  type="button"
                  className="resend-sso-button"
                  onClick={() => {
                    setIsLoading(true);
                    setTimeout(() => navigate('/dashboard'), 850);
                  }}
                >
                  <svg className="resend-sso-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    />
                  </svg>
                  <span>Log in with GitHub</span>
                </button>
              </div>

              {/* Divider: ──── or ──── */}
              <div className="resend-divider">
                <span className="resend-divider-line" />
                <span className="resend-divider-text">or</span>
                <span className="resend-divider-line" />
              </div>

              {/* Email & Password Form */}
              <form onSubmit={handleSubmit} className="resend-form">
                <div className="resend-field-group">
                  <label className="resend-field-label" htmlFor="auth-email">
                    Email
                  </label>
                  <input
                    id="auth-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alan.turing@example.com"
                    className="resend-input"
                    required
                    autoComplete="email"
                  />
                </div>

                <div className="resend-field-group">
                  <div className="resend-label-row">
                    <label className="resend-field-label" htmlFor="auth-password">
                      Password
                    </label>
                    {isLogin && (
                      <a
                        href="#forgot"
                        className="resend-forgot-link"
                        onClick={(e) => {
                          e.preventDefault();
                          alert('Password recovery link sent to your email.');
                        }}
                      >
                        Forgot?
                      </a>
                    )}
                  </div>

                  <div className="resend-password-wrap">
                    <input
                      id="auth-password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="resend-input resend-password-input"
                      required
                      minLength={8}
                      autoComplete={isLogin ? 'current-password' : 'new-password'}
                    />
                    <button
                      type="button"
                      className="resend-eye-btn"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? (
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                          <line x1="1" y1="1" x2="23" y2="23" />
                        </svg>
                      ) : (
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="resend-submit-btn"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="resend-btn-loading">
                      <span className="resend-spinner" />
                      Connecting...
                    </span>
                  ) : (
                    <span>{isLogin ? 'Log in' : 'Create account'}</span>
                  )}
                </button>
              </form>

              {/* Bottom Terms Disclaimer */}
              <div className="resend-legal-caption">
                {!isLogin ? (
                  <p>
                    By signing up, you agree to our{' '}
                    <Link to="/terms">Terms</Link>,{' '}
                    <Link to="/terms">Acceptable Use</Link>, and{' '}
                    <Link to="/privacy">Privacy Policy</Link>.
                  </p>
                ) : (
                  <p>
                    Protected by Pairly Enterprise Guard ·{' '}
                    <Link to="/privacy">Privacy Policy</Link>
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </main>

      {/* Modern Resend-Grade Styling with Pairly Texture and Typography */}
      <style>{`
        /* ── Fixed Viewport ── */
        .resend-auth-viewport {
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100vh;
          height: 100dvh;
          overflow-y: auto;
          overflow-x: hidden;
          background-color: var(--paper, #FAF8F5);
          font-family: var(--font-body, 'Inter', system-ui, sans-serif);
          color: var(--ink, #1B1712);
          z-index: 999;
          display: flex;
          flex-direction: column;
          scrollbar-width: none;
        }

        .resend-auth-viewport::-webkit-scrollbar {
          display: none;
        }

        /* ── Background Atmosphere: Silk Wave & Paper Texture ── */
        .resend-bg-layer {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }

        .resend-silk-wave {
          position: absolute;
          inset: -20px -20px -20px -20px;
          width: calc(100% + 40px);
          height: calc(100% + 40px);
          pointer-events: none;
        }

        .resend-paper-texture {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          background-image: url('/images/paper-texture.png');
          background-size: cover;
          background-position: center;
          mix-blend-mode: multiply;
          opacity: 0.16;
          pointer-events: none;
        }

        /* ── Floating Minimalist Top Navigation ── */
        .resend-top-nav {
          position: relative;
          z-index: 20;
          height: 64px;
          padding: 0 36px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-shrink: 0;
        }

        .resend-home-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: rgba(27, 23, 18, 0.7);
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.15s ease;
          padding: 6px 10px;
          border-radius: 8px;
        }

        .resend-chevron {
          font-size: 18px;
          line-height: 1;
          transform: translateY(-1px);
          transition: transform 0.15s ease;
        }

        .resend-home-link:hover {
          color: #111827;
          background: rgba(0, 0, 0, 0.04);
        }

        .resend-home-link:hover .resend-chevron {
          transform: translateX(-2px) translateY(-1px);
        }

        .resend-theme-toggle {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid rgba(0, 0, 0, 0.08);
          background: rgba(255, 255, 255, 0.7);
          color: #4B5563;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.15s ease;
          backdrop-filter: blur(8px);
        }

        .resend-theme-toggle:hover {
          background: #FFFFFF;
          color: #111827;
          border-color: rgba(0, 0, 0, 0.18);
          transform: scale(1.04);
        }

        /* ── Main Resend Stage ── */
        .resend-auth-stage {
          position: relative;
          z-index: 10;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px 24px 48px 24px;
        }

        .resend-auth-container {
          width: 100%;
          max-width: 410px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: stretch;
        }

        /* ── Logo Badge ── */
        .resend-logo-wrapper {
          display: flex;
          justify-content: center;
          margin-bottom: 24px;
        }

        .resend-logo-badge {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: #000000;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.08);
          transition: transform 0.2s ease;
        }

        .resend-logo-badge:hover {
          transform: scale(1.05);
        }

        .resend-logo-letter {
          font-family: var(--font-display, 'UntitledSerif', 'Instrument Serif', Georgia, serif);
          font-size: 26px;
          font-weight: 700;
          color: #FFFFFF;
          line-height: 1;
          transform: translateY(-1px);
        }

        /* Plan pill */
        .resend-plan-indicator {
          align-self: center;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(37, 99, 235, 0.08);
          border: 1px solid rgba(37, 99, 235, 0.2);
          color: #1D4ED8;
          font-size: 12px;
          padding: 3px 10px;
          border-radius: 9999px;
          margin-bottom: 16px;
        }

        .resend-plan-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #2563EB;
        }

        /* ── Title & Subtitle ── */
        .resend-auth-title {
          font-family: var(--font-display, 'UntitledSerif', 'Instrument Serif', Georgia, serif);
          font-size: 29px;
          font-weight: 600;
          letter-spacing: -0.025em;
          text-align: center;
          margin: 0 0 8px 0;
          color: var(--ink, #111827);
          line-height: 1.25;
        }

        .resend-auth-subtitle {
          font-size: 14px;
          color: #6B7280;
          text-align: center;
          margin-bottom: 26px;
          line-height: 1.4;
        }

        .resend-switch-btn {
          background: none;
          border: none;
          padding: 0;
          margin: 0;
          font-family: inherit;
          font-size: inherit;
          font-weight: 600;
          color: #111827;
          cursor: pointer;
          text-decoration: underline;
          text-underline-offset: 3px;
          transition: color 0.15s ease;
        }

        .resend-switch-btn:hover {
          color: #000000;
        }

        /* ── Social SSO Buttons ── */
        .resend-sso-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 22px;
        }

        .resend-sso-button {
          height: 44px;
          border-radius: 10px;
          border: 1px solid rgba(0, 0, 0, 0.12);
          background: #FFFFFF;
          color: #1F2937;
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 13.5px;
          font-weight: 500;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.15s ease;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
          padding: 0 10px;
        }

        .resend-sso-button:hover {
          background: #FAFAFA;
          border-color: rgba(0, 0, 0, 0.22);
          transform: translateY(-1px);
          box-shadow: 0 3px 8px rgba(0, 0, 0, 0.06);
        }

        .resend-sso-icon {
          flex-shrink: 0;
        }

        /* ── Divider ── */
        .resend-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 22px;
        }

        .resend-divider-line {
          flex: 1;
          height: 1px;
          background: rgba(0, 0, 0, 0.08);
        }

        .resend-divider-text {
          font-size: 12px;
          color: #9CA3AF;
          font-weight: 400;
          text-transform: lowercase;
        }

        /* ── Form Fields ── */
        .resend-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .resend-field-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .resend-field-label {
          font-size: 13px;
          font-weight: 500;
          color: #374151;
        }

        .resend-label-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .resend-forgot-link {
          font-size: 12.5px;
          color: #6B7280;
          text-decoration: none;
          transition: color 0.15s ease;
        }

        .resend-forgot-link:hover {
          color: #111827;
          text-decoration: underline;
        }

        .resend-input {
          height: 44px;
          width: 100%;
          border-radius: 10px;
          border: 1px solid rgba(0, 0, 0, 0.14);
          background: #FFFFFF;
          color: #111827;
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 14px;
          padding: 0 14px;
          transition: all 0.15s ease;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
          box-sizing: border-box;
        }

        .resend-input::placeholder {
          color: #9CA3AF;
          font-size: 14px;
        }

        .resend-input:focus {
          outline: none;
          border-color: #0F172A;
          box-shadow: 0 0 0 3px rgba(15, 23, 42, 0.09);
        }

        /* Password container with embedded eye */
        .resend-password-wrap {
          position: relative;
          width: 100%;
        }

        .resend-password-input {
          padding-right: 42px;
        }

        .resend-eye-btn {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          border: none;
          background: transparent;
          color: #9CA3AF;
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.15s ease;
        }

        .resend-eye-btn:hover {
          color: #111827;
        }

        /* ── Submit Action Button ── */
        .resend-submit-btn {
          margin-top: 6px;
          height: 44px;
          width: 100%;
          border-radius: 10px;
          background: #000000;
          color: #FFFFFF;
          border: none;
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.15s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }

        .resend-submit-btn:hover:not(:disabled) {
          background: #1F2937;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .resend-submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .resend-btn-loading {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .resend-spinner {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: #FFFFFF;
          border-radius: 50%;
          animation: resend-spin 0.6s linear infinite;
        }

        @keyframes resend-spin {
          to {
            transform: rotate(360deg);
          }
        }

        /* ── Bottom Legal Caption ── */
        .resend-legal-caption {
          margin-top: 24px;
          text-align: center;
        }

        .resend-legal-caption p {
          margin: 0;
          font-size: 12px;
          line-height: 1.5;
          color: #6B7280;
        }

        .resend-legal-caption a {
          color: #4B5563;
          text-decoration: underline;
          text-underline-offset: 2px;
          transition: color 0.15s ease;
        }

        .resend-legal-caption a:hover {
          color: #111827;
        }

        /* ── Success Alert ── */
        .resend-success-card {
          background: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 12px;
          padding: 24px;
          text-align: center;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
        }

        .resend-success-icon {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #10B981;
          color: #FFFFFF;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          margin-bottom: 10px;
        }

        .resend-success-text {
          margin: 0;
          font-size: 14px;
          color: #065F46;
          font-weight: 500;
        }

        /* ── Dark Mode (Matching Resend Dark Theme) ── */
        [data-theme="dark"] .resend-auth-viewport {
          background-color: #0A0A0C;
          color: #FFFFFF;
        }

        [data-theme="dark"] .resend-paper-texture {
          mix-blend-mode: overlay;
          opacity: 0.1;
        }

        [data-theme="dark"] .resend-silk-wave stop[offset="0%"] {
          stop-color: #1C1F28;
        }

        [data-theme="dark"] .resend-silk-wave stop[offset="45%"] {
          stop-color: #12141A;
        }

        [data-theme="dark"] .resend-silk-wave stop[offset="100%"] {
          stop-color: #0A0A0C;
        }

        [data-theme="dark"] .resend-home-link {
          color: rgba(255, 255, 255, 0.7);
        }

        [data-theme="dark"] .resend-home-link:hover {
          color: #FFFFFF;
          background: rgba(255, 255, 255, 0.08);
        }

        [data-theme="dark"] .resend-theme-toggle {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.12);
          color: #CBD5E1;
        }

        [data-theme="dark"] .resend-theme-toggle:hover {
          background: rgba(255, 255, 255, 0.16);
          color: #FFFFFF;
          border-color: rgba(255, 255, 255, 0.25);
        }

        [data-theme="dark"] .resend-logo-badge {
          background: #FFFFFF;
          box-shadow: 0 4px 20px rgba(255, 255, 255, 0.12);
        }

        [data-theme="dark"] .resend-logo-letter {
          color: #0A0A0C;
        }

        [data-theme="dark"] .resend-auth-title {
          color: #FFFFFF;
        }

        [data-theme="dark"] .resend-auth-subtitle {
          color: #9CA3AF;
        }

        [data-theme="dark"] .resend-switch-btn {
          color: #FFFFFF;
        }

        [data-theme="dark"] .resend-sso-button {
          background: #14161C;
          border-color: rgba(255, 255, 255, 0.12);
          color: #F3F4F6;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
        }

        [data-theme="dark"] .resend-sso-button:hover {
          background: #1C1F28;
          border-color: rgba(255, 255, 255, 0.22);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
        }

        [data-theme="dark"] .resend-divider-line {
          background: rgba(255, 255, 255, 0.1);
        }

        [data-theme="dark"] .resend-divider-text {
          color: #6B7280;
        }

        [data-theme="dark"] .resend-field-label {
          color: #E5E7EB;
        }

        [data-theme="dark"] .resend-forgot-link {
          color: #9CA3AF;
        }

        [data-theme="dark"] .resend-forgot-link:hover {
          color: #FFFFFF;
        }

        [data-theme="dark"] .resend-input {
          background: #14161C;
          border-color: rgba(255, 255, 255, 0.12);
          color: #FFFFFF;
        }

        [data-theme="dark"] .resend-input::placeholder {
          color: #4B5563;
        }

        [data-theme="dark"] .resend-input:focus {
          border-color: #FFFFFF;
          box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.15);
        }

        [data-theme="dark"] .resend-eye-btn {
          color: #6B7280;
        }

        [data-theme="dark"] .resend-eye-btn:hover {
          color: #FFFFFF;
        }

        [data-theme="dark"] .resend-submit-btn {
          background: #FFFFFF;
          color: #0A0A0C;
          box-shadow: 0 2px 12px rgba(255, 255, 255, 0.15);
        }

        [data-theme="dark"] .resend-submit-btn:hover:not(:disabled) {
          background: #F3F4F6;
          box-shadow: 0 4px 16px rgba(255, 255, 255, 0.25);
        }

        [data-theme="dark"] .resend-legal-caption p {
          color: #6B7280;
        }

        [data-theme="dark"] .resend-legal-caption a {
          color: #9CA3AF;
        }

        [data-theme="dark"] .resend-legal-caption a:hover {
          color: #FFFFFF;
        }

        /* ── Responsive adjustments ── */
        @media (max-width: 480px) {
          .resend-top-nav {
            padding: 0 20px;
          }

          .resend-auth-stage {
            padding: 12px 16px 36px 16px;
          }

          .resend-sso-grid {
            grid-template-columns: 1fr;
            gap: 10px;
          }

          .resend-auth-title {
            font-size: 26px;
          }
        }
      `}</style>
    </div>
  );
}
