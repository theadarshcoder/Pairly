import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LandingNav } from './components/LandingNav.js';
import { LandingFooter } from './components/LandingFooter.js';

interface QuestionPack {
  discipline: string;
  title: string;
  author: string;
  institution: string;
  downloads: string;
  questionsCount: number;
  tag: string;
}

const QUESTION_PACKS: QuestionPack[] = [
  {
    discipline: 'Medical Sciences',
    title: 'Pulmonary Pathologies & Chest X-Ray Coordinate Zones',
    author: 'Dr. Aaron Patel',
    institution: 'Johns Hopkins Medicine',
    downloads: '1,420',
    questionsCount: 24,
    tag: 'Hotspots',
  },
  {
    discipline: 'Computer Science',
    title: 'Binary Search Tree Balancing & Recursion Depth Traversal',
    author: 'Prof. Lisa Chen',
    institution: 'UC Berkeley EECS',
    downloads: '2,180',
    questionsCount: 18,
    tag: 'Sorting',
  },
  {
    discipline: 'Organic Chemistry',
    title: 'Nucleophilic Substitution Mechanisms & Stereochemistry',
    author: 'Prof. Marcus Brody',
    institution: 'MIT',
    downloads: '3,050',
    questionsCount: 30,
    tag: 'Network Match',
  },
  {
    discipline: 'Constitutional Law',
    title: 'Commerce Clause Jurisprudence Timeline & Judicial Heuristics',
    author: 'Prof. Helen Wright',
    institution: 'Stanford Law',
    downloads: '980',
    questionsCount: 15,
    tag: 'Sequential',
  },
];

export default function CommunityPage() {
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleImport = (idx: number) => {
    setCopiedId(idx);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="community-page-wrapper">
      <LandingNav />

      <main className="community-main">
        {/* Hero */}
        <section className="community-hero">
          <div className="landing-container">
            <span className="community-eyebrow">Shared Knowledge & Curriculum</span>
            <h1 className="community-h1">
              The Peer Network of <em>University Educators</em>
            </h1>
            <p className="community-subhead">
              Browse verified spatial question banks, join bi-weekly pedagogical workshops, and collaborate with 8,000+ professors worldwide.
            </p>
          </div>
        </section>

        {/* Question Packs Grid */}
        <section className="community-packs-section">
          <div className="landing-container">
            <div className="section-header-split">
              <div>
                <span className="section-mini-tag">FREE QUESTION REPOSITORIES</span>
                <h2 className="section-title-serif">Curated Spatial Question Banks</h2>
              </div>
              <Link to="/get-started?mode=signup" className="submit-pack-btn">
                + Publish Your Bank
              </Link>
            </div>

            <div className="packs-grid">
              {QUESTION_PACKS.map((pack, idx) => (
                <div key={idx} className="pack-card">
                  <div className="pack-top-meta">
                    <span className="discipline-tag">{pack.discipline}</span>
                    <span className="type-tag">{pack.tag}</span>
                  </div>

                  <h3 className="pack-title">{pack.title}</h3>

                  <div className="pack-author-line">
                    <strong>{pack.author}</strong> · {pack.institution}
                  </div>

                  <div className="pack-footer">
                    <span className="pack-stats">
                      {pack.questionsCount} questions · {pack.downloads} imports
                    </span>
                    <button
                      type="button"
                      className="import-btn"
                      onClick={() => handleImport(idx)}
                    >
                      {copiedId === idx ? '✓ Imported to Pairly' : 'Import to Class ↗'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Live Workshop Schedule */}
        <section className="community-events-section">
          <div className="landing-container">
            <div className="events-card">
              <div className="events-info">
                <span className="event-live-pill">UPCOMING WEBINAR</span>
                <h3 className="event-title">
                  Diagnosing Spatial Blindspots: How to Run 300-Student Heatmap Recitations
                </h3>
                <p className="event-time">
                  📅 Thursday, September 24 · 11:00 AM EDT (45 mins + live Q&A)
                </p>
                <p className="event-speaker">
                  Hosted by Dr. Rebecca Martinez (Johns Hopkins) and Pairly Pedagogical Team
                </p>
              </div>
              <button
                type="button"
                className="event-register-btn"
                onClick={() => alert('RSVP confirmed! Calendar invite sent to your email.')}
              >
                Reserve Free Seat ↗
              </button>
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />

      <style>{`
        .community-page-wrapper {
          min-height: 100vh;
          background-color: var(--paper, #FAF7F2);
          display: flex;
          flex-direction: column;
        }

        .community-main {
          flex: 1;
          padding-top: 120px;
        }

        .community-hero {
          padding: 60px 0 40px 0;
          text-align: center;
        }

        .community-eyebrow {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #64748B;
          display: block;
          margin-bottom: 12px;
        }

        .community-h1 {
          font-family: 'UntitledSerif', Georgia, serif;
          font-weight: 400;
          font-size: clamp(34px, 5vw, 54px);
          line-height: 1.12;
          color: #0F172A;
          margin: 0 0 16px 0;
          letter-spacing: -0.03em;
        }

        .community-h1 em {
          font-style: italic;
        }

        .community-subhead {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 17px;
          color: #64748B;
          max-width: 680px;
          margin: 0 auto;
          line-height: 1.5;
        }

        /* ── Packs ── */
        .community-packs-section {
          padding: 40px 0 80px 0;
        }

        .section-header-split {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 32px;
          flex-wrap: wrap;
          gap: 16px;
        }

        .section-mini-tag {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: #059669;
          display: block;
          margin-bottom: 6px;
        }

        .section-title-serif {
          font-family: 'UntitledSerif', Georgia, serif;
          font-style: italic;
          font-weight: 400;
          font-size: 30px;
          color: #0F172A;
          margin: 0;
        }

        .submit-pack-btn {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 13.5px;
          font-weight: 600;
          color: #0F172A;
          text-decoration: none;
          padding: 8px 18px;
          border-radius: 9999px;
          background: #FFFFFF;
          border: 1.5px solid rgba(0, 0, 0, 0.12);
          transition: all 0.15s ease;
        }

        .submit-pack-btn:hover {
          background: #F8FAFC;
        }

        .packs-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        .pack-card {
          background: #FFFFFF;
          border-radius: 20px;
          border: 1.5px solid rgba(0, 0, 0, 0.08);
          padding: 32px 28px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03);
          display: flex;
          flex-direction: column;
        }

        .pack-top-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
        }

        .discipline-tag {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 11.5px;
          font-weight: 600;
          color: #2563EB;
          background: #EFF6FF;
          padding: 4px 10px;
          border-radius: 9999px;
        }

        .type-tag {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 10px;
          font-weight: 700;
          color: #64748B;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .pack-title {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 18px;
          font-weight: 700;
          color: #0F172A;
          margin: 0 0 10px 0;
          line-height: 1.35;
        }

        .pack-author-line {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 13px;
          color: #64748B;
          margin-bottom: 24px;
        }

        .pack-author-line strong {
          color: #334155;
        }

        .pack-footer {
          margin-top: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 18px;
          border-top: 1px solid #F1F5F9;
        }

        .pack-stats {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 12px;
          color: #94A3B8;
        }

        .import-btn {
          background: #0F172A;
          color: #FFFFFF;
          border: none;
          padding: 7px 16px;
          border-radius: 8px;
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 12.5px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .import-btn:hover {
          background: #1E293B;
        }

        /* ── Event Card ── */
        .community-events-section {
          padding: 0 0 100px 0;
        }

        .events-card {
          background: #0A0B0E;
          border-radius: 24px;
          padding: 44px 50px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          color: #FFFFFF;
        }

        .event-live-pill {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.14em;
          color: #22C55E;
          background: rgba(34, 197, 94, 0.15);
          border: 1px solid rgba(34, 197, 94, 0.3);
          padding: 4px 10px;
          border-radius: 9999px;
          display: inline-block;
          margin-bottom: 12px;
        }

        .event-title {
          font-family: 'UntitledSerif', Georgia, serif;
          font-style: italic;
          font-weight: 400;
          font-size: 24px;
          margin: 0 0 10px 0;
          line-height: 1.25;
        }

        .event-time {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 13.5px;
          color: #CBD5E1;
          margin: 0 0 4px 0;
        }

        .event-speaker {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 13px;
          color: #94A3B8;
          margin: 0;
        }

        .event-register-btn {
          padding: 12px 24px;
          background: #FFFFFF;
          color: #0A0B0E;
          border-radius: 9999px;
          border: none;
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.15s ease;
        }

        .event-register-btn:hover {
          background: #E2E8F0;
        }

        /* ── Dark Mode ── */
        [data-theme="dark"] .community-page-wrapper {
          background-color: #07080B;
        }

        [data-theme="dark"] .community-h1 {
          color: #FFFFFF;
        }

        [data-theme="dark"] .community-subhead {
          color: #94A3B8;
        }

        [data-theme="dark"] .section-title-serif {
          color: #FFFFFF;
        }

        [data-theme="dark"] .submit-pack-btn {
          background: #11141C;
          border-color: rgba(255, 255, 255, 0.15);
          color: #FFFFFF;
        }

        [data-theme="dark"] .pack-card {
          background: #11141C;
          border-color: rgba(255, 255, 255, 0.1);
        }

        [data-theme="dark"] .pack-title {
          color: #FFFFFF;
        }

        [data-theme="dark"] .pack-author-line strong {
          color: #CBD5E1;
        }

        [data-theme="dark"] .pack-author-line {
          color: #94A3B8;
        }

        [data-theme="dark"] .pack-footer {
          border-color: rgba(255, 255, 255, 0.08);
        }

        [data-theme="dark"] .import-btn {
          background: #FFFFFF;
          color: #0A0B0E;
        }

        @media (max-width: 860px) {
          .packs-grid {
            grid-template-columns: 1fr;
          }
          .events-card {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}
