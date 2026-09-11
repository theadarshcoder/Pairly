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
      {/* Copy Column */}
      <div className="feature-copy">
        <span className="feature-eyebrow">{eyebrow}</span>
        <h3 className="feature-h3">{heading}</h3>
        <p className="feature-body">{body}</p>
        {ctaLabel && (
          <button className="feature-cta" type="button">
            {ctaLabel}
          </button>
        )}
      </div>

      {/* Visual Column */}
      <div className="feature-visual" style={{ width: '100%' }}>
        <div
          style={{
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow)',
            overflow: 'hidden',
            width: '100%',
          }}
        >
          {visual}
        </div>
      </div>
    </section>
  );
}
