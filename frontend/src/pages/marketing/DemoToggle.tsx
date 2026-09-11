import { useState } from 'react';
import { RevealSection } from './useReveal.js';

export function DemoToggle() {
  const [hidden, setHidden] = useState(true);

  const bars = [
    { label: 'Option A', pct: 32 },
    { label: 'Option B', pct: 78 },
    { label: 'Option C', pct: 15 },
    { label: 'Option D', pct: 45 },
    { label: 'Option E', pct: 8 },
  ];

  return (
    <section style={{ padding: '160px 40px' }}>
      <RevealSection
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: 80,
        }}
      >
        {/* Text column */}
        <div style={{ maxWidth: 480 }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: 'var(--accent)',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              display: 'block',
              marginBottom: 20,
            }}
          >
            HIDE RESULTS
          </span>
          <h3
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 32,
              fontWeight: 400,
              color: 'var(--fg)',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              margin: '0 0 20px 0',
            }}
          >
            Run the room without anchoring it.
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 15,
              color: 'var(--fg-muted)',
              lineHeight: 1.7,
              margin: '0 0 32px 0',
            }}
          >
            Reveal the room's answer only after everyone has committed. The projector shows a
            countdown — not a bar chart. When the last student answers, the results reveal
            themselves.
          </p>

          {/* Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--fg)' }}>
              Hide results until everyone answers
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={hidden}
              onClick={() => setHidden(!hidden)}
              style={{
                width: 40,
                height: 22,
                borderRadius: 'var(--r-pill)',
                background: hidden ? 'var(--accent)' : 'var(--surface-3)',
                border: 'none',
                position: 'relative',
                cursor: 'pointer',
                padding: 2,
                transition: 'background 200ms',
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  display: 'block',
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  background: 'var(--fg)',
                  transform: hidden ? 'translateX(18px)' : 'translateX(0)',
                  transition: 'transform 200ms',
                }}
              />
            </button>
          </div>
        </div>

        {/* Mock projector */}
        <div
          style={{
            width: 560,
            height: 400,
            background: 'var(--surface-1)',
            borderRadius: 'var(--r-stage)',
            border: '1px solid var(--hairline)',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {hidden ? (
            /* Waiting state */
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 48, color: 'var(--fg)', marginBottom: 12 }}>
                142 / 300
              </div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 20, color: 'var(--fg-muted)' }}>
                Waiting for the room
              </div>
            </div>
          ) : (
            /* Bar chart state */
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 24, height: 300, padding: '0 40px' }}>
              {bars.map((bar) => (
                <div key={bar.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--fg)' }}>{bar.pct}%</span>
                  <div
                    style={{
                      width: 60,
                      height: bar.pct * 2.5,
                      background: 'var(--accent)',
                      borderRadius: '4px 4px 0 0',
                      transition: 'height 400ms var(--ease-out)',
                    }}
                  />
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--fg-muted)' }}>{bar.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </RevealSection>
    </section>
  );
}
