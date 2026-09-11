import React from 'react';

interface AnswerCardData {
  id: string;
  author: string;
  text: string;
  rating: number; // out of 5
  reviewCount: number;
}

const ANSWERS: AnswerCardData[] = [
  {
    id: 'a1',
    author: 'Group A3',
    text: 'Optimistic concurrency control maximizes throughput under low contention by removing lock bottlenecks, but incurs cascading aborts and retry storms when write contention peaks.',
    rating: 5,
    reviewCount: 42,
  },
  {
    id: 'a2',
    author: 'Group B7',
    text: 'Eventual consistency allows instant asynchronous partition tolerance across regions, but delegates reconciliation complexity to application logic via CRDTs or vector clocks.',
    rating: 4,
    reviewCount: 38,
  },
  {
    id: 'a3',
    author: 'Group D1',
    text: 'Distributed transactions require two-phase commit overhead and coordinator availability, whereas Saga orchestrations provide resilience with compensating rollback transactions.',
    rating: 4,
    reviewCount: 35,
  },
];

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={filled ? 'var(--accent)' : 'var(--surface-3)'}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

export function PeerReviewPresenter({ slide }: { slide?: any }) {
  // SVG circular countdown: radius 26, circum = 2 * PI * 26 ≈ 163.36, 75% offset = 122.5
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * 0.75;

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
        padding: '0 160px',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 1200,
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--sp-5, 20px)',
          position: 'relative',
        }}
      >
        {/* Top-right countdown ring */}
        <div
          style={{
            position: 'absolute',
            top: -70,
            right: 0,
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--sp-3, 12px)',
          }}
        >
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--fg-muted)' }}>
            Review Window
          </span>
          <div style={{ position: 'relative', width: 64, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="64" height="64" style={{ transform: 'rotate(-90deg)' }}>
              <circle
                cx="32"
                cy="32"
                r={radius}
                fill="none"
                stroke="var(--surface-3)"
                strokeWidth="4"
              />
              <circle
                cx="32"
                cy="32"
                r={radius}
                fill="none"
                stroke="var(--accent)"
                strokeWidth="4"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
              />
            </svg>
            <span
              style={{
                position: 'absolute',
                fontFamily: 'var(--font-mono)',
                fontSize: 14,
                fontWeight: 600,
                color: 'var(--fg)',
              }}
            >
              45s
            </span>
          </div>
        </div>

        {/* Three stacked answer cards */}
        {ANSWERS.map((card) => (
          <div
            key={card.id}
            style={{
              background: 'var(--surface-1)',
              border: '1px solid var(--hairline)',
              borderRadius: 'var(--r-card)',
              padding: 'var(--sp-6, 24px)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--sp-4, 16px)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 13,
                  color: 'var(--fg-subtle)',
                  letterSpacing: '0.05em',
                }}
              >
                {card.author}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon key={star} filled={star <= card.rating} />
                ))}
                <span
                  style={{
                    marginLeft: 8,
                    fontFamily: 'var(--font-mono)',
                    fontSize: 13,
                    color: 'var(--fg-muted)',
                  }}
                >
                  ({card.reviewCount} reviews)
                </span>
              </div>
            </div>

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 20,
                fontWeight: 400,
                lineHeight: 1.45,
                color: 'var(--fg)',
                margin: 0,
              }}
            >
              {card.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
