import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { LandingNav } from './components/LandingNav.js';
import { LandingFooter } from './components/LandingFooter.js';
import {
  EngageHeatmapVisual,
  UnderstandDecayVisual,
  GenerateSyllabusVisual,
  OrganizeArchiveVisual,
} from './components/FeatureVisuals.js';

interface FeatureMeta {
  slug: string;
  name: string;
  accent: 'blue' | 'sage' | 'butter' | 'coral';
  gradient: string;
  darkGradient: string;
  inkColor: string;
  eyebrow: string;
  headline: string;
  subhead: string;
  visualComponent: React.ReactNode;
  pillars: {
    title: string;
    description: string;
    metric: string;
    metricLabel: string;
  }[];
  quote: {
    text: string;
    author: string;
    role: string;
    institution: string;
  };
}

const FEATURES_DATA: Record<string, FeatureMeta> = {
  engage: {
    slug: 'engage',
    name: 'Engage',
    accent: 'blue',
    gradient: 'linear-gradient(135deg, #96C9ED 0%, #82BCE6 100%)',
    darkGradient: 'linear-gradient(135deg, #0A2239 0%, #103456 100%)',
    inkColor: '#061D32',
    eyebrow: 'Real-Time Spatial Interactions',
    headline: 'See exactly where 300 students get lost, in real time.',
    subhead:
      'Replace multiple-choice polls with continuous tactile inquiry. From coordinate-based visual diagnosis to network consensus matching, see aggregate cognitive patterns appear instantaneously on your lecture screen.',
    visualComponent: <EngageHeatmapVisual />,
    pillars: [
      {
        title: 'Multi-Touch Heatmap Density',
        description: 'Students tap or drag directly on biological diagrams, architectural blueprints, or code blocks. Density gradients reveal true spatial confusion.',
        metric: '94%',
        metricLabel: 'student participation vs 41% clickers',
      },
      {
        title: 'Peer Network Matching',
        description: 'Pair students with opposing intuition for 90-second debate intervals, then monitor real-time consensus shifts across the auditorium.',
        metric: '3.4x',
        metricLabel: 'higher retention on tricky edge-cases',
      },
      {
        title: 'Zero Latency WebSockets',
        description: 'Engineered on lightweight binary frame protocols to handle 2,000 concurrent student taps with sub-30ms visual aggregation.',
        metric: '<30ms',
        metricLabel: 'real-time aggregation speed',
      },
    ],
    quote: {
      text: 'For the first time in 18 years of teaching organic chemistry, I can see the exact carbon atom where half the lecture hall stalls.',
      author: 'Prof. David Chen',
      role: 'Professor of Molecular Chemistry',
      institution: 'Stanford University',
    },
  },
  understand: {
    slug: 'understand',
    name: 'Understand',
    accent: 'sage',
    gradient: 'linear-gradient(135deg, #8FD4A0 0%, #7EBE8F 100%)',
    darkGradient: 'linear-gradient(135deg, #0C2B16 0%, #154524 100%)',
    inkColor: '#092413',
    eyebrow: 'Longitudinal Concept Decay',
    headline: 'Know what they retain three weeks after the final bell.',
    subhead:
      'Cognitive science models the Ebbinghaus forgetting curve automatically across your syllabus. Pairly prompts micro-retrieval spatial challenges precisely when neural pathways begin to decay.',
    visualComponent: <UnderstandDecayVisual />,
    pillars: [
      {
        title: 'Ebbinghaus Decay Modeling',
        description: 'Every interaction updates individual and cohort retention scores, highlighting vulnerable foundational topics before midterms.',
        metric: '78%',
        metricLabel: 'reduction in pre-exam cramming panic',
      },
      {
        title: 'Calibrated Retrieval Spacing',
        description: 'Spaced micro-puzzles are served at 24h, 7d, and 21d milestones, reinforcing critical clinical concepts with minimal time investment.',
        metric: '2.8x',
        metricLabel: 'longer conceptual retention span',
      },
      {
        title: 'Peer Review Swarms',
        description: 'Blind, structured peer comparisons where students evaluate anonymous reasoning steps and identify misapplied theorem heuristics.',
        metric: '100%',
        metricLabel: 'privacy-preserving student anonymization',
      },
    ],
    quote: {
      text: 'Our pass rate in second-year Pathology jumped 14% once we started interleaving spaced concept decay challenges into weekly recitations.',
      author: 'Dr. Rebecca Martinez',
      role: 'Chair of Medical Education',
      institution: 'Johns Hopkins University',
    },
  },
  generate: {
    slug: 'generate',
    name: 'Generate',
    accent: 'butter',
    gradient: 'linear-gradient(135deg, #F5D77B 0%, #ECC95C 100%)',
    darkGradient: 'linear-gradient(135deg, #2D2005 0%, #473308 100%)',
    inkColor: '#2B1D02',
    eyebrow: 'AI Syllabus & Slide Synthesis',
    headline: 'Turn a 40-page PDF syllabus into spatial sequences in 12 seconds.',
    subhead:
      'Upload textbook chapters, medical journal PDFs, or lecture notes. Pairly analyzes the core epistemological friction points and synthesizes tactile spatial sequences ready to launch on your projector.',
    visualComponent: <GenerateSyllabusVisual />,
    pillars: [
      {
        title: 'Friction Point Extraction',
        description: 'Our domain-specific LLM parser reads complex academic manuscripts and isolates the counter-intuitive concepts where students predictably fail.',
        metric: '12s',
        metricLabel: 'to synthesize a 3-hour lecture deck',
      },
      {
        title: 'Automatic Coordinate Masking',
        description: 'Automatically converts diagrams, code snippets, and anatomical charts into interactively maskable coordinate zones for student touch.',
        metric: '1-Click',
        metricLabel: 'export to PowerPoint, Keynote & Canvas',
      },
      {
        title: 'Multi-Modal Sequence Diversity',
        description: 'Mixes coordinate hot-spots, sequential ordering, and binary categorization so students stay cognitively active throughout the hour.',
        metric: '5 Types',
        metricLabel: 'of non-multiple-choice interaction types',
      },
    ],
    quote: {
      text: 'Preparing my weekly interactive sequences used to consume an entire Sunday. Pairly creates richer, deeper questions in seconds.',
      author: 'Prof. Marcus Brody',
      role: 'Associate Dean of Engineering',
      institution: 'MIT',
    },
  },
  organize: {
    slug: 'organize',
    name: 'Organize',
    accent: 'coral',
    gradient: 'linear-gradient(135deg, #F8A585 0%, #EE916E 100%)',
    darkGradient: 'linear-gradient(135deg, #331309 0%, #522010 100%)',
    inkColor: '#2E0F07',
    eyebrow: 'Semester-Structured Archives & LMS',
    headline: 'Structure that mirrors your semester, not a database.',
    subhead:
      'Keep sections, clinical rotations, lab groups, and historical exam correlations meticulously categorized with enterprise LMS synchronization for Canvas, Blackboard, and Moodle.',
    visualComponent: <OrganizeArchiveVisual />,
    pillars: [
      {
        title: 'Canvas & Blackboard Two-Way Sync',
        description: 'Rosters populate automatically and spatial participation points push directly into your institutional gradebook with zero CSV exports.',
        metric: '0 mins',
        metricLabel: 'spent on manual gradebook exports',
      },
      {
        title: 'Cohort Longitudinal Archives',
        description: 'Compare spring 2024 response distributions against spring 2023 to verify whether curriculum revisions actually resolved confusion.',
        metric: '5 Years',
        metricLabel: 'longitudinal cohort comparison capability',
      },
      {
        title: 'FERPA & Institutional Isolation',
        description: 'Strict role-based access control with audited departmental data separation and single sign-on via Okta, Azure AD, or Shibboleth.',
        metric: 'SOC 2',
        metricLabel: 'Type II certified infrastructure',
      },
    ],
    quote: {
      text: 'Our registrar was thrilled with the native Canvas LTI 1.3 integration. It just works, semester after semester.',
      author: 'Sarah Jenkins',
      role: 'Director of Academic Technology',
      institution: 'UC Berkeley',
    },
  },
};

export default function FeatureDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const activeSlug = slug && FEATURES_DATA[slug] ? slug : 'engage';
  const feature = FEATURES_DATA[activeSlug];

  if (!feature) {
    return <Navigate to="/features/engage" replace />;
  }

  const featureTabs = [
    { id: 'engage', label: '1. Engage (Blue)', color: '#96C9ED' },
    { id: 'understand', label: '2. Understand (Sage)', color: '#8FD4A0' },
    { id: 'generate', label: '3. Generate (Butter)', color: '#F5D77B' },
    { id: 'organize', label: '4. Organize (Coral)', color: '#F8A585' },
  ];

  return (
    <div className="feature-page-wrapper">
      <LandingNav />

      <main className="feature-main">
        {/* Top Feature Navigator Bar */}
        <div className="feature-nav-tabs-bar">
          <div className="landing-container">
            <div className="feature-nav-tabs">
              {featureTabs.map((tab) => (
                <Link
                  key={tab.id}
                  to={`/features/${tab.id}`}
                  className={`feature-tab-btn ${tab.id === activeSlug ? 'active' : ''}`}
                >
                  <span
                    className="tab-color-dot"
                    style={{ backgroundColor: tab.color }}
                  />
                  <span>{tab.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Feature Hero Banner */}
        <section
          className="feature-hero-card"
          style={{ background: feature.gradient }}
        >
          {/* Craft Paper Texture */}
          <div className="feature-paper-texture-overlay" aria-hidden="true" />

          <div className="landing-container">
            <div className="feature-hero-content">
              <span className="feature-detail-eyebrow">{feature.eyebrow}</span>
              <h1 className="feature-detail-h1">{feature.headline}</h1>
              <p className="feature-detail-subhead">{feature.subhead}</p>

              <div className="feature-cta-row">
                <Link to="/get-started?mode=signup" className="feature-primary-cta">
                  <span>Try {feature.name} Free</span>
                </Link>
                <a href="#demo" className="feature-secondary-cta">
                  Explore Live Interaction ↓
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Visual Showcase */}
        <section className="feature-visual-showcase" id="demo">
          <div className="landing-container">
            <div className="visual-outer-card">
              <div className="visual-card-header">
                <div className="visual-dot-group">
                  <span className="mac-dot red" />
                  <span className="mac-dot yellow" />
                  <span className="mac-dot green" />
                </div>
                <span className="visual-card-title">Live Simulator: {feature.name} Interface</span>
                <span className="visual-status-pill">Interactive Live Demo</span>
              </div>
              <div className="visual-card-body">
                {feature.visualComponent}
              </div>
            </div>
          </div>
        </section>

        {/* 3 Pillars Deep Dive */}
        <section className="feature-pillars-section">
          <div className="landing-container">
            <div className="pillars-header">
              <span className="pillars-eyebrow">Pedagogical Rigor</span>
              <h2 className="pillars-h2">Engineered for deep cognitive engagement</h2>
            </div>

            <div className="pillars-grid">
              {feature.pillars.map((pillar, idx) => (
                <div key={idx} className="pillar-card">
                  <div className="pillar-metric-badge">
                    <span className="pillar-metric-val">{pillar.metric}</span>
                    <span className="pillar-metric-lbl">{pillar.metricLabel}</span>
                  </div>
                  <h3 className="pillar-title">{pillar.title}</h3>
                  <p className="pillar-desc">{pillar.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Educator Testimonial Quote */}
        <section className="feature-quote-section">
          <div className="landing-container">
            <div className="quote-card">
              <blockquote className="quote-body">
                “{feature.quote.text}”
              </blockquote>
              <div className="quote-author-info">
                <div className="author-avatar-chip">{feature.quote.author.charAt(0)}</div>
                <div>
                  <strong className="author-name">{feature.quote.author}</strong>
                  <span className="author-role">{feature.quote.role} · {feature.quote.institution}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Banner */}
        <section className="feature-bottom-cta">
          <div className="landing-container">
            <div className="bottom-cta-box">
              <h2 className="bottom-cta-h2">Ready to transform your lecture hall?</h2>
              <p className="bottom-cta-sub">
                Deploy Pairly in your upcoming class. Free for individual professors, zero hardware required.
              </p>
              <div className="bottom-cta-btn-wrap">
                <Link to="/get-started?mode=signup" className="bottom-cta-btn">
                  Create Educator Account →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />

      <style>{`
        .feature-page-wrapper {
          min-height: 100vh;
          background-color: var(--paper, #FAF7F2);
          display: flex;
          flex-direction: column;
        }

        .feature-main {
          flex: 1;
          padding-top: 100px;
        }

        .feature-nav-tabs-bar {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
          position: sticky;
          top: 86px;
          z-index: 40;
          padding: 8px 0;
        }

        .feature-nav-tabs {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          padding: 4px 0;
        }

        .feature-tab-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 9999px;
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 13px;
          font-weight: 500;
          color: #475569;
          text-decoration: none;
          background: transparent;
          border: 1px solid transparent;
          white-space: nowrap;
          transition: all 0.15s ease;
        }

        .feature-tab-btn:hover {
          background: rgba(0, 0, 0, 0.04);
          color: #0F172A;
        }

        .feature-tab-btn.active {
          background: #FFFFFF;
          color: #0F172A;
          border-color: rgba(0, 0, 0, 0.1);
          font-weight: 600;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .tab-color-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        /* ── Hero Banner ── */
        .feature-hero-card {
          position: relative;
          padding: 90px 0 100px 0;
          overflow: hidden;
        }

        .feature-paper-texture-overlay {
          position: absolute;
          inset: 0;
          background-image: url('/images/paper-texture.png');
          background-size: cover;
          background-position: center;
          opacity: 0.35;
          mix-blend-mode: multiply;
          pointer-events: none;
        }

        .feature-hero-content {
          position: relative;
          z-index: 2;
          max-width: 820px;
        }

        .feature-detail-eyebrow {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(0, 0, 0, 0.7);
          display: block;
          margin-bottom: 16px;
        }

        .feature-detail-h1 {
          font-family: 'UntitledSerif', Georgia, serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(34px, 5.2vw, 56px);
          line-height: 1.1;
          color: #0A0B0E;
          margin: 0 0 20px 0;
          letter-spacing: -0.03em;
        }

        .feature-detail-subhead {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: clamp(16px, 1.8vw, 19px);
          line-height: 1.55;
          color: rgba(10, 11, 14, 0.85);
          margin: 0 0 36px 0;
          max-width: 720px;
        }

        .feature-cta-row {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .feature-primary-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 48px;
          padding: 0 26px;
          border-radius: 9999px;
          background: #0A0B0E;
          color: #FFFFFF;
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 14.5px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.15s ease;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
        }

        .feature-primary-cta:hover {
          background: #1E293B;
          transform: translateY(-1px);
        }

        .feature-secondary-cta {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 14px;
          font-weight: 600;
          color: #0A0B0E;
          text-decoration: none;
          padding: 10px 18px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.4);
          border: 1px solid rgba(0, 0, 0, 0.1);
          transition: all 0.15s ease;
        }

        .feature-secondary-cta:hover {
          background: rgba(255, 255, 255, 0.7);
        }

        /* ── Showcase Box ── */
        .feature-visual-showcase {
          padding: 60px 0;
        }

        .visual-outer-card {
          background: #FFFFFF;
          border-radius: 24px;
          border: 1px solid rgba(0, 0, 0, 0.1);
          box-shadow: 0 16px 40px -10px rgba(0, 0, 0, 0.08);
          overflow: hidden;
        }

        .visual-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 22px;
          background: #F8FAFC;
          border-bottom: 1px solid rgba(0, 0, 0, 0.07);
        }

        .visual-dot-group {
          display: flex;
          gap: 6px;
        }

        .mac-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .mac-dot.red { background: #EF4444; }
        .mac-dot.yellow { background: #F59E0B; }
        .mac-dot.green { background: #10B981; }

        .visual-card-title {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 12px;
          font-weight: 600;
          color: #64748B;
        }

        .visual-status-pill {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 11px;
          font-weight: 600;
          color: #059669;
          background: #ECFDF5;
          padding: 3px 8px;
          border-radius: 9999px;
          border: 1px solid #A7F3D0;
        }

        .visual-card-body {
          padding: 32px;
          min-height: 420px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* ── Pillars ── */
        .feature-pillars-section {
          padding: 60px 0 80px 0;
        }

        .pillars-header {
          text-align: center;
          margin-bottom: 48px;
        }

        .pillars-eyebrow {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #64748B;
          display: block;
          margin-bottom: 8px;
        }

        .pillars-h2 {
          font-family: 'UntitledSerif', Georgia, serif;
          font-style: italic;
          font-weight: 400;
          font-size: 34px;
          color: #0F172A;
          margin: 0;
        }

        .pillars-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .pillar-card {
          background: #FFFFFF;
          border-radius: 20px;
          border: 1.5px solid rgba(0, 0, 0, 0.08);
          padding: 32px 26px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03);
          display: flex;
          flex-direction: column;
        }

        .pillar-metric-badge {
          margin-bottom: 20px;
        }

        .pillar-metric-val {
          display: block;
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 32px;
          font-weight: 800;
          color: #0F172A;
          letter-spacing: -0.03em;
        }

        .pillar-metric-lbl {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 12px;
          color: #64748B;
          font-weight: 500;
        }

        .pillar-title {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 18px;
          font-weight: 700;
          color: #0F172A;
          margin: 0 0 10px 0;
        }

        .pillar-desc {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 14px;
          line-height: 1.55;
          color: #475569;
          margin: 0;
        }

        /* ── Quote ── */
        .feature-quote-section {
          padding: 20px 0 80px 0;
        }

        .quote-card {
          background: #FFFFFF;
          border-radius: 24px;
          border: 1.5px solid rgba(0, 0, 0, 0.08);
          padding: 44px 50px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04);
        }

        .quote-body {
          font-family: 'UntitledSerif', Georgia, serif;
          font-style: italic;
          font-size: clamp(20px, 2.4vw, 26px);
          line-height: 1.4;
          color: #0F172A;
          margin: 0 0 24px 0;
        }

        .quote-author-info {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .author-avatar-chip {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #0F172A;
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 18px;
        }

        .author-name {
          display: block;
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 15px;
          color: #0F172A;
        }

        .author-role {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 13px;
          color: #64748B;
        }

        /* ── Bottom CTA ── */
        .feature-bottom-cta {
          padding: 0 0 80px 0;
        }

        .bottom-cta-box {
          background: #0A0B0E;
          border-radius: 24px;
          padding: 60px 48px;
          text-align: center;
          color: #FFFFFF;
        }

        .bottom-cta-h2 {
          font-family: 'UntitledSerif', Georgia, serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(28px, 3.8vw, 42px);
          margin: 0 0 14px 0;
        }

        .bottom-cta-sub {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 16px;
          color: #94A3B8;
          max-width: 580px;
          margin: 0 auto 32px auto;
        }

        .bottom-cta-btn {
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

        .bottom-cta-btn:hover {
          background: #E2E8F0;
          transform: translateY(-1px);
        }

        /* ── Dark Mode ── */
        [data-theme="dark"] .feature-page-wrapper {
          background-color: #07080B;
        }

        [data-theme="dark"] .feature-nav-tabs-bar {
          background: rgba(17, 20, 28, 0.85);
          border-color: rgba(255, 255, 255, 0.1);
        }

        [data-theme="dark"] .feature-tab-btn {
          color: #94A3B8;
        }

        [data-theme="dark"] .feature-tab-btn.active {
          background: #1E293B;
          color: #FFFFFF;
          border-color: rgba(255, 255, 255, 0.15);
        }

        [data-theme="dark"] .visual-outer-card {
          background: #11141C;
          border-color: rgba(255, 255, 255, 0.1);
        }

        [data-theme="dark"] .visual-card-header {
          background: #181B24;
          border-color: rgba(255, 255, 255, 0.08);
        }

        [data-theme="dark"] .pillar-card {
          background: #11141C;
          border-color: rgba(255, 255, 255, 0.1);
        }

        [data-theme="dark"] .pillar-metric-val {
          color: #FFFFFF;
        }

        [data-theme="dark"] .pillar-title {
          color: #FFFFFF;
        }

        [data-theme="dark"] .pillar-desc {
          color: #94A3B8;
        }

        [data-theme="dark"] .pillars-h2 {
          color: #FFFFFF;
        }

        [data-theme="dark"] .quote-card {
          background: #11141C;
          border-color: rgba(255, 255, 255, 0.1);
        }

        [data-theme="dark"] .quote-body {
          color: #F1F5F9;
        }

        [data-theme="dark"] .author-name {
          color: #FFFFFF;
        }

        [data-theme="dark"] .author-avatar-chip {
          background: #3B82F6;
        }

        @media (max-width: 860px) {
          .pillars-grid {
            grid-template-columns: 1fr;
          }
          .quote-card {
            padding: 30px 24px;
          }
        }
      `}</style>
    </div>
  );
}
