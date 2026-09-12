import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LandingNav } from './components/LandingNav.js';
import { LandingFooter } from './components/LandingFooter.js';
import { PricingSection } from './components/PricingSection.js';

interface FaqItem {
  question: string;
  answer: string;
}

const PRICING_FAQS: FaqItem[] = [
  {
    question: 'Is student participation completely free?',
    answer:
      'Yes. Students never pay a single cent, never need to create an account, and never enter a credit card. They simply navigate to pairly.app/join or scan the projector QR code on their phone or laptop and join immediately.',
  },
  {
    question: 'How do response limits work with the scale slider?',
    answer:
      'Responses are counted whenever a student taps, orders, or submits a spatial interaction in your lecture room. If you teach 2 classes of 150 students with 4 questions each week, that equals ~4,800 responses monthly, fitting comfortably into our Plus tier. Unused monthly responses roll over.',
  },
  {
    question: 'Can I switch between monthly and annual billing?',
    answer:
      'Yes, you can toggle between monthly and annual billing at any time from your account settings. When switching to annual, you automatically receive a 20% discount on all tiers.',
  },
  {
    question: 'Do you offer department and university campus-wide licensing?',
    answer:
      'Yes! For departments, schools, or university-wide deployments, our Enterprise plan provides institutional LTI 1.3 LMS integration, centralized faculty billing, custom SLA support, and dedicated faculty onboarding webinars.',
  },
  {
    question: 'What happens if our lecture hall exceeds our monthly limit?',
    answer:
      'We never cut off your live classroom during a lecture. If you exceed your tier’s allowance, your lecture session continues seamlessly, and we simply notify you with an option to upgrade before the next billing cycle.',
  },
];

export default function PricingPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <div className="pricing-page-wrapper">
      <LandingNav />

      <main className="pricing-main-wrapper">
        {/* Top Hero Heading */}
        <div className="pricing-page-hero">
          <div className="landing-container">
            <span className="pricing-hero-tag">Transparent Academic Pricing</span>
            <h1 className="pricing-hero-h1">
              Invest in how your students <em>actually think.</em>
            </h1>
            <p className="pricing-hero-subhead">
              Zero software cost for students. Predictable pricing for individual professors, clinical departments, and university campuses.
            </p>
          </div>
        </div>

        {/* ── Main Dynamic Pricing Slider & 4 White Cards ── */}
        <PricingSection />

        {/* ── Feature Comparison Matrix ── */}
        <section className="matrix-section">
          <div className="landing-container">
            <div className="matrix-header">
              <span className="matrix-eyebrow">Detailed Breakdown</span>
              <h2 className="matrix-h2">Compare Plan Capabilities</h2>
            </div>

            <div className="matrix-table-card">
              <div className="matrix-table-wrap">
                <table className="matrix-table">
                  <thead>
                    <tr>
                      <th className="th-feature">Feature</th>
                      <th className="th-tier">Free</th>
                      <th className="th-tier">Plus</th>
                      <th className="th-tier th-highlight">Pro</th>
                      <th className="th-tier">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="category-row">
                      <td colSpan={5}>Spatial Interaction Types</td>
                    </tr>
                    <tr>
                      <td>Coordinate Heatmaps & Multi-Touch Density</td>
                      <td>✓</td>
                      <td>✓</td>
                      <td className="td-highlight">✓</td>
                      <td>✓</td>
                    </tr>
                    <tr>
                      <td>Sequential Sorting & Spatial Ordering</td>
                      <td>✓</td>
                      <td>✓</td>
                      <td className="td-highlight">✓</td>
                      <td>✓</td>
                    </tr>
                    <tr>
                      <td>Real-Time Peer Review Swarm</td>
                      <td>Limited (1/wk)</td>
                      <td>✓ Unlimited</td>
                      <td className="td-highlight">✓ Unlimited</td>
                      <td>✓ Unlimited</td>
                    </tr>
                    <tr>
                      <td>Network Graph Consensus Matching</td>
                      <td>—</td>
                      <td>—</td>
                      <td className="td-highlight">✓ Included</td>
                      <td>✓ Included</td>
                    </tr>

                    <tr className="category-row">
                      <td colSpan={5}>Cognitive Analytics & Decay</td>
                    </tr>
                    <tr>
                      <td>Session Results History</td>
                      <td>7 Days</td>
                      <td>1 Semester</td>
                      <td className="td-highlight">Longitudinal (5 Yrs)</td>
                      <td>Unlimited Cohorts</td>
                    </tr>
                    <tr>
                      <td>Ebbinghaus Retention Decay Tracking</td>
                      <td>—</td>
                      <td>✓ Included</td>
                      <td className="td-highlight">✓ Advanced AI</td>
                      <td>✓ Custom Models</td>
                    </tr>
                    <tr>
                      <td>Student Confusion Hotspot Maps</td>
                      <td>Basic</td>
                      <td>Detailed</td>
                      <td className="td-highlight">High-Res Vector</td>
                      <td>Diagnostic Deep-Dive</td>
                    </tr>

                    <tr className="category-row">
                      <td colSpan={5}>AI Generation & LMS Integration</td>
                    </tr>
                    <tr>
                      <td>PDF Syllabus-to-Slide AI Synthesizer</td>
                      <td>3 Decks / mo</td>
                      <td>15 Decks / mo</td>
                      <td className="td-highlight">Unlimited Decks</td>
                      <td>Unlimited + Custom Prompting</td>
                    </tr>
                    <tr>
                      <td>Canvas & Blackboard LTI 1.3 Two-Way Sync</td>
                      <td>—</td>
                      <td>—</td>
                      <td className="td-highlight">✓ Included</td>
                      <td>✓ Campus-Wide Single Sign-On</td>
                    </tr>
                    <tr>
                      <td>FERPA & SOC 2 Compliance Audit Trail</td>
                      <td>Standard</td>
                      <td>Standard</td>
                      <td className="td-highlight">Full Audit Log</td>
                      <td>Custom DPA & BAA Available</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* ── Pricing FAQ ── */}
        <section className="faq-section">
          <div className="landing-container">
            <div className="faq-header">
              <span className="faq-eyebrow">Common Questions</span>
              <h2 className="faq-h2">Frequently Asked Questions</h2>
            </div>

            <div className="faq-list">
              {PRICING_FAQS.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={idx} className={`faq-item ${isOpen ? 'open' : ''}`}>
                    <button
                      type="button"
                      className="faq-question-btn"
                      onClick={() => toggleFaq(idx)}
                      aria-expanded={isOpen}
                    >
                      <span>{faq.question}</span>
                      <span className="faq-chevron">{isOpen ? '−' : '+'}</span>
                    </button>
                    {isOpen && (
                      <div className="faq-answer">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />

      <style>{`
        .pricing-page-wrapper {
          min-height: 100vh;
          background-color: var(--paper, #FAF7F2);
          display: flex;
          flex-direction: column;
        }

        .pricing-main-wrapper {
          flex: 1;
          padding-top: 110px;
        }

        .pricing-page-hero {
          padding: 60px 0 20px 0;
          text-align: center;
        }

        .pricing-hero-tag {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #64748B;
          display: block;
          margin-bottom: 12px;
        }

        .pricing-hero-h1 {
          font-family: 'UntitledSerif', Georgia, serif;
          font-weight: 400;
          font-size: clamp(34px, 4.8vw, 54px);
          line-height: 1.15;
          color: #0F172A;
          margin: 0 0 16px 0;
        }

        .pricing-hero-h1 em {
          font-style: italic;
        }

        .pricing-hero-subhead {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 17px;
          color: #64748B;
          max-width: 640px;
          margin: 0 auto;
          line-height: 1.5;
        }

        /* ── Matrix Table ── */
        .matrix-section {
          padding: 80px 0;
        }

        .matrix-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .matrix-eyebrow {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #64748B;
          display: block;
          margin-bottom: 8px;
        }

        .matrix-h2 {
          font-family: 'UntitledSerif', Georgia, serif;
          font-style: italic;
          font-weight: 400;
          font-size: 34px;
          color: #0F172A;
          margin: 0;
        }

        .matrix-table-card {
          background: #FFFFFF;
          border-radius: 24px;
          border: 1.5px solid rgba(0, 0, 0, 0.08);
          box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.04);
          overflow: hidden;
        }

        .matrix-table-wrap {
          overflow-x: auto;
        }

        .matrix-table {
          width: 100%;
          border-collapse: collapse;
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 13.5px;
          text-align: left;
        }

        .matrix-table th {
          padding: 20px 24px;
          font-weight: 700;
          color: #0F172A;
          background: #F8FAFC;
          border-bottom: 1.5px solid rgba(0, 0, 0, 0.08);
        }

        .matrix-table th.th-feature {
          width: 40%;
        }

        .matrix-table th.th-tier {
          width: 15%;
          text-align: center;
        }

        .matrix-table th.th-highlight {
          background: #F1F5F9;
          color: #0F172A;
        }

        .matrix-table td {
          padding: 16px 24px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
          color: #334155;
        }

        .matrix-table td:not(:first-child) {
          text-align: center;
        }

        .matrix-table tr.category-row td {
          background: #F8FAFC;
          font-weight: 700;
          font-size: 12px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #64748B;
          padding: 12px 24px;
        }

        .td-highlight {
          background: rgba(15, 23, 42, 0.02);
          font-weight: 600;
        }

        /* ── FAQ ── */
        .faq-section {
          padding: 20px 0 100px 0;
        }

        .faq-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .faq-eyebrow {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #64748B;
          display: block;
          margin-bottom: 8px;
        }

        .faq-h2 {
          font-family: 'UntitledSerif', Georgia, serif;
          font-style: italic;
          font-weight: 400;
          font-size: 34px;
          color: #0F172A;
          margin: 0;
        }

        .faq-list {
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .faq-item {
          background: #FFFFFF;
          border-radius: 16px;
          border: 1.5px solid rgba(0, 0, 0, 0.08);
          overflow: hidden;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }

        .faq-item.open {
          border-color: #0F172A;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
        }

        .faq-question-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px;
          background: transparent;
          border: none;
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 16px;
          font-weight: 600;
          color: #0F172A;
          text-align: left;
          cursor: pointer;
        }

        .faq-chevron {
          font-size: 20px;
          font-weight: 400;
          color: #64748B;
        }

        .faq-answer {
          padding: 0 24px 22px 24px;
        }

        .faq-answer p {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 14.5px;
          line-height: 1.6;
          color: #475569;
          margin: 0;
        }

        /* ── Dark Mode ── */
        [data-theme="dark"] .pricing-page-wrapper {
          background-color: #07080B;
        }

        [data-theme="dark"] .pricing-hero-h1 {
          color: #FFFFFF;
        }

        [data-theme="dark"] .pricing-hero-subhead {
          color: #94A3B8;
        }

        [data-theme="dark"] .matrix-h2 {
          color: #FFFFFF;
        }

        [data-theme="dark"] .matrix-table-card {
          background: #11141C;
          border-color: rgba(255, 255, 255, 0.1);
        }

        [data-theme="dark"] .matrix-table th {
          background: #181B24;
          color: #FFFFFF;
          border-color: rgba(255, 255, 255, 0.08);
        }

        [data-theme="dark"] .matrix-table th.th-highlight {
          background: #1F2432;
        }

        [data-theme="dark"] .matrix-table td {
          color: #CBD5E1;
          border-color: rgba(255, 255, 255, 0.06);
        }

        [data-theme="dark"] .matrix-table tr.category-row td {
          background: #181B24;
          color: #94A3B8;
        }

        [data-theme="dark"] .td-highlight {
          background: rgba(255, 255, 255, 0.03);
          color: #FFFFFF;
        }

        [data-theme="dark"] .faq-h2 {
          color: #FFFFFF;
        }

        [data-theme="dark"] .faq-item {
          background: #11141C;
          border-color: rgba(255, 255, 255, 0.1);
        }

        [data-theme="dark"] .faq-item.open {
          border-color: #3B82F6;
        }

        [data-theme="dark"] .faq-question-btn {
          color: #FFFFFF;
        }

        [data-theme="dark"] .faq-answer p {
          color: #94A3B8;
        }
      `}</style>
    </div>
  );
}
