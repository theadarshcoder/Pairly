import React from 'react';

export type FeatureAccent = 'blue' | 'sage' | 'butter' | 'coral';

export interface FeatureBlockProps {
  accent: FeatureAccent;
  reverse?: boolean;
  eyebrow: string;
  heading: string;
  body: string;
  ctaLabel?: string;
  visual: React.ReactNode;
}

export function FeatureBlock({
  accent,
  reverse = false,
  eyebrow,
  heading,
  body,
  ctaLabel,
  visual,
}: FeatureBlockProps) {
  const classNames = [
    'feature-block',
    `accent-${accent}`,
    reverse ? 'is-reversed' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={classNames}>
      {/* Craft Paper Texture Overlay */}
      <div className="craft-card-paper-overlay" aria-hidden="true" />

      {/* Copy Column */}
      <div className="feature-copy">
        <span className="feature-eyebrow">{eyebrow}</span>
        <h3 className="feature-h3">{heading}</h3>
        <p className="feature-body">{body}</p>
        <button className="feature-cta-pill" type="button">
          {ctaLabel || 'Learn more'}
        </button>
      </div>

      {/* Visual Column */}
      <div className="feature-visual" style={{ width: '100%' }}>
        {visual}
      </div>
    </section>
  );
}
