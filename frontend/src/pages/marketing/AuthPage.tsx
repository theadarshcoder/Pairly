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
      setSuccessMsg(isLogin ? 'Welcome back! Redirecting to your dashboard...' : 'Account created successfully! Setting up your workspace...');
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
    <div className="auth-split-viewport">
      {/* ── Left Pane: Interactive Showcase & Pedagogical Platform ── */}
      <aside className="auth-showcase-pane">
        {/* Background Paper Ambience */}
        <div className="auth-showcase-bg-overlay" aria-hidden="true">
          <div className="auth-showcase-radial" />
          <img
            src="/images/paper-texture.png"
            alt=""
            className="auth-showcase-paper"
          />
        </div>

        {/* Top Branding */}
        <div className="auth-showcase-top">
          <Link to="/" className="auth-showcase-brand" title="Return to Pairly Home">
            <span className="auth-logo-badge">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </span>
            <span className="auth-brand-name">Pairly</span>
          </Link>
          <span className="auth-feature-pill">Spatial Active-Learning</span>
        </div>

        {/* Central Editorial & Live Simulator */}
        <div className="auth-showcase-body">
          <div className="auth-showcase-text">
            <h2 className="auth-showcase-heading">
              Turn passive lecture halls into <span className="highlight-italic">active comprehension.</span>
            </h2>
            <p className="auth-showcase-description">
              Replace multiple-choice clickers with real-time spatial canvases, cognitive decay mapping, and interactive peer grading.
            </p>
          </div>

          {/* Interactive Classroom Bento Card */}
          <div className="auth-bento-preview">
            <div className="bento-paper-tooth" aria-hidden="true" />

            <div className="bento-card-topbar">
              <div className="bento-status-pill">
                <span className="bento-pulse-dot" />
                <span>BIOCHEM 302 · ACTIVE SESSION</span>
              </div>
              <span className="bento-occupancy">412 Students Connected</span>
            </div>

            <p className="bento-prompt-title">
              “Pinpoint the primary catalytic pocket on the hexokinase enzyme structure.”
            </p>

            {/* Spatial Canvas Heatmap Simulation */}
            <div className="bento-canvas-visual">
              <div className="canvas-grid-bg" />
              
              {/* Heatmap Clusters */}
              <div className="canvas-heat-cloud" />
              <div className="canvas-hotspot-center">
                <span className="hotspot-pulse" />
                <span className="hotspot-core" />
              </div>

              {/* Student Dot Swarm */}
              <div className="canvas-dot d1" style={{ top: '38%', left: '52%' }} />
              <div className="canvas-dot d2" style={{ top: '44%', left: '48%' }} />
              <div className="canvas-dot d3" style={{ top: '41%', left: '56%' }} />
              <div className="canvas-dot d4" style={{ top: '47%', left: '53%' }} />
              <div className="canvas-dot d5" style={{ top: '35%', left: '49%' }} />
              <div className="canvas-dot d6" style={{ top: '43%', left: '51%' }} />
              <div className="canvas-dot d7" style={{ top: '49%', left: '55%' }} />
              
              <div className="canvas-target-tag">
                <span className="tag-dot" />
                <span>Catalytic Pocket (88.4% Consensus)</span>
              </div>
            </div>

            {/* Micro Metrics Row */}
            <div className="bento-metrics-row">
              <div className="bento-metric-cell">
                <span className="metric-val">3.8s</span>
                <span className="metric-label">Response Velocity</span>
              </div>
              <div className="bento-metric-cell">
                <span className="metric-val">94.8%</span>
                <span className="metric-label">Concept Recall</span>
              </div>
              <div className="bento-metric-cell">
                <span className="metric-val">0</span>
                <span className="metric-label">Student App Installs</span>
              </div>
            </div>
          </div>

          {/* Educator Testimonial Quote */}
          <div className="auth-educator-quote-card">
            <div className="quote-initials">AT</div>
            <div className="quote-copy-wrap">
              <p className="quote-body">
                “Pairly replaced four disjointed tools across our 400-seat lecture series. We diagnose student misconceptions within minutes instead of midterms.”
              </p>
              <div className="quote-author-meta">
                <strong>Dr. Aris Thorne</strong> · Dept. of Molecular Biology, UC Berkeley
              </div>
            </div>
          </div>
        </div>

        {/* Bottom University Faculty Trust */}
        <div className="auth-showcase-footer">
          <span className="showcase-trust-tag">ADOPTED BY FACULTY AT LEADING INSTITUTIONS</span>
          <div className="showcase-uni-strip">
            <span>Stanford</span>
            <span className="uni-dot">·</span>
            <span>UC Berkeley</span>
            <span className="uni-dot">·</span>
            <span>MIT</span>
            <span className="uni-dot">·</span>
            <span>Johns Hopkins</span>
            <span className="uni-dot">·</span>
            <span>UCLA</span>
          </div>
        </div>
      </aside>

      {/* ── Right Pane: Clean, Spacious Authentication Portal ── */}
      <main className="auth-form-pane">
        {/* Top Actions Bar */}
        <div className="auth-form-topbar">
          <button
            type="button"
            className="auth-theme-toggle"
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

          <Link to="/" className="auth-back-action">
            <span>←</span>
            <span>Back to site</span>
          </Link>
        </div>

        {/* Centered Form Area */}
        <div className="auth-form-stage">
          <div className="auth-form-card">
            {/* Plan Badge if from /pricing */}
            {planParam && planTitles[planParam] && (
              <div className="auth-plan-banner">
                <span className="plan-dot" />
                <span>Selected Plan: <strong>{planTitles[planParam]}</strong></span>
              </div>
            )}

            {/* Header & Mode Switcher */}
            <div className="auth-form-header">
              <h1 className="auth-form-title">
                {isLogin ? 'Sign in to Pairly' : 'Create your account'}
              </h1>
              <p className="auth-form-subtitle">
                {isLogin
                  ? 'Welcome back. Enter your credentials to access your classrooms.'
                  : 'Start using Pairly with your academic email in seconds.'}
              </p>

              {/* Segmented Mode Switcher */}
              <div className="auth-segmented-switcher">
                <button
                  type="button"
                  className={`auth-tab-btn ${!isLogin ? 'active' : ''}`}
                  onClick={() => switchMode(false)}
                >
                  Create Account
                </button>
                <button
                  type="button"
                  className={`auth-tab-btn ${isLogin ? 'active' : ''}`}
                  onClick={() => switchMode(true)}
                >
                  Log In
                </button>
              </div>
            </div>

            {/* Success State */}
            {successMsg ? (
              <div className="auth-success-box">
                <span className="success-icon-badge">✓</span>
                <p>{successMsg}</p>
              </div>
            ) : (
              <>
                {/* Single-Click Social SSO Grid */}
                <div className="auth-sso-row">
                  <button
                    type="button"
                    className="auth-sso-action"
                    onClick={() => {
                      setIsLoading(true);
                      setTimeout(() => navigate('/dashboard'), 900);
                    }}
                  >
                    <svg className="sso-svg" viewBox="0 0 24 24">
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
                    className="auth-sso-action"
                    onClick={() => {
                      setIsLoading(true);
                      setTimeout(() => navigate('/dashboard'), 900);
                    }}
                  >
                    <svg className="sso-svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.99.6-2.63 1.35-.58.67-.99 1.74-.86 2.78.99.08 2.01-.53 2.57-1.28z" />
                    </svg>
                    <span>Apple</span>
                  </button>
                </div>

                {/* Divider */}
                <div className="auth-line-divider">
                  <span className="line" />
                  <span className="label">OR WITH EMAIL</span>
                  <span className="line" />
                </div>

                {/* Credentials Form */}
                <form onSubmit={handleSubmit} className="auth-form-fields">
                  {!isLogin && (
                    <div className="auth-row-2col">
                      <div className="auth-input-group">
                        <label className="auth-field-label" htmlFor="user-name">Full Name</label>
                        <input
                          id="user-name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Dr. Eleanor Vance"
                          className="auth-text-input"
                          required
                        />
                      </div>
                      <div className="auth-input-group">
                        <label className="auth-field-label" htmlFor="user-institution">Institution</label>
                        <input
                          id="user-institution"
                          type="text"
                          value={institution}
                          onChange={(e) => setInstitution(e.target.value)}
                          placeholder="Stanford University"
                          className="auth-text-input"
                          required
                        />
                      </div>
                    </div>
                  )}

                  <div className="auth-input-group">
                    <label className="auth-field-label" htmlFor="user-email">Academic Email</label>
                    <input
                      id="user-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="vance@stanford.edu"
                      className="auth-text-input"
                      required
                    />
                  </div>

                  <div className="auth-input-group">
                    <div className="auth-label-split">
                      <label className="auth-field-label" htmlFor="user-password">Password</label>
                      {isLogin && (
                        <a
                          href="#forgot"
                          className="auth-pass-forgot"
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
                      className="auth-text-input"
                      required
                      minLength={8}
                    />
                  </div>

                  <button
                    type="submit"
                    className="auth-primary-btn"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="btn-spinner">Connecting...</span>
                    ) : (
                      <span>{isLogin ? 'Sign in to Dashboard →' : 'Launch Free Workspace →'}</span>
                    )}
                  </button>
                </form>

                {/* Terms agreement note */}
                <div className="auth-agreement-text">
                  By continuing, you agree to Pairly’s{' '}
                  <Link to="/terms">Terms of Service</Link> and{' '}
                  <Link to="/privacy">Privacy Policy</Link>.
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right Pane Bottom Footer Links */}
        <footer className="auth-form-footer">
          <span>© 2026 Pairly Inc. All rights reserved.</span>
          <div className="footer-links-cluster">
            <Link to="/privacy">Privacy</Link>
            <span className="sep">·</span>
            <Link to="/terms">Terms</Link>
            <span className="sep">·</span>
            <Link to="/security">Security</Link>
            <span className="sep">·</span>
            <Link to="/community">Community</Link>
          </div>
        </footer>
      </main>

      {/* ── CSS Styles ── */}
      <style>{`
        /* ── Full Viewport Split Container ── */
        .auth-split-viewport {
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100vh;
          height: 100dvh;
          overflow: hidden;
          display: flex;
          background-color: var(--paper, #FAF7F2);
          z-index: 999;
        }

        /* ── Left Pane: Showcase ── */
        .auth-showcase-pane {
          position: relative;
          width: 52%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 36px 48px 28px 48px;
          border-right: 1px solid rgba(0, 0, 0, 0.08);
          background-color: var(--paper, #FAF7F2);
          overflow: hidden;
          flex-shrink: 0;
        }

        .auth-showcase-bg-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 1;
        }

        .auth-showcase-radial {
          position: absolute;
          top: 15%;
          left: 30%;
          width: 650px;
          height: 500px;
          background: radial-gradient(50% 50% at 50% 50%, rgba(158, 212, 239, 0.28) 0%, rgba(250, 247, 242, 0) 100%);
        }

        .auth-showcase-paper {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.16;
          mix-blend-mode: multiply;
        }

        /* Left Header */
        .auth-showcase-top {
          position: relative;
          z-index: 5;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .auth-showcase-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: #0F172A;
        }

        .auth-logo-badge {
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
          font-size: 22px;
          letter-spacing: -0.02em;
          color: #0F172A;
        }

        .auth-feature-pill {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.06em;
          padding: 4px 10px;
          border-radius: 9999px;
          background: rgba(15, 23, 42, 0.05);
          border: 1px solid rgba(15, 23, 42, 0.08);
          color: #475569;
        }

        /* Left Body Content */
        .auth-showcase-body {
          position: relative;
          z-index: 5;
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin: auto 0;
        }

        .auth-showcase-heading {
          font-family: var(--font-display, 'UntitledSerif', Georgia, serif);
          font-weight: 400;
          font-size: clamp(28px, 2.6vw, 36px);
          line-height: 1.18;
          color: #0F172A;
          margin: 0 0 10px 0;
          letter-spacing: -0.02em;
        }

        .auth-showcase-heading .highlight-italic {
          font-style: italic;
          color: #0F172A;
        }

        .auth-showcase-description {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 14px;
          line-height: 1.5;
          color: #64748B;
          margin: 0;
          max-width: 520px;
        }

        /* Bento Interactive Card */
        .auth-bento-preview {
          position: relative;
          background: #FFFFFF;
          border-radius: 18px;
          border: 1.5px solid rgba(0, 0, 0, 0.08);
          box-shadow: 0 12px 32px -8px rgba(0, 0, 0, 0.06), 0 2px 6px rgba(0, 0, 0, 0.02);
          padding: 18px 22px;
          overflow: hidden;
          max-width: 540px;
        }

        .bento-paper-tooth {
          position: absolute;
          inset: 0;
          background-image: url('/images/paper-texture.png');
          background-size: cover;
          opacity: 0.025;
          mix-blend-mode: overlay;
          pointer-events: none;
        }

        .bento-card-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
        }

        .bento-status-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #047857;
          background: #ECFDF5;
          padding: 3px 8px;
          border-radius: 6px;
          border: 1px solid #A7F3D0;
        }

        .bento-pulse-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #10B981;
          box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.25);
          animation: pulse 2s infinite ease-in-out;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.7; }
        }

        .bento-occupancy {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 11.5px;
          font-weight: 500;
          color: #64748B;
        }

        .bento-prompt-title {
          font-family: var(--font-display, 'UntitledSerif', Georgia, serif);
          font-style: italic;
          font-size: 15px;
          line-height: 1.35;
          color: #1E293B;
          margin: 0 0 12px 0;
        }

        /* Spatial Canvas Mockup */
        .bento-canvas-visual {
          position: relative;
          height: 120px;
          background: linear-gradient(180deg, #F8FAFC 0%, #F1F5F9 100%);
          border-radius: 12px;
          border: 1px solid #E2E8F0;
          overflow: hidden;
          margin-bottom: 14px;
        }

        .canvas-grid-bg {
          position: absolute;
          inset: 0;
          background-size: 16px 16px;
          background-image: linear-gradient(to right, rgba(0, 0, 0, 0.035) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(0, 0, 0, 0.035) 1px, transparent 1px);
        }

        .canvas-heat-cloud {
          position: absolute;
          top: 36%;
          left: 52%;
          transform: translate(-50%, -50%);
          width: 140px;
          height: 90px;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.35) 0%, rgba(14, 165, 233, 0.15) 50%, transparent 75%);
          filter: blur(12px);
        }

        .canvas-hotspot-center {
          position: absolute;
          top: 42%;
          left: 52%;
          transform: translate(-50%, -50%);
        }

        .hotspot-pulse {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1.5px solid rgba(37, 99, 235, 0.5);
          animation: pulse 2.2s infinite;
        }

        .hotspot-core {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #2563EB;
          box-shadow: 0 0 10px rgba(37, 99, 235, 0.8);
        }

        .canvas-dot {
          position: absolute;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #0284C7;
          box-shadow: 0 1px 2px rgba(0,0,0,0.15);
        }

        .canvas-target-tag {
          position: absolute;
          bottom: 8px;
          right: 10px;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 6px;
          padding: 3px 8px;
          display: flex;
          align-items: center;
          gap: 5px;
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 10px;
          font-weight: 600;
          color: #1E293B;
        }

        .tag-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #2563EB;
        }

        /* Metrics Row */
        .bento-metrics-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          padding-top: 10px;
          border-top: 1px solid #F1F5F9;
        }

        .bento-metric-cell {
          display: flex;
          flex-direction: column;
        }

        .metric-val {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 14px;
          font-weight: 700;
          color: #0F172A;
          line-height: 1.1;
        }

        .metric-label {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 10px;
          color: #64748B;
          margin-top: 2px;
        }

        /* Educator Quote */
        .auth-educator-quote-card {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          background: rgba(255, 255, 255, 0.65);
          border: 1px solid rgba(0, 0, 0, 0.06);
          border-radius: 12px;
          padding: 12px 16px;
          max-width: 540px;
        }

        .quote-initials {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: #E2E8F0;
          color: #334155;
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 11px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .quote-body {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 12px;
          line-height: 1.45;
          color: #334155;
          margin: 0 0 4px 0;
          font-style: italic;
        }

        .quote-author-meta {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 11px;
          color: #64748B;
        }

        /* Showcase Footer */
        .auth-showcase-footer {
          position: relative;
          z-index: 5;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .showcase-trust-tag {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #94A3B8;
        }

        .showcase-uni-strip {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 12px;
          font-weight: 600;
          color: #475569;
        }

        .uni-dot {
          color: #CBD5E1;
        }

        /* ── Right Pane: Authentication Form ── */
        .auth-form-pane {
          position: relative;
          width: 48%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background-color: #FFFFFF;
          overflow-y: auto;
          scrollbar-width: none;
          padding: 32px 48px 24px 48px;
        }

        .auth-form-pane::-webkit-scrollbar {
          display: none;
        }

        /* Top Bar */
        .auth-form-topbar {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 14px;
          flex-shrink: 0;
        }

        .auth-theme-toggle {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 1px solid rgba(0, 0, 0, 0.08);
          background: #F8FAFC;
          color: #475569;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .auth-theme-toggle:hover {
          background: #FFFFFF;
          color: #0F172A;
          border-color: rgba(0, 0, 0, 0.15);
        }

        .auth-back-action {
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

        .auth-back-action:hover {
          color: #0F172A;
          background: #F1F5F9;
        }

        /* Center Stage */
        .auth-form-stage {
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1;
          min-height: 0;
          padding: 12px 0;
        }

        .auth-form-card {
          width: 100%;
          max-width: 440px;
        }

        .auth-plan-banner {
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

        .auth-plan-banner .plan-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #2563EB;
        }

        /* Form Header */
        .auth-form-header {
          margin-bottom: 18px;
        }

        .auth-form-title {
          font-family: var(--font-display, 'UntitledSerif', Georgia, serif);
          font-style: italic;
          font-weight: 400;
          font-size: 30px;
          color: #0F172A;
          margin: 0 0 6px 0;
          line-height: 1.15;
          letter-spacing: -0.01em;
        }

        .auth-form-subtitle {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 13.5px;
          color: #64748B;
          line-height: 1.45;
          margin: 0 0 16px 0;
        }

        .auth-segmented-switcher {
          display: inline-flex;
          background: rgba(15, 23, 42, 0.05);
          padding: 3px;
          border-radius: 9999px;
          border: 1px solid rgba(15, 23, 42, 0.06);
          width: 100%;
        }

        .auth-tab-btn {
          flex: 1;
          background: transparent;
          border: none;
          padding: 7px 14px;
          border-radius: 9999px;
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 13px;
          font-weight: 600;
          color: #64748B;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .auth-tab-btn.active {
          background: #FFFFFF;
          color: #0F172A;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
        }

        /* Social SSO */
        .auth-sso-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 16px;
        }

        .auth-sso-action {
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

        .auth-sso-action:hover {
          background: #F8FAFC;
          border-color: #CBD5E1;
        }

        .sso-svg {
          width: 16px;
          height: 16px;
        }

        /* Divider */
        .auth-line-divider {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
        }

        .auth-line-divider .line {
          flex: 1;
          height: 1px;
          background: #E2E8F0;
        }

        .auth-line-divider .label {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 9.5px;
          font-weight: 600;
          letter-spacing: 0.1em;
          color: #94A3B8;
        }

        /* Fields */
        .auth-form-fields {
          display: flex;
          flex-direction: column;
          gap: 13px;
        }

        .auth-row-2col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .auth-input-group {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .auth-label-split {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .auth-field-label {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 12.5px;
          font-weight: 600;
          color: #334155;
        }

        .auth-pass-forgot {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 11.5px;
          color: #2563EB;
          text-decoration: none;
        }

        .auth-pass-forgot:hover {
          text-decoration: underline;
        }

        .auth-text-input {
          height: 40px;
          padding: 0 12px;
          border-radius: 9px;
          border: 1px solid #CBD5E1;
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 13.5px;
          color: #0F172A;
          background: #FFFFFF;
          outline: none;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }

        .auth-text-input:focus {
          border-color: #0F172A;
          box-shadow: 0 0 0 3px rgba(15, 23, 42, 0.08);
        }

        .auth-primary-btn {
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

        .auth-primary-btn:hover {
          background: #1E293B;
          transform: translateY(-1px);
        }

        .btn-spinner {
          opacity: 0.8;
        }

        .auth-agreement-text {
          margin-top: 14px;
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 11.5px;
          color: #64748B;
          line-height: 1.45;
          text-align: center;
        }

        .auth-agreement-text a {
          color: #0F172A;
          text-decoration: underline;
        }

        .auth-success-box {
          background: #F0FDF4;
          border: 1px solid #BBF7D0;
          padding: 24px;
          border-radius: 12px;
          text-align: center;
          color: #166534;
        }

        .success-icon-badge {
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

        /* Form Bottom Bar */
        .auth-form-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 12px;
          border-top: 1px solid rgba(0, 0, 0, 0.05);
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 11.5px;
          color: #94A3B8;
          flex-shrink: 0;
        }

        .footer-links-cluster {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .footer-links-cluster a {
          color: #64748B;
          text-decoration: none;
          transition: color 0.15s ease;
        }

        .footer-links-cluster a:hover {
          color: #0F172A;
          text-decoration: underline;
        }

        .footer-links-cluster .sep {
          color: #CBD5E1;
        }

        /* ── Dark Mode Overrides ── */
        [data-theme="dark"] .auth-split-viewport {
          background-color: #07080B;
        }

        [data-theme="dark"] .auth-showcase-pane {
          background-color: #080B10;
          border-right-color: rgba(255, 255, 255, 0.08);
        }

        [data-theme="dark"] .auth-showcase-brand,
        [data-theme="dark"] .auth-brand-name {
          color: #FFFFFF;
        }

        [data-theme="dark"] .auth-feature-pill {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.1);
          color: #94A3B8;
        }

        [data-theme="dark"] .auth-showcase-heading {
          color: #FFFFFF;
        }

        [data-theme="dark"] .auth-showcase-heading .highlight-italic {
          color: #93C5FD;
        }

        [data-theme="dark"] .auth-showcase-description {
          color: #94A3B8;
        }

        [data-theme="dark"] .auth-bento-preview {
          background: #0F141F;
          border-color: rgba(255, 255, 255, 0.1);
          box-shadow: 0 16px 36px -8px rgba(0, 0, 0, 0.6);
        }

        [data-theme="dark"] .bento-status-pill {
          background: rgba(16, 185, 129, 0.15);
          color: #34D399;
          border-color: rgba(16, 185, 129, 0.3);
        }

        [data-theme="dark"] .bento-occupancy {
          color: #94A3B8;
        }

        [data-theme="dark"] .bento-prompt-title {
          color: #F1F5F9;
        }

        [data-theme="dark"] .bento-canvas-visual {
          background: #090D14;
          border-color: rgba(255, 255, 255, 0.08);
        }

        [data-theme="dark"] .canvas-grid-bg {
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
        }

        [data-theme="dark"] .canvas-target-tag {
          background: rgba(15, 23, 42, 0.85);
          border-color: rgba(255, 255, 255, 0.12);
          color: #F1F5F9;
        }

        [data-theme="dark"] .bento-metrics-row {
          border-top-color: rgba(255, 255, 255, 0.06);
        }

        [data-theme="dark"] .metric-val {
          color: #FFFFFF;
        }

        [data-theme="dark"] .metric-label {
          color: #94A3B8;
        }

        [data-theme="dark"] .auth-educator-quote-card {
          background: rgba(15, 20, 31, 0.65);
          border-color: rgba(255, 255, 255, 0.08);
        }

        [data-theme="dark"] .quote-initials {
          background: #1E293B;
          color: #E2E8F0;
        }

        [data-theme="dark"] .quote-body {
          color: #E2E8F0;
        }

        [data-theme="dark"] .quote-author-meta {
          color: #94A3B8;
        }

        [data-theme="dark"] .showcase-uni-strip {
          color: #94A3B8;
        }

        [data-theme="dark"] .auth-form-pane {
          background-color: #0E121A;
        }

        [data-theme="dark"] .auth-theme-toggle {
          background: rgba(30, 41, 59, 0.6);
          border-color: rgba(255, 255, 255, 0.12);
          color: #CBD5E1;
        }

        [data-theme="dark"] .auth-theme-toggle:hover {
          background: #1E293B;
          color: #FFFFFF;
        }

        [data-theme="dark"] .auth-back-action {
          color: #94A3B8;
        }

        [data-theme="dark"] .auth-back-action:hover {
          background: rgba(255, 255, 255, 0.06);
          color: #FFFFFF;
        }

        [data-theme="dark"] .auth-form-title {
          color: #FFFFFF;
        }

        [data-theme="dark"] .auth-form-subtitle {
          color: #94A3B8;
        }

        [data-theme="dark"] .auth-segmented-switcher {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.08);
        }

        [data-theme="dark"] .auth-tab-btn.active {
          background: #1E293B;
          color: #FFFFFF;
        }

        [data-theme="dark"] .auth-sso-action {
          background: #1A2130;
          border-color: rgba(255, 255, 255, 0.1);
          color: #F1F5F9;
        }

        [data-theme="dark"] .auth-sso-action:hover {
          background: #242D3F;
        }

        [data-theme="dark"] .auth-line-divider .line {
          background: rgba(255, 255, 255, 0.1);
        }

        [data-theme="dark"] .auth-field-label {
          color: #E2E8F0;
        }

        [data-theme="dark"] .auth-text-input {
          background: #161C27;
          border-color: rgba(255, 255, 255, 0.12);
          color: #FFFFFF;
        }

        [data-theme="dark"] .auth-text-input:focus {
          border-color: #60A5FA;
          box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.15);
        }

        [data-theme="dark"] .auth-primary-btn {
          background: #FFFFFF;
          color: #090A0D;
        }

        [data-theme="dark"] .auth-primary-btn:hover {
          background: #E2E8F0;
        }

        [data-theme="dark"] .auth-agreement-text a {
          color: #E2E8F0;
        }

        [data-theme="dark"] .auth-form-footer {
          border-top-color: rgba(255, 255, 255, 0.06);
          color: #64748B;
        }

        [data-theme="dark"] .footer-links-cluster a:hover {
          color: #E2E8F0;
        }

        /* ── Responsive Stacking ── */
        @media (max-width: 1024px) {
          .auth-showcase-pane {
            display: none;
          }
          .auth-form-pane {
            width: 100%;
            padding: 24px 20px;
          }
          .auth-row-2col {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
