import React from 'react';

interface StepData {
  id: string;
  step: string;
  label: string;
  correctPct: number; // --ok
  minorShiftPct: number; // --warn
  majorShiftPct: number; // --bad
  inversionRate: number; // %
}

const STEPS: StepData[] = [
  { id: 's1', step: '01', label: 'Initialize git repository', correctPct: 92, minorShiftPct: 6, majorShiftPct: 2, inversionRate: 4 },
  { id: 's2', step: '02', label: 'Stage modified working tree', correctPct: 84, minorShiftPct: 12, majorShiftPct: 4, inversionRate: 9 },
  { id: 's3', step: '03', label: 'Create signed atomic commit', correctPct: 76, minorShiftPct: 18, majorShiftPct: 6, inversionRate: 14 },
  { id: 's4', step: '04', label: 'Rebase against upstream remote', correctPct: 58, minorShiftPct: 28, majorShiftPct: 14, inversionRate: 31 },
  { id: 's5', step: '05', label: 'Push linear history to main', correctPct: 88, minorShiftPct: 8, majorShiftPct: 4, inversionRate: 7 },
];

export function SequentialSortingPresenter({ slide }: { slide?: any }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'transparent',
        padding: '0 120px',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 1300,
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--sp-5, 20px)',
        }}
      >
        {STEPS.map((step) => (
          <div
            key={step.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--sp-5, 20px)',
              background: 'var(--surface-1)',
              border: '1px solid var(--hairline)',
              borderRadius: 'var(--r-card)',
              padding: '16px 24px',
            }}
          >
            {/* Step number badge */}
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 16,
                fontWeight: 600,
                color: 'var(--accent)',
                width: 32,
              }}
            >
              {step.step}
            </span>

            {/* Label */}
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 18,
                fontWeight: 500,
                color: 'var(--fg)',
                width: 320,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {step.label}
            </span>

            {/* Stacked bar chart */}
            <div
              style={{
                flex: 1,
                height: 38,
                background: 'var(--surface-3)',
                borderRadius: '8px',
                display: 'flex',
                overflow: 'hidden',
                gap: 2,
              }}
            >
              {/* Correct placement segment */}
              <div
                style={{
                  width: `${step.correctPct}%`,
                  background: 'var(--ok)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#0A0A0C',
                }}
              >
                {step.correctPct > 15 ? `${step.correctPct}%` : ''}
              </div>

              {/* Minor displacement */}
              <div
                style={{
                  width: `${step.minorShiftPct}%`,
                  background: 'var(--warn)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#0A0A0C',
                }}
              >
                {step.minorShiftPct > 10 ? `${step.minorShiftPct}%` : ''}
              </div>

              {/* Major displacement */}
              <div
                style={{
                  width: `${step.majorShiftPct}%`,
                  background: 'var(--bad)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#F2F2F4',
                }}
              >
                {step.majorShiftPct > 8 ? `${step.majorShiftPct}%` : ''}
              </div>
            </div>

            {/* Inversion rate mono badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                background: 'var(--surface-2)',
                border: '1px solid var(--hairline-strong)',
                borderRadius: 'var(--r-pill)',
                padding: '6px 14px',
                minWidth: 105,
                justifyContent: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 15,
                  fontWeight: 600,
                  color: step.inversionRate > 20 ? 'var(--warn)' : 'var(--fg-muted)',
                }}
              >
                {step.inversionRate}%
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 12,
                  color: 'var(--fg-subtle)',
                }}
              >
                inv
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
