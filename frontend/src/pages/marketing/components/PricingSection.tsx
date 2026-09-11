import React from 'react';
import { Link } from 'react-router-dom';

export function PricingSection() {
  return (
    <section className="landing-section pricing-section" id="pricing">
      <div className="landing-container" style={{ textAlign: 'center' }}>
        <h2 className="section-h2" style={{ marginBottom: '12px' }}>
          Your class, your pace
        </h2>
        <p className="body-lead" style={{ marginBottom: '48px', maxWidth: '560px' }}>
          Free for a single section. Built for a whole department when you need it.
        </p>

        <div className="pricing-grid">
          {/* Card 1: Classroom (Light) */}
          <div className="pricing-card classroom">
            <div className="pricing-tier-label">Classroom</div>
            <div className="pricing-price">₹0 <span className="pricing-period">/month</span></div>
            <p className="pricing-desc">
              One instructor, up to 60 students per session.
            </p>

            <ul className="pricing-features-list">
              <li>All 5 real-time spatial interaction types</li>
              <li>Live heatmap & response aggregation</li>
              <li>Syllabus PDF slide generator</li>
              <li>Community support</li>
            </ul>

            <Link
              to="/get-started?mode=signup"
              className="pricing-btn outline-btn"
            >
              Get started
            </Link>
          </div>

          {/* Card 2: Institution (Dark) */}
          <div className="pricing-card institution">
            <div className="pricing-tier-label">Institution</div>
            <div className="pricing-price">Custom pricing</div>
            <p className="pricing-desc">
              Unlimited sections, cohort analytics, SSO for your department.
            </p>

            <ul className="pricing-features-list">
              <li>Everything in Classroom with no room limits</li>
              <li>Multi-instructor department coordination</li>
              <li>Longitudinal concept decay tracking</li>
              <li>Custom LMS integration & SSO</li>
              <li>Dedicated onboarding & SLA</li>
            </ul>

            <Link
              to="/get-started?mode=signup"
              className="pricing-btn solid-inverted-btn"
            >
              Talk to us
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px;
          max-width: 860px;
          margin: 0 auto;
          text-align: left;
        }

        .pricing-card {
          border-radius: var(--radius-lg);
          padding: 44px 36px;
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-sm);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .pricing-card:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow);
        }

        /* Classroom Card */
        .pricing-card.classroom {
          background-color: var(--paper-card);
          border: 1px solid var(--line);
          color: var(--ink);
        }

        /* Institution Card (Dark) - Binds adaptive focus ring */
        .pricing-card.institution {
          background-color: var(--ink);
          color: var(--paper);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .pricing-tier-label {
          font-family: var(--font-body);
          font-size: 0.95rem;
          font-weight: 700;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          opacity: 0.85;
        }

        .pricing-price {
          font-family: var(--font-display);
          font-size: 2.25rem;
          font-weight: 600;
          line-height: 1.1;
          margin-bottom: 14px;
        }

        .pricing-period {
          font-family: var(--font-body);
          font-size: 1rem;
          font-weight: 400;
          opacity: 0.7;
        }

        .pricing-desc {
          font-size: 1.02rem;
          line-height: 1.5;
          margin-bottom: 28px;
          opacity: 0.85;
        }

        .pricing-features-list {
          list-style: none;
          padding: 0;
          margin: 0 0 36px 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
          flex: 1;
        }

        .pricing-features-list li {
          font-size: 0.94rem;
          line-height: 1.4;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .pricing-features-list li::before {
          content: "✓";
          font-weight: 700;
          display: inline-block;
        }

        .pricing-card.classroom .pricing-features-list li::before {
          color: var(--ink);
        }
        .pricing-card.institution .pricing-features-list li::before {
          color: var(--blue);
        }

        .pricing-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 13px 24px;
          border-radius: var(--radius-pill);
          font-size: 0.98rem;
          font-weight: 600;
          text-decoration: none;
          transition: opacity 0.15s, background-color 0.15s;
        }

        .outline-btn {
          background-color: transparent;
          border: 1.5px solid var(--line);
          color: var(--ink);
        }
        .outline-btn:hover {
          border-color: var(--ink);
          background-color: rgba(27, 23, 18, 0.04);
        }

        .solid-inverted-btn {
          background-color: var(--paper);
          color: var(--ink);
          border: 1.5px solid var(--paper);
        }
        .solid-inverted-btn:hover {
          opacity: 0.92;
        }

        @media (max-width: 760px) {
          .pricing-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
