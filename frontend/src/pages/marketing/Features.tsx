import React, { useState } from 'react';
import { useRevealOnScroll, EyebrowCheck } from './useReveal.js';

/* ── Feature Visual Container with Hover Lift ───────────────────────────── */
function VisualCard({ children, minHeight = 400 }: { children: React.ReactNode; minHeight?: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '100%',
        maxWidth: 580,
        minHeight,
        background: 'var(--surface-light-1)',
        borderRadius: 16,
        boxShadow: hovered ? 'var(--shadow-card-hover)' : 'var(--shadow-card)',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'transform 250ms ease, box-shadow 250ms ease',
        padding: 32,
        boxSizing: 'border-box',
        border: '1px solid var(--hairline-light)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {children}
    </div>
  );
}

/* ── Visual 1: Network Matching ──────────────────────────────────────────── */
function NetworkMatchingVisual() {
  const leftNodes = ['Protocol', 'Handshake', 'Cipher', 'Multiplex'];
  const rightNodes = ['SYN-ACK', 'DNS Query', 'TLS Auth', 'Stream Mux'];
  const edges = [
    { from: 0, to: 0, ok: true, w: 3 },
    { from: 1, to: 1, ok: true, w: 2.5 },
    { from: 2, to: 2, ok: true, w: 3 },
    { from: 3, to: 3, ok: true, w: 2 },
    { from: 0, to: 2, ok: false, w: 3.5 },
    { from: 2, to: 1, ok: false, w: 2.5 },
  ];

  const nodeHeight = 44;
  const gap = 24;

  return (
    <VisualCard>
      <div style={{ position: 'relative', width: '100%', maxWidth: 480, height: 280 }}>
        {/* SVG Bezier Curves */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 480 280"
          style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
        >
          {edges.map((e, idx) => {
            const y1 = 22 + e.from * (nodeHeight + gap);
            const y2 = 22 + e.to * (nodeHeight + gap);
            const x1 = 140;
            const x2 = 340;
            const strokeColor = e.ok ? 'var(--accent-light)' : '#D9614C';
            return (
              <path
                key={idx}
                d={`M ${x1} ${y1} C 240 ${y1}, 240 ${y2}, ${x2} ${y2}`}
                fill="none"
                stroke={strokeColor}
                strokeWidth={e.w}
                strokeLinecap="round"
                opacity={e.ok ? 0.85 : 0.9}
              />
            );
          })}
        </svg>

        {/* Left Column Nodes */}
        <div style={{ position: 'absolute', left: 0, top: 0, display: 'flex', flexDirection: 'column', gap }}>
          {leftNodes.map((label) => (
            <div
              key={label}
              style={{
                width: 140,
                height: nodeHeight,
                background: 'var(--surface-light-2)',
                border: '1px solid var(--hairline-light)',
                borderRadius: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                fontWeight: 500,
                color: 'var(--fg-light)',
                userSelect: 'none',
              }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* Right Column Nodes */}
        <div style={{ position: 'absolute', right: 0, top: 0, display: 'flex', flexDirection: 'column', gap }}>
          {rightNodes.map((label) => (
            <div
              key={label}
              style={{
                width: 140,
                height: nodeHeight,
                background: 'var(--surface-light-2)',
                border: '1px solid var(--hairline-light)',
                borderRadius: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                fontWeight: 500,
                color: 'var(--fg-light)',
                userSelect: 'none',
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    </VisualCard>
  );
}

/* ── Visual 2: Spatial Hotspots (Dark Image Frame) ───────────────────────── */
function SpatialHotspotsVisual() {
  const glows = [
    { cx: '38%', cy: '42%', r: 64, color: 'rgba(235, 94, 40, 0.85)' },
    { cx: '62%', cy: '54%', r: 52, color: 'rgba(217, 97, 76, 0.8)' },
    { cx: '46%', cy: '66%', r: 44, color: 'rgba(235, 130, 60, 0.75)' },
  ];

  return (
    <VisualCard>
      <div
        style={{
          width: '100%',
          maxWidth: 480,
          height: 300,
          background: '#1A1A1A',
          borderRadius: 12,
          position: 'relative',
          overflow: 'hidden',
          boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.08)',
        }}
      >
        {/* Subtle grid pattern inside image frame */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />

        {/* Soft radial orange-red glows */}
        {glows.map((g, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: g.cx,
              top: g.cy,
              width: g.r * 2,
              height: g.r * 2,
              marginLeft: -g.r,
              marginTop: -g.r,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${g.color} 0%, rgba(217,97,76,0.3) 45%, transparent 75%)`,
              filter: 'blur(8px)',
              mixBlendMode: 'screen',
            }}
          />
        ))}

        {/* Clean student tap label */}
        <div
          style={{
            position: 'absolute',
            bottom: 16,
            left: 20,
            fontFamily: "'Inter', sans-serif",
            fontSize: 12,
            fontVariantNumeric: 'tabular-nums',
            color: 'rgba(255, 255, 255, 0.65)',
          }}
        >
          Where 142 students tapped
        </div>
      </div>
    </VisualCard>
  );
}

/* ── Visual 3: Peer Review Swarm ─────────────────────────────────────────── */
function PeerReviewVisual() {
  const cards = [
    {
      text: 'Optimistic concurrency control minimizes locking overhead in high-read workloads, reducing latency.',
      stars: 5,
    },
    {
      text: 'Vector clocks track causality without relying on synchronized physical timestamps across nodes.',
      stars: 4,
    },
    {
      text: 'Distributed transactions require two-phase commit, introducing availability bottlenecks during partitions.',
      stars: 4,
    },
  ];

  return (
    <VisualCard>
      <div
        style={{
          width: '100%',
          maxWidth: 480,
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
        }}
      >
        {cards.map((c, i) => (
          <div
            key={i}
            style={{
              background: 'var(--surface-light-2)',
              border: '1px solid var(--hairline-light)',
              borderRadius: 12,
              padding: '16px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
            }}
          >
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                color: 'var(--fg-light)',
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              {c.text}
            </p>
            {/* 5-star row in --accent-light */}
            <div style={{ display: 'flex', gap: 4 }}>
              {[1, 2, 3, 4, 5].map((s) => (
                <svg
                  key={s}
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill={s <= c.stars ? 'var(--accent-light)' : 'none'}
                  stroke={s <= c.stars ? 'var(--accent-light)' : 'var(--hairline-light-strong)'}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>
          </div>
        ))}
      </div>
    </VisualCard>
  );
}

/* ── Visual 4: Concept Decay ─────────────────────────────────────────────── */
function ConceptDecayVisual() {
  const concepts = [
    'Memory Alloc',
    'Event Loops',
    'Concurrency',
    'Socket Proto',
    'Normalization',
    'Consensus',
  ];
  const weeks = Array.from({ length: 15 }, (_, i) => `W${String(i + 1).padStart(2, '0')}`);

  // Decay retention scores (100 to lower)
  const data = [
    [98, 95, 92, 88, 82, 75, 68, 62, 56, 50, 44, 40, 36, 32, 28],
    [97, 94, 90, 85, 78, 72, 69, 65, 62, 59, 55, 52, 48, 45, 41],
    [99, 97, 95, 92, 89, 85, 83, 80, 77, 74, 72, 69, 66, 63, 61],
    [96, 91, 85, 79, 72, 65, 58, 52, 45, 39, 34, 30, 26, 23, 20],
    [98, 96, 93, 90, 87, 84, 81, 79, 76, 74, 71, 68, 65, 62, 59],
    [93, 86, 79, 71, 63, 56, 49, 43, 38, 33, 29, 26, 23, 20, 18],
  ];

  // Interpolate: green (#4A9D6E) -> amber (#D9A24C) -> red (#D9614C)
  function getSquareColor(v: number) {
    if (v >= 65) {
      // 65 to 100: amber to green
      const t = (v - 65) / 35;
      const r = Math.round(217 + (74 - 217) * t);
      const g = Math.round(162 + (157 - 162) * t);
      const b = Math.round(76 + (110 - 76) * t);
      return `rgb(${r}, ${g}, ${b})`;
    } else {
      // 0 to 65: red to amber
      const t = v / 65;
      const r = Math.round(217 + (217 - 217) * t);
      const g = Math.round(97 + (162 - 97) * t);
      const b = Math.round(76 + (76 - 76) * t);
      return `rgb(${r}, ${g}, ${b})`;
    }
  }

  return (
    <VisualCard>
      <div
        style={{
          width: '100%',
          maxWidth: 480,
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
        }}
      >
        {/* Header with weeks */}
        <div style={{ display: 'flex', gap: 4, marginLeft: 100 }}>
          {weeks.map((w) => (
            <div
              key={w}
              style={{
                width: 20,
                textAlign: 'center',
                fontFamily: "'Inter', sans-serif",
                fontSize: 9,
                fontVariantNumeric: 'tabular-nums',
                color: 'var(--fg-light-muted)',
              }}
            >
              {w}
            </div>
          ))}
        </div>

        {/* Concept rows */}
        {concepts.map((c, rowIdx) => (
          <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span
              style={{
                width: 96,
                fontFamily: "'Inter', sans-serif",
                fontSize: 12,
                color: 'var(--fg-light)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {c}
            </span>
            {data[rowIdx].map((v, colIdx) => (
              <div
                key={colIdx}
                title={`${c} - ${weeks[colIdx]}: ${v}% retention`}
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 4,
                  background: getSquareColor(v),
                  opacity: 0.9,
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </VisualCard>
  );
}

/* ── Feature Row Component ────────────────────────────────────────────────── */
interface FeatureRowProps {
  eyebrow: string;
  headline: string;
  body: string;
  meta: string;
  visual: React.ReactNode;
  visualLeft?: boolean;
}

function FeatureRow({ eyebrow, headline, body, meta, visual, visualLeft }: FeatureRowProps) {
  const { ref, visible } = useRevealOnScroll(0.2);

  return (
    <div
      ref={ref}
      style={{
        padding: '120px 32px',
        maxWidth: 1200,
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        alignItems: 'center',
        gap: 80,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 600ms cubic-bezier(0.16, 1, 0.3, 1), transform 600ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Visual */}
      <div
        style={{
          order: visualLeft ? 1 : 2,
          display: 'flex',
          justifyContent: visualLeft ? 'flex-start' : 'flex-end',
          minHeight: 400,
        }}
      >
        {visual}
      </div>

      {/* Text column */}
      <div
        style={{
          order: visualLeft ? 2 : 1,
          maxWidth: 440,
        }}
      >
        {/* Eyebrow: Instrument Serif italic, 15px, lowercase */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontStyle: 'italic',
              fontSize: 15,
              color: 'var(--fg-light-muted)',
            }}
          >
            {eyebrow}
          </span>
          <EyebrowCheck visible={visible} />
        </div>

        {/* Headline: Instrument Serif, 36px, letter-spacing: -0.02em, line-height 1.2, margin-top: 12px */}
        <h3
          style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: 36,
            fontWeight: 400,
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            color: 'var(--fg-light)',
            marginTop: 12,
            marginBottom: 0,
          }}
        >
          {headline}
        </h3>

        {/* Body: Inter, 15px, var(--fg-light-muted), line-height 1.7, margin-top: 20px */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 15,
            color: 'var(--fg-light-muted)',
            lineHeight: 1.7,
            marginTop: 20,
            marginBottom: 0,
          }}
        >
          {body}
        </p>

        {/* Meta line: Inter 12px var(--fg-light-subtle), margin-top: 24px, prefixed with · */}
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 12,
            color: 'var(--fg-light-subtle)',
            marginTop: 24,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <span>·</span>
          <span>{meta}</span>
        </div>
      </div>
    </div>
  );
}

/* ── Section Export ───────────────────────────────────────────────────────── */
export function Features() {
  const rows = [
    {
      eyebrow: 'Network matching',
      headline: 'Which concepts do they actually connect?',
      body: 'Students draw lines between concepts on their phones. If half the class draws the wrong connection, you see it as a thick red line on the projector. Before you move on.',
      meta: 'Updates 10 times a second',
      visual: <NetworkMatchingVisual />,
      visualLeft: true,
    },
    {
      eyebrow: 'Spatial hotspots',
      headline: 'Where do they think the problem is?',
      body: 'Put up an X-ray, a schematic, a map. Students tap where they think the issue is. You see the whole room’s guesses pile up in one place, or scatter across three wrong ones.',
      meta: 'Every phone, every pixel',
      visual: <SpatialHotspotsVisual />,
      visualLeft: false,
    },
    {
      eyebrow: 'Peer review swarm',
      headline: 'The room finds its own best answer.',
      body: 'Students write a short answer. Then each one grades three anonymous responses from classmates. In a minute, you have the room’s verdict on what a good answer looks like.',
      meta: 'Anonymous, crowd-ranked',
      visual: <PeerReviewVisual />,
      visualLeft: true,
    },
    {
      eyebrow: 'Concept decay',
      headline: 'Know what they’re starting to forget.',
      body: 'Every question is tagged. Over the semester you can see which ideas are slipping, and get a warning before the class shows up to the midterm having forgotten how pointers work.',
      meta: 'Tracks all 15 weeks',
      visual: <ConceptDecayVisual />,
      visualLeft: false,
    },
  ];

  return (
    <section id="features" style={{ width: '100%' }}>
      {rows.map((r, i) => (
        <React.Fragment key={r.eyebrow}>
          <FeatureRow
            eyebrow={r.eyebrow}
            headline={r.headline}
            body={r.body}
            meta={r.meta}
            visual={r.visual}
            visualLeft={r.visualLeft}
          />
          {/* Row-to-row separation: hairline 1px solid var(--hairline-light) across the full max-width, only between rows */}
          {i < rows.length - 1 && (
            <div
              style={{
                maxWidth: 1200,
                margin: '0 auto',
                height: 1,
                background: 'var(--hairline-light)',
              }}
            />
          )}
        </React.Fragment>
      ))}
    </section>
  );
}
