import React from 'react';
import { Link } from 'react-router-dom';

export function LandingNav() {
  return (
    <header className="craft-header-wrapper" id="mobile-header-content">
      <nav className="craft-header-pill" aria-label="Main Navigation">
        {/* Left: Pairly Logo in sleek modern geometric sans matching Craft */}
        <div className="craft-logo-wrapper">
          <Link to="/" className="pairly-logo-link" aria-label="Pairly Logo">
            <span className="pairly-logo-text">pairly</span>
          </Link>
        </div>

        {/* Center: Pairly Navigation items matching Craft's spacing & balanced distribution */}
        <div className="craft-nav-center">
          <ul className="craft-nav-list">
            <li>
              <a href="#features" className="craft-nav-item">
                Features
              </a>
            </li>
            <li>
              <a href="#how-it-works" className="craft-nav-item">
                How it works
              </a>
            </li>
            <li>
              <a href="#educators" className="craft-nav-item">
                Educators
              </a>
            </li>
            <li>
              <a href="#pricing" className="craft-nav-item">
                Pricing
              </a>
            </li>
            <li>
              <Link to="/join" className="craft-nav-item">
                Join Session
              </Link>
            </li>
          </ul>
        </div>

        {/* Right: Actions */}
        <div className="craft-nav-right">
          <Link to="/get-started?mode=login" className="craft-nav-login">
            Log in
          </Link>

          <Link to="/get-started?mode=signup" className="craft-nav-cta">
            <span>Try Pairly Free</span>
          </Link>
        </div>
      </nav>

      <style>{`
        .craft-header-wrapper {
          position: fixed;
          top: 24px;
          left: 0;
          right: 0;
          z-index: 50;
          width: calc(100% - 48px);
          max-width: 860px;
          margin: 0 auto;
          box-sizing: border-box;
        }

        .craft-header-pill {
          width: 100%;
          height: 52px;
          border-radius: 26px;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.82) 100%);
          -webkit-backdrop-filter: blur(16px) saturate(180%);
          backdrop-filter: blur(16px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.75);
          box-shadow: 
            0 12px 24px 2px rgba(0, 0, 0, 0.05),
            0 2px 4px -1px rgba(0, 0, 0, 0.03),
            inset 0 1px 0 rgba(255, 255, 255, 0.95);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 8px 0 20px;
          box-sizing: border-box;
          transition: background-color 200ms ease, box-shadow 200ms ease;
        }

        .craft-logo-wrapper {
          display: flex;
          align-items: center;
        }

        .pairly-logo-link {
          display: flex;
          align-items: center;
          text-decoration: none;
          color: #030302;
          padding: 2px 0;
        }

        .pairly-logo-text {
          font-family: var(--font-display, 'UntitledSerif', 'Fraunces', Georgia, serif);
          font-size: 23px;
          font-weight: 600;
          color: #030302;
          letter-spacing: -0.02em;
          line-height: 1;
        }

        .craft-nav-center {
          display: flex;
          align-items: center;
        }

        .craft-nav-list {
          display: flex;
          align-items: center;
          gap: 24px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .craft-nav-item {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-size: 15px;
          font-weight: 500;
          color: #030302;
          text-decoration: none;
          cursor: pointer;
          transition: color 150ms ease;
          line-height: 1;
          display: inline-block;
          white-space: nowrap;
        }

        .craft-nav-item:hover {
          color: #666666;
        }

        .craft-nav-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .craft-nav-login {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-size: 15px;
          font-weight: 500;
          color: #030302;
          text-decoration: none;
          cursor: pointer;
          padding: 4px 6px;
          transition: color 150ms ease;
          line-height: 1;
          white-space: nowrap;
        }

        .craft-nav-login:hover {
          color: #666666;
        }

        .craft-nav-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 36px;
          padding: 0 16px;
          background-color: #000000;
          color: #FFFFFF;
          border-radius: 9999px;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-size: 14.5px;
          font-weight: 500;
          text-decoration: none;
          white-space: nowrap;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
          transition: background-color 150ms ease, transform 150ms ease;
          line-height: 1;
        }

        .craft-nav-cta:hover {
          background-color: #222222;
        }

        @media (max-width: 820px) {
          .craft-nav-center {
            display: none !important;
          }
          .craft-header-wrapper {
            width: calc(100% - 32px);
          }
        }
      `}</style>
    </header>
  );
}

