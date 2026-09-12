import React from 'react';
import { Link } from 'react-router-dom';
import { LandingNav } from './components/LandingNav.js';
import { LandingFooter } from './components/LandingFooter.js';

export default function AboutPage() {
  const principles = [
    {
      num: '01',
      title: 'Thought is spatial, not multiple-choice',
      desc: 'Whether locating an anatomical anomaly on an MRI, balancing chemical bonds, or navigating algorithmic trees, deep reasoning happens in spatial dimensions. A/B/C/D options flatten complex cognition into lucky guesses.',
    },
    {
      num: '02',
      title: 'Immediate diagnostic friction',
      desc: 'Lecturers shouldn’t wait until midterms to discover that 45% of students misunderstood week 3’s foundational theorem. Pairly renders aggregate confusion density in real-time, right on the podium screen.',
    },
    {
      num: '03',
      title: 'Zero barrier to participation',
      desc: 'No dedicated clicker hardware, no $80 student subscription fees, and no account setup during class. Any smartphone or browser joins in 4 seconds flat.',
    },
    {
      num: '04',
      title: 'Lifelong concept retention',
      desc: 'By pairing spatial questions with spaced micro-retrieval intervals, we model the natural cognitive decay curve so students remember what they learned years after graduation.',
    },
  ];

  return (
    <div className="about-page-wrapper">
      <LandingNav />

      <main className="about-main">
        {/* Hero */}
        <section className="about-hero">
          <div className="landing-container">
            <div className="about-hero-content">
              <span className="about-eyebrow">Our Mission & Pedagogy</span>
              <h1 className="about-h1">
                Replacing the multiple-choice poll with <em>how humans actually think.</em>
              </h1>
              <p className="about-subhead">
                Pairly was founded by cognitive researchers and university educators to solve the silent crisis of modern lecture halls: the illusion of understanding.
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="about-story-section">
          <div className="landing-container">
            <div className="about-story-card">
              <div className="story-content">
                <span className="story-tag">The Genesis</span>
                <h2 className="story-h2">The 4-Option Clicker Trap</h2>
                <p className="story-p">
                  For three decades, higher education relied on the handheld classroom clicker. A professor presents a slide with options A, B, C, and D. Sixty percent select B. The professor nods, assumes the room understands, and advances to the next chapter.
                </p>
                <p className="story-p">
                  Behind that 60%, half the students simply eliminated two obviously wrong choices and took a 50/50 gamble. When asked to explain <em>why</em> B was correct or <em>where</em> the theorem broke down, the room fell silent.
                </p>
                <p className="story-p">
                  Pairly replaces static multiple-choice guessing with continuous spatial interaction. Students tap coordinates on physiological diagrams, re-order thermodynamic pathways, and challenge peers in live debate swarms.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4 Core Principles */}
        <section className="about-principles-section">
          <div className="landing-container">
            <div className="principles-header">
              <span className="principles-eyebrow">Guiding Truths</span>
              <h2 className="principles-h2">Our Pedagogical Principles</h2>
            </div>

            <div className="principles-grid">
              {principles.map((item) => (
                <div key={item.num} className="principle-card">
                  <span className="principle-num">{item.num}</span>
                  <h3 className="principle-title">{item.title}</h3>
                  <p className="principle-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* University Research Partners */}
        <section className="about-partners-section">
          <div className="landing-container">
            <div className="partners-card">
              <h3 className="partners-h3">Tested Across Premier Academic Institutions</h3>
              <p className="partners-sub">
                Developed in partnership with cognitive science labs and pilot lecture halls across the United States.
              </p>
              <div className="partners-names-row">
                <span>Stanford University</span>
                <span className="dot-sep">·</span>
                <span>UC Berkeley</span>
                <span className="dot-sep">·</span>
                <span>Johns Hopkins</span>
                <span className="dot-sep">·</span>
                <span>MIT</span>
                <span className="dot-sep">·</span>
                <span>UCLA</span>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="about-bottom-cta">
          <div className="landing-container">
            <div className="about-cta-panel">
              <h2 className="about-cta-h2">Join the future of lecture engagement</h2>
              <p className="about-cta-sub">
                Try Pairly in your upcoming class. Free for individual professors, zero hardware required.
              </p>
              <Link to="/get-started?mode=signup" className="about-cta-btn">
                Launch Your First Class →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />

      <style>{`
        .about-page-wrapper {
          min-height: 100vh;
          background-color: var(--paper, #FAF7F2);
          display: flex;
          flex-direction: column;
        }

        .about-main {
          flex: 1;
          padding-top: 120px;
        }

        .about-hero {
          padding: 60px 0 40px 0;
          text-align: center;
        }

        .about-hero-content {
          max-width: 820px;
          margin: 0 auto;
        }

        .about-eyebrow {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #64748B;
          display: block;
          margin-bottom: 14px;
        }

        .about-h1 {
          font-family: 'UntitledSerif', Georgia, serif;
          font-weight: 400;
          font-size: clamp(34px, 5.2vw, 56px);
          line-height: 1.1;
          color: #0F172A;
          margin: 0 0 20px 0;
          letter-spacing: -0.03em;
        }

        .about-h1 em {
          font-style: italic;
        }

        .about-subhead {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 18px;
          color: #64748B;
          line-height: 1.55;
          max-width: 680px;
          margin: 0 auto;
        }

        /* ── Story Card ── */
        .about-story-section {
          padding: 40px 0 60px 0;
        }

        .about-story-card {
          background: #FFFFFF;
          border-radius: 24px;
          border: 1.5px solid rgba(0, 0, 0, 0.08);
          padding: 56px 64px;
          box-shadow: 0 4px 24px -2px rgba(0, 0, 0, 0.04);
          max-width: 900px;
          margin: 0 auto;
        }

        .story-tag {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #059669;
          background: #ECFDF5;
          padding: 4px 10px;
          border-radius: 9999px;
          display: inline-block;
          margin-bottom: 16px;
        }

        .story-h2 {
          font-family: 'UntitledSerif', Georgia, serif;
          font-style: italic;
          font-weight: 400;
          font-size: 32px;
          color: #0F172A;
          margin: 0 0 20px 0;
        }

        .story-p {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 16px;
          line-height: 1.65;
          color: #475569;
          margin: 0 0 16px 0;
        }

        .story-p:last-child {
          margin-bottom: 0;
        }

        /* ── Principles ── */
        .about-principles-section {
          padding: 60px 0 80px 0;
        }

        .principles-header {
          text-align: center;
          margin-bottom: 48px;
        }

        .principles-eyebrow {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #64748B;
          display: block;
          margin-bottom: 8px;
        }

        .principles-h2 {
          font-family: 'UntitledSerif', Georgia, serif;
          font-style: italic;
          font-weight: 400;
          font-size: 34px;
          color: #0F172A;
          margin: 0;
        }

        .principles-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        .principle-card {
          background: #FFFFFF;
          border-radius: 20px;
          border: 1.5px solid rgba(0, 0, 0, 0.08);
          padding: 36px 32px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03);
          display: flex;
          flex-direction: column;
        }

        .principle-num {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 18px;
          font-weight: 800;
          color: #94A3B8;
          margin-bottom: 14px;
        }

        .principle-title {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 18px;
          font-weight: 700;
          color: #0F172A;
          margin: 0 0 10px 0;
        }

        .principle-desc {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 14.5px;
          line-height: 1.6;
          color: #64748B;
          margin: 0;
        }

        /* ── Partners ── */
        .about-partners-section {
          padding: 20px 0 80px 0;
        }

        .partners-card {
          background: #F8FAFC;
          border-radius: 20px;
          border: 1px dashed #CBD5E1;
          padding: 40px;
          text-align: center;
        }

        .partners-h3 {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 18px;
          font-weight: 700;
          color: #0F172A;
          margin: 0 0 8px 0;
        }

        .partners-sub {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 14px;
          color: #64748B;
          margin: 0 0 24px 0;
        }

        .partners-names-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 15px;
          font-weight: 600;
          color: #334155;
        }

        .dot-sep {
          color: #CBD5E1;
        }

        /* ── CTA ── */
        .about-bottom-cta {
          padding: 0 0 80px 0;
        }

        .about-cta-panel {
          background: #0A0B0E;
          border-radius: 24px;
          padding: 60px 48px;
          text-align: center;
          color: #FFFFFF;
        }

        .about-cta-h2 {
          font-family: 'UntitledSerif', Georgia, serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(28px, 3.8vw, 42px);
          margin: 0 0 14px 0;
        }

        .about-cta-sub {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 16px;
          color: #94A3B8;
          max-width: 580px;
          margin: 0 auto 32px auto;
        }

        .about-cta-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 48px;
          padding: 0 30px;
          background: #FFFFFF;
          color: #0A0B0E;
          border-radius: 9999px;
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 14.5px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.15s ease;
        }

        .about-cta-btn:hover {
          background: #E2E8F0;
        }

        /* ── Dark Mode ── */
        [data-theme="dark"] .about-page-wrapper {
          background-color: #07080B;
        }

        [data-theme="dark"] .about-h1 {
          color: #FFFFFF;
        }

        [data-theme="dark"] .about-subhead {
          color: #94A3B8;
        }

        [data-theme="dark"] .about-story-card {
          background: #11141C;
          border-color: rgba(255, 255, 255, 0.1);
        }

        [data-theme="dark"] .story-h2 {
          color: #FFFFFF;
        }

        [data-theme="dark"] .story-p {
          color: #94A3B8;
        }

        [data-theme="dark"] .principles-h2 {
          color: #FFFFFF;
        }

        [data-theme="dark"] .principle-card {
          background: #11141C;
          border-color: rgba(255, 255, 255, 0.1);
        }

        [data-theme="dark"] .principle-title {
          color: #FFFFFF;
        }

        [data-theme="dark"] .principle-desc {
          color: #94A3B8;
        }

        [data-theme="dark"] .partners-card {
          background: #11141C;
          border-color: rgba(255, 255, 255, 0.1);
        }

        [data-theme="dark"] .partners-h3 {
          color: #FFFFFF;
        }

        [data-theme="dark"] .partners-sub {
          color: #94A3B8;
        }

        [data-theme="dark"] .partners-names-row {
          color: #CBD5E1;
        }

        @media (max-width: 860px) {
          .about-story-card {
            padding: 36px 24px;
          }
          .principles-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
