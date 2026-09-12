import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { applyTheme, getStoredTheme, ThemeMode } from '../../../shared/lib/theme.js';

/* ── Compliance Badges (SOC 2, HIPAA, GDPR) ── */
function Soc2Badge({ size = 38 }: { size?: number }) {
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
          fontFamily="var(--font-body, 'Inter', -apple-system, sans-serif)"
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
          fontFamily="var(--font-body, 'Inter', -apple-system, sans-serif)"
        >
          SOC 2
        </text>
      </svg>
    </div>
  );
}

function HipaaBadge({ size = 38 }: { size?: number }) {
  return (
    <div
      className="compliance-badge"
      title="HIPAA Compliant"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="19" stroke="currentColor" strokeWidth="1" strokeDasharray="1.5 1.5" opacity="0.6" />
        <circle cx="20" cy="20" r="17.5" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
        {/* Caduceus / Medical staff outline */}
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
          fontFamily="var(--font-body, 'Inter', -apple-system, sans-serif)"
        >
          HIPAA
        </text>
      </svg>
    </div>
  );
}

function GdprBadge({ size = 38 }: { size?: number }) {
  return (
    <div
      className="compliance-badge"
      title="GDPR Compliant"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="19" stroke="currentColor" strokeWidth="1" strokeDasharray="1.5 1.5" opacity="0.6" />
        <circle cx="20" cy="20" r="17.5" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
        {/* EU 12 Stars ring */}
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
          fontFamily="var(--font-body, 'Inter', -apple-system, sans-serif)"
        >
          GDPR
        </text>
      </svg>
    </div>
  );
}

/* ── Theme Switcher Icons ── */
function SystemIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

function SunIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function GlobeIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function ChevronDownIcon({ size = 12 }: { size?: number }) {
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
  '한국어',
  '中文',
];

export function LandingFooter() {
  const [theme, setTheme] = useState<ThemeMode>(getStoredTheme);
  const [language, setLanguage] = useState('English');
  const [isLangOpen, setIsLangOpen] = useState(false);
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

  return (
    <footer className="adaline-footer">
      <div className="footer-glow-vignette" aria-hidden="true" />

      <div className="footer-container">
        {/* ── Top Main Row: Brand & Columns ── */}
        <div className="footer-main-grid">
          {/* Left Column: Brand Info */}
          <div className="footer-brand-column">
            <Link to="/" className="footer-brand-logo" aria-label="Pairly">
              <span className="pairly-logo-text-footer">pairly</span>
            </Link>

            <p className="footer-tagline">Never stop learning</p>

            {/* Compliance Badges */}
            <div className="footer-compliance-row">
              <Soc2Badge size={38} />
              <HipaaBadge size={38} />
              <GdprBadge size={38} />
            </div>

            <p className="footer-copyright">
              © {new Date().getFullYear()} Pairly Inc.
            </p>
          </div>

          {/* Right Columns: Links */}
          <div className="footer-links-grid">
            {/* Column 1: COMPANY */}
            <div className="footer-link-group">
              <h4 className="footer-column-title">COMPANY</h4>
              <ul className="footer-link-list">
                <li><Link to="/#how-it-works">The Self-Improving Agent</Link></li>
                <li><Link to="/#features">Labs</Link></li>
                <li><Link to="/#features">Applied</Link></li>
                <li><Link to="/#features">Blog</Link></li>
                <li><Link to="/#features">Careers</Link></li>
              </ul>
            </div>

            {/* Column 2: RESOURCES */}
            <div className="footer-link-group">
              <h4 className="footer-column-title">RESOURCES</h4>
              <ul className="footer-link-list">
                <li><Link to="/#features">Documentation</Link></li>
                <li><Link to="/#features">API reference</Link></li>
                <li><Link to="/#features">DPA</Link></li>
                <li><Link to="/#features">Privacy policy</Link></li>
                <li><Link to="/#features">Terms of service</Link></li>
                <li><Link to="/#features">Report vulnerability</Link></li>
              </ul>
            </div>

            {/* Column 3: CONNECT */}
            <div className="footer-link-group">
              <h4 className="footer-column-title">CONNECT</h4>
              <ul className="footer-link-list">
                <li><a href="https://github.com/theadarshcoder/Pairly" target="_blank" rel="noopener noreferrer">Github</a></li>
                <li><Link to="/#features">Newsletter</Link></li>
                <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">X (Twitter)</a></li>
                <li><a href="https://youtube.com" target="_blank" rel="noopener noreferrer">YouTube</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* ── Bottom Controls Row: Theme Switcher & Language Pill ── */}
        <div className="footer-bottom-controls-row">
          <div className="controls-group">
            {/* 1. Theme Switcher Pill */}
            <div className="theme-switcher-pill" role="radiogroup" aria-label="Theme mode">
              <button
                type="button"
                className={`theme-pill-btn ${theme === 'system' ? 'active' : ''}`}
                onClick={() => handleSelectTheme('system')}
                title="System theme"
                aria-label="System theme"
              >
                <SystemIcon size={15} />
              </button>
              <button
                type="button"
                className={`theme-pill-btn ${theme === 'light' ? 'active' : ''}`}
                onClick={() => handleSelectTheme('light')}
                title="Light mode"
                aria-label="Light mode"
              >
                <SunIcon size={15} />
              </button>
              <button
                type="button"
                className={`theme-pill-btn ${theme === 'dark' ? 'active' : ''}`}
                onClick={() => handleSelectTheme('dark')}
                title="Dark mode"
                aria-label="Dark mode"
              >
                <MoonIcon size={15} />
              </button>
            </div>

            {/* 2. Language Switcher Pill */}
            <div className="language-dropdown-wrapper" ref={langDropdownRef}>
              <button
                type="button"
                className="language-pill-btn"
                onClick={() => setIsLangOpen(!isLangOpen)}
                aria-expanded={isLangOpen}
                aria-label="Select language"
              >
                <GlobeIcon size={17} />
                <span className="language-name">{language}</span>
                <ChevronDownIcon size={11} />
              </button>

              {isLangOpen && (
                <div className="language-menu-popup">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      className={`language-menu-item ${language === lang ? 'selected' : ''}`}
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

      <style>{`
        .adaline-footer {
          position: relative;
          background: #08090B;
          color: #FFFFFF;
          padding: 80px 24px 44px 24px;
          box-sizing: border-box;
          overflow: hidden;
          font-family: var(--font-body, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .footer-glow-vignette {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 160px;
          background: radial-gradient(
            50% 100% at 50% 0%,
            rgba(34, 48, 38, 0.28) 0%,
            rgba(8, 9, 11, 0) 100%
          );
          pointer-events: none;
          opacity: 0.65;
        }

        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        /* ── Main Grid ── */
        .footer-main-grid {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 48px;
          padding-bottom: 64px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        /* Brand Column */
        .footer-brand-column {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 16px;
          max-width: 320px;
        }

        .footer-brand-logo {
          display: inline-flex;
          align-items: center;
          text-decoration: none;
          transition: opacity 0.2s ease;
        }

        .footer-brand-logo:hover {
          opacity: 0.85;
        }

        .pairly-logo-text-footer {
          font-family: var(--font-display, 'UntitledSerif', 'Fraunces', Georgia, serif);
          font-size: 28px;
          font-weight: 600;
          letter-spacing: -0.025em;
          line-height: 1;
          color: #FFFFFF;
        }

        .footer-tagline {
          font-family: var(--font-display, 'UntitledSerif', 'Fraunces', Georgia, serif);
          font-style: italic;
          font-size: 16.5px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.72);
          margin: 0;
          line-height: 1.5;
          letter-spacing: -0.01em;
        }

        .footer-compliance-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 14px;
        }

        .compliance-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.55);
          transition: all 0.2s ease;
          cursor: default;
        }

        .compliance-badge:hover {
          color: rgba(255, 255, 255, 0.9);
          transform: translateY(-1px);
        }

        .footer-copyright {
          font-family: var(--font-body, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
          font-size: 13.5px;
          color: rgba(255, 255, 255, 0.42);
          margin: 10px 0 0 0;
          letter-spacing: -0.01em;
        }

        /* Link Columns */
        .footer-links-grid {
          display: flex;
          gap: 72px;
          flex-wrap: wrap;
        }

        .footer-link-group {
          display: flex;
          flex-direction: column;
          gap: 16px;
          min-width: 140px;
        }

        .footer-column-title {
          font-family: var(--font-body, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.45);
          margin: 0;
        }

        .footer-link-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footer-link-list a {
          font-family: var(--font-body, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
          color: rgba(255, 255, 255, 0.78);
          text-decoration: none;
          font-size: 14px;
          font-weight: 400;
          line-height: 1.5;
          letter-spacing: -0.01em;
          transition: color 0.15s ease, transform 0.15s ease;
          display: inline-block;
        }

        .footer-link-list a:hover {
          color: #FFFFFF;
          transform: translateX(2px);
        }

        /* ── Bottom Controls Row (Screenshot 1) ── */
        .footer-bottom-controls-row {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          padding-top: 36px;
        }

        .controls-group {
          display: inline-flex;
          align-items: center;
          gap: 16px;
        }

        /* ── Theme Switcher Pill ── */
        .theme-switcher-pill {
          display: inline-flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 9999px;
          padding: 4px;
          gap: 2px;
          backdrop-filter: blur(8px);
        }

        .theme-pill-btn {
          width: 32px;
          height: 28px;
          border-radius: 9999px;
          border: none;
          background: transparent;
          color: rgba(255, 255, 255, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.18s ease;
          padding: 0;
        }

        .theme-pill-btn:hover {
          color: rgba(255, 255, 255, 0.85);
        }

        .theme-pill-btn.active {
          background: rgba(255, 255, 255, 0.18);
          color: #FFFFFF;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
        }

        /* ── Language Switcher Pill ── */
        .language-dropdown-wrapper {
          position: relative;
        }

        .language-pill-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          height: 36px;
          padding: 0 16px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.9);
          font-family: var(--font-body, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
          font-size: 13.5px;
          font-weight: 500;
          letter-spacing: -0.01em;
          cursor: pointer;
          backdrop-filter: blur(8px);
          transition: all 0.18s ease;
        }

        .language-pill-btn:hover {
          background: rgba(255, 255, 255, 0.13);
          color: #FFFFFF;
          border-color: rgba(255, 255, 255, 0.18);
        }

        .language-name {
          line-height: 1;
        }

        .language-menu-popup {
          position: absolute;
          bottom: calc(100% + 10px);
          right: 0;
          min-width: 140px;
          background: #181A1E;
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 14px;
          padding: 6px;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.45);
          display: flex;
          flex-direction: column;
          gap: 2px;
          z-index: 100;
          backdrop-filter: blur(12px);
        }

        .language-menu-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 12px;
          border-radius: 8px;
          border: none;
          background: transparent;
          color: rgba(255, 255, 255, 0.8);
          font-family: var(--font-body, 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
          font-size: 13px;
          font-weight: 500;
          letter-spacing: -0.01em;
          cursor: pointer;
          text-align: left;
          transition: all 0.15s ease;
        }

        .language-menu-item:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #FFFFFF;
        }

        .language-menu-item.selected {
          color: #FFFFFF;
          font-weight: 600;
        }

        .check-dot {
          color: #2DD4A7;
          font-size: 12px;
        }

        @media (max-width: 900px) {
          .adaline-footer {
            padding: 60px 20px 40px 20px;
          }
          .footer-main-grid {
            flex-direction: column;
            gap: 48px;
          }
          .footer-links-grid {
            gap: 40px 48px;
            width: 100%;
          }
          .footer-bottom-controls-row {
            justify-content: flex-start;
          }
        }
      `}</style>
    </footer>
  );
}
