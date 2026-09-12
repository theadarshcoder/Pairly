import React from 'react';

/**
 * Common Craft.do Bento Box Card Wrapper
 */
function BentoCard({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div
      className="bento-inner-card"
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '22px',
        padding: '20px 22px',
        boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02)',
        border: '1px solid rgba(255, 255, 255, 0.95)',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/**
 * Bento Header (Icon + Title)
 */
function BentoHeader({ icon, title }: { icon: string; title: string }) {
  return (
    <div
      className="bento-inner-header"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '13px',
        fontWeight: 600,
        color: '#0F172A',
        letterSpacing: '-0.01em',
        marginBottom: '14px',
      }}
    >
      <span style={{ fontSize: '15px', opacity: 0.9 }}>{icon}</span>
      <span>{title}</span>
    </div>
  );
}

/**
 * 4x2 Icon Box Tile
 */
function IconTile({
  bg,
  color,
  label,
  children,
}: {
  bg: string;
  color: string;
  label: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      title={label}
      style={{
        width: '40px',
        height: '40px',
        borderRadius: '12px',
        backgroundColor: bg,
        color: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '11px',
        fontWeight: 700,
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
        cursor: 'default',
        transition: 'transform 0.15s ease',
      }}
    >
      {children || label.slice(0, 2).toUpperCase()}
    </div>
  );
}

/**
 * Bottom Community/Cohort Row with Avatar Circles
 */
function BentoBottomRow({
  icon,
  label,
  dotColors,
  count,
  subtext,
}: {
  icon: string;
  label: string;
  dotColors: string[];
  count: string;
  subtext: string;
}) {
  return (
    <BentoCard
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 22px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>
        <span style={{ fontSize: '15px' }}>{icon}</span>
        <span>{label}</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* Overlapping Avatar Circles */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {dotColors.map((color, idx) => (
            <div
              key={idx}
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: color,
                border: '2px solid #FFFFFF',
                marginLeft: idx === 0 ? 0 : '-6px',
                boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
              }}
            />
          ))}
        </div>

        <div>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A', lineHeight: 1.2 }}>
            {count}
          </div>
          <div style={{ fontSize: '11px', color: '#64748B', lineHeight: 1.2 }}>
            {subtext}
          </div>
        </div>
      </div>
    </BentoCard>
  );
}

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * Visual 1: ENGAGE (Blue Card Bento Box)
 * ─────────────────────────────────────────────────────────────────────────────
 */
export function EngageHeatmapVisual() {
  const tools = [
    { label: 'Hotspot', bg: '#0F172A', color: '#38BDF8' },
    { label: 'Sort', bg: '#F8FAFC', color: '#0284C7' },
    { label: 'Match', bg: '#F0FDF4', color: '#16A34A' },
    { label: 'Swarm', bg: '#FEF2F2', color: '#DC2626' },
    { label: 'Q&A', bg: '#FAF5FF', color: '#9333EA' },
    { label: 'Poll', bg: '#EFF6FF', color: '#2563EB' },
    { label: 'Decay', bg: '#FFFBEB', color: '#D97706' },
    { label: 'Matrix', bg: '#F1F5F9', color: '#475569' },
  ];

  const streamTaps = [
    { label: 'T1', bg: '#2DD4A7', color: '#FFFFFF' },
    { label: 'T2', bg: '#38BDF8', color: '#FFFFFF' },
    { label: 'T3', bg: '#818CF8', color: '#FFFFFF' },
    { label: 'T4', bg: '#F43F5E', color: '#FFFFFF' },
    { label: 'T5', bg: '#F59E0B', color: '#FFFFFF' },
    { label: 'T6', bg: '#10B981', color: '#FFFFFF' },
    { label: 'T7', bg: '#6366F1', color: '#FFFFFF' },
    { label: 'T8', bg: '#EC4899', color: '#FFFFFF' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
      {/* Row 1: Top 2 Bento Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <BentoCard>
          <BentoHeader icon="✦" title="Spatial Interactions" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', justifyItems: 'center' }}>
            {tools.map((t, i) => (
              <IconTile key={i} bg={t.bg} color={t.color} label={t.label} />
            ))}
          </div>
        </BentoCard>

        <BentoCard>
          <BentoHeader icon="⊞" title="Live Response Stream" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', justifyItems: 'center' }}>
            {streamTaps.map((t, i) => (
              <IconTile key={i} bg={t.bg} color={t.color} label={t.label} />
            ))}
          </div>
        </BentoCard>
      </div>

      {/* Row 2: Active Classrooms (Squircle Rounded Badges) */}
      <BentoCard>
        <BentoHeader icon="🧭" title="Active Classrooms" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {[
            'Anatomy 201 · 284 students',
            'Biochem Lecture · 190 students',
            'Physics Lab · 94 students',
            'Neurology Ward · 42 students',
          ].map((text, i) => (
            <div
              key={i}
              style={{
                backgroundColor: '#B6E0FA',
                color: '#071E33',
                borderRadius: '14px',
                padding: '12px 16px',
                fontSize: '13px',
                fontWeight: 600,
                textAlign: 'center',
                letterSpacing: '-0.01em',
                boxShadow: '0 1px 2px rgba(7, 30, 51, 0.04)',
              }}
            >
              {text}
            </div>
          ))}
        </div>
      </BentoCard>

      {/* Row 3: Room Pulse / Community */}
      <BentoBottomRow
        icon="👥"
        label="Room Pulse"
        dotColors={['#88D49E', '#84BCF0', '#C3B5E8', '#F5D671', '#0F172A']}
        count="300+ in lecture hall"
        subtext="Sub-100ms real-time sync"
      />
    </div>
  );
}

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * Visual 2: UNDERSTAND (Sage Green Card Bento Box - Image 1 Match)
 * ─────────────────────────────────────────────────────────────────────────────
 */
export function UnderstandDecayVisual() {
  const bars = [
    { week: 'W3', height: '94%', retention: '94%', dim: false },
    { week: 'W6', height: '78%', retention: '78%', dim: true },
    { week: 'W9', height: '62%', retention: '62%', dim: false },
    { week: 'W12', height: '48%', retention: '48%', dim: true },
    { week: 'W15', height: '38%', retention: '38%', dim: false },
  ];

  const tracks = [
    { label: 'Mitosis', bg: '#DCFCE7', color: '#15803D' },
    { label: 'Krebs', bg: '#FEF3C7', color: '#B45309' },
    { label: 'Axons', bg: '#E0F2FE', color: '#0369A1' },
    { label: 'Renal', bg: '#FEE2E2', color: '#B91C1C' },
    { label: 'Osmosis', bg: '#F3E8FF', color: '#7E22CE' },
    { label: 'Enzymes', bg: '#F1F5F9', color: '#334155' },
    { label: 'Synapse', bg: '#CCFBF1', color: '#0F766E' },
    { label: 'DNA', bg: '#FFEDD5', color: '#C2410C' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
      {/* Row 1: Top 2 Bento Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '12px' }}>
        {/* Concept Retention Chart */}
        <BentoCard style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <BentoHeader icon="✦" title="Concept Retention" />
            <span
              style={{
                backgroundColor: '#DCFCE7',
                color: '#166534',
                fontSize: '11px',
                fontWeight: 700,
                padding: '3px 9px',
                borderRadius: '9999px',
                marginTop: '-12px',
              }}
            >
              Decay Alert
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              height: '82px',
              paddingBottom: '2px',
            }}
          >
            {bars.map((bar, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  height: '100%',
                  justifyContent: 'flex-end',
                }}
              >
                <div
                  style={{
                    width: '26px',
                    height: bar.height,
                    backgroundColor: '#1E3A24',
                    opacity: bar.dim ? 0.38 : 0.95,
                    borderRadius: '5px 5px 0 0',
                  }}
                />
                <span style={{ fontSize: '10.5px', fontWeight: 600, color: '#64748B' }}>
                  {bar.week}
                </span>
              </div>
            ))}
          </div>
        </BentoCard>

        {/* Knowledge Tracks (8 icons) */}
        <BentoCard>
          <BentoHeader icon="⊞" title="Knowledge Tracks" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', justifyItems: 'center' }}>
            {tracks.map((t, i) => (
              <IconTile key={i} bg={t.bg} color={t.color} label={t.label} />
            ))}
          </div>
        </BentoCard>
      </div>

      {/* Row 2: Cognitive Drop-offs (Squircle Rounded Badges matching Craft Sample) */}
      <BentoCard>
        <BentoHeader icon="🧭" title="Cognitive Drop-offs" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {[
            'Mitosis Prophase',
            'Krebs Cycle',
            'Action Potentials',
            'Renal Clearance',
          ].map((text, i) => (
            <div
              key={i}
              style={{
                backgroundColor: '#9BD8A9',
                color: '#0A2312',
                borderRadius: '14px',
                padding: '12px 16px',
                fontSize: '13px',
                fontWeight: 600,
                textAlign: 'center',
                letterSpacing: '-0.01em',
                boxShadow: '0 1px 2px rgba(10, 35, 18, 0.04)',
              }}
            >
              {text}
            </div>
          ))}
        </div>
      </BentoCard>

      {/* Row 3: Cohort Retention (Exact Match to Craft's "Community") */}
      <BentoBottomRow
        icon="👥"
        label="Cohort Retention"
        dotColors={['#88D49E', '#84BCF0', '#C3B5E8', '#F5D671', '#0F172A']}
        count="280+ students tracked"
        subtext="Longitudinal decay analysis ready"
      />
    </div>
  );
}

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * Visual 3: GENERATE (Butter Yellow Card Bento Box)
 * ─────────────────────────────────────────────────────────────────────────────
 */
export function GenerateSyllabusVisual() {
  const sources = [
    { label: 'PDF', bg: '#FEE2E2', color: '#DC2626' },
    { label: 'Slides', bg: '#FEF3C7', color: '#D97706' },
    { label: 'Notion', bg: '#F1F5F9', color: '#0F172A' },
    { label: 'Canvas', bg: '#FFEDD5', color: '#EA580C' },
    { label: 'Docs', bg: '#EFF6FF', color: '#2563EB' },
    { label: 'Blackboard', bg: '#F8FAFC', color: '#475569' },
    { label: 'PubMed', bg: '#E0F2FE', color: '#0284C7' },
    { label: 'Markdown', bg: '#F3E8FF', color: '#9333EA' },
  ];

  const outputs = [
    { label: 'Hotspot', bg: '#0F172A', color: '#38BDF8' },
    { label: 'Sort', bg: '#F8FAFC', color: '#0284C7' },
    { label: 'Match', bg: '#F0FDF4', color: '#16A34A' },
    { label: 'Swarm', bg: '#FEF2F2', color: '#DC2626' },
    { label: 'Case', bg: '#FFFBEB', color: '#D97706' },
    { label: 'Q&A', bg: '#FAF5FF', color: '#9333EA' },
    { label: 'Label', bg: '#EFF6FF', color: '#2563EB' },
    { label: 'Graph', bg: '#F1F5F9', color: '#475569' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
      {/* Row 1: Top 2 Bento Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <BentoCard>
          <BentoHeader icon="✦" title="Source Ingestion" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', justifyItems: 'center' }}>
            {sources.map((s, i) => (
              <IconTile key={i} bg={s.bg} color={s.color} label={s.label} />
            ))}
          </div>
        </BentoCard>

        <BentoCard>
          <BentoHeader icon="⊞" title="Slide Synthesizer" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', justifyItems: 'center' }}>
            {outputs.map((s, i) => (
              <IconTile key={i} bg={s.bg} color={s.color} label={s.label} />
            ))}
          </div>
        </BentoCard>
      </div>

      {/* Row 2: Generated Modules (Squircle Rounded Badges) */}
      <BentoCard>
        <BentoHeader icon="🧭" title="Generated Question Modules" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {[
            'Diagnostic Hotspots',
            'Enzyme Sequencing',
            'Neural Pathways',
            'Clinical Case Review',
          ].map((text, i) => (
            <div
              key={i}
              style={{
                backgroundColor: '#F7E18C',
                color: '#2E2002',
                borderRadius: '14px',
                padding: '12px 16px',
                fontSize: '13px',
                fontWeight: 600,
                textAlign: 'center',
                letterSpacing: '-0.01em',
                boxShadow: '0 1px 2px rgba(46, 32, 2, 0.04)',
              }}
            >
              {text}
            </div>
          ))}
        </div>
      </BentoCard>

      {/* Row 3: AI Pipeline */}
      <BentoBottomRow
        icon="⚡"
        label="AI Pipeline"
        dotColors={['#F59E0B', '#88D49E', '#84BCF0', '#C3B5E8', '#0F172A']}
        count="Generated in 2.4s"
        subtext="Direct export to presenter view"
      />
    </div>
  );
}

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * Visual 4: ORGANIZE (Coral Card Bento Box)
 * ─────────────────────────────────────────────────────────────────────────────
 */
export function OrganizeArchiveVisual() {
  const semesters = [
    { label: 'W1', bg: '#FEF2F2', color: '#DC2626' },
    { label: 'W2', bg: '#FFEDD5', color: '#EA580C' },
    { label: 'Midterm', bg: '#FEF3C7', color: '#D97706' },
    { label: 'Lab 1', bg: '#F0FDF4', color: '#16A34A' },
    { label: 'Lab 2', bg: '#EFF6FF', color: '#2563EB' },
    { label: 'Clinic', bg: '#FAF5FF', color: '#9333EA' },
    { label: 'Final', bg: '#F1F5F9', color: '#0F172A' },
    { label: 'Archive', bg: '#FFF1F2', color: '#E11D48' },
  ];

  const cohorts = [
    { label: 'Sec A', bg: '#EFF6FF', color: '#1D4ED8' },
    { label: 'Sec B', bg: '#F0FDF4', color: '#15803D' },
    { label: 'Honors', bg: '#FEF3C7', color: '#B45309' },
    { label: 'Med 1', bg: '#FDF2F8', color: '#BE185D' },
    { label: 'Med 2', bg: '#F3E8FF', color: '#7E22CE' },
    { label: 'Nursing', bg: '#E0F2FE', color: '#0369A1' },
    { label: 'Grad', bg: '#F8FAFC', color: '#334155' },
    { label: 'Online', bg: '#FFF7ED', color: '#C2410C' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
      {/* Row 1: Top 2 Bento Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <BentoCard>
          <BentoHeader icon="✦" title="Semester Hierarchy" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', justifyItems: 'center' }}>
            {semesters.map((s, i) => (
              <IconTile key={i} bg={s.bg} color={s.color} label={s.label} />
            ))}
          </div>
        </BentoCard>

        <BentoCard>
          <BentoHeader icon="⊞" title="Section Archives" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', justifyItems: 'center' }}>
            {cohorts.map((c, i) => (
              <IconTile key={i} bg={c.bg} color={c.color} label={c.label} />
            ))}
          </div>
        </BentoCard>
      </div>

      {/* Row 2: Active Sections (Squircle Rounded Badges) */}
      <BentoCard>
        <BentoHeader icon="🧭" title="Active Sections" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {[
            'Lecture Hall A · Morning',
            'Lab Section 3 · Afternoon',
            'Clinical Rotation · Hospital',
            'Remote Cohort · Evening',
          ].map((text, i) => (
            <div
              key={i}
              style={{
                backgroundColor: '#F8B8A0',
                color: '#2E0F07',
                borderRadius: '14px',
                padding: '12px 16px',
                fontSize: '13px',
                fontWeight: 600,
                textAlign: 'center',
                letterSpacing: '-0.01em',
                boxShadow: '0 1px 2px rgba(46, 15, 7, 0.04)',
              }}
            >
              {text}
            </div>
          ))}
        </div>
      </BentoCard>

      {/* Row 3: Educator Team */}
      <BentoBottomRow
        icon="👥"
        label="Educator Team"
        dotColors={['#FB7185', '#F59E0B', '#88D49E', '#84BCF0', '#0F172A']}
        count="4 Course Instructors"
        subtext="LMS gradebook export ready"
      />
    </div>
  );
}
