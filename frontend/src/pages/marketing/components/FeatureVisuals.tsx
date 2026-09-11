import React from 'react';
import { NetworkMatchIcon } from '../icons/NetworkMatchIcon.js';
import { SortingIcon } from '../icons/SortingIcon.js';
import { HotspotIcon } from '../icons/HotspotIcon.js';

/**
 * Visual 1: Large Heatmap Panel (Engage)
 */
export function EngageHeatmapVisual() {
  return (
    <div
      style={{
        backgroundColor: '#0F1216',
        color: '#F2F2F4',
        padding: '24px',
        minHeight: '280px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: 'var(--radius-md)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 2 }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FF5F56' }} />
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FFBD2E' }} />
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#27C93F' }} />
        </div>
        <span style={{ fontSize: '0.78rem', color: '#9A9AA4', fontWeight: 600, letterSpacing: '0.04em' }}>
          LIVE HEATMAP · DISTAL RADIUS
        </span>
      </div>

      {/* Canvas graphics */}
      <div style={{ position: 'relative', height: '170px', width: '100%', margin: '12px 0', overflow: 'hidden' }}>
        {/* Abstract bone shape */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '25%',
            width: '50%',
            height: '130px',
            border: '2px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '40px 10px 40px 10px',
            background: 'rgba(255, 255, 255, 0.03)',
            transform: 'rotate(-5deg)',
          }}
        />

        {/* Dense Heatmap Blobs */}
        <div
          style={{
            position: 'absolute',
            top: '40px',
            left: '42%',
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: 'rgba(255, 77, 109, 0.85)',
            filter: 'blur(16px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '30px',
            left: '35%',
            width: '130px',
            height: '130px',
            borderRadius: '50%',
            background: 'rgba(255, 176, 32, 0.6)',
            filter: 'blur(20px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '28%',
            width: '170px',
            height: '150px',
            borderRadius: '50%',
            background: 'rgba(45, 212, 167, 0.35)',
            filter: 'blur(24px)',
          }}
        />

        {/* Hotspot coordinate ticks */}
        <div
          style={{
            position: 'absolute',
            top: '65px',
            left: '48%',
            width: '20px',
            height: '20px',
            border: '2px solid #FFFFFF',
            borderRadius: '50%',
            boxShadow: '0 0 10px #FF4D6D',
          }}
        />
      </div>

      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(255, 255, 255, 0.07)',
          padding: '6px 14px',
          borderRadius: '8px',
          fontSize: '0.82rem',
          color: '#E2E8F0',
          width: 'fit-content',
          zIndex: 2,
        }}
      >
        <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#2DD4A7' }} />
        <span>312 live taps · updating 10×/sec</span>
      </div>
    </div>
  );
}

/**
 * Visual 2: 5-Bar Retention Decay Chart (Understand)
 */
export function UnderstandDecayVisual() {
  const bars = [
    { week: 'W3', height: '94%', retention: '94%', dim: false },
    { week: 'W6', height: '78%', retention: '78%', dim: true },
    { week: 'W9', height: '62%', retention: '62%', dim: false },
    { week: 'W12', height: '48%', retention: '48%', dim: true },
    { week: 'W15', height: '38%', retention: '38%', dim: false },
  ];

  return (
    <div
      style={{
        backgroundColor: '#FBF8F1',
        color: '#1B1712',
        padding: '24px',
        minHeight: '280px',
        borderRadius: 'var(--radius-md)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        border: '1px solid #E4DBC8',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--sage-deep)' }}>
            CONCEPT RETENTION
          </div>
          <div style={{ fontSize: '1.05rem', fontWeight: 600, marginTop: '2px' }}>
            Mitosis: Prophase to Anaphase
          </div>
        </div>
        <div
          style={{
            background: 'var(--sage)',
            color: 'var(--sage-deep)',
            padding: '4px 10px',
            borderRadius: 'var(--radius-pill)',
            fontSize: '0.78rem',
            fontWeight: 700,
          }}
        >
          Decay Alert
        </div>
      </div>

      {/* 5-Bar Chart */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-around',
          height: '140px',
          padding: '10px 0',
          borderBottom: '1.5px solid var(--line)',
        }}
      >
        {bars.map((bar, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              height: '100%',
              justifyContent: 'flex-end',
            }}
          >
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ink-soft)' }}>
              {bar.retention}
            </span>
            <div
              style={{
                width: '38px',
                height: bar.height,
                backgroundColor: 'var(--sage-deep)',
                opacity: bar.dim ? 0.38 : 0.95,
                borderRadius: '6px 6px 0 0',
                transition: 'height 0.3s ease',
              }}
            />
            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--ink-soft)', marginTop: '4px' }}>
              {bar.week}
            </span>
          </div>
        ))}
      </div>

      <div style={{ fontSize: '0.82rem', color: 'var(--ink-soft)', marginTop: '8px' }}>
        Caption: Mitosis · retention across weeks 3, 6, 9, 12, 15
      </div>
    </div>
  );
}

/**
 * Visual 3: Syllabus Upload & Slide Generator (Generate)
 */
export function GenerateSyllabusVisual() {
  return (
    <div
      style={{
        backgroundColor: '#FBF8F1',
        color: '#1B1712',
        padding: '22px',
        minHeight: '280px',
        borderRadius: 'var(--radius-md)',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        border: '1px solid #E4DBC8',
      }}
    >
      {/* Dashed upload card */}
      <div
        style={{
          border: '2px dashed var(--butter-deep)',
          borderRadius: '12px',
          padding: '14px 18px',
          backgroundColor: 'rgba(243, 217, 139, 0.25)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--butter-deep)' }}>
            Week 4 — Cell Division.pdf
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--ink-soft)', marginTop: '2px' }}>
            Generating interactive slides…
          </div>
        </div>
        <div
          style={{
            width: '18px',
            height: '18px',
            borderRadius: '50%',
            border: '2.5px solid var(--butter-deep)',
            borderTopColor: 'transparent',
            animation: 'spin 1s linear infinite',
          }}
        />
      </div>

      {/* Generated output list (3 rows) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 14px',
            backgroundColor: '#FFFFFF',
            borderRadius: '10px',
            border: '1px solid var(--line)',
            fontSize: '0.88rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <NetworkMatchIcon size={18} />
            <span style={{ fontWeight: 600 }}>Network Matching</span>
          </div>
          <span style={{ color: 'var(--butter-deep)', fontWeight: 600 }}>mitosis ↔ phases</span>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 14px',
            backgroundColor: '#FFFFFF',
            borderRadius: '10px',
            border: '1px solid var(--line)',
            fontSize: '0.88rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <SortingIcon size={18} />
            <span style={{ fontWeight: 600 }}>Sequential Sorting</span>
          </div>
          <span style={{ color: 'var(--butter-deep)', fontWeight: 600 }}>prophase → telophase</span>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 14px',
            backgroundColor: '#FFFFFF',
            borderRadius: '10px',
            border: '1px solid var(--line)',
            fontSize: '0.88rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <HotspotIcon size={18} />
            <span style={{ fontWeight: 600 }}>Spatial Hotspot</span>
          </div>
          <span style={{ color: 'var(--butter-deep)', fontWeight: 600 }}>cell diagram, 4 targets</span>
        </div>
      </div>
    </div>
  );
}

/**
 * Visual 4: Stacked Semester Cards (Organize)
 */
export function OrganizeArchiveVisual() {
  return (
    <div
      style={{
        padding: '16px 8px',
        minHeight: '280px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '12px',
      }}
    >
      {/* Three stacked white cards */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '14px',
          padding: '16px 20px',
          border: '1px solid rgba(122, 52, 33, 0.15)',
          boxShadow: '0 6px 16px -4px rgba(122, 52, 33, 0.12)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          transform: 'rotate(-1deg)',
        }}
      >
        <div>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--coral-deep)', textTransform: 'uppercase' }}>
            Today's session
          </div>
          <div style={{ fontSize: '1.02rem', fontWeight: 600, color: 'var(--ink)', marginTop: '2px' }}>
            Bio 101 — Section C
          </div>
        </div>
        <span style={{ fontSize: '0.8rem', fontWeight: 600, background: '#F0BBA9', padding: '4px 10px', borderRadius: '12px', color: '#7A3421' }}>
          Active
        </span>
      </div>

      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '14px',
          padding: '16px 20px',
          border: '1px solid rgba(122, 52, 33, 0.15)',
          boxShadow: '0 6px 16px -4px rgba(122, 52, 33, 0.12)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          transform: 'rotate(1deg)',
        }}
      >
        <div>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--coral-deep)', textTransform: 'uppercase' }}>
            This semester
          </div>
          <div style={{ fontSize: '1.02rem', fontWeight: 600, color: 'var(--ink)', marginTop: '2px' }}>
            4 sections, 187 students
          </div>
        </div>
        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--ink-soft)' }}>
          Spring 2026
        </span>
      </div>

      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '14px',
          padding: '16px 20px',
          border: '1px solid rgba(122, 52, 33, 0.15)',
          boxShadow: '0 6px 16px -4px rgba(122, 52, 33, 0.12)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          transform: 'rotate(-0.5deg)',
        }}
      >
        <div>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--coral-deep)', textTransform: 'uppercase' }}>
            Concept archive
          </div>
          <div style={{ fontSize: '1.02rem', fontWeight: 600, color: 'var(--ink)', marginTop: '2px' }}>
            15 weeks of tagged history
          </div>
        </div>
        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--ink-soft)' }}>
          View all
        </span>
      </div>
    </div>
  );
}
