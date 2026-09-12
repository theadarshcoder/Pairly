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
  const [name, setName] = useState('');
  const [institution, setInstitution] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark' | 'system'>(() => getStoredTheme());

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
      setSuccessMsg(isLogin ? 'Welcome back! Redirecting to your dashboard...' : 'Account created successfully! Preparing your workspace...');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1200);
    }, 750);
  };

  const planTitles: Record<string, string> = {
    free: 'Free Tier',
    plus: 'Plus Plan ($35/mo)',
    pro: 'Pro Plan ($79/mo)',
    enterprise: 'Enterprise Tier',
  };

  return (
    <div className="auth-fixed-viewport">
      {/* Background Ambience */}
      <div className="auth-bg-decor" aria-hidden="true">
        <div className="auth-bg-radial" />
        <img
          src="/images/paper-texture.png"
          alt=""
          className="auth-paper-texture"
        />
      </div>

      {/* Sleek Fixed Header Bar */}
      <header className="auth-topbar">
        <Link to="/" className="auth-brand-link" title="Return to Pairly Home">
          <span className="auth-logo-symbol">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </span>
          <span className="auth-brand-name">Pairly</span>
        </Link>

        <div className="auth-topbar-actions">
          <button
            type="button"
            className="auth-theme-btn"
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

          <Link to="/" className="auth-back-link">
            <span>←</span>
            <span>Back to site</span>
          </Link>
        </div>
      </header>

      {/* Main Centered Stage with Expanded Card */}
      <main className="auth-stage">
        <div className="auth-card-wrapper">
          <div className="auth-stationery-card">
            {/* Paper Texture Overlay */}
            <div className="auth-card-texture" aria-hidden="true" />

            {/* Plan Badge if coming from /pricing */}
            {planParam && planTitles[planParam] && (
              <div className="auth-plan-pill">
                <span className="plan-dot" />
                <span>Selected Plan: <strong>{planTitles[planParam]}</strong></span>
              </div>
            )}

            {/* Header & Mode Switcher */}
            <div className="auth-heading-area">
              <h1 className="auth-title">
                {isLogin ? 'Sign in to Pairly' : 'Create your account'}
              </h1>
              <p className="auth-tagline">
                {isLogin
                  ? 'Welcome back. Enter your credentials to continue.'
                  : 'Get started with your classroom in seconds.'}
              </p>

              {/* Segmented Mode Switcher */}
              <div className="auth-segmented-pill">
                <button
                  type="button"
                  className={`auth-segment ${!isLogin ? 'is-active' : ''}`}
                  onClick={() => switchMode(false)}
                >
                  Create Account
                </button>
                <button
                  type="button"
                  className={`auth-segment ${isLogin ? 'is-active' : ''}`}
                  onClick={() => switchMode(true)}
                >
                  Log In
                </button>
              </div>
            </div>

            {/* Success State */}
            {successMsg ? (
              <div className="auth-success-alert">
                <span className="auth-success-badge">✓</span>
                <p>{successMsg}</p>
              </div>
            ) : (
              <>
                {/* Single-Click Social SSO Grid */}
                <div className="auth-social-row">
                  <button
                    type="button"
                    className="auth-sso-btn"
                    onClick={() => {
                      setIsLoading(true);
                      setTimeout(() => navigate('/dashboard'), 900);
                    }}
                  >
                    <svg className="sso-icon" viewBox="0 0 24 24">
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
                    <span>Google</span>
                  </button>

                  <button
                    type="button"
                    className="auth-sso-btn"
                    onClick={() => {
                      setIsLoading(true);
                      setTimeout(() => navigate('/dashboard'), 900);
                    }}
                  >
                    <svg className="sso-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.99.6-2.63 1.35-.58.67-.99 1.74-.86 2.78.99.08 2.01-.53 2.57-1.28z" />
                    </svg>
                    <span>Apple</span>
                  </button>
                </div>

                {/* Divider */}
                <div className="auth-separator">
                  <span className="auth-sep-line" />
                  <span className="auth-sep-label">OR WITH EMAIL</span>
                  <span className="auth-sep-line" />
                </div>

                {/* Credentials Form */}
                <form onSubmit={handleSubmit} className="auth-input-form">
                  {!isLogin && (
                    <div className="auth-grid-split">
                      <div className="auth-field">
                        <label className="auth-label" htmlFor="user-name">Full Name</label>
                        <input
                          id="user-name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Dr. Eleanor Vance"
                          className="auth-textbox"
                          required
                        />
                      </div>
                      <div className="auth-field">
                        <label className="auth-label" htmlFor="user-institution">Institution</label>
                        <input
                          id="user-institution"
                          type="text"
                          value={institution}
                          onChange={(e) => setInstitution(e.target.value)}
                          placeholder="Stanford University"
                          className="auth-textbox"
                          required
                        />
                      </div>
                    </div>
                  )}

                  <div className="auth-field">
                    <label className="auth-label" htmlFor="user-email">Academic Email</label>
                    <input
                      id="user-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="vance@stanford.edu"
                      className="auth-textbox"
                      required
                    />
                  </div>

                  <div className="auth-field">
                    <div className="auth-label-row">
                      <label className="auth-label" htmlFor="user-password">Password</label>
                      {isLogin && (
                        <a
                          href="#forgot"
                          className="auth-forgot-link"
                          onClick={(e) => {
                            e.preventDefault();
                            alert('Password reset link sent to your academic email.');
                          }}
                        >
                          Forgot password?
                        </a>
                      )}
                    </div>
                    <input
                      id="user-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="auth-textbox"
                      required
                      minLength={8}
                    />
                  </div>

                  <button
                    type="submit"
                    className="auth-action-btn"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="btn-spinner">Connecting...</span>
                    ) : (
                      <span>{isLogin ? 'Sign in to Dashboard →' : 'Launch Free Workspace →'}</span>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </main>

      {/* Fixed Non-Scrollable Bottom Bar */}
      <footer className="auth-bottombar">
        <div className="auth-bottom-left">
          <span>© 2026 Pairly Inc. All rights reserved.</span>
        </div>

        <div className="auth-bottom-center">
          <Link to="/privacy">Privacy</Link>
          <span className="auth-dot-sep">·</span>
          <Link to="/terms">Terms</Link>
          <span className="auth-dot-sep">·</span>
          <Link to="/security">Security</Link>
          <span className="auth-dot-sep">·</span>
          <Link to="/community">Community</Link>
        </div>

        <div className="auth-bottom-right">
          <span className="auth-system-dot" />
          <span>All systems operational</span>
        </div>
      </footer>

      {/* Styling */}
      <style>{`
        /* ── Fixed Non-Scrollable Viewport Container ── */
        .auth-fixed-viewport {
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100vh;
          height: 100dvh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background-color: var(--paper, #FAF7F2);
          z-index: 999;
        }

        /* ── Background Ambience ── */
        .auth-bg-decor {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 1;
        }

        .auth-bg-radial {
          position: absolute;
          top: 18%;
          left: 50%;
          transform: translateX(-50%);
          width: 1000px;
          height: 600px;
          background: radial-gradient(50% 50% at 50% 50%, rgba(158, 212, 239, 0.25) 0%, rgba(250, 247, 242, 0) 100%);
        }

        .auth-paper-texture {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.14;
          mix-blend-mode: multiply;
        }

        /* ── Top Bar ── */
        .auth-topbar {
          position: relative;
          z-index: 10;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 36px;
          flex-shrink: 0;
          border-bottom: 1px solid rgba(0, 0, 0, 0.04);
        }

        .auth-brand-link {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: #0F172A;
        }

        .auth-logo-symbol {
          width: 32px;
          height: 32px;
          border-radius: 9px;
          background: #0F172A;
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 6px rgba(15, 23, 42, 0.15);
        }

        .auth-brand-name {
          font-family: var(--font-display, 'UntitledSerif', Georgia, serif);
          font-weight: 700;
          font-size: 21px;
          letter-spacing: -0.02em;
          color: #0F172A;
        }

        .auth-topbar-actions {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .auth-theme-btn {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 1px solid rgba(0, 0, 0, 0.08);
          background: rgba(255, 255, 255, 0.8);
          color: #475569;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .auth-theme-btn:hover {
          background: #FFFFFF;
          color: #0F172A;
          border-color: rgba(0, 0, 0, 0.15);
        }

        .auth-back-link {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 13px;
          font-weight: 500;
          color: #475569;
          text-decoration: none;
          padding: 6px 12px;
          border-radius: 8px;
          transition: all 0.15s ease;
        }

        .auth-back-link:hover {
          color: #0F172A;
          background: rgba(0, 0, 0, 0.04);
        }

        /* ── Centered Stage with Expanded Card ── */
        .auth-stage {
          position: relative;
          z-index: 5;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 0;
          padding: 16px 32px;
          overflow-y: auto;
          scrollbar-width: none;
        }

        .auth-stage::-webkit-scrollbar {
          display: none;
        }

        /* Expanded card wrapper — generous full-width presence */
        .auth-card-wrapper {
          width: 100%;
          max-width: 860px;
          margin: auto;
        }

        .auth-stationery-card {
          position: relative;
          background: #FFFFFF;
          border-radius: 24px;
          border: 1.5px solid rgba(0, 0, 0, 0.08);
          box-shadow: 0 20px 48px -12px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.02);
          padding: 36px 44px;
          overflow: hidden;
        }

        .auth-card-texture {
          position: absolute;
          inset: 0;
          background-image: url('/images/paper-texture.png');
          background-size: cover;
          opacity: 0.02;
          mix-blend-mode: overlay;
          pointer-events: none;
        }

        .auth-plan-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #EFF6FF;
          border: 1px solid #BFDBFE;
          color: #1D4ED8;
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 12px;
          padding: 4px 12px;
          border-radius: 9999px;
          margin-bottom: 14px;
        }

        .plan-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #2563EB;
        }

        /* ── Header Area ── */
        .auth-heading-area {
          text-align: center;
          margin-bottom: 22px;
        }

        .auth-title {
          font-family: 'UntitledSerif', Georgia, serif;
          font-style: italic;
          font-weight: 400;
          font-size: 32px;
          color: #0F172A;
          margin: 0 0 6px 0;
          line-height: 1.15;
          letter-spacing: -0.02em;
        }

        .auth-tagline {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 14px;
          color: #64748B;
          line-height: 1.45;
          margin: 0 0 18px 0;
        }

        .auth-segmented-pill {
          display: inline-flex;
          background: rgba(15, 23, 42, 0.05);
          padding: 4px;
          border-radius: 9999px;
          border: 1px solid rgba(15, 23, 42, 0.06);
          width: 100%;
        }

        .auth-segment {
          flex: 1;
          background: transparent;
          border: none;
          padding: 8px 16px;
          border-radius: 9999px;
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 13.5px;
          font-weight: 600;
          color: #64748B;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .auth-segment.is-active {
          background: #FFFFFF;
          color: #0F172A;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
        }

        /* ── Social SSO ── */
        .auth-social-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-bottom: 18px;
        }

        .auth-sso-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          height: 44px;
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 13.5px;
          font-weight: 500;
          color: #1E293B;
          cursor: pointer;
          transition: all 0.15s ease;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
        }

        .auth-sso-btn:hover {
          background: #F8FAFC;
          border-color: #CBD5E1;
        }

        .sso-icon {
          width: 18px;
          height: 18px;
        }

        /* ── Separator ── */
        .auth-separator {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 18px;
        }

        .auth-sep-line {
          flex: 1;
          height: 1px;
          background: #E2E8F0;
        }

        .auth-sep-label {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.1em;
          color: #94A3B8;
        }

        /* ── Form Inputs ── */
        .auth-input-form {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .auth-grid-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        .auth-field {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .auth-label-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .auth-label {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 13px;
          font-weight: 600;
          color: #334155;
        }

        .auth-forgot-link {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 12px;
          color: #2563EB;
          text-decoration: none;
        }

        .auth-forgot-link:hover {
          text-decoration: underline;
        }

        .auth-textbox {
          height: 42px;
          padding: 0 14px;
          border-radius: 10px;
          border: 1px solid #CBD5E1;
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 14px;
          color: #0F172A;
          background: #FFFFFF;
          outline: none;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }

        .auth-textbox:focus {
          border-color: #0F172A;
          box-shadow: 0 0 0 3px rgba(15, 23, 42, 0.08);
        }

        .auth-action-btn {
          margin-top: 6px;
          height: 46px;
          border-radius: 12px;
          background: #0F172A;
          border: none;
          color: #FFFFFF;
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 3px 10px rgba(15, 23, 42, 0.12);
        }

        .auth-action-btn:hover {
          background: #1E293B;
          transform: translateY(-1px);
        }

        .btn-spinner {
          opacity: 0.8;
        }

        .auth-success-alert {
          background: #F0FDF4;
          border: 1px solid #BBF7D0;
          padding: 24px;
          border-radius: 14px;
          text-align: center;
          color: #166534;
        }

        .auth-success-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #22C55E;
          color: #FFFFFF;
          font-size: 18px;
          margin-bottom: 8px;
        }

        /* ── Fixed Non-Scrollable Bottom Bar ── */
        .auth-bottombar {
          position: relative;
          z-index: 10;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 36px;
          flex-shrink: 0;
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 11.5px;
          color: #64748B;
          border-top: 1px solid rgba(0, 0, 0, 0.04);
        }

        .auth-bottom-center {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .auth-bottom-center a {
          color: #64748B;
          text-decoration: none;
          transition: color 0.15s ease;
        }

        .auth-bottom-center a:hover {
          color: #0F172A;
          text-decoration: underline;
        }

        .auth-dot-sep {
          color: #CBD5E1;
        }

        .auth-bottom-right {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .auth-system-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #22C55E;
          box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.2);
        }

        /* ── Dark Mode Overrides ── */
        [data-theme="dark"] .auth-fixed-viewport {
          background-color: #07080B;
        }

        [data-theme="dark"] .auth-topbar {
          border-bottom-color: rgba(255, 255, 255, 0.06);
        }

        [data-theme="dark"] .auth-brand-name {
          color: #FFFFFF;
        }

        [data-theme="dark"] .auth-theme-btn {
          border-color: rgba(255, 255, 255, 0.12);
          background: rgba(30, 41, 59, 0.6);
          color: #CBD5E1;
        }

        [data-theme="dark"] .auth-theme-btn:hover {
          background: #1E293B;
          color: #FFFFFF;
        }

        [data-theme="dark"] .auth-back-link {
          color: #94A3B8;
        }

        [data-theme="dark"] .auth-back-link:hover {
          color: #FFFFFF;
          background: rgba(255, 255, 255, 0.06);
        }

        [data-theme="dark"] .auth-stationery-card {
          background: #11141C;
          border-color: rgba(255, 255, 255, 0.1);
          box-shadow: 0 20px 48px -12px rgba(0, 0, 0, 0.7);
        }

        [data-theme="dark"] .auth-title {
          color: #FFFFFF;
        }

        [data-theme="dark"] .auth-tagline {
          color: #94A3B8;
        }

        [data-theme="dark"] .auth-segmented-pill {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.08);
        }

        [data-theme="dark"] .auth-segment.is-active {
          background: #1E293B;
          color: #FFFFFF;
        }

        [data-theme="dark"] .auth-sso-btn {
          background: #1E293B;
          border-color: rgba(255, 255, 255, 0.1);
          color: #F1F5F9;
        }

        [data-theme="dark"] .auth-sso-btn:hover {
          background: #283548;
        }

        [data-theme="dark"] .auth-sep-line {
          background: rgba(255, 255, 255, 0.1);
        }

        [data-theme="dark"] .auth-label {
          color: #E2E8F0;
        }

        [data-theme="dark"] .auth-textbox {
          background: #1E293B;
          border-color: rgba(255, 255, 255, 0.15);
          color: #FFFFFF;
        }

        [data-theme="dark"] .auth-textbox:focus {
          border-color: #60A5FA;
          box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.15);
        }

        [data-theme="dark"] .auth-action-btn {
          background: #FFFFFF;
          color: #090A0D;
        }

        [data-theme="dark"] .auth-action-btn:hover {
          background: #E2E8F0;
        }

        [data-theme="dark"] .auth-bottombar {
          border-top-color: rgba(255, 255, 255, 0.06);
          color: #64748B;
        }

        [data-theme="dark"] .auth-bottom-center a:hover {
          color: #E2E8F0;
        }

        @media (max-width: 900px) {
          .auth-stage {
            padding: 16px 20px;
          }

          .auth-stationery-card {
            padding: 28px 24px;
          }
        }

        @media (max-width: 640px) {
          .auth-topbar, .auth-bottombar {
            padding: 0 16px;
          }
          .auth-bottom-center {
            display: none;
          }
          .auth-grid-split {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
