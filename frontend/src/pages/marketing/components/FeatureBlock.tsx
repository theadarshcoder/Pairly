import React from 'react';
import { Link } from 'react-router-dom';

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

const ACCENT_SLUG_MAP: Record<FeatureAccent, string> = {
  blue: 'engage',
  sage: 'understand',
  butter: 'generate',
  coral: 'organize',
};

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

  const slug = ACCENT_SLUG_MAP[accent] || 'engage';

  return (
    <section className={classNames}>
      {/* Craft Paper Texture Overlay */}
      <div className="craft-card-paper-overlay" aria-hidden="true" />

      {/* Copy Column */}
      <div className="feature-copy">
        <span className="feature-eyebrow">{eyebrow}</span>
        <h3 className="feature-h3">{heading}</h3>
        <p className="feature-body">{body}</p>
        <Link
          to={`/features/${slug}`}
          className="feature-cta-pill"
          style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {ctaLabel || 'Learn more →'}
        </Link>
      </div>

      {/* Visual Column */}
      <div className="feature-visual" style={{ width: '100%' }}>
        {visual}
      </div>
    </section>
  );
}
