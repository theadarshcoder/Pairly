import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { LandingNav } from './components/LandingNav.js';
import { LandingFooter } from './components/LandingFooter.js';

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const modeParam = searchParams.get('mode');
  const planParam = searchParams.get('plan');

  const [isLogin, setIsLogin] = useState(modeParam === 'login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [institution, setInstitution] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (modeParam === 'login') {
      setIsLogin(true);
    } else if (modeParam === 'signup') {
      setIsLogin(false);
    }
  }, [modeParam]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMsg(isLogin ? 'Welcome back! Redirecting to your sessions...' : 'Account created successfully! Setting up your workspace...');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    }, 800);
  };

  const planTitles: Record<string, string> = {
    free: 'Free Plan',
    plus: 'Plus Plan ($35/mo)',
    pro: 'Pro Plan ($79/mo)',
    enterprise: 'Enterprise Tier',
  };

  return (
    <div className="auth-page-container">
      <LandingNav />

      <main className="auth-main-content">
        {/* Background Atmosphere */}
        <div className="auth-bg-decor" aria-hidden="true">
          <div className="auth-bg-radial" />
          <img
            src="/images/paper-texture.png"
            alt=""
            className="auth-paper-texture"
          />
        </div>

        <div className="auth-card-frame">
          <div className="auth-paper-card">
            {/* Subtle paper tooth overlay */}
            <div className="auth-card-texture-overlay" aria-hidden="true" />

            {/* Plan Badge if selected from pricing */}
            {planParam && planTitles[planParam] && (
              <div className="auth-plan-banner">
                <span className="plan-badge-dot" />
                <span>Selected Plan: <strong>{planTitles[planParam]}</strong></span>
              </div>
            )}

            {/* Header / Mode Toggle */}
            <div className="auth-header">
              <span className="auth-eyebrow">Pairly Educator Portal</span>
              <h1 className="auth-h1">
                {isLogin ? 'Sign in to Pairly' : 'Start your classroom'}
              </h1>
              <p className="auth-subhead">
                {isLogin
                  ? 'Access your active lecture rooms, syllabus modules, and decay analytics.'
                  : 'Join thousands of university professors transforming lecture engagement.'}
              </p>

              {/* Segmented Mode Switcher */}
              <div className="auth-toggle-pill">
                <button
                  type="button"
                  className={`auth-toggle-btn ${!isLogin ? 'active' : ''}`}
                  onClick={() => setIsLogin(false)}
                >
                  Create Account
                </button>
                <button
                  type="button"
                  className={`auth-toggle-btn ${isLogin ? 'active' : ''}`}
                  onClick={() => setIsLogin(true)}
                >
                  Log In
                </button>
              </div>
            </div>

            {/* Success Message */}
            {successMsg ? (
              <div className="auth-success-box">
                <span className="success-icon">✓</span>
                <p>{successMsg}</p>
              </div>
            ) : (
              <>
                {/* Social / SSO Single Click */}
                <div className="auth-social-stack">
                  <button
                    type="button"
                    className="auth-social-btn"
                    onClick={() => {
                      setIsLoading(true);
                      setTimeout(() => navigate('/dashboard'), 1000);
                    }}
                  >
                    <svg className="social-icon" viewBox="0 0 24 24">
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
                    <span>Continue with Google</span>
                  </button>

                  <button
                    type="button"
                    className="auth-social-btn"
                    onClick={() => {
                      setIsLoading(true);
                      setTimeout(() => navigate('/dashboard'), 1000);
                    }}
                  >
                    <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.99.6-2.63 1.35-.58.67-.99 1.74-.86 2.78.99.08 2.01-.53 2.57-1.28z" />
                    </svg>
                    <span>Continue with Apple</span>
                  </button>
                </div>

                <div className="auth-divider">
                  <span className="auth-divider-line" />
                  <span className="auth-divider-text">OR EMAIL</span>
                  <span className="auth-divider-line" />
                </div>

                {/* Email Password Form */}
                <form onSubmit={handleSubmit} className="auth-form">
                  {!isLogin && (
                    <>
                      <div className="form-group">
                        <label className="form-label" htmlFor="auth-name">Full Name</label>
                        <input
                          id="auth-name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Dr. Eleanor Vance"
                          className="form-input"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="auth-institution">University or College</label>
                        <input
                          id="auth-institution"
                          type="text"
                          value={institution}
                          onChange={(e) => setInstitution(e.target.value)}
                          placeholder="Stanford University"
                          className="form-input"
                          required
                        />
                      </div>
                    </>
                  )}

                  <div className="form-group">
                    <label className="form-label" htmlFor="auth-email">Academic Email</label>
                    <input
                      id="auth-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="vance@stanford.edu"
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <div className="form-label-split">
                      <label className="form-label" htmlFor="auth-password">Password</label>
                      {isLogin && (
                        <a href="#forgot" className="forgot-link" onClick={(e) => { e.preventDefault(); alert('Password reset link sent to your academic email.'); }}>
                          Forgot password?
                        </a>
                      )}
                    </div>
                    <input
                      id="auth-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="form-input"
                      required
                      minLength={8}
                    />
                  </div>

                  <button
                    type="submit"
                    className="auth-submit-btn"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="btn-loading">Connecting...</span>
                    ) : (
                      <span>{isLogin ? 'Sign in to Dashboard →' : 'Launch Free Workspace →'}</span>
                    )}
                  </button>
                </form>

                {/* Trust & Compliance note */}
                <div className="auth-trust-note">
                  <p>
                    🔒 Protected with 256-bit encryption. FERPA & SOC 2 Type II compliant. Student data is never sold or retained.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      <LandingFooter />

      <style>{`
        .auth-page-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background-color: var(--paper, #FAF7F2);
          position: relative;
        }

        .auth-main-content {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 130px 24px 80px 24px;
          position: relative;
        }

        .auth-bg-decor {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .auth-bg-radial {
          position: absolute;
          top: 15%;
          left: 50%;
          transform: translateX(-50%);
          width: 800px;
          height: 500px;
          background: radial-gradient(50% 50% at 50% 50%, rgba(158, 212, 239, 0.28) 0%, rgba(250, 247, 242, 0) 100%);
        }

        .auth-paper-texture {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.16;
          mix-blend-mode: multiply;
        }

        .auth-card-frame {
          width: 100%;
          max-width: 480px;
          position: relative;
          z-index: 2;
        }

        .auth-paper-card {
          position: relative;
          background: #FFFFFF;
          border-radius: 24px;
          border: 1.5px solid rgba(0, 0, 0, 0.08);
          box-shadow: 0 20px 48px -12px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.02);
          padding: 40px 36px;
          overflow: hidden;
        }

        .auth-card-texture-overlay {
          position: absolute;
          inset: 0;
          background-image: url('/images/paper-texture.png');
          background-size: cover;
          opacity: 0.025;
          mix-blend-mode: overlay;
          pointer-events: none;
        }

        .auth-plan-banner {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #EFF6FF;
          border: 1px solid #BFDBFE;
          color: #1D4ED8;
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 12px;
          padding: 6px 12px;
          border-radius: 9999px;
          margin-bottom: 20px;
        }

        .plan-badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #2563EB;
        }

        .auth-header {
          text-align: center;
          margin-bottom: 28px;
        }

        .auth-eyebrow {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #64748B;
          display: block;
          margin-bottom: 8px;
        }

        .auth-h1 {
          font-family: 'UntitledSerif', Georgia, serif;
          font-style: italic;
          font-weight: 400;
          font-size: 32px;
          color: #0F172A;
          margin: 0 0 10px 0;
          line-height: 1.15;
        }

        .auth-subhead {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 14px;
          color: #64748B;
          line-height: 1.45;
          margin: 0 0 24px 0;
        }

        .auth-toggle-pill {
          display: inline-flex;
          background: rgba(15, 23, 42, 0.05);
          padding: 4px;
          border-radius: 9999px;
          border: 1px solid rgba(15, 23, 42, 0.06);
          width: 100%;
        }

        .auth-toggle-btn {
          flex: 1;
          background: transparent;
          border: none;
          padding: 8px 16px;
          border-radius: 9999px;
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 13px;
          font-weight: 600;
          color: #64748B;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .auth-toggle-btn.active {
          background: #FFFFFF;
          color: #0F172A;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
        }

        .auth-social-stack {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 22px;
        }

        .auth-social-btn {
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
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
        }

        .auth-social-btn:hover {
          background: #F8FAFC;
          border-color: #CBD5E1;
        }

        .social-icon {
          width: 18px;
          height: 18px;
        }

        .auth-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 22px;
        }

        .auth-divider-line {
          flex: 1;
          height: 1px;
          background: #E2E8F0;
        }

        .auth-divider-text {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.1em;
          color: #94A3B8;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-label-split {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .form-label {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 13px;
          font-weight: 600;
          color: #334155;
        }

        .forgot-link {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 12px;
          color: #2563EB;
          text-decoration: none;
        }

        .forgot-link:hover {
          text-decoration: underline;
        }

        .form-input {
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

        .form-input:focus {
          border-color: #0F172A;
          box-shadow: 0 0 0 3px rgba(15, 23, 42, 0.08);
        }

        .auth-submit-btn {
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
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.15);
        }

        .auth-submit-btn:hover {
          background: #1E293B;
          transform: translateY(-1px);
        }

        .auth-trust-note {
          margin-top: 24px;
          padding-top: 18px;
          border-top: 1px solid #F1F5F9;
          text-align: center;
        }

        .auth-trust-note p {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 11.5px;
          color: #64748B;
          line-height: 1.45;
          margin: 0;
        }

        .auth-success-box {
          background: #F0FDF4;
          border: 1px solid #BBF7D0;
          padding: 24px;
          border-radius: 14px;
          text-align: center;
          color: #166534;
        }

        .success-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #22C55E;
          color: #FFFFFF;
          font-size: 20px;
          margin-bottom: 12px;
        }

        /* ── Dark Mode ── */
        [data-theme="dark"] .auth-page-container {
          background-color: #07080B;
        }

        [data-theme="dark"] .auth-paper-card {
          background: #11141C;
          border-color: rgba(255, 255, 255, 0.1);
          box-shadow: 0 20px 48px -12px rgba(0, 0, 0, 0.7);
        }

        [data-theme="dark"] .auth-h1 {
          color: #FFFFFF;
        }

        [data-theme="dark"] .auth-subhead {
          color: #94A3B8;
        }

        [data-theme="dark"] .auth-toggle-pill {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.08);
        }

        [data-theme="dark"] .auth-toggle-btn.active {
          background: #1E293B;
          color: #FFFFFF;
        }

        [data-theme="dark"] .auth-social-btn {
          background: #1E293B;
          border-color: rgba(255, 255, 255, 0.1);
          color: #F1F5F9;
        }

        [data-theme="dark"] .form-label {
          color: #E2E8F0;
        }

        [data-theme="dark"] .form-input {
          background: #1E293B;
          border-color: rgba(255, 255, 255, 0.15);
          color: #FFFFFF;
        }

        [data-theme="dark"] .form-input:focus {
          border-color: #60A5FA;
          box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.15);
        }

        [data-theme="dark"] .auth-submit-btn {
          background: #FFFFFF;
          color: #090A0D;
        }

        [data-theme="dark"] .auth-submit-btn:hover {
          background: #E2E8F0;
        }
      `}</style>
    </div>
  );
}
