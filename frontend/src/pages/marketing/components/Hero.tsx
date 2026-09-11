import React from 'react';
import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <section className="craft-hero-outer-frame">
      <div className="craft-hero-banner-card">
        {/* ── Background Layer 1: Sky Gradient & Paper Texture ── */}
        <div className="hero-sky-canvas" aria-hidden="true">
          <div className="hero-sky-gradient" />
          <img
            src="/images/hero_paper_texture.png"
            alt=""
            className="hero-paper-texture-overlay"
            draggable="false"
          />
        </div>

        {/* ── Background Layer 2: Floating Atmospheric Clouds ── */}
        <div className="hero-clouds-container" aria-hidden="true">
          <img
            src="/images/hero_cloud.png"
            alt=""
            className="hero-cloud-left"
            draggable="false"
          />
          <img
            src="/images/hero_cloud.png"
            alt=""
            className="hero-cloud-right"
            draggable="false"
          />
        </div>

        {/* ── Background Layer 3: Paper Collage Artwork & Horizon ── */}
        <div className="hero-collage-artwork" aria-hidden="true">
          {/* Vector Horizon Outline */}
          <div className="hero-vector-horizon">
            <img
              src="/images/hero_landscape_outline.svg"
              alt=""
              className="hero-horizon-svg"
              draggable="false"
            />
          </div>

          {/* Left: Stepped paper stairs and lavender mountain */}
          <div className="hero-mountain-lavender">
            <div className="mountain-stairs" />
          </div>

          {/* Center: Torn white paper peak */}
          <div className="hero-torn-paper-peak" />

          {/* Right: Black torn paper and yellow lined notebook paper */}
          <img
            src="/images/hero_paper_black.png"
            alt=""
            className="hero-torn-black-paper"
            draggable="false"
          />
          <img
            src="/images/hero_paper_notebook.webp"
            alt=""
            className="hero-notebook-paper"
            draggable="false"
          />
        </div>

        {/* ── Foreground: Hero Headline, Subhead & Floating Pill CTA ── */}
        <div className="hero-content-wrapper">
          <h1 className="craft-hero-h1">
            Not what they answer.<br />
            <span className="craft-hero-italic">How they think.</span>
          </h1>

          <p className="craft-hero-subhead">
            Pairly replaces the multiple-choice poll with tactile, spatial, real-time interactions — so a lecture hall of 300 can show you exactly where they're confused, together.
          </p>

          <div className="craft-hero-cta-group">
            <Link to="/get-started?mode=signup" className="craft-hero-floating-btn">
              <span>Try Pairly Free</span>
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .craft-hero-outer-frame {
          width: 100%;
          padding: 0;
          margin: 0;
          box-sizing: border-box;
          overflow: hidden;
          position: relative;
        }

        .craft-hero-banner-card {
          width: 100%;
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          background: linear-gradient(180deg, #9ED4EF 0%, #BEE4F7 28%, #DFEFF9 62%, #FAF8F5 100%);
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* ── Sky & Paper Background ── */
        .hero-sky-canvas {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
        }

        .hero-sky-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, #9ED4EF 0%, #BEE4F7 28%, #DFEFF9 62%, #FAF8F5 100%);
        }

        .hero-paper-texture-overlay {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.45;
          mix-blend-mode: overlay;
        }

        /* ── Floating Clouds ── */
        .hero-clouds-container {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 2;
          overflow: hidden;
        }

        .hero-cloud-left {
          position: absolute;
          left: -80px;
          top: 100px;
          width: 480px;
          opacity: 0.88;
          transform: rotate(-2deg);
        }

        .hero-cloud-right {
          position: absolute;
          right: -80px;
          top: 50px;
          width: 500px;
          opacity: 0.82;
          transform: scaleX(-1) rotate(2deg);
        }

        /* ── Collage Horizon & Torn Paper ── */
        .hero-collage-artwork {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 3;
          overflow: hidden;
        }

        .hero-vector-horizon {
          position: absolute;
          bottom: 100px;
          left: 0;
          width: 100%;
          height: 260px;
          opacity: 0.22;
          display: flex;
          align-items: flex-end;
          overflow: hidden;
        }

        .hero-horizon-svg {
          width: 100%;
          min-width: 1440px;
          height: auto;
          color: #030302;
        }

        .hero-mountain-lavender {
          position: absolute;
          left: -40px;
          bottom: -30px;
          width: 480px;
          height: 380px;
          background: linear-gradient(145deg, #9B88DE 0%, #826EC9 100%);
          border-radius: 40px 140px 0 0;
          transform: rotate(4deg);
          opacity: 0.95;
          box-shadow: 0 12px 30px rgba(130, 110, 201, 0.25);
        }

        .mountain-stairs {
          position: absolute;
          top: 24px;
          right: 28px;
          width: 140px;
          height: 140px;
          background: repeating-linear-gradient(
            -45deg,
            rgba(255, 255, 255, 0.45),
            rgba(255, 255, 255, 0.45) 8px,
            transparent 8px,
            transparent 16px
          );
          clip-path: polygon(0 0, 100% 0, 100% 100%, 75% 100%, 75% 75%, 50% 75%, 50% 50%, 25% 50%, 25% 25%, 0 25%);
        }

        .hero-torn-paper-peak {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: 0px;
          width: 580px;
          height: 340px;
          background: #FFFFFF;
          clip-path: polygon(
            15% 100%, 28% 48%, 35% 52%, 48% 18%, 56% 32%, 68% 12%, 78% 44%, 86% 38%, 95% 100%
          );
          opacity: 0.92;
          box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.05);
        }

        .hero-torn-black-paper {
          position: absolute;
          right: 80px;
          bottom: 20px;
          width: 340px;
          opacity: 0.85;
          transform: rotate(8deg);
        }

        .hero-notebook-paper {
          position: absolute;
          right: -40px;
          bottom: -40px;
          width: 480px;
          opacity: 0.92;
          transform: rotate(-10deg);
        }

        /* ── Foreground Content ── */
        .hero-content-wrapper {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 150px 24px 130px 24px;
          box-sizing: border-box;
          width: 100%;
        }

        .craft-hero-h1 {
          font-family: var(--font-display, 'Fraunces', Georgia, serif);
          font-size: clamp(44px, 6vw, 76px);
          font-weight: 500;
          color: #030302;
          line-height: 1.08;
          letter-spacing: -0.025em;
          margin: 0;
          max-width: 900px;
        }

        .craft-hero-italic {
          font-style: italic;
          font-weight: 400;
        }

        .craft-hero-subhead {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-size: 17px;
          line-height: 1.58;
          color: rgba(3, 3, 2, 0.75);
          max-width: 640px;
          margin: 24px auto 32px auto;
        }

        .craft-hero-cta-group {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .craft-hero-floating-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 52px;
          padding: 0 38px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.92);
          -webkit-backdrop-filter: blur(14px);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(255, 255, 255, 0.95);
          box-shadow: 
            0 14px 28px 2px rgba(0, 0, 0, 0.08),
            0 2px 4px -1px rgba(0, 0, 0, 0.03),
            inset 0 1px 0 rgba(255, 255, 255, 1);
          color: #030302;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-size: 16px;
          font-weight: 600;
          text-decoration: none;
          transition: all 200ms ease;
          cursor: pointer;
        }

        .craft-hero-floating-btn:hover {
          background: rgba(255, 255, 255, 1);
          transform: translateY(-2px);
          box-shadow: 
            0 20px 36px 4px rgba(0, 0, 0, 0.12),
            0 4px 6px -1px rgba(0, 0, 0, 0.04),
            inset 0 1px 0 rgba(255, 255, 255, 1);
        }

        @media (max-width: 900px) {
          .craft-hero-banner-card {
            min-height: 85vh;
          }
          .hero-content-wrapper {
            padding: 120px 16px 90px 16px;
          }
          .hero-mountain-lavender, .hero-notebook-paper, .hero-torn-black-paper {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}


