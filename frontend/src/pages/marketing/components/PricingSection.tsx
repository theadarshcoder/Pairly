import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface PricingTier {
  id: 'free' | 'plus' | 'pro' | 'enterprise';
  name: string;
  monthlyPrice: number | null;
  annualPrice: number | null;
  saveBadge?: string;
  periodText: string;
  description: string;
  features: string[];
  ctaLabel: string;
  ctaLink: string;
}

const MILESTONES = [
  { label: '3,000', tier: 'free' as const },
  { label: '50,000', tier: 'free' as const },
  { label: '100,000', tier: 'plus' as const },
  { label: '200,000', tier: 'plus' as const },
  { label: '500,000', tier: 'pro' as const },
  { label: '1,000,000', tier: 'pro' as const },
  { label: '1,500,000', tier: 'enterprise' as const },
  { label: '2,500,000', tier: 'enterprise' as const },
  { label: '3,000,000+', tier: 'enterprise' as const },
];

const TIERS: PricingTier[] = [
  {
    id: 'free',
    name: 'Free',
    monthlyPrice: 0,
    annualPrice: 0,
    periodText: 'Per user/month, billed annually',
    description: 'For individuals to explore Pairly on their own.',
    features: [
      'Real-time contact syncing',
      'Automatic data enrichment',
      'Up to 3 seats',
      'All 5 real-time spatial interaction types',
    ],
    ctaLabel: 'Start for free',
    ctaLink: '/get-started?mode=signup&plan=free',
  },
  {
    id: 'plus',
    name: 'Plus',
    monthlyPrice: 44,
    annualPrice: 35,
    saveBadge: 'Save 20%',
    periodText: 'Per user/month, billed annually',
    description: 'For small teams to get started together.',
    features: [
      'Private lists',
      'Enhanced email sending',
      'Up to 10 seats',
      'Longitudinal concept decay tracking',
      'Syllabus PDF slide generator',
    ],
    ctaLabel: 'Continue with Plus',
    ctaLink: '/get-started?mode=signup&plan=plus',
  },
  {
    id: 'pro',
    name: 'Pro',
    monthlyPrice: 99,
    annualPrice: 79,
    saveBadge: 'Save 20%',
    periodText: 'Per user/month, billed annually',
    description: 'For growing teams to scale revenue with automation.',
    features: [
      'Call Intelligence & sequences',
      'Permission controls',
      'Advanced reporting',
      'Diagnostic hotspot auto-mapping',
      'Multi-instructor department coordination',
    ],
    ctaLabel: 'Continue with Pro',
    ctaLink: '/get-started?mode=signup&plan=pro',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    monthlyPrice: null,
    annualPrice: null,
    periodText: 'Billed annually',
    description: 'For organizations needing advanced security and control.',
    features: [
      'Unlimited objects',
      'Unlimited teams',
      'Security and admin controls',
      'Campus-wide LMS gradebook sync',
      'Dedicated onboarding & SLA',
    ],
    ctaLabel: 'Talk to sales',
    ctaLink: '/get-started?mode=signup&plan=enterprise',
  },
];

export function PricingSection() {
  // Default to step 5 (1,000,000 responses -> Pro plan), matching Screenshot 1 & 2
  const [sliderIndex, setSliderIndex] = useState<number>(5);
  const [billingCycle, setBillingCycle] = useState<'annual' | 'monthly'>('annual');

  const currentMilestone = MILESTONES[sliderIndex];
  const targetedTierId = currentMilestone.tier;

  // Jump slider when user directly clicks a pricing card
  const handleCardClick = (tierId: PricingTier['id']) => {
    const tierMilestones: Record<PricingTier['id'], number> = {
      free: 0,
      plus: 2,
      pro: 5,
      enterprise: 7,
    };
    setSliderIndex(tierMilestones[tierId]);
  };

  const progressPercent = (sliderIndex / (MILESTONES.length - 1)) * 100;

  return (
    <section className="landing-section pricing-section" id="pricing">
      <div className="landing-container">
        {/* Section Header */}
        <div className="pricing-header-center">
          <h2 className="section-h2">Your class, your pace</h2>
          <p className="body-lead">
            Transparent pricing that scales from a single lecture hall to full campus deployment.
          </p>

          {/* Annual / Monthly Toggle */}
          <div className="billing-cycle-toggle-wrapper">
            <div className="billing-cycle-toggle">
              <button
                type="button"
                className={`cycle-btn ${billingCycle === 'annual' ? 'active' : ''}`}
                onClick={() => setBillingCycle('annual')}
              >
                Billed annually <span className="toggle-discount-chip">Save 20%</span>
              </button>
              <button
                type="button"
                className={`cycle-btn ${billingCycle === 'monthly' ? 'active' : ''}`}
                onClick={() => setBillingCycle('monthly')}
              >
                Billed monthly
              </button>
            </div>
          </div>
        </div>

        {/* ── Compact Textured Dynamic Scale Slider ── */}
        <div className="pricing-slider-container">
          {/* Authentic Paper Texture Overlay */}
          <div className="slider-paper-texture-overlay" aria-hidden="true" />

          <div className="slider-top-meta">
            <span className="slider-label">Scale with your monthly responses:</span>
            <span className="slider-selected-badge">
              <strong>{currentMilestone.label}</strong> responses/mo ·{' '}
              <span className="slider-tier-highlight">{targetedTierId.toUpperCase()} recommended</span>
            </span>
          </div>

          <div className="slider-track-wrap">
            <input
              type="range"
              min={0}
              max={MILESTONES.length - 1}
              step={1}
              value={sliderIndex}
              onChange={(e) => setSliderIndex(Number(e.target.value))}
              className="tier-range-input"
              style={{ '--slider-progress': `${progressPercent}%` } as React.CSSProperties}
              aria-label="Student response volume slider"
            />
          </div>

          {/* 9 Scale Milestone Labels */}
          <div className="slider-milestone-ticks">
            {MILESTONES.map((m, idx) => {
              const isSelected = idx === sliderIndex;
              return (
                <button
                  type="button"
                  key={idx}
                  className={`milestone-tick-btn ${isSelected ? 'is-selected' : ''}`}
                  onClick={() => setSliderIndex(idx)}
                >
                  {m.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── 4 Modern SaaS Pricing Cards ── */}
        <div className="pricing-cards-grid">
          {TIERS.map((tier) => {
            const isTargeted = tier.id === targetedTierId;
            const price =
              tier.monthlyPrice === null
                ? 'Custom'
                : billingCycle === 'annual'
                ? `$${tier.annualPrice}`
                : `$${tier.monthlyPrice}`;

            return (
              <div
                key={tier.id}
                className={`modern-pricing-card ${isTargeted ? 'is-targeted' : ''}`}
                onClick={() => handleCardClick(tier.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick(tier.id);
                  }
                }}
              >
                {/* Authentic Textured White Paper Overlays */}
                <div className="card-paper-texture-overlay" aria-hidden="true" />
                <div className="card-noise-overlay" aria-hidden="true" />

                {/* Plan Title */}
                <div className="card-top-row">
                  <h3 className="card-tier-name">{tier.name}</h3>
                </div>

                {/* Price Display */}
                <div className="card-price-row">
                  <span className="card-price-val">{price}</span>
                  {tier.saveBadge && billingCycle === 'annual' && (
                    <span className="card-save-badge">{tier.saveBadge}</span>
                  )}
                </div>

                {/* Period Text */}
                <div className="card-period-text">
                  {tier.monthlyPrice === null
                    ? tier.periodText
                    : billingCycle === 'annual'
                    ? 'Per user/month, billed annually'
                    : 'Per user/month, billed monthly'}
                </div>

                {/* Description */}
                <p className="card-description">{tier.description}</p>

                {/* Features Checklist */}
                <ul className="card-features-list">
                  {tier.features.map((feat, fIdx) => (
                    <li key={fIdx} className="card-feature-item">
                      <span className="feature-check-icon">✓</span>
                      <span className="feature-text">{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <div className="card-cta-wrapper">
                  <Link
                    to={tier.ctaLink}
                    className={`card-cta-btn ${isTargeted ? 'cta-btn-primary' : 'cta-btn-outline'}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {tier.ctaLabel}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .pricing-section {
          padding: 64px 0 88px;
        }

        .pricing-header-center {
          text-align: center;
          margin-bottom: 32px;
        }

        /* ── Billing Cycle Toggle ── */
        .billing-cycle-toggle-wrapper {
          display: flex;
          justify-content: center;
          margin-top: 20px;
        }

        .billing-cycle-toggle {
          display: inline-flex;
          align-items: center;
          background: rgba(27, 23, 18, 0.05);
          padding: 4px;
          border-radius: 9999px;
          border: 1px solid rgba(27, 23, 18, 0.08);
        }

        .cycle-btn {
          background: transparent;
          border: none;
          padding: 7px 16px;
          border-radius: 9999px;
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 13px;
          font-weight: 500;
          color: var(--ink-soft, #5B5346);
          cursor: pointer;
          transition: all 0.15s ease;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .cycle-btn.active {
          background: #FFFFFF;
          color: var(--ink, #1B1712);
          font-weight: 600;
          box-shadow: 0 2px 8px rgba(27, 23, 18, 0.08);
        }

        .toggle-discount-chip {
          background: #EFF6FF;
          color: #2563EB;
          font-size: 11px;
          font-weight: 700;
          padding: 2px 7px;
          border-radius: 9999px;
        }

        /* ── Compact Textured Scale Slider ── */
        .pricing-slider-container {
          max-width: 780px;
          margin: 0 auto 36px;
          padding: 18px 24px 16px;
          background: #FFFFFF;
          background: linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 100%);
          border-radius: 18px;
          border: 1px solid rgba(0, 0, 0, 0.08);
          box-shadow: 0 4px 20px -4px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.02);
          position: relative;
          overflow: hidden;
        }

        .slider-paper-texture-overlay {
          position: absolute;
          inset: 0;
          background-image: url('/images/paper-texture.png');
          background-size: cover;
          background-position: center;
          opacity: 0.12;
          mix-blend-mode: multiply;
          pointer-events: none;
          border-radius: inherit;
          z-index: 1;
        }

        .slider-top-meta,
        .slider-track-wrap,
        .slider-milestone-ticks {
          position: relative;
          z-index: 2;
        }

        .slider-top-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 13px;
        }

        .slider-label {
          color: var(--ink-soft, #5B5346);
          font-weight: 500;
        }

        .slider-selected-badge {
          color: var(--ink, #1B1712);
        }

        .slider-tier-highlight {
          color: #2563EB;
          font-weight: 700;
        }

        .slider-track-wrap {
          position: relative;
          width: 100%;
          display: flex;
          align-items: center;
          margin-bottom: 10px;
        }

        /* Custom Range Slider Styling */
        .tier-range-input {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 6px;
          border-radius: 9999px;
          outline: none;
          background: linear-gradient(
            to right,
            #1E293B 0%,
            #1E293B var(--slider-progress),
            #E2E8F0 var(--slider-progress),
            #E2E8F0 100%
          );
          cursor: pointer;
        }

        .tier-range-input::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #FFFFFF;
          border: 2.5px solid #1E293B;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.16);
          cursor: grab;
          transition: transform 0.1s ease, box-shadow 0.1s ease;
        }

        .tier-range-input:active::-webkit-slider-thumb {
          cursor: grabbing;
          transform: scale(1.15);
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.22);
        }

        .tier-range-input::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #FFFFFF;
          border: 2.5px solid #1E293B;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.16);
          cursor: grab;
        }

        /* 9 Milestone Ticks */
        .slider-milestone-ticks {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 2px;
        }

        .milestone-tick-btn {
          background: transparent;
          border: none;
          padding: 3px 0;
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 11px;
          font-weight: 500;
          color: #78716C;
          cursor: pointer;
          transition: color 0.15s ease, transform 0.15s ease;
        }

        .milestone-tick-btn:hover {
          color: var(--ink, #1B1712);
        }

        .milestone-tick-btn.is-selected {
          color: var(--ink, #1B1712);
          font-weight: 700;
          transform: translateY(-1px);
        }

        /* ── 4 Modern Pricing Cards (Textured Whites) ── */
        .pricing-cards-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
          max-width: 1140px;
          margin: 0 auto;
          align-items: stretch;
        }

        .modern-pricing-card {
          background: #FFFFFF;
          background: linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 100%);
          border-radius: 20px;
          padding: 28px 22px;
          display: flex;
          flex-direction: column;
          border: 1px solid rgba(0, 0, 0, 0.08);
          box-shadow: 0 4px 20px -4px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.02);
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.2s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
          position: relative;
          overflow: hidden;
          user-select: none;
        }

        .card-paper-texture-overlay {
          position: absolute;
          inset: 0;
          background-image: url('/images/paper-texture.png');
          background-size: cover;
          background-position: center;
          opacity: 0.11;
          mix-blend-mode: multiply;
          pointer-events: none;
          border-radius: inherit;
          z-index: 1;
        }

        .card-noise-overlay {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.035'/%3E%3C/svg%3E");
          background-repeat: repeat;
          pointer-events: none;
          mix-blend-mode: multiply;
          z-index: 1;
        }

        .card-top-row,
        .card-price-row,
        .card-period-text,
        .card-description,
        .card-features-list,
        .card-cta-wrapper {
          position: relative;
          z-index: 2;
        }

        .modern-pricing-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
        }

        /* Highlighted / Targeted Card State (Exact match to Pro card in Screenshot 2) */
        .modern-pricing-card.is-targeted {
          border: 2px solid #3B82F6;
          box-shadow: 0 0 0 1px #3B82F6, 0 16px 36px -6px rgba(59, 130, 246, 0.18);
          transform: translateY(-4px);
        }

        .card-top-row {
          margin-bottom: 18px;
        }

        .card-tier-name {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 17px;
          font-weight: 600;
          color: var(--ink, #0F172A);
          margin: 0;
        }

        .card-price-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 8px;
        }

        .card-price-val {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 36px;
          font-weight: 700;
          line-height: 1;
          color: var(--ink, #0F172A);
          letter-spacing: -0.03em;
        }

        .card-save-badge {
          background: #EFF6FF;
          color: #2563EB;
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 11px;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 9999px;
        }

        .card-period-text {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 12px;
          color: var(--ink-soft, #64748B);
          margin-bottom: 20px;
        }

        .card-description {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 13px;
          line-height: 1.45;
          color: var(--ink-soft, #334155);
          margin: 0 0 22px 0;
          min-height: 38px;
        }

        /* Feature Checklist */
        .card-features-list {
          list-style: none;
          padding: 0;
          margin: 0 0 28px 0;
          display: flex;
          flex-direction: column;
          gap: 11px;
          flex: 1;
        }

        .card-feature-item {
          display: flex;
          align-items: flex-start;
          gap: 9px;
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 13px;
          line-height: 1.4;
          color: var(--ink, #334155);
        }

        .feature-check-icon {
          color: #94A3B8;
          font-weight: 700;
          font-size: 13px;
          margin-top: 1px;
          flex-shrink: 0;
        }

        /* Buttons */
        .card-cta-wrapper {
          margin-top: auto;
        }

        .card-cta-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 42px;
          border-radius: 10px;
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 13.5px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.15s ease;
          box-sizing: border-box;
        }

        /* Inactive outline button */
        .cta-btn-outline {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          color: #0F172A;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
        }

        .cta-btn-outline:hover {
          background: #F8FAFC;
          border-color: #CBD5E1;
        }

        /* Active solid primary button (Screenshot 2: Pro black button) */
        .cta-btn-primary {
          background: #111827;
          border: 1px solid #111827;
          color: #FFFFFF;
          box-shadow: 0 4px 12px rgba(17, 24, 39, 0.15);
        }

        .cta-btn-primary:hover {
          background: #1E293B;
          border-color: #1E293B;
        }

        /* ── Dark Mode Adaptations ── */
        [data-theme="dark"] .billing-cycle-toggle {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.12);
        }

        [data-theme="dark"] .cycle-btn {
          color: #94A3B8;
        }

        [data-theme="dark"] .cycle-btn.active {
          background: #1E293B;
          color: #F8FAFC;
        }

        [data-theme="dark"] .toggle-discount-chip {
          background: rgba(59, 130, 246, 0.2);
          color: #93C5FD;
        }

        [data-theme="dark"] .pricing-slider-container {
          background-color: #0E131F;
          border-color: rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
        }

        [data-theme="dark"] .slider-paper-texture-overlay {
          opacity: 0.14;
          mix-blend-mode: overlay;
        }

        [data-theme="dark"] .slider-label {
          color: #94A3B8;
        }

        [data-theme="dark"] .slider-selected-badge {
          color: #F8FAFC;
        }

        [data-theme="dark"] .slider-tier-highlight {
          color: #60A5FA;
        }

        [data-theme="dark"] .tier-range-input {
          background: linear-gradient(
            to right,
            #FFFFFF 0%,
            #FFFFFF var(--slider-progress),
            #262B35 var(--slider-progress),
            #262B35 100%
          );
        }

        [data-theme="dark"] .tier-range-input::-webkit-slider-thumb {
          background: #FFFFFF;
          border: 2px solid #0F172A;
          box-shadow: 0 0 12px rgba(255, 255, 255, 0.75), 0 2px 6px rgba(0, 0, 0, 0.4);
        }

        [data-theme="dark"] .tier-range-input::-moz-range-thumb {
          background: #FFFFFF;
          border: 2px solid #0F172A;
          box-shadow: 0 0 12px rgba(255, 255, 255, 0.75), 0 2px 6px rgba(0, 0, 0, 0.4);
        }

        [data-theme="dark"] .milestone-tick-btn {
          color: #64748B;
        }

        [data-theme="dark"] .milestone-tick-btn:hover {
          color: #CBD5E1;
        }

        [data-theme="dark"] .milestone-tick-btn.is-selected {
          color: #FFFFFF;
          font-weight: 700;
        }

        [data-theme="dark"] .modern-pricing-card {
          background-color: #11141C;
          border-color: rgba(255, 255, 255, 0.1);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35);
        }

        [data-theme="dark"] .card-paper-texture-overlay {
          opacity: 0.1;
          mix-blend-mode: overlay;
        }

        [data-theme="dark"] .modern-pricing-card:hover {
          box-shadow: 0 8px 28px rgba(0, 0, 0, 0.45);
        }

        [data-theme="dark"] .modern-pricing-card.is-targeted {
          border-color: #3B82F6;
          box-shadow: 0 0 0 1px #3B82F6, 0 16px 40px rgba(59, 130, 246, 0.25);
        }

        [data-theme="dark"] .card-tier-name {
          color: #F8FAFC;
        }

        [data-theme="dark"] .card-price-val {
          color: #FFFFFF;
        }

        [data-theme="dark"] .card-save-badge {
          background: rgba(59, 130, 246, 0.2);
          color: #93C5FD;
        }

        [data-theme="dark"] .card-period-text {
          color: #94A3B8;
        }

        [data-theme="dark"] .card-description {
          color: #CBD5E1;
        }

        [data-theme="dark"] .card-feature-item {
          color: #E2E8F0;
        }

        [data-theme="dark"] .feature-check-icon {
          color: #64748B;
        }

        [data-theme="dark"] .cta-btn-outline {
          border-color: rgba(255, 255, 255, 0.18);
          color: #F8FAFC;
        }

        [data-theme="dark"] .cta-btn-outline:hover {
          background: rgba(255, 255, 255, 0.08);
        }

        [data-theme="dark"] .cta-btn-primary {
          background: #FFFFFF;
          border-color: #FFFFFF;
          color: #090A0D;
        }

        [data-theme="dark"] .cta-btn-primary:hover {
          background: #F1F5F9;
        }

        /* ── Responsive Grid ── */
        @media (max-width: 1024px) {
          .pricing-cards-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .pricing-cards-grid {
            grid-template-columns: 1fr;
          }
          .pricing-slider-container {
            padding: 16px 14px 12px;
          }
          .slider-milestone-ticks {
            overflow-x: auto;
            gap: 10px;
            justify-content: flex-start;
            padding-bottom: 4px;
          }
        }
      `}</style>
    </section>
  );
}
