import React from 'react';
import { Link } from 'react-router-dom';

export function FinalCta() {
  return (
    <section className="landing-section final-cta-section" style={{ padding: '64px 0' }}>
      <div className="landing-container">
        <div className="final-cta-panel">
          {/* Authentic Craft.do paper texture overlay */}
          <img
            src="/images/paper-texture.png"
            alt=""
            aria-hidden="true"
            className="final-cta-paper-texture"
          />

          {/* Authentic Craft.do wave brush stroke vector overlay */}
          <div className="final-cta-wave-wrapper" aria-hidden="true">
            <img
              src="/images/download-card-vector.png"
              alt=""
              className="final-cta-wave-img"
            />
          </div>

          {/* Left: Copy */}
          <div className="final-cta-copy">
            <h2 className="final-cta-heading">
              Let’s get started
            </h2>
            <p className="final-cta-subline">
              Start for free. No credit card required.
            </p>
          </div>

          {/* Right: Stacked Action Buttons */}
          <div className="final-cta-actions">
            <Link
              to="/signup"
              className="final-cta-web-btn"
            >
              Continue on web
            </Link>

            <Link
              to="/download"
              className="final-cta-appstore-btn"
            >
              <span className="appstore-btn-content">
                <span>Download on the</span>
                <svg
                  className="apple-icon"
                  viewBox="0 0 170 170"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.69-7.83-11.97-14.36-6.19-9.58-11.1-20.73-14.73-33.46-3.63-12.73-5.45-24.49-5.45-35.28 0-14.93 3.65-27.42 10.96-37.47 7.3-10.05 16.63-15.19 27.97-15.42 4.9.11 10.33 1.34 16.3 3.69 5.98 2.36 9.87 3.6 11.68 3.73 2.12-.22 6.27-1.57 12.44-4.05 6.18-2.48 11.45-3.6 15.82-3.35 11.97.98 21.6 5.33 28.89 13.06-10.45 6.32-15.57 15.14-15.35 26.47.22 8.71 3.59 16.12 10.11 22.23 6.53 6.1 14.15 9.58 22.86 10.45-2.29 6.75-5.02 13.51-8.19 20.28zM119.22 31.84c0-7.18 2.61-13.93 7.83-20.25 5.22-6.32 11.66-10.37 19.32-12.16.22 1.3.33 2.61.33 3.92 0 7.3-2.73 14.28-8.19 20.93-5.45 6.64-11.89 10.45-19.29 11.44v-3.88z" />
                </svg>
                <span>App Store</span>
              </span>
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .final-cta-panel {
          position: relative;
          background-color: #9bd8a9;
          border-radius: 32px;
          border: 1px solid rgba(0, 0, 0, 0.12);
          padding: 48px 56px;
          box-shadow: var(--shadow);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 32px;
          overflow: hidden;
          width: 100%;
        }

        .final-cta-paper-texture {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.3;
          mix-blend-mode: overlay;
          pointer-events: none;
          z-index: 1;
        }

        .final-cta-wave-wrapper {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 2;
        }

        .final-cta-wave-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: right;
          opacity: 0.85;
          user-select: none;
        }

        .final-cta-copy {
          position: relative;
          z-index: 3;
          display: flex;
          flex-direction: column;
          gap: 20px;
          flex: 1;
        }

        .final-cta-heading {
          font-family: 'UntitledSerif', Georgia, serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(2.5rem, 4.4vw, 3.5rem);
          line-height: 1.1;
          letter-spacing: -0.03em;
          margin: 0;
          color: #000000;
        }

        .final-cta-subline {
          font-family: 'UntitledSerif', Georgia, serif;
          font-style: normal;
          font-weight: 400;
          font-size: clamp(1.65rem, 2.6vw, 2.25rem);
          line-height: 1.15;
          letter-spacing: -0.04em;
          margin: 0;
          color: #1B1712;
        }

        .final-cta-actions {
          position: relative;
          z-index: 3;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 18px;
          flex-shrink: 0;
        }

        .final-cta-web-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 56px;
          padding: 0 32px;
          border-radius: 999px;
          background-color: rgba(255, 255, 255, 0.45);
          color: #000000;
          border: 1px solid rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(8px);
          font-family: var(--font-body);
          font-weight: 500;
          font-size: 1.05rem;
          text-decoration: none;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.05), inset 0 1px 1px rgba(255, 255, 255, 0.6);
          transition: background-color 0.15s ease, transform 0.15s ease;
        }
        .final-cta-web-btn:hover {
          background-color: rgba(255, 255, 255, 0.65);
          transform: translateY(-1px);
        }

        .final-cta-appstore-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 56px;
          min-width: 320px;
          padding: 0 32px;
          border-radius: 999px;
          background-color: #000000;
          color: #FFFFFF;
          font-family: var(--font-body);
          font-weight: 500;
          font-size: 1.05rem;
          text-decoration: none;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
          transition: opacity 0.15s ease, transform 0.15s ease;
        }
        .final-cta-appstore-btn:hover {
          opacity: 0.92;
          transform: translateY(-1px);
        }

        .appstore-btn-content {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .apple-icon {
          width: 20px;
          height: 20px;
          display: inline-block;
          flex-shrink: 0;
        }

        @media (max-width: 900px) {
          .final-cta-panel {
            padding: 36px 24px;
            flex-direction: column;
            align-items: flex-start;
            gap: 28px;
          }
          .final-cta-actions {
            width: 100%;
            align-items: stretch;
          }
          .final-cta-web-btn,
          .final-cta-appstore-btn {
            width: 100%;
            min-width: unset;
          }
        }

        /* ── Dark Mode Overrides ── */
        :root[data-theme="dark"] .final-cta-panel,
        [data-theme="dark"] .final-cta-panel {
          background: linear-gradient(135deg, #092015 0%, #103322 50%, #16462F 100%);
          border: 1px solid rgba(188, 230, 201, 0.25);
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.6), 0 0 50px rgba(45, 212, 167, 0.1);
        }

        :root[data-theme="dark"] .final-cta-wave-img,
        [data-theme="dark"] .final-cta-wave-img {
          opacity: 0.18;
          filter: brightness(0.6) hue-rotate(20deg);
        }

        :root[data-theme="dark"] .final-cta-heading,
        [data-theme="dark"] .final-cta-heading {
          color: #FFFFFF;
          text-shadow: 0 2px 20px rgba(0, 0, 0, 0.5);
        }

        :root[data-theme="dark"] .final-cta-subline,
        [data-theme="dark"] .final-cta-subline {
          color: #D2F2DF;
          text-shadow: 0 1px 12px rgba(0, 0, 0, 0.4);
        }

        :root[data-theme="dark"] .final-cta-web-btn,
        [data-theme="dark"] .final-cta-web-btn {
          background-color: rgba(255, 255, 255, 0.14);
          color: #FFFFFF;
          border-color: rgba(255, 255, 255, 0.25);
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3);
        }

        :root[data-theme="dark"] .final-cta-web-btn:hover,
        [data-theme="dark"] .final-cta-web-btn:hover {
          background-color: rgba(255, 255, 255, 0.24);
          border-color: rgba(255, 255, 255, 0.4);
        }

        :root[data-theme="dark"] .final-cta-appstore-btn,
        [data-theme="dark"] .final-cta-appstore-btn {
          background-color: #FFFFFF;
          color: #090A0D;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
        }

        :root[data-theme="dark"] .final-cta-appstore-btn:hover,
        [data-theme="dark"] .final-cta-appstore-btn:hover {
          background-color: #E8E8EC;
        }
      `}</style>
    </section>
  );
}
