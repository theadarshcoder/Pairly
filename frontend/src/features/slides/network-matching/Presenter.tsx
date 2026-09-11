import React from 'react';

interface ConceptNode {
  id: string;
  label: string;
}

interface Edge {
  fromIndex: number;
  toIndex: number;
  weight: number; // 0..1
  correct: boolean;
}

const LEFT_NODES: ConceptNode[] = [
  { id: 'l1', label: 'TCP Handshake' },
  { id: 'l2', label: 'DNS Lookup' },
  { id: 'l3', label: 'TLS Negotiation' },
  { id: 'l4', label: 'HTTP/2 Framing' },
  { id: 'l5', label: 'WebSocket Init' },
];

const RIGHT_NODES: ConceptNode[] = [
  { id: 'r1', label: 'SYN-ACK Sequence' },
  { id: 'r2', label: 'A/AAAA Records' },
  { id: 'r3', label: 'Cipher Suite Auth' },
  { id: 'r4', label: 'Binary Multiplex' },
  { id: 'r5', label: '101 Switching' },
];

const HARDCODED_EDGES: Edge[] = [
  { fromIndex: 0, toIndex: 0, weight: 0.95, correct: true },
  { fromIndex: 1, toIndex: 1, weight: 0.88, correct: true },
  { fromIndex: 2, toIndex: 2, weight: 0.76, correct: true },
  { fromIndex: 3, toIndex: 3, weight: 0.65, correct: true },
  { fromIndex: 4, toIndex: 4, weight: 0.82, correct: true },
  { fromIndex: 0, toIndex: 2, weight: 0.25, correct: false },
  { fromIndex: 3, toIndex: 4, weight: 0.35, correct: false },
  { fromIndex: 1, toIndex: 0, weight: 0.18, correct: false },
];

export function NetworkMatchingPresenter({ slide }: { slide?: any }) {
  // Center in a 1920x800 coordinate space
  const leftX = 420;
  const rightX = 1500;
  const startY = 120;
  const spacingY = 130;

  const nodeWidth = 220;
  const nodeHeight = 64;

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
      }}
    >
      <svg
        viewBox="0 0 1920 800"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        <defs>
          <linearGradient id="edgeGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="var(--ok)" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {HARDCODED_EDGES.map((edge, idx) => {
          const x1 = leftX + nodeWidth;
          const y1 = startY + edge.fromIndex * spacingY + nodeHeight / 2;
          const x2 = rightX;
          const y2 = startY + edge.toIndex * spacingY + nodeHeight / 2;

          // Quadratic control point with slight curved divergence
          const midX = (x1 + x2) / 2;
          const deltaY = (y2 - y1) * 0.2;
          const ctrlY = (y1 + y2) / 2 + deltaY;

          const strokeColor = edge.correct ? 'var(--ok)' : 'var(--bad)';
          const strokeWidth = 2 + edge.weight * 4;
          const opacity = edge.correct ? 0.85 : 0.5;

          return (
            <path
              key={idx}
              d={`M ${x1} ${y1} Q ${midX} ${ctrlY} ${x2} ${y2}`}
              fill="none"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              opacity={opacity}
            />
          );
        })}
      </svg>

      {/* Nodes Container */}
      <div
        style={{
          width: 1920,
          height: 800,
          position: 'relative',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 420px',
          boxSizing: 'border-box',
        }}
      >
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacingY - nodeHeight, paddingTop: startY }}>
          {LEFT_NODES.map((node) => (
            <div
              key={node.id}
              style={{
                width: nodeWidth,
                height: nodeHeight,
                background: 'var(--surface-2)',
                border: '1px solid var(--hairline-strong)',
                borderRadius: 'var(--r-pill)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-sans)',
                fontSize: 16,
                fontWeight: 500,
                color: 'var(--fg)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                zIndex: 2,
              }}
            >
              {node.label}
            </div>
          ))}
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacingY - nodeHeight, paddingTop: startY }}>
          {RIGHT_NODES.map((node) => (
            <div
              key={node.id}
              style={{
                width: nodeWidth,
                height: nodeHeight,
                background: 'var(--surface-2)',
                border: '1px solid var(--hairline-strong)',
                borderRadius: 'var(--r-pill)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-sans)',
                fontSize: 16,
                fontWeight: 500,
                color: 'var(--fg)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                zIndex: 2,
              }}
            >
              {node.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
