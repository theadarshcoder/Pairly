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

      {/* Main Expanded Studio Stage — Spanning Throughout the Page */}
      <main className="auth-expanded-stage">
        {/* Left Side: Editorial Brand & Interactive Live Preview Showcase */}
        <div className="auth-showcase-panel">
          <div className="showcase-content-box">
            <div className="showcase-badge">
              <span className="showcase-badge-dot" />
              <span>Active Classroom System</span>
            </div>

            <h1 className="showcase-headline">
              {isLogin ? (
                <>
                  Where active lectures<br />
                  <em>come to life.</em>
                </>
              ) : (
                <>
                  Every student responds.<br />
                  <em>Every concept measured.</em>
                </>
              )}
            </h1>

            <p className="showcase-subtext">
              Replace passive multiple-choice clickers with spatial heatmaps, peer-review swarms, and instant concept decay tracking.
            </p>

            {/* Simulated Live Active Classroom Card */}
            <div className="showcase-live-card">
              <div className="live-card-paper-overlay" aria-hidden="true" />
              
              <div className="live-card-header">
                <div className="live-card-status">
                  <span className="live-pulse-dot" />
                  <span className="live-room-label">LIVE SESSION · ROOM #4821</span>
                </div>
                <span className="live-count-pill">342 Students Active</span>
              </div>

              <div className="live-card-visual-area">
                <div className="visual-hotspot-diagram">
                  <div className="diagram-grid-lines" />
                  {/* Glowing Hotspot Heat Points */}
                  <div className="heat-spot spot-1" style={{ top: '35%', left: '42%' }}>
                    <span className="heat-ring ring-1" />
                    <span className="heat-core" />
                  </div>
                  <div className="heat-spot spot-2" style={{ top: '55%', left: '60%' }}>
                    <span className="heat-ring ring-2" />
                    <span className="heat-core" />
                  </div>
                  <div className="heat-spot spot-3" style={{ top: '48%', left: '28%' }}>
                    <span className="heat-ring ring-3" />
                    <span className="heat-core" />
                  </div>

                  <div className="diagram-caption">
                    <span>Target: Somatosensory Cortex Identification</span>
                  </div>
                </div>

                <div className="live-metrics-row">
                  <div className="live-metric-pill">
                    <span className="metric-val">94%</span>
                    <span className="metric-lbl">Comprehension</span>
                  </div>
                  <div className="live-metric-pill">
                    <span className="metric-val">0.4s</span>
                    <span className="metric-lbl">Avg Response</span>
                  </div>
                  <div className="live-metric-pill">
                    <span className="metric-val">100%</span>
                    <span className="metric-lbl">Zero-Install</span>
                  </div>
                </div>
              </div>

              {/* Educator Quote */}
              <div className="live-quote-footer">
                <p className="live-quote-text">
                  "Pairly eliminated the silence in my 300-person hall. Active participation jumped from 20% to 94%."
                </p>
                <div className="live-quote-author">
                  <strong>Dr. Marcus Vance</strong> · Professor of Cognitive Science, Stanford
                </div>
              </div>
            </div>

            {/* University Trust Badges */}
            <div className="showcase-trust-bar">
              <span className="trust-tag">PARTNERED WITH PROFESSORS AT</span>
              <div className="trust-names">
                <span>Stanford</span>
                <span className="trust-dot">·</span>
                <span>UC Berkeley</span>
                <span className="trust-dot">·</span>
                <span>MIT</span>
                <span className="trust-dot">·</span>
                <span>Johns Hopkins</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Expanded White Stationery Auth Surface */}
        <div className="auth-form-panel">
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
              <h2 className="auth-title">
                {isLogin ? 'Sign in to Pairly' : 'Create your account'}
              </h2>
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

                <div className="auth-legal-sub">
                  <span>By continuing, you agree to Pairly's <Link to="/terms">Terms</Link> and <Link to="/privacy">Privacy Policy</Link>.</span>
                </div>
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
          top: 15%;
          left: 30%;
          width: 900px;
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

        /* ── Main Expanded Studio Stage ── */
        .auth-expanded-stage {
          position: relative;
          z-index: 5;
          flex: 1;
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          min-height: 0;
          overflow: hidden;
        }

        /* ── Left Side: Brand Showcase & Live Visual ── */
        .auth-showcase-panel {
          padding: 24px 48px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-height: 0;
          overflow-y: auto;
          scrollbar-width: none;
        }

        .auth-showcase-panel::-webkit-scrollbar {
          display: none;
        }

        .showcase-content-box {
          max-width: 540px;
          width: 100%;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .showcase-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #0284C7;
          background: rgba(2, 132, 199, 0.08);
          border: 1px solid rgba(2, 132, 199, 0.18);
          padding: 4px 11px;
          border-radius: 9999px;
          align-self: flex-start;
        }

        .showcase-badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #0284C7;
        }

        .showcase-headline {
          font-family: var(--font-display, 'UntitledSerif', Georgia, serif);
          font-size: clamp(30px, 3.2vw, 42px);
          font-weight: 400;
          line-height: 1.12;
          color: #0F172A;
          margin: 0;
          letter-spacing: -0.025em;
        }

        .showcase-headline em {
          font-style: italic;
          color: #1E293B;
        }

        .showcase-subtext {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 14px;
          color: #475569;
          line-height: 1.5;
          margin: 0;
        }

        /* ── Live Classroom Card ── */
        .showcase-live-card {
          position: relative;
          background: #FFFFFF;
          border-radius: 18px;
          border: 1.5px solid rgba(0, 0, 0, 0.08);
          box-shadow: 0 16px 36px -8px rgba(0, 0, 0, 0.06), 0 2px 6px rgba(0, 0, 0, 0.02);
          padding: 18px 20px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .live-card-paper-overlay {
          position: absolute;
          inset: 0;
          background-image: url('/images/paper-texture.png');
          background-size: cover;
          opacity: 0.025;
          mix-blend-mode: overlay;
          pointer-events: none;
        }

        .live-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .live-card-status {
          display: flex;
          align-items: center;
          gap: 7px;
        }

        .live-pulse-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #22C55E;
          box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.25);
          animation: pulse 2s infinite ease-in-out;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.7; }
        }

        .live-room-label {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #0F172A;
        }

        .live-count-pill {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 11.5px;
          font-weight: 600;
          color: #15803D;
          background: #F0FDF4;
          border: 1px solid #BBF7D0;
          padding: 3px 9px;
          border-radius: 9999px;
        }

        /* Diagram Area */
        .live-card-visual-area {
          background: #F8FAFC;
          border-radius: 12px;
          border: 1px solid #E2E8F0;
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .visual-hotspot-diagram {
          position: relative;
          height: 110px;
          background: linear-gradient(135deg, rgba(224, 242, 254, 0.4) 0%, rgba(240, 253, 250, 0.4) 100%);
          border-radius: 10px;
          border: 1px dashed #CBD5E1;
          overflow: hidden;
          display: flex;
          align-items: flex-end;
          padding: 8px 10px;
        }

        .diagram-grid-lines {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(148, 163, 184, 0.25) 1px, transparent 1px);
          background-size: 14px 14px;
        }

        .heat-spot {
          position: absolute;
          transform: translate(-50%, -50%);
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .heat-core {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #2563EB;
          box-shadow: 0 0 8px #2563EB;
        }

        .heat-ring {
          position: absolute;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          border: 1.5px solid rgba(37, 99, 235, 0.45);
          animation: ringPulse 2.4s infinite ease-out;
        }

        .ring-2 {
          animation-delay: 0.8s;
          border-color: rgba(16, 185, 129, 0.5);
        }

        .ring-3 {
          animation-delay: 1.6s;
          border-color: rgba(245, 158, 11, 0.5);
        }

        @keyframes ringPulse {
          0% { transform: scale(0.6); opacity: 0.8; }
          100% { transform: scale(1.6); opacity: 0; }
        }

        .diagram-caption {
          position: relative;
          z-index: 2;
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 10px;
          font-weight: 600;
          color: #475569;
          background: rgba(255, 255, 255, 0.85);
          padding: 3px 7px;
          border-radius: 6px;
          border: 1px solid rgba(226, 232, 240, 0.8);
        }

        .live-metrics-row {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 8px;
        }

        .live-metric-pill {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 8px;
          padding: 6px 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .metric-val {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 14px;
          font-weight: 700;
          color: #0F172A;
        }

        .metric-lbl {
          font-size: 10px;
          color: #64748B;
          font-weight: 500;
        }

        .live-quote-footer {
          border-top: 1px solid #F1F5F9;
          padding-top: 10px;
        }

        .live-quote-text {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 12px;
          font-style: italic;
          color: #334155;
          line-height: 1.45;
          margin: 0 0 4px 0;
        }

        .live-quote-author {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 11px;
          color: #64748B;
        }

        .showcase-trust-bar {
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding-top: 6px;
        }

        .trust-tag {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: #64748B;
        }

        .trust-names {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 12.5px;
          font-weight: 600;
          color: #334155;
        }

        .trust-dot {
          color: #CBD5E1;
        }

        /* ── Right Side: Expanded White Stationery Auth Surface ── */
        .auth-form-panel {
          position: relative;
          background: #FFFFFF;
          border-left: 1.5px solid rgba(0, 0, 0, 0.08);
          box-shadow: -12px 0 36px -12px rgba(0, 0, 0, 0.04);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px 48px;
          min-height: 0;
          overflow-y: auto;
          scrollbar-width: none;
        }

        .auth-form-panel::-webkit-scrollbar {
          display: none;
        }

        .auth-stationery-card {
          position: relative;
          width: 100%;
          max-width: 440px;
          margin: auto;
          padding: 8px 0;
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
          font-size: 11.5px;
          padding: 3px 10px;
          border-radius: 9999px;
          margin-bottom: 12px;
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
          margin-bottom: 18px;
        }

        .auth-title {
          font-family: 'UntitledSerif', Georgia, serif;
          font-style: italic;
          font-weight: 400;
          font-size: 28px;
          color: #0F172A;
          margin: 0 0 4px 0;
          line-height: 1.15;
        }

        .auth-tagline {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 13px;
          color: #64748B;
          line-height: 1.4;
          margin: 0 0 16px 0;
        }

        .auth-segmented-pill {
          display: inline-flex;
          background: rgba(15, 23, 42, 0.05);
          padding: 3px;
          border-radius: 9999px;
          border: 1px solid rgba(15, 23, 42, 0.06);
          width: 100%;
        }

        .auth-segment {
          flex: 1;
          background: transparent;
          border: none;
          padding: 7px 12px;
          border-radius: 9999px;
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 13px;
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
          gap: 10px;
          margin-bottom: 16px;
        }

        .auth-sso-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          height: 40px;
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 10px;
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 13px;
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
          width: 16px;
          height: 16px;
        }

        /* ── Separator ── */
        .auth-separator {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
        }

        .auth-sep-line {
          flex: 1;
          height: 1px;
          background: #E2E8F0;
        }

        .auth-sep-label {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 9.5px;
          font-weight: 600;
          letter-spacing: 0.1em;
          color: #94A3B8;
        }

        /* ── Form Inputs ── */
        .auth-input-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .auth-grid-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .auth-field {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .auth-label-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .auth-label {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 12.5px;
          font-weight: 600;
          color: #334155;
        }

        .auth-forgot-link {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 11.5px;
          color: #2563EB;
          text-decoration: none;
        }

        .auth-forgot-link:hover {
          text-decoration: underline;
        }

        .auth-textbox {
          height: 40px;
          padding: 0 14px;
          border-radius: 10px;
          border: 1px solid #CBD5E1;
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 13.5px;
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
          margin-top: 4px;
          height: 42px;
          border-radius: 10px;
          background: #0F172A;
          border: none;
          color: #FFFFFF;
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 13.5px;
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

        .auth-legal-sub {
          margin-top: 14px;
          text-align: center;
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 11.5px;
          color: #64748B;
        }

        .auth-legal-sub a {
          color: #0F172A;
          text-decoration: underline;
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
          border-top: 1px solid rgba(0, 0, 0, 0.05);
          background: rgba(250, 247, 242, 0.6);
          backdrop-filter: blur(8px);
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

        [data-theme="dark"] .showcase-headline {
          color: #FFFFFF;
        }

        [data-theme="dark"] .showcase-headline em {
          color: #CBD5E1;
        }

        [data-theme="dark"] .showcase-subtext {
          color: #94A3B8;
        }

        [data-theme="dark"] .showcase-live-card {
          background: #11141C;
          border-color: rgba(255, 255, 255, 0.1);
          box-shadow: 0 16px 36px -8px rgba(0, 0, 0, 0.6);
        }

        [data-theme="dark"] .live-room-label {
          color: #FFFFFF;
        }

        [data-theme="dark"] .live-card-visual-area {
          background: #1A1F2C;
          border-color: rgba(255, 255, 255, 0.08);
        }

        [data-theme="dark"] .visual-hotspot-diagram {
          background: linear-gradient(135deg, rgba(30, 58, 138, 0.25) 0%, rgba(6, 78, 59, 0.25) 100%);
          border-color: rgba(255, 255, 255, 0.15);
        }

        [data-theme="dark"] .diagram-caption {
          background: rgba(17, 20, 28, 0.85);
          color: #CBD5E1;
          border-color: rgba(255, 255, 255, 0.1);
        }

        [data-theme="dark"] .live-metric-pill {
          background: #141824;
          border-color: rgba(255, 255, 255, 0.08);
        }

        [data-theme="dark"] .metric-val {
          color: #FFFFFF;
        }

        [data-theme="dark"] .live-quote-footer {
          border-top-color: rgba(255, 255, 255, 0.08);
        }

        [data-theme="dark"] .live-quote-text {
          color: #CBD5E1;
        }

        [data-theme="dark"] .trust-names {
          color: #CBD5E1;
        }

        [data-theme="dark"] .auth-form-panel {
          background: #0D1017;
          border-left-color: rgba(255, 255, 255, 0.08);
          box-shadow: -12px 0 36px -12px rgba(0, 0, 0, 0.5);
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
          background: #1A1F2C;
          border-color: rgba(255, 255, 255, 0.1);
          color: #F1F5F9;
        }

        [data-theme="dark"] .auth-sso-btn:hover {
          background: #242B3D;
        }

        [data-theme="dark"] .auth-sep-line {
          background: rgba(255, 255, 255, 0.1);
        }

        [data-theme="dark"] .auth-label {
          color: #E2E8F0;
        }

        [data-theme="dark"] .auth-textbox {
          background: #161B26;
          border-color: rgba(255, 255, 255, 0.12);
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

        [data-theme="dark"] .auth-legal-sub {
          color: #94A3B8;
        }

        [data-theme="dark"] .auth-legal-sub a {
          color: #FFFFFF;
        }

        [data-theme="dark"] .auth-bottombar {
          background: rgba(7, 8, 11, 0.8);
          border-top-color: rgba(255, 255, 255, 0.06);
          color: #64748B;
        }

        [data-theme="dark"] .auth-bottom-center a:hover {
          color: #E2E8F0;
        }

        /* ── Responsive Collapse for Mobile/Tablet ── */
        @media (max-width: 980px) {
          .auth-expanded-stage {
            grid-template-columns: 1fr;
          }

          .auth-showcase-panel {
            display: none;
          }

          .auth-form-panel {
            border-left: none;
            box-shadow: none;
            padding: 16px 24px;
            background: transparent;
          }

          .auth-stationery-card {
            background: #FFFFFF;
            border-radius: 20px;
            border: 1.5px solid rgba(0, 0, 0, 0.08);
            box-shadow: 0 16px 40px -10px rgba(0, 0, 0, 0.07);
            padding: 24px;
          }

          [data-theme="dark"] .auth-stationery-card {
            background: #11141C;
            border-color: rgba(255, 255, 255, 0.1);
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
