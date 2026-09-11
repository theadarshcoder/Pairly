import React from 'react';

interface ConceptRow {
  name: string;
  // 15 weeks retention rates (0..1)
  retention: number[];
}

const CONCEPTS: ConceptRow[] = [
  {
    name: 'Memory Alloc & Pointers',
    retention: [0.98, 0.94, 0.90, 0.85, 0.78, 0.72, 0.65, 0.60, 0.54, 0.48, 0.42, 0.38, 0.35, 0.32, 0.30],
  },
  {
    name: 'Concurrency & Mutex Locks',
    retention: [0.96, 0.92, 0.88, 0.82, 0.75, 0.70, 0.68, 0.64, 0.61, 0.58, 0.55, 0.52, 0.49, 0.45, 0.42],
  },
  {
    name: 'Asynchronous Event Loops',
    retention: [0.99, 0.96, 0.93, 0.91, 0.88, 0.84, 0.82, 0.79, 0.76, 0.74, 0.71, 0.69, 0.67, 0.64, 0.62],
  },
  {
    name: 'Network Socket Protocols',
    retention: [0.95, 0.89, 0.84, 0.78, 0.71, 0.64, 0.58, 0.52, 0.46, 0.40, 0.36, 0.32, 0.28, 0.25, 0.22],
  },
  {
    name: 'Relational Normalization',
    retention: [0.97, 0.95, 0.91, 0.88, 0.85, 0.83, 0.80, 0.78, 0.75, 0.73, 0.70, 0.68, 0.65, 0.63, 0.60],
  },
  {
    name: 'Distributed Consensus',
    retention: [0.92, 0.85, 0.78, 0.70, 0.62, 0.55, 0.48, 0.42, 0.37, 0.33, 0.29, 0.26, 0.24, 0.21, 0.19],
  },
];

function getCellColor(t: number): string {
  // Interpolate: 1.0 (ok: 45, 212, 167) -> 0.5 (warn: 255, 176, 32) -> 0.0 (bad: 255, 77, 109)
  let r: number, g: number, b: number;
  if (t >= 0.5) {
    const factor = (t - 0.5) / 0.5; // 0 at 0.5, 1 at 1.0
    r = Math.round(255 + (45 - 255) * factor);
    g = Math.round(176 + (212 - 176) * factor);
    b = Math.round(32 + (167 - 32) * factor);
  } else {
    const factor = t / 0.5; // 0 at 0.0, 1 at 0.5
    r = Math.round(255 + (255 - 255) * factor);
    g = Math.round(77 + (176 - 77) * factor);
    b = Math.round(109 + (32 - 109) * factor);
  }
  return `rgba(${r}, ${g}, ${b}, 0.85)`;
}

export function ConceptDecayPresenter({ slide }: { slide?: any }) {
  const weeks = Array.from({ length: 15 }, (_, i) => `W${String(i + 1).padStart(2, '0')}`);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
        padding: '0 80px',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          background: 'var(--surface-1)',
          border: '1px solid var(--hairline)',
          borderRadius: 'var(--r-card)',
          padding: '36px 40px',
          boxShadow: '0 4px 30px rgba(0,0,0,0.3)',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <div style={{ width: 260, flexShrink: 0 }} />
          {weeks.map((week) => (
            <div
              key={week}
              style={{
                width: 48,
                textAlign: 'center',
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                fontWeight: 500,
                color: 'var(--fg-muted)',
              }}
            >
              {week}
            </div>
          ))}
        </div>

        {/* Rows */}
        {CONCEPTS.map((concept) => (
          <div key={concept.name} style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <span
              style={{
                width: 260,
                flexShrink: 0,
                fontFamily: 'var(--font-sans)',
                fontSize: 16,
                fontWeight: 500,
                color: 'var(--fg)',
                paddingRight: 16,
                boxSizing: 'border-box',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {concept.name}
            </span>

            {concept.retention.map((val, idx) => (
              <div
                key={idx}
                title={`${concept.name} (Week ${idx + 1}): ${Math.round(val * 100)}% retention`}
                style={{
                  width: 48,
                  height: 32,
                  background: getCellColor(val),
                  borderRadius: 4,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  fontWeight: 600,
                  color: '#0A0A0C',
                  cursor: 'default',
                  transition: 'transform 100ms ease',
                }}
              >
                {Math.round(val * 100)}
              </div>
            ))}
          </div>
        ))}

        {/* Legend */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 20,
            marginTop: 16,
            paddingTop: 16,
            borderTop: '1px solid var(--hairline)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 14, height: 14, borderRadius: 3, background: 'var(--ok)' }} />
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--fg-muted)' }}>High (90-100%)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 14, height: 14, borderRadius: 3, background: 'var(--warn)' }} />
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--fg-muted)' }}>Decaying (50-89%)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 14, height: 14, borderRadius: 3, background: 'var(--bad)' }} />
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--fg-muted)' }}>Critical (&lt;50%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
