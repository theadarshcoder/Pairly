import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sliders, AlertTriangle, CheckCircle2, TrendingDown, Play, Plus, Sparkles, ArrowUpRight, BarChart2 } from 'lucide-react';
import { DashboardLayout } from './components/DashboardLayout.js';

interface ConceptDecayRecord {
  id: string;
  name: string;
  course: string;
  introducedWeek: number;
  decayRate: string;
  status: 'critical' | 'warning' | 'healthy';
  retentionScores: number[]; // 15 weeks of scores (0-100 or null if not yet taught)
}

export default function DecayPage() {
  const navigate = useNavigate();
  const [selectedConcept, setSelectedConcept] = useState<string>('c-1');
  const [activeFilter, setActiveFilter] = useState<'all' | 'critical' | 'warning' | 'healthy'>('all');

  const concepts: ConceptDecayRecord[] = [
    {
      id: 'c-1',
      name: 'Pointer Arithmetic & Memory Leaks',
      course: 'CS106B',
      introducedWeek: 2,
      decayRate: '-38% (High)',
      status: 'critical',
      retentionScores: [0, 94, 88, 76, 68, 59, 54, 51, 48, 45, 42, 40, 38, 36, 35],
    },
    {
      id: 'c-2',
      name: 'AVL Tree Double Rotations',
      course: 'CS106B',
      introducedWeek: 4,
      decayRate: '-26% (Moderate)',
      status: 'warning',
      retentionScores: [0, 0, 0, 91, 85, 78, 74, 71, 68, 66, 65, 63, 62, 60, 59],
    },
    {
      id: 'c-3',
      name: 'Amortized Big-O Vector Expansion',
      course: 'CS106B',
      introducedWeek: 1,
      decayRate: '-12% (Stable)',
      status: 'healthy',
      retentionScores: [96, 94, 91, 89, 88, 87, 86, 85, 84, 84, 83, 82, 82, 81, 80],
    },
    {
      id: 'c-4',
      name: 'Dijkstra vs A* Heuristic Admissibility',
      course: 'CS106B',
      introducedWeek: 6,
      decayRate: '-44% (Critical)',
      status: 'critical',
      retentionScores: [0, 0, 0, 0, 0, 89, 79, 68, 58, 52, 48, 45, 44, 42, 40],
    },
    {
      id: 'c-5',
      name: 'Recursive Call Stack Frame Unwinding',
      course: 'CS106B',
      introducedWeek: 3,
      decayRate: '-22% (Moderate)',
      status: 'warning',
      retentionScores: [0, 0, 92, 86, 80, 75, 73, 70, 68, 67, 65, 64, 63, 62, 61],
    },
  ];

  const filteredConcepts = concepts.filter((c) => activeFilter === 'all' || c.status === activeFilter);
  const activeRecord = concepts.find((c) => c.id === selectedConcept) || concepts[0];

  const getScoreColor = (score: number) => {
    if (score === 0) return 'empty';
    if (score >= 80) return 'high';
    if (score >= 60) return 'mid';
    return 'low';
  };

  return (
    <DashboardLayout activeNav="decay">
      <div className="decay-container">
        {/* Top Header */}
        <div className="decay-header">
          <div>
            <h1 className="decay-h1">15-Week Concept Retention Matrix</h1>
            <p className="decay-sub">
              Monitor retention curves across lecture cohorts. Identify concepts undergoing memory decay and automatically trigger spaced repetition questions during live sessions.
            </p>
          </div>

          <button
            type="button"
            className="inject-quiz-cta"
            onClick={() => navigate('/presenter')}
          >
            <Play size={15} fill="currentColor" />
            <span>Launch Live Refresher Session</span>
          </button>
        </div>

        {/* Overview Metric Cards */}
        <div className="metric-cards-row">
          <div className="metric-box alert">
            <div className="metric-head">
              <span className="metric-label">Critical Decay Concepts</span>
              <AlertTriangle size={18} className="alert-amber" />
            </div>
            <div className="metric-val-wrap">
              <span className="metric-val">2 Concepts</span>
              <span className="metric-pill critical">&lt;60% Retention</span>
            </div>
            <p className="metric-foot">Pointer Arithmetic & A* Admissibility</p>
          </div>

          <div className="metric-box">
            <div className="metric-head">
              <span className="metric-label">Average Cohort Retention</span>
              <BarChart2 size={18} className="icon-blue" />
            </div>
            <div className="metric-val-wrap">
              <span className="metric-val">71.4%</span>
              <span className="metric-pill stable">Optimal</span>
            </div>
            <p className="metric-foot">Tested across 142 enrolled students</p>
          </div>

          <div className="metric-box">
            <div className="metric-head">
              <span className="metric-label">Next Spaced Repetition Trigger</span>
              <TrendingDown size={18} className="icon-purple" />
            </div>
            <div className="metric-val-wrap">
              <span className="metric-val">Thursday Lecture</span>
              <span className="metric-pill ai">Auto-Queued</span>
            </div>
            <p className="metric-foot">3 spatial probes queued for CS106B</p>
          </div>
        </div>

        {/* 15-Week Retention Heatmap Matrix */}
        <div className="decay-matrix-card">
          <div className="matrix-topbar">
            <div>
              <h3 className="matrix-title">Cohort Retention Heat Grid (Weeks 1 – 15)</h3>
              <p className="matrix-caption">Color ramp indicates student retention score measured on subsequent spatial diagrams.</p>
            </div>

            {/* Filter Buttons */}
            <div className="matrix-filters">
              <button
                type="button"
                className={`filter-chip ${activeFilter === 'all' ? 'is-active' : ''}`}
                onClick={() => setActiveFilter('all')}
              >
                All (5)
              </button>
              <button
                type="button"
                className={`filter-chip critical ${activeFilter === 'critical' ? 'is-active' : ''}`}
                onClick={() => setActiveFilter('critical')}
              >
                Critical (2)
              </button>
              <button
                type="button"
                className={`filter-chip warning ${activeFilter === 'warning' ? 'is-active' : ''}`}
                onClick={() => setActiveFilter('warning')}
              >
                Warning (2)
              </button>
              <button
                type="button"
                className={`filter-chip healthy ${activeFilter === 'healthy' ? 'is-active' : ''}`}
                onClick={() => setActiveFilter('healthy')}
              >
                Healthy (1)
              </button>
            </div>
          </div>

          {/* Matrix Table */}
          <div className="matrix-table-wrap">
            <table className="matrix-table">
              <thead>
                <tr>
                  <th className="th-concept">Tagged Syllabus Concept</th>
                  <th className="th-rate">Decay Rate</th>
                  {Array.from({ length: 15 }, (_, i) => (
                    <th key={i} className="th-week">W{i + 1}</th>
                  ))}
                  <th className="th-action">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredConcepts.map((item) => (
                  <tr
                    key={item.id}
                    className={`matrix-row ${item.id === selectedConcept ? 'is-selected' : ''}`}
                    onClick={() => setSelectedConcept(item.id)}
                  >
                    <td className="td-concept">
                      <div className="concept-info-cell">
                        <strong className="concept-name">{item.name}</strong>
                        <span className="concept-meta">{item.course} · Intro W{item.introducedWeek}</span>
                      </div>
                    </td>

                    <td className="td-rate">
                      <span className={`rate-tag ${item.status}`}>{item.decayRate}</span>
                    </td>

                    {/* 15 Weeks Grid Cells */}
                    {item.retentionScores.map((score, wIdx) => {
                      const col = getScoreColor(score);
                      return (
                        <td key={wIdx} className="td-cell">
                          <div className={`score-tile ${col}`} title={score > 0 ? `Week ${wIdx + 1}: ${score}% retention` : `Not yet introduced`}>
                            {score > 0 ? score : '—'}
                          </div>
                        </td>
                      );
                    })}

                    <td className="td-action">
                      <button
                        type="button"
                        className="refresher-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate('/presenter');
                        }}
                      >
                        <span>Reinforce</span>
                        <ArrowUpRight size={13} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Legend */}
          <div className="matrix-legend-row">
            <span className="legend-label">Retention Score:</span>
            <div className="legend-item">
              <span className="legend-swatch high" />
              <span>&gt; 80% (Mastered)</span>
            </div>
            <div className="legend-item">
              <span className="legend-swatch mid" />
              <span>60% – 80% (Warning)</span>
            </div>
            <div className="legend-item">
              <span className="legend-swatch low" />
              <span>&lt; 60% (Critical Decay)</span>
            </div>
            <div className="legend-item">
              <span className="legend-swatch empty" />
              <span>Unintroduced</span>
            </div>
          </div>
        </div>

        {/* Selected Concept Deep Dive Box */}
        <div className="concept-detail-card">
          <div className="detail-head">
            <div className="detail-title-wrap">
              <h3 className="detail-title">{activeRecord.name}</h3>
              <span className={`rate-tag ${activeRecord.status}`}>{activeRecord.decayRate}</span>
            </div>
            <button
              type="button"
              className="detail-inject-btn"
              onClick={() => navigate('/presenter')}
            >
              <Sparkles size={14} />
              <span>Inject Spaced Repetition Question Now</span>
            </button>
          </div>

          <div className="detail-grid">
            <div className="detail-box">
              <h4 className="detail-box-title">Why it Decays</h4>
              <p className="detail-box-text">
                Students confuse memory address semantics with dereferencing operators once double pointers (void**) and pointer-to-pointer casting are introduced in week 6.
              </p>
            </div>

            <div className="detail-box">
              <h4 className="detail-box-title">Recommended Spatial Remediation</h4>
              <p className="detail-box-text">
                Present an interactive memory array map and instruct students to click on the exact register offset modified by pointer arithmetic prior to runtime execution.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .decay-container {
          max-width: 1300px;
        }

        .decay-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 28px;
          flex-wrap: wrap;
        }

        .decay-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11.5px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          padding: 3px 10px;
          border-radius: 9999px;
          background: #EFF6FF;
          color: #1D4ED8;
          margin-bottom: 10px;
        }

        .decay-h1 {
          font-family: var(--font-display, 'UntitledSerif', Georgia, serif);
          font-size: 32px;
          font-weight: 700;
          color: #0F172A;
          letter-spacing: -0.02em;
          margin: 0 0 8px 0;
        }

        .decay-sub {
          margin: 0;
          font-size: 14px;
          color: #64748B;
          max-width: 720px;
          line-height: 1.5;
        }

        .inject-quiz-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          height: 44px;
          padding: 0 20px;
          border-radius: 9999px;
          background: #0F172A;
          color: #FFFFFF;
          border: none;
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
          box-shadow: 0 4px 14px rgba(15, 23, 42, 0.15);
        }

        .inject-quiz-cta:hover {
          background: #1E293B;
          transform: translateY(-1px);
        }

        /* Metric Cards */
        .metric-cards-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
          margin-bottom: 28px;
        }

        .metric-box {
          background: #FFFFFF;
          border-radius: 16px;
          border: 1px solid #E2E8F0;
          padding: 20px 22px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
        }

        .metric-box.alert {
          border-left: 4px solid #EF4444;
        }

        .metric-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
        }

        .metric-label {
          font-size: 13px;
          font-weight: 600;
          color: #475569;
        }

        .alert-amber { color: #EF4444; }
        .icon-blue { color: #2563EB; }
        .icon-purple { color: #7C3AED; }

        .metric-val-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 6px;
        }

        .metric-val {
          font-size: 24px;
          font-weight: 700;
          color: #0F172A;
          letter-spacing: -0.02em;
        }

        .metric-pill {
          font-size: 11px;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 9999px;
        }

        .metric-pill.critical {
          background: #FEE2E2;
          color: #DC2626;
        }

        .metric-pill.stable {
          background: #DCFCE7;
          color: #166534;
        }

        .metric-pill.ai {
          background: #F3E8FF;
          color: #7E22CE;
        }

        .metric-foot {
          margin: 0;
          font-size: 12px;
          color: #64748B;
        }

        /* Matrix Card */
        .decay-matrix-card {
          background: #FFFFFF;
          border-radius: 20px;
          border: 1px solid #E2E8F0;
          padding: 26px;
          margin-bottom: 24px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
        }

        .matrix-topbar {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 14px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .matrix-title {
          margin: 0 0 4px 0;
          font-size: 17px;
          font-weight: 700;
          color: #0F172A;
        }

        .matrix-caption {
          margin: 0;
          font-size: 12.5px;
          color: #64748B;
        }

        .matrix-filters {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .filter-chip {
          height: 30px;
          padding: 0 12px;
          border-radius: 9999px;
          border: 1px solid transparent;
          background: #F1F5F9;
          font-size: 12px;
          font-weight: 600;
          color: #475569;
          cursor: pointer;
          transition: all 0.12s ease;
        }

        .filter-chip:hover {
          background: #E2E8F0;
        }

        .filter-chip.is-active {
          background: #0F172A;
          color: #FFFFFF;
        }

        /* Matrix Table */
        .matrix-table-wrap {
          overflow-x: auto;
        }

        .matrix-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
        }

        .matrix-table th {
          padding: 8px 6px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          color: #64748B;
          text-align: center;
          border-bottom: 1px solid #E2E8F0;
        }

        .matrix-table th.th-concept {
          text-align: left;
          padding-left: 12px;
          min-width: 220px;
        }

        .matrix-table th.th-rate {
          min-width: 110px;
        }

        .matrix-table th.th-week {
          width: 38px;
        }

        .matrix-table th.th-action {
          min-width: 90px;
        }

        .matrix-row {
          cursor: pointer;
          transition: background 0.12s ease;
          border-bottom: 1px solid #F8FAFC;
        }

        .matrix-row:hover {
          background: #F8FAFC;
        }

        .matrix-row.is-selected {
          background: #EFF6FF;
        }

        .td-concept {
          padding: 12px 6px 12px 12px;
        }

        .concept-name {
          font-size: 13.5px;
          color: #0F172A;
          display: block;
        }

        .concept-meta {
          font-size: 11.5px;
          color: #64748B;
        }

        .td-rate {
          text-align: center;
          padding: 6px;
        }

        .rate-tag {
          font-size: 11px;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 6px;
          display: inline-block;
        }

        .rate-tag.critical {
          background: #FEE2E2;
          color: #DC2626;
        }

        .rate-tag.warning {
          background: #FEF3C7;
          color: #D97706;
        }

        .rate-tag.healthy {
          background: #DCFCE7;
          color: #166534;
        }

        .td-cell {
          padding: 6px 2px;
          text-align: center;
        }

        .score-tile {
          width: 32px;
          height: 28px;
          margin: 0 auto;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: 700;
          transition: transform 0.12s ease;
        }

        .score-tile:hover {
          transform: scale(1.15);
        }

        .score-tile.high {
          background: #DCFCE7;
          color: #15803D;
        }

        .score-tile.mid {
          background: #FEF3C7;
          color: #B45309;
        }

        .score-tile.low {
          background: #FEE2E2;
          color: #DC2626;
        }

        .score-tile.empty {
          background: #F1F5F9;
          color: #CBD5E1;
        }

        .td-action {
          padding: 6px 12px 6px 6px;
          text-align: center;
        }

        .refresher-btn {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 11.5px;
          font-weight: 600;
          color: #2563EB;
          display: inline-flex;
          align-items: center;
          gap: 3px;
          cursor: pointer;
          transition: all 0.12s ease;
        }

        .refresher-btn:hover {
          background: #2563EB;
          color: #FFFFFF;
          border-color: #2563EB;
        }

        /* Legend */
        .matrix-legend-row {
          margin-top: 18px;
          padding-top: 14px;
          border-top: 1px solid #F1F5F9;
          display: flex;
          align-items: center;
          gap: 16px;
          font-size: 12px;
          color: #64748B;
          flex-wrap: wrap;
        }

        .legend-label {
          font-weight: 600;
          color: #334155;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .legend-swatch {
          width: 14px;
          height: 14px;
          border-radius: 4px;
        }

        .legend-swatch.high { background: #DCFCE7; }
        .legend-swatch.mid { background: #FEF3C7; }
        .legend-swatch.low { background: #FEE2E2; }
        .legend-swatch.empty { background: #F1F5F9; }

        /* Detail Card */
        .concept-detail-card {
          background: #FFFFFF;
          border-radius: 18px;
          border: 1px solid #E2E8F0;
          padding: 24px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
        }

        .detail-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 18px;
          gap: 14px;
          flex-wrap: wrap;
        }

        .detail-title-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .detail-title {
          margin: 0;
          font-size: 18px;
          font-weight: 700;
          color: #0F172A;
        }

        .detail-inject-btn {
          height: 38px;
          padding: 0 16px;
          border-radius: 9999px;
          background: #2563EB;
          color: #FFFFFF;
          border: none;
          font-size: 13px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .detail-inject-btn:hover {
          background: #1D4ED8;
        }

        .detail-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .detail-box {
          background: #F8FAFC;
          border-radius: 12px;
          padding: 16px 18px;
        }

        .detail-box-title {
          margin: 0 0 6px 0;
          font-size: 13.5px;
          font-weight: 600;
          color: #0F172A;
        }

        .detail-box-text {
          margin: 0;
          font-size: 13px;
          color: #475569;
          line-height: 1.5;
        }

        /* ── Dark Mode ── */
        [data-theme="dark"] .decay-h1 {
          color: #FFFFFF;
        }

        [data-theme="dark"] .metric-box {
          background: #111620;
          border-color: rgba(255, 255, 255, 0.08);
        }

        [data-theme="dark"] .metric-val {
          color: #FFFFFF;
        }

        [data-theme="dark"] .decay-matrix-card {
          background: #111620;
          border-color: rgba(255, 255, 255, 0.08);
        }

        [data-theme="dark"] .matrix-title {
          color: #FFFFFF;
        }

        [data-theme="dark"] .filter-chip {
          background: #161B24;
          color: #94A3B8;
        }

        [data-theme="dark"] .filter-chip.is-active {
          background: #FFFFFF;
          color: #0F172A;
        }

        [data-theme="dark"] .matrix-table th {
          border-bottom-color: rgba(255, 255, 255, 0.08);
          color: #94A3B8;
        }

        [data-theme="dark"] .matrix-row {
          border-bottom-color: rgba(255, 255, 255, 0.04);
        }

        [data-theme="dark"] .matrix-row:hover {
          background: rgba(255, 255, 255, 0.04);
        }

        [data-theme="dark"] .matrix-row.is-selected {
          background: rgba(59, 130, 246, 0.12);
        }

        [data-theme="dark"] .concept-name {
          color: #FFFFFF;
        }

        [data-theme="dark"] .score-tile.empty {
          background: #161B24;
          color: #475569;
        }

        [data-theme="dark"] .refresher-btn {
          background: #161B24;
          border-color: rgba(255, 255, 255, 0.1);
          color: #60A5FA;
        }

        [data-theme="dark"] .matrix-legend-row {
          border-top-color: rgba(255, 255, 255, 0.06);
        }

        [data-theme="dark"] .legend-swatch.empty {
          background: #161B24;
        }

        [data-theme="dark"] .concept-detail-card {
          background: #111620;
          border-color: rgba(255, 255, 255, 0.08);
        }

        [data-theme="dark"] .detail-title {
          color: #FFFFFF;
        }

        [data-theme="dark"] .detail-box {
          background: #161B24;
        }

        [data-theme="dark"] .detail-box-title {
          color: #FFFFFF;
        }

        [data-theme="dark"] .detail-box-text {
          color: #CBD5E1;
        }

        @media (max-width: 900px) {
          .metric-cards-row {
            grid-template-columns: 1fr;
          }
          .detail-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </DashboardLayout>
  );
}
