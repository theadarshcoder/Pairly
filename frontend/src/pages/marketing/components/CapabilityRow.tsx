import React from 'react';
import { NetworkMatchIcon } from '../icons/NetworkMatchIcon.js';
import { HotspotIcon } from '../icons/HotspotIcon.js';
import { SortingIcon } from '../icons/SortingIcon.js';
import { PeerReviewIcon } from '../icons/PeerReviewIcon.js';
import { QnaIcon } from '../icons/QnaIcon.js';
import {
  AmazonLogo,
  AdobeLogo,
  VercelLogo,
  ZoomLogo,
  LATimesLogo,
  StanfordLogo,
} from './PartnerLogos.js';

interface CapabilityItem {
  icon: React.ReactNode;
  label: string;
}

const CAPABILITIES: CapabilityItem[] = [
  {
    icon: <NetworkMatchIcon size={28} />,
    label: 'Network Matching',
  },
  {
    icon: <HotspotIcon size={28} />,
    label: 'Spatial Hotspots',
  },
  {
    icon: <SortingIcon size={28} />,
    label: 'Sequential Sorting',
  },
  {
    icon: <PeerReviewIcon size={28} />,
    label: 'Peer Review Swarm',
  },
  {
    icon: <QnaIcon size={28} />,
    label: 'Q&A Dedup',
  },
];

function SparkleStar({ size = 28, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 0C12 6.627 6.627 12 0 12c6.627 0 12 5.627 12 12 0-6.627 5.627-12 12-12-6.627 0-12-5.627-12-12z" />
    </svg>
  );
}

export function CapabilityRow() {
  return (
    <section className="gamma-sky-section" id="how-it-works">
      {/* ── Background Layer 1: Atmospheric Sky & Radial Glow ── */}
      <div className="sky-canvas" aria-hidden="true">
        <div className="sky-gradient-base" />
        <div className="sky-center-radial" />
        <img
          src="/images/hero_paper_texture.png"
          alt=""
          className="sky-paper-texture"
          draggable="false"
        />
      </div>

      {/* ── Background Layer 2: Sunset Flanking Clouds ── */}
      <div className="sky-clouds-wrap" aria-hidden="true">
        <img
          src="/images/cloud_sunset.png"
          alt=""
          className="sunset-cloud-left"
          draggable="false"
        />
        <img
          src="/images/cloud_sunset.png"
          alt=""
          className="sunset-cloud-right"
          draggable="false"
        />
      </div>

      {/* ── Content Container ── */}
      <div className="sky-content-container">
        {/* ── Tier 1: Social Proof Logos Bar ── */}
        <div className="sky-social-proof">
          <p className="sky-social-heading">Your next big idea is in good company</p>
          <div className="sky-logos-strip">
            <div className="sky-logo-wrap"><AmazonLogo height={22} className="sky-logo-svg" /></div>
            <div className="sky-logo-wrap"><AdobeLogo height={20} className="sky-logo-svg" /></div>
            <div className="sky-logo-wrap"><VercelLogo height={20} className="sky-logo-svg" /></div>
            <div className="sky-logo-wrap"><ZoomLogo height={22} className="sky-logo-svg" /></div>
            <div className="sky-logo-wrap"><LATimesLogo height={20} className="sky-logo-svg" /></div>
            <div className="sky-logo-wrap"><StanfordLogo height={22} className="sky-logo-svg" /></div>
          </div>
        </div>

        {/* ── Tier 2: Transition Headline with Luminous Sparkles ── */}
        <div className="sky-headline-tier">
          <div className="sparkle-bracket left" aria-hidden="true">
            <SparkleStar size={34} className="sparkle-primary" />
            <SparkleStar size={16} className="sparkle-secondary" />
          </div>

          <h2 className="sky-headline-text">
            Five ways to see a room think
          </h2>

          <div className="sparkle-bracket right" aria-hidden="true">
            <SparkleStar size={34} className="sparkle-primary" />
            <SparkleStar size={16} className="sparkle-secondary" />
          </div>
        </div>

        {/* ── Tier 3: 5 Glassmorphic Capability Tiles ── */}
        <div className="sky-capabilities-grid">
          {CAPABILITIES.map((item, idx) => (
            <div key={idx} className="sky-capability-item">
              <div className="sky-icon-tile">
                {item.icon}
              </div>
              <span className="sky-capability-label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .gamma-sky-section {
          position: relative;
          width: 100%;
          overflow: hidden;
          padding: 80px 24px 100px 24px;
          box-sizing: border-box;
          background: linear-gradient(
            180deg,
            #F0F6FE 0%,
            #DCE9FD 12%,
            #B2D6FD 26%,
            #9BD2FD 44%,
            #B0E3FD 62%,
            #D2F0FD 80%,
            #EDF8FE 92%,
            #FAF8F5 100%
          );
        }

        /* ── Canvas Layers ── */
        .sky-canvas {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
        }

        .sky-gradient-base {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            #F0F6FE 0%,
            #DCE9FD 12%,
            #B2D6FD 26%,
            #9BD2FD 44%,
            #B0E3FD 62%,
            #D2F0FD 80%,
            #EDF8FE 92%,
            #FAF8F5 100%
          );
        }

        .sky-center-radial {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse 85% 45% at 50% 32%,
            rgba(255, 255, 255, 0.7) 0%,
            rgba(255, 255, 255, 0) 70%
          );
        }

        .sky-paper-texture {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.35;
          mix-blend-mode: overlay;
        }

        /* ── Sunset Flanking Clouds ── */
        .sky-clouds-wrap {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 2;
          overflow: hidden;
        }

        .sunset-cloud-left {
          position: absolute;
          left: -60px;
          top: -40px;
          width: 460px;
          opacity: 0.92;
          transform: rotate(-3deg);
          filter: drop-shadow(0 20px 40px rgba(225, 140, 130, 0.35));
        }

        .sunset-cloud-right {
          position: absolute;
          right: -60px;
          top: -40px;
          width: 470px;
          opacity: 0.9;
          transform: scaleX(-1) rotate(3deg);
          filter: drop-shadow(0 20px 40px rgba(225, 140, 130, 0.35));
        }

        /* ── Content Container ── */
        .sky-content-container {
          position: relative;
          z-index: 10;
          max-width: 1140px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        /* ── Tier 1: Social Proof ── */
        .sky-social-proof {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          margin-bottom: 70px;
          width: 100%;
        }

        .sky-social-heading {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-size: 15px;
          font-weight: 500;
          letter-spacing: -0.01em;
          color: #557A9E;
          margin: 0;
        }

        .sky-logos-strip {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 32px 52px;
          width: 100%;
          max-width: 960px;
        }

        .sky-logo-wrap {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.88);
          filter: drop-shadow(0 2px 8px rgba(0, 34, 83, 0.08));
          transition: all 0.2s ease;
        }

        .sky-logo-wrap:hover {
          color: #FFFFFF;
          transform: translateY(-1px);
          filter: drop-shadow(0 4px 14px rgba(255, 255, 255, 0.45));
        }

        .sky-logo-svg {
          display: block;
        }

        /* ── Tier 2: Transition Headline ── */
        .sky-headline-tier {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 24px;
          margin-bottom: 56px;
          position: relative;
          max-width: 900px;
        }

        .sparkle-bracket {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FFFFFF;
          filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.9)) drop-shadow(0 0 20px rgba(175, 225, 255, 0.6));
          user-select: none;
        }

        .sparkle-bracket.left {
          transform: translateY(-2px);
        }

        .sparkle-bracket.right {
          transform: translateY(-2px);
        }

        .sparkle-primary {
          display: block;
          animation: sky-pulse 3s ease-in-out infinite;
        }

        .sparkle-secondary {
          position: absolute;
          top: -10px;
          animation: sky-pulse 2.4s ease-in-out infinite reverse;
        }

        .sparkle-bracket.left .sparkle-secondary {
          right: -8px;
        }

        .sparkle-bracket.right .sparkle-secondary {
          left: -8px;
        }

        @keyframes sky-pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.95;
          }
          50% {
            transform: scale(1.12);
            opacity: 1;
            filter: drop-shadow(0 0 16px rgba(255, 255, 255, 1));
          }
        }

        .sky-headline-text {
          font-family: var(--font-display, 'Fraunces', Georgia, serif);
          font-size: clamp(34px, 4.4vw, 54px);
          font-weight: 500;
          color: #002253;
          line-height: 1.15;
          letter-spacing: -0.025em;
          margin: 0;
          text-align: center;
        }

        /* ── Tier 3: 5 Capabilities Grid ── */
        .sky-capabilities-grid {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 24px 36px;
          width: 100%;
          max-width: 1040px;
        }

        .sky-capability-item {
          flex: 1 1 170px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          min-width: 150px;
          max-width: 190px;
        }

        .sky-icon-tile {
          width: 72px;
          height: 72px;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.78);
          -webkit-backdrop-filter: blur(16px);
          backdrop-filter: blur(16px);
          border: 1.5px solid rgba(255, 255, 255, 0.95);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #002253;
          box-shadow: 
            0 12px 30px -4px rgba(0, 34, 83, 0.08),
            0 2px 6px rgba(0, 34, 83, 0.03),
            inset 0 1px 0 rgba(255, 255, 255, 1);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
        }

        .sky-capability-item:hover .sky-icon-tile {
          transform: translateY(-4px);
          background: rgba(255, 255, 255, 0.92);
          border-color: #FFFFFF;
          box-shadow: 
            0 20px 40px -4px rgba(0, 34, 83, 0.14),
            0 4px 10px rgba(0, 34, 83, 0.04),
            inset 0 1px 0 #FFFFFF;
        }

        .sky-capability-label {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-weight: 600;
          font-size: 0.95rem;
          color: #002253;
          text-align: center;
          line-height: 1.35;
          letter-spacing: -0.01em;
        }

        @media (max-width: 900px) {
          .gamma-sky-section {
            padding: 60px 16px 80px 16px;
          }
          .sunset-cloud-left, .sunset-cloud-right {
            width: 280px;
            top: -20px;
          }
          .sunset-cloud-left { left: -40px; }
          .sunset-cloud-right { right: -40px; }
          .sky-social-proof {
            margin-bottom: 50px;
          }
          .sky-logos-strip {
            gap: 24px 36px;
          }
          .sky-headline-tier {
            margin-bottom: 40px;
            gap: 16px;
          }
          .sparkle-primary {
            width: 24px;
            height: 24px;
          }
          .sparkle-secondary {
            display: none;
          }
          .sky-capabilities-grid {
            gap: 20px;
          }
          .sky-icon-tile {
            width: 64px;
            height: 64px;
            border-radius: 16px;
          }
        }
      `}</style>
    </section>
  );
}
