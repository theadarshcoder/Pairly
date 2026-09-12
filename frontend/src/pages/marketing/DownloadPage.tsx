import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LandingNav } from './components/LandingNav.js';
import { LandingFooter } from './components/LandingFooter.js';

export default function DownloadPage() {
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin + '/join');
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  return (
    <div className="download-page-wrapper">
      <LandingNav />

      <main className="download-main">
        {/* Top Atmosphere */}
        <div className="download-hero-section">
          <div className="landing-container">
            <div className="download-hero-content">
              <span className="download-eyebrow">Pairly Ecosystem</span>
              <h1 className="download-h1">
                From the lecture podium<br />
                <em>to every student’s palm.</em>
              </h1>
              <p className="download-subhead">
                Zero installation required for students. Native low-latency companion apps for professors, lecturers, and clinical proctors.
              </p>
            </div>
          </div>
        </div>

        {/* 3 Download Channels Grid */}
        <section className="download-channels-section">
          <div className="landing-container">
            <div className="download-grid">
              {/* Card 1: iOS & iPadOS Companion */}
              <div className="download-card featured">
                <div className="card-badge">FOR PROFESSORS</div>
                <div className="download-icon-circle apple">
                  <svg className="apple-logo-svg" viewBox="0 0 170 170" fill="currentColor">
                    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.69-7.83-11.97-14.36-6.19-9.58-11.1-20.73-14.73-33.46-3.63-12.73-5.45-24.49-5.45-35.28 0-14.93 3.65-27.42 10.96-37.47 7.3-10.05 16.63-15.19 27.97-15.42 4.9.11 10.33 1.34 16.3 3.69 5.98 2.36 9.87 3.6 11.68 3.73 2.12-.22 6.27-1.57 12.44-4.05 6.18-2.48 11.45-3.6 15.82-3.35 11.97.98 21.6 5.33 28.89 13.06-10.45 6.32-15.57 15.14-15.35 26.47.22 8.71 3.59 16.12 10.11 22.23 6.53 6.1 14.15 9.58 22.86 10.45-2.29 6.75-5.02 13.51-8.19 20.28zM119.22 31.84c0-7.18 2.61-13.93 7.83-20.25 5.22-6.32 11.66-10.37 19.32-12.16.22 1.3.33 2.61.33 3.92 0 7.3-2.73 14.28-8.19 20.93-5.45 6.64-11.89 10.45-19.29 11.44v-3.88z" />
                  </svg>
                </div>
                <h3 className="download-card-title">Pairly for iPadOS & iOS</h3>
                <p className="download-card-desc">
                  Control the auditorium projector from your Apple Pencil. Annotate student heatmaps, freeze timers, and launch peer debates on the fly.
                </p>

                {/* Simulated QR Code Scan */}
                <div className="qr-scan-box">
                  <div className="qr-pattern-mock">
                    <div className="qr-corner top-left" />
                    <div className="qr-corner top-right" />
                    <div className="qr-corner bottom-left" />
                    <div className="qr-grid-lines" />
                  </div>
                  <span className="qr-caption">Scan with iPhone or iPad Camera to Install</span>
                </div>

                <a
                  href="https://apple.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="download-btn-primary"
                >
                  Download on the App Store ↗
                </a>
                <span className="os-req-text">Requires iPadOS 16.0+ or iOS 16.0+</span>
              </div>

              {/* Card 2: Desktop Presenter */}
              <div className="download-card">
                <div className="card-badge">STAGE & PROJECTOR</div>
                <div className="download-icon-circle desktop">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                </div>
                <h3 className="download-card-title">Desktop Presenter Shell</h3>
                <p className="download-card-desc">
                  Native macOS and Windows application optimized for dual-monitor podium setups. Project full-screen spatial visuals while viewing private student confusion markers.
                </p>

                <div className="version-info-box">
                  <div className="info-row">
                    <span>macOS (Apple Silicon & Intel)</span>
                    <strong>v1.8.2 (.dmg)</strong>
                  </div>
                  <div className="info-row">
                    <span>Windows 11 / 10 64-bit</span>
                    <strong>v1.8.2 (.exe)</strong>
                  </div>
                </div>

                <div className="download-btn-group">
                  <button
                    type="button"
                    className="download-btn-secondary"
                    onClick={() => alert('Pairly Presenter for macOS download initiated.')}
                  >
                    Download for Mac (.dmg)
                  </button>
                  <button
                    type="button"
                    className="download-btn-secondary"
                    onClick={() => alert('Pairly Presenter for Windows download initiated.')}
                  >
                    Download for Windows (.exe)
                  </button>
                </div>
                <span className="os-req-text">Automatic background updates supported</span>
              </div>

              {/* Card 3: Instant Web Client */}
              <div className="download-card">
                <div className="card-badge">FOR STUDENTS</div>
                <div className="download-icon-circle web">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </div>
                <h3 className="download-card-title">Zero-Install Web App</h3>
                <p className="download-card-desc">
                  Students join in 4 seconds by entering a 6-digit PIN on any mobile browser. No app store download, no login barrier, zero tracking cookies.
                </p>

                <div className="student-join-preview">
                  <span className="join-url-pill">pairly.app/join</span>
                  <button
                    type="button"
                    className="copy-join-link-btn"
                    onClick={handleCopyLink}
                  >
                    {copiedLink ? '✓ Copied Link' : 'Copy Student Join Link'}
                  </button>
                </div>

                <Link to="/join" className="download-btn-outline">
                  Open Student Join Portal →
                </Link>
                <span className="os-req-text">Compatible with Safari, Chrome, Edge & Firefox</span>
              </div>
            </div>
          </div>
        </section>

        {/* Security / FERPA highlight */}
        <section className="download-guarantee-section">
          <div className="landing-container">
            <div className="guarantee-card">
              <div className="guarantee-icon">🛡️</div>
              <div className="guarantee-text">
                <h4>Institutional Device Management</h4>
                <p>
                  Deploy Pairly across your university IT fleet using Jamf, Microsoft Intune, or Google Workspace. Fully sandboxed and compliant with FERPA, COPPA, and student privacy statutes.
                </p>
              </div>
              <Link to="/security" className="guarantee-link">
                Review IT Whitepaper →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />

      <style>{`
        .download-page-wrapper {
          min-height: 100vh;
          background-color: var(--paper, #FAF7F2);
          display: flex;
          flex-direction: column;
        }

        .download-main {
          flex: 1;
          padding-top: 120px;
        }

        .download-hero-section {
          padding: 60px 0 40px 0;
          text-align: center;
        }

        .download-hero-content {
          max-width: 760px;
          margin: 0 auto;
        }

        .download-eyebrow {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #64748B;
          display: block;
          margin-bottom: 14px;
        }

        .download-h1 {
          font-family: 'UntitledSerif', Georgia, serif;
          font-weight: 400;
          font-size: clamp(34px, 5vw, 54px);
          line-height: 1.12;
          color: #0F172A;
          margin: 0 0 18px 0;
          letter-spacing: -0.03em;
        }

        .download-h1 em {
          font-style: italic;
        }

        .download-subhead {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 17px;
          color: #475569;
          line-height: 1.55;
          margin: 0 auto;
        }

        /* ── Channels Grid ── */
        .download-channels-section {
          padding: 40px 0 80px 0;
        }

        .download-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          align-items: stretch;
        }

        .download-card {
          background: #FFFFFF;
          border-radius: 24px;
          border: 1.5px solid rgba(0, 0, 0, 0.08);
          padding: 36px 30px;
          box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.04);
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .download-card.featured {
          border-color: #0F172A;
          box-shadow: 0 16px 36px -4px rgba(15, 23, 42, 0.1);
        }

        .card-badge {
          align-self: flex-start;
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          padding: 4px 8px;
          border-radius: 6px;
          background: #F1F5F9;
          color: #475569;
          margin-bottom: 20px;
        }

        .download-card.featured .card-badge {
          background: #0F172A;
          color: #FFFFFF;
        }

        .download-icon-circle {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }

        .download-icon-circle.apple {
          background: #000000;
          color: #FFFFFF;
        }

        .apple-logo-svg {
          width: 24px;
          height: 24px;
        }

        .download-icon-circle.desktop {
          background: #EFF6FF;
          color: #2563EB;
        }

        .download-icon-circle.web {
          background: #ECFDF5;
          color: #059669;
        }

        .download-card-title {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 20px;
          font-weight: 700;
          color: #0F172A;
          margin: 0 0 12px 0;
        }

        .download-card-desc {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 14px;
          line-height: 1.5;
          color: #64748B;
          margin: 0 0 24px 0;
          flex: 1;
        }

        /* QR Scan Mock */
        .qr-scan-box {
          background: #F8FAFC;
          border: 1px dashed #CBD5E1;
          border-radius: 14px;
          padding: 18px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          margin-bottom: 24px;
        }

        .qr-pattern-mock {
          width: 80px;
          height: 80px;
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 8px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .qr-corner {
          position: absolute;
          width: 18px;
          height: 18px;
          border: 3px solid #0F172A;
        }

        .qr-corner.top-left { top: 6px; left: 6px; }
        .qr-corner.top-right { top: 6px; right: 6px; }
        .qr-corner.bottom-left { bottom: 6px; left: 6px; }

        .qr-grid-lines {
          width: 20px;
          height: 20px;
          background-image: radial-gradient(#0F172A 2px, transparent 2px);
          background-size: 5px 5px;
        }

        .qr-caption {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 11px;
          color: #64748B;
          text-align: center;
        }

        .download-btn-primary {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 46px;
          border-radius: 12px;
          background: #000000;
          color: #FFFFFF;
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 13.5px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.15s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .download-btn-primary:hover {
          background: #27272A;
          transform: translateY(-1px);
        }

        .version-info-box {
          background: #F8FAFC;
          border-radius: 12px;
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 24px;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 12px;
          color: #64748B;
        }

        .info-row strong {
          color: #0F172A;
        }

        .download-btn-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .download-btn-secondary {
          height: 42px;
          border-radius: 10px;
          background: #F1F5F9;
          border: 1px solid #CBD5E1;
          color: #0F172A;
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .download-btn-secondary:hover {
          background: #E2E8F0;
        }

        .student-join-preview {
          background: #F8FAFC;
          border-radius: 12px;
          padding: 16px;
          text-align: center;
          margin-bottom: 24px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .join-url-pill {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 16px;
          font-weight: 700;
          color: #059669;
          letter-spacing: 0.05em;
        }

        .copy-join-link-btn {
          background: #FFFFFF;
          border: 1px solid #CBD5E1;
          padding: 6px 12px;
          border-radius: 9999px;
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 12px;
          font-weight: 600;
          color: #334155;
          cursor: pointer;
        }

        .download-btn-outline {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 44px;
          border-radius: 10px;
          background: #059669;
          color: #FFFFFF;
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 13.5px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.15s ease;
        }

        .download-btn-outline:hover {
          background: #047857;
        }

        .os-req-text {
          display: block;
          text-align: center;
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 11px;
          color: #94A3B8;
          margin-top: 12px;
        }

        /* ── IT / Enterprise Guarantee ── */
        .download-guarantee-section {
          padding: 0 0 80px 0;
        }

        .guarantee-card {
          background: #FFFFFF;
          border-radius: 20px;
          border: 1.5px solid rgba(0, 0, 0, 0.08);
          padding: 28px 36px;
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .guarantee-icon {
          font-size: 36px;
          flex-shrink: 0;
        }

        .guarantee-text {
          flex: 1;
        }

        .guarantee-text h4 {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 16px;
          font-weight: 700;
          color: #0F172A;
          margin: 0 0 4px 0;
        }

        .guarantee-text p {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 13.5px;
          line-height: 1.5;
          color: #64748B;
          margin: 0;
        }

        .guarantee-link {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 13.5px;
          font-weight: 600;
          color: #0F172A;
          text-decoration: none;
          white-space: nowrap;
        }

        /* ── Dark Mode ── */
        [data-theme="dark"] .download-page-wrapper {
          background-color: #07080B;
        }

        [data-theme="dark"] .download-h1 {
          color: #FFFFFF;
        }

        [data-theme="dark"] .download-subhead {
          color: #94A3B8;
        }

        [data-theme="dark"] .download-card {
          background: #11141C;
          border-color: rgba(255, 255, 255, 0.1);
        }

        [data-theme="dark"] .download-card.featured {
          border-color: #3B82F6;
        }

        [data-theme="dark"] .download-card-title {
          color: #FFFFFF;
        }

        [data-theme="dark"] .qr-scan-box {
          background: #1E293B;
          border-color: rgba(255, 255, 255, 0.15);
        }

        [data-theme="dark"] .version-info-box {
          background: #1E293B;
        }

        [data-theme="dark"] .info-row strong {
          color: #FFFFFF;
        }

        [data-theme="dark"] .download-btn-secondary {
          background: #1E293B;
          border-color: rgba(255, 255, 255, 0.15);
          color: #FFFFFF;
        }

        [data-theme="dark"] .student-join-preview {
          background: #1E293B;
        }

        [data-theme="dark"] .guarantee-card {
          background: #11141C;
          border-color: rgba(255, 255, 255, 0.1);
        }

        [data-theme="dark"] .guarantee-text h4 {
          color: #FFFFFF;
        }

        [data-theme="dark"] .guarantee-link {
          color: #60A5FA;
        }

        @media (max-width: 900px) {
          .download-grid {
            grid-template-columns: 1fr;
          }
          .guarantee-card {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}
