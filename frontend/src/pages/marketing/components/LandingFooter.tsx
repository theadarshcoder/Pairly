import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { applyTheme, getStoredTheme, ThemeMode } from '../../../shared/lib/theme.js';

/* ── Compliance Badges (SOC 2, HIPAA, GDPR) ── */
function Soc2Badge({ size = 32 }: { size?: number }) {
  return (
    <div
      className="compliance-badge"
      title="AICPA SOC 2 Certified"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="19" stroke="currentColor" strokeWidth="1" strokeDasharray="1.5 1.5" opacity="0.6" />
        <circle cx="20" cy="20" r="17.5" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
        <text
          x="20"
          y="16"
          textAnchor="middle"
          fill="currentColor"
          fontSize="6"
          fontWeight="700"
          letterSpacing="0.08em"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        >
          AICPA
        </text>
        <text
          x="20"
          y="25"
          textAnchor="middle"
          fill="currentColor"
          fontSize="7.5"
          fontWeight="800"
          letterSpacing="0.05em"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        >
          SOC 2
        </text>
      </svg>
    </div>
  );
}

function HipaaBadge({ size = 32 }: { size?: number }) {
  return (
    <div
      className="compliance-badge"
      title="HIPAA Compliant"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="19" stroke="currentColor" strokeWidth="1" strokeDasharray="1.5 1.5" opacity="0.6" />
        <circle cx="20" cy="20" r="17.5" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
        <path
          d="M20 9v22M15 13c2-1 4 2 5 2s3-3 5-2M15 18c2-1 4 2 5 2s3-3 5-2M16 23c2-1 4 2 4 2s2-3 4-2"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.8"
        />
        <text
          x="20"
          y="34"
          textAnchor="middle"
          fill="currentColor"
          fontSize="4.5"
          fontWeight="700"
          letterSpacing="0.06em"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        >
          HIPAA
        </text>
      </svg>
    </div>
  );
}

function GdprBadge({ size = 32 }: { size?: number }) {
  return (
    <div
      className="compliance-badge"
      title="GDPR Compliant"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="19" stroke="currentColor" strokeWidth="1" strokeDasharray="1.5 1.5" opacity="0.6" />
        <circle cx="20" cy="20" r="17.5" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30 - 90) * (Math.PI / 180);
          const cx = 20 + 13 * Math.cos(angle);
          const cy = 20 + 13 * Math.sin(angle);
          return <circle key={i} cx={cx} cy={cy} r="0.9" fill="currentColor" opacity="0.75" />;
        })}
        <text
          x="20"
          y="23"
          textAnchor="middle"
          fill="currentColor"
          fontSize="7"
          fontWeight="800"
          letterSpacing="0.08em"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        >
          GDPR
        </text>
      </svg>
    </div>
  );
}

/* ── Theme Switcher Icons ── */
function SystemIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

function SunIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function GlobeIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function ChevronDownIcon({ size = 10 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

const LANGUAGES = [
  'English',
  'Español',
  'Français',
  'Deutsch',
  '日本語',
  '中文',
];

export function LandingFooter() {
  const [theme, setTheme] = useState<ThemeMode>(getStoredTheme);
  const [language, setLanguage] = useState('English');
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  // Sync theme with global events
  useEffect(() => {
    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ mode: ThemeMode }>;
      if (customEvent.detail?.mode) {
        setTheme(customEvent.detail.mode);
      }
    };
    window.addEventListener('pairly-theme-change', handleThemeChange);
    return () => window.removeEventListener('pairly-theme-change', handleThemeChange);
  }, []);

  const handleSelectTheme = (mode: ThemeMode) => {
    setTheme(mode);
    applyTheme(mode);
  };

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="flim-editorial-footer">
      {/* Texture Overlays */}
      <div className="flim-paper-texture-overlay" aria-hidden="true" />
      <div className="flim-noise-overlay" aria-hidden="true" />

      <div className="flim-footer-inner">
        {/* ── 1. Top Impact Headline ── */}
        <div className="flim-top-headline-wrap">
          <h2 className="flim-main-headline">
            Made for <span className="headline-grid-box">Educators.</span>
            <br />
            Built for Comprehension.
          </h2>
        </div>

        {/* ── 2. Three-Column Middle Row ── */}
        <div className="flim-middle-grid">
          {/* Column 1: NEWSLETTER & Legal */}
          <div className="flim-col-newsletter">
            <span className="flim-section-tag">NEWSLETTER</span>

            <form className="flim-newsletter-pill" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="ENTER YOUR EMAIL ADDRESS"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flim-newsletter-input"
                required
              />
              <button type="submit" className="flim-newsletter-btn">
                {subscribed ? 'SUBSCRIBED' : 'SUBSCRIBE'}
              </button>
            </form>

            <p className="flim-copyright">
              © PAIRLY, ALL RIGHTS RESERVED, {new Date().getFullYear()}
            </p>

            {/* Compliance Badges */}
            <div className="flim-compliance-row">
              <Soc2Badge size={30} />
              <HipaaBadge size={30} />
              <GdprBadge size={30} />
            </div>
          </div>

          {/* Column 2: COMPANY */}
          <div className="flim-col-links">
            <span className="flim-section-tag">COMPANY</span>
            <ul className="flim-nav-list">
              <li><Link to="/get-started?mode=signup">App.pairly</Link></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#features">Decay Analytics</a></li>
              <li><a href="#features">Slide Synthesizer</a></li>
              <li><Link to="/#features">Privacy Policy</Link></li>
              <li><Link to="/#features">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Column 3: SOCIAL & System Controls */}
          <div className="flim-col-links">
            <span className="flim-section-tag">SOCIAL</span>
            <ul className="flim-nav-list">
              <li><a href="https://github.com/theadarshcoder/Pairly" target="_blank" rel="noopener noreferrer">Github</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">X (Twitter)</a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a href="https://youtube.com" target="_blank" rel="noopener noreferrer">YouTube</a></li>
              <li><Link to="/#features">Community</Link></li>
            </ul>

            {/* System Theme & Language Controls */}
            <div className="flim-controls-wrap">
              {/* Theme Switcher Pill */}
              <div className="flim-theme-pill" role="radiogroup" aria-label="Theme mode">
                <button
                  type="button"
                  className={`flim-theme-btn ${theme === 'system' ? 'active' : ''}`}
                  onClick={() => handleSelectTheme('system')}
                  title="System theme"
                  aria-label="System theme"
                >
                  <SystemIcon size={13} />
                </button>
                <button
                  type="button"
                  className={`flim-theme-btn ${theme === 'light' ? 'active' : ''}`}
                  onClick={() => handleSelectTheme('light')}
                  title="Light mode"
                  aria-label="Light mode"
                >
                  <SunIcon size={13} />
                </button>
                <button
                  type="button"
                  className={`flim-theme-btn ${theme === 'dark' ? 'active' : ''}`}
                  onClick={() => handleSelectTheme('dark')}
                  title="Dark mode"
                  aria-label="Dark mode"
                >
                  <MoonIcon size={13} />
                </button>
              </div>

              {/* Language Switcher Pill */}
              <div className="flim-lang-wrapper" ref={langDropdownRef}>
                <button
                  type="button"
                  className="flim-lang-btn"
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  aria-expanded={isLangOpen}
                  aria-label="Select language"
                >
                  <GlobeIcon size={14} />
                  <span>{language}</span>
                  <ChevronDownIcon size={9} />
                </button>

                {isLangOpen && (
                  <div className="flim-lang-popup">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang}
                        type="button"
                        className={`flim-lang-item ${language === lang ? 'selected' : ''}`}
                        onClick={() => {
                          setLanguage(lang);
                          setIsLangOpen(false);
                        }}
                      >
                        {lang}
                        {language === lang && <span className="check-dot">✓</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── 3. Bottom Giant Full-Bleed Wordmark ── */}
        <div className="flim-giant-wordmark-container">
          <div className="flim-giant-wordmark" aria-label="Pairly">
            <span>Pa</span>
            {/* The Letter "i" with the Signature Open Doorway Portal */}
            <span className="flim-portal-i">
              <span className="flim-i-stem">ı</span>
              <span className="flim-i-dot-portal" title="Step into Pairly">
                <span className="portal-doorway-opening">
                  <span className="portal-scene">
                    <span className="portal-sky" />
                    <span className="portal-sun" />
                    <span className="portal-horizon" />
                    <span className="portal-sign">PAIRLY</span>
                  </span>
                </span>
                {/* 3D Angled Open Door Leaf swung into space */}
                <span className="portal-door-leaf">
                  <span className="portal-door-edge" />
                  <span className="portal-door-knob" />
                </span>
              </span>
            </span>
            <span>rly</span>
          </div>
        </div>
      </div>

      <style>{`
        .flim-editorial-footer {
          position: relative;
          background: #FFFFFF;
          color: #0A0B0E;
          padding: 36px 32px 0 32px;
          box-sizing: border-box;
          overflow: hidden;
          font-family: var(--font-body, 'Inter', system-ui, -apple-system, sans-serif);
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          transition: background-color 0.2s ease, color 0.2s ease;
        }

        .flim-paper-texture-overlay {
          position: absolute;
          inset: 0;
          background-image: url('/images/paper-texture.png');
          background-size: cover;
          background-position: center;
          opacity: 0.12;
          mix-blend-mode: multiply;
          pointer-events: none;
          z-index: 1;
        }

        .flim-noise-overlay {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.035'/%3E%3C/svg%3E");
          background-repeat: repeat;
          pointer-events: none;
          mix-blend-mode: multiply;
          z-index: 1;
        }

        .flim-footer-inner {
          max-width: 1240px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        /* ── Top Headline ── */
        .flim-top-headline-wrap {
          margin-bottom: 40px;
        }

        .flim-main-headline {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: clamp(34px, 4.4vw, 56px);
          font-weight: 700;
          letter-spacing: -0.035em;
          line-height: 1.14;
          color: #0A0B0E;
          margin: 0;
        }

        .headline-grid-box {
          display: inline-block;
          position: relative;
          padding: 0 10px 2px 10px;
          margin: 0 4px;
          background-image: 
            linear-gradient(to right, rgba(0, 0, 0, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.08) 1px, transparent 1px);
          background-size: 14px 14px;
          background-position: -2px -2px;
          background-color: rgba(0, 0, 0, 0.015);
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 4px;
        }

        /* ── Middle 3-Column Grid ── */
        .flim-middle-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr;
          gap: 60px;
          margin-bottom: 40px;
          align-items: flex-start;
        }

        .flim-section-tag {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          color: #64748B;
          text-transform: uppercase;
          display: block;
          margin-bottom: 18px;
        }

        /* Newsletter Pill */
        .flim-col-newsletter {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          max-width: 420px;
        }

        .flim-newsletter-pill {
          display: flex;
          align-items: center;
          width: 100%;
          height: 48px;
          background: #EEF0F2;
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 9999px;
          padding: 4px 5px 4px 18px;
          box-sizing: border-box;
          margin-bottom: 24px;
          transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
        }

        .flim-newsletter-pill:focus-within {
          border-color: #0A0B0E;
          background: #FFFFFF;
          box-shadow: 0 0 0 3px rgba(10, 11, 14, 0.08);
        }

        .flim-newsletter-input {
          flex: 1;
          border: none;
          background: transparent;
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 11.5px;
          letter-spacing: 0.06em;
          color: #0A0B0E;
          outline: none;
        }

        .flim-newsletter-input::placeholder {
          color: #94A3B8;
          text-transform: uppercase;
        }

        .flim-newsletter-btn {
          background: #FFFFFF;
          color: #0A0B0E;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 9999px;
          height: 38px;
          padding: 0 18px;
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          cursor: pointer;
          transition: all 0.18s ease;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
          white-space: nowrap;
        }

        .flim-newsletter-btn:hover {
          background: #0A0B0E;
          color: #FFFFFF;
          border-color: #0A0B0E;
          transform: translateY(-1px);
          box-shadow: 0 3px 8px rgba(0, 0, 0, 0.14);
        }

        .flim-copyright {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 11px;
          letter-spacing: 0.05em;
          color: #64748B;
          margin: 0 0 16px 0;
        }

        .flim-compliance-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .compliance-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #64748B;
          transition: all 0.2s ease;
          cursor: default;
        }

        .compliance-badge:hover {
          color: #0A0B0E;
          transform: translateY(-1px);
        }

        /* Nav Link Columns */
        .flim-col-links {
          display: flex;
          flex-direction: column;
        }

        .flim-nav-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .flim-nav-list a {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 14.5px;
          font-weight: 500;
          color: #1E293B;
          text-decoration: none;
          letter-spacing: -0.01em;
          transition: color 0.15s ease, transform 0.15s ease;
          display: inline-block;
        }

        .flim-nav-list a:hover {
          color: #2563EB;
          transform: translateX(2px);
        }

        /* Controls (Theme & Lang) */
        .flim-controls-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 24px;
        }

        .flim-theme-pill {
          display: inline-flex;
          align-items: center;
          background: #F1F3F5;
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 9999px;
          padding: 3px;
          gap: 2px;
        }

        .flim-theme-btn {
          width: 28px;
          height: 26px;
          border-radius: 9999px;
          border: none;
          background: transparent;
          color: #64748B;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.15s ease;
          padding: 0;
        }

        .flim-theme-btn:hover {
          color: #0A0B0E;
        }

        .flim-theme-btn.active {
          background: #FFFFFF;
          color: #0A0B0E;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
        }

        .flim-lang-wrapper {
          position: relative;
        }

        .flim-lang-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          height: 32px;
          padding: 0 12px;
          border-radius: 9999px;
          background: #F1F3F5;
          border: 1px solid rgba(0, 0, 0, 0.08);
          color: #0A0B0E;
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 12.5px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .flim-lang-btn:hover {
          background: #E5E7EB;
        }

        .flim-lang-popup {
          position: absolute;
          bottom: calc(100% + 8px);
          right: 0;
          min-width: 130px;
          background: #FFFFFF;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 12px;
          padding: 5px;
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
          display: flex;
          flex-direction: column;
          gap: 2px;
          z-index: 100;
        }

        .flim-lang-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 6px 10px;
          border-radius: 6px;
          border: none;
          background: transparent;
          color: #334155;
          font-size: 12.5px;
          font-weight: 500;
          cursor: pointer;
          text-align: left;
        }

        .flim-lang-item:hover {
          background: #F1F5F9;
          color: #0A0B0E;
        }

        .flim-lang-item.selected {
          color: #2563EB;
          font-weight: 700;
        }

        .check-dot {
          color: #2563EB;
          font-size: 11px;
        }

        /* ── 3. Bottom Giant Wordmark (Full-Bleed Flim Style) ── */
        .flim-giant-wordmark-container {
          width: 100%;
          overflow: hidden;
          margin-top: 20px;
          display: flex;
          justify-content: center;
          line-height: 0.76;
        }

        .flim-giant-wordmark {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: clamp(4.5rem, 18vw, 18.5rem);
          font-weight: 900;
          letter-spacing: -0.045em;
          color: #0A0B0E;
          user-select: none;
          display: inline-flex;
          align-items: baseline;
          position: relative;
          transform: translateY(4%);
          white-space: nowrap;
        }

        /* The Letter "i" with the signature Door Portal */
        .flim-portal-i {
          display: inline-flex;
          position: relative;
          vertical-align: baseline;
          line-height: inherit;
        }

        .flim-i-stem {
          display: inline-block;
          line-height: inherit;
        }

        /* The Doorway Window in the dot of the "i" */
        .flim-i-dot-portal {
          position: absolute;
          bottom: 0.58em;
          left: 50%;
          transform: translateX(-50%);
          width: 0.26em;
          height: 0.36em;
          display: block;
          perspective: 450px;
          cursor: pointer;
          z-index: 10;
        }

        .portal-doorway-opening {
          position: relative;
          width: 100%;
          height: 100%;
          background: #0A0B0E;
          border-radius: 2px;
          border: 2px solid #0A0B0E;
          overflow: hidden;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
          display: block;
        }

        .portal-scene {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, #1E3A8A 0%, #3B82F6 40%, #93C5FD 75%, #FDE047 90%, #F59E0B 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          overflow: hidden;
        }

        .portal-sky {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 90%, #FEF08A 10%, #60A5FA 60%, #1E40AF 100%);
          opacity: 0.9;
        }

        .portal-sun {
          position: absolute;
          bottom: 12%;
          width: 0.08em;
          height: 0.08em;
          border-radius: 50%;
          background: #FFFBEB;
          box-shadow: 0 0 8px #FDE047;
          z-index: 2;
        }

        .portal-horizon {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 22%;
          background: #0F172A;
          z-index: 1;
        }

        .portal-sign {
          position: absolute;
          top: 6%;
          font-family: ui-monospace, monospace;
          font-size: 0.048em;
          font-weight: 800;
          letter-spacing: 0.12em;
          color: #FFFFFF;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.7);
          opacity: 0.95;
          z-index: 3;
        }

        /* 3D Angled Open Door Leaf (pivoted on right edge into space) */
        .portal-door-leaf {
          position: absolute;
          top: -2px;
          bottom: -2px;
          left: 100%;
          width: 0.22em;
          background: #0A0B0E;
          transform-origin: left center;
          transform: rotateY(46deg);
          border: 1.5px solid #0A0B0E;
          border-left: none;
          box-shadow: 4px 2px 10px rgba(0, 0, 0, 0.45);
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-right: 2px;
          border-radius: 0 2px 2px 0;
        }

        .portal-door-edge {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 2px;
          background: rgba(255, 255, 255, 0.25);
        }

        .portal-door-knob {
          width: 2.5px;
          height: 2.5px;
          border-radius: 50%;
          background: #F59E0B;
          box-shadow: 0 0 3px rgba(245, 158, 11, 0.8);
        }

        .flim-i-dot-portal:hover .portal-door-leaf {
          transform: rotateY(76deg);
        }

        .flim-i-dot-portal:hover .portal-doorway-opening {
          box-shadow: 0 0 20px rgba(251, 191, 36, 0.5), 0 4px 14px rgba(0, 0, 0, 0.3);
        }

        /* ── Dark Mode Adaptations ── */
        [data-theme="dark"] .flim-editorial-footer {
          background: #07080B;
          color: #FFFFFF;
        }

        [data-theme="dark"] .flim-paper-texture-overlay {
          opacity: 0.18;
          mix-blend-mode: overlay;
        }

        [data-theme="dark"] .flim-noise-overlay {
          opacity: 0.45;
          mix-blend-mode: screen;
        }

        [data-theme="dark"] .flim-main-headline {
          color: #FFFFFF;
        }

        [data-theme="dark"] .headline-grid-box {
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.12) 1px, transparent 1px);
          background-color: rgba(255, 255, 255, 0.04);
          border-color: rgba(255, 255, 255, 0.15);
        }

        [data-theme="dark"] .flim-section-tag {
          color: #94A3B8;
        }

        [data-theme="dark"] .flim-newsletter-pill {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.12);
        }

        [data-theme="dark"] .flim-newsletter-pill:focus-within {
          border-color: #FFFFFF;
          background: rgba(255, 255, 255, 0.12);
          box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
        }

        [data-theme="dark"] .flim-newsletter-input {
          color: #FFFFFF;
        }

        [data-theme="dark"] .flim-newsletter-input::placeholder {
          color: #64748B;
        }

        [data-theme="dark"] .flim-newsletter-btn {
          background: #FFFFFF;
          color: #07080B;
          border-color: #FFFFFF;
        }

        [data-theme="dark"] .flim-newsletter-btn:hover {
          background: #E2E8F0;
        }

        [data-theme="dark"] .flim-copyright {
          color: #94A3B8;
        }

        [data-theme="dark"] .compliance-badge {
          color: #94A3B8;
        }

        [data-theme="dark"] .compliance-badge:hover {
          color: #FFFFFF;
        }

        [data-theme="dark"] .flim-nav-list a {
          color: #CBD5E1;
        }

        [data-theme="dark"] .flim-nav-list a:hover {
          color: #60A5FA;
        }

        [data-theme="dark"] .flim-theme-pill {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.12);
        }

        [data-theme="dark"] .flim-theme-btn {
          color: #94A3B8;
        }

        [data-theme="dark"] .flim-theme-btn:hover {
          color: #FFFFFF;
        }

        [data-theme="dark"] .flim-theme-btn.active {
          background: rgba(255, 255, 255, 0.2);
          color: #FFFFFF;
        }

        [data-theme="dark"] .flim-lang-btn {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.12);
          color: #FFFFFF;
        }

        [data-theme="dark"] .flim-lang-btn:hover {
          background: rgba(255, 255, 255, 0.14);
        }

        [data-theme="dark"] .flim-lang-popup {
          background: #11141C;
          border-color: rgba(255, 255, 255, 0.15);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.6);
        }

        [data-theme="dark"] .flim-lang-item {
          color: #CBD5E1;
        }

        [data-theme="dark"] .flim-lang-item:hover {
          background: rgba(255, 255, 255, 0.08);
          color: #FFFFFF;
        }

        [data-theme="dark"] .flim-giant-wordmark {
          color: #FFFFFF;
        }

        [data-theme="dark"] .portal-doorway-opening {
          background: #07080B;
          border-color: #FFFFFF;
        }

        [data-theme="dark"] .portal-door-leaf {
          background: #181A20;
          border-color: rgba(255, 255, 255, 0.3);
          box-shadow: 6px 3px 16px rgba(0, 0, 0, 0.85);
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .flim-editorial-footer {
            padding: 60px 20px 0 20px;
          }
          .flim-middle-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .flim-col-newsletter {
            max-width: 100%;
          }
        }
      `}</style>
    </footer>
  );
}
