import React from 'react';
import { useNavigate } from 'react-router-dom';

export interface AiFeatureItem {
  id: string;
  title: string;
  featureSubtext: string;
  badge?: string;
  icon: React.ReactNode;
  action: () => void;
}

interface AiQuickStartSectionProps {
  onSelectFeature?: (featureId: string) => void;
  onOpenSyllabus?: () => void;
  onOpenDecay?: () => void;
  onOpenNewSession?: () => void;
}

export function AiQuickStartSection({
  onSelectFeature,
  onOpenSyllabus,
  onOpenDecay,
  onOpenNewSession,
}: AiQuickStartSectionProps) {
  const navigate = useNavigate();

  const features: AiFeatureItem[] = [
    {
      id: 'brainstorm',
      title: 'Brainstorm ideas',
      featureSubtext: 'Spatial Heatmap Poll',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <line x1="12" y1="2" x2="12" y2="5" />
          <line x1="12" y1="19" x2="12" y2="22" />
          <line x1="5" y1="5" x2="7.5" y2="7.5" />
          <line x1="16.5" y1="16.5" x2="19" y2="19" />
          <line x1="2" y1="12" x2="5" y2="12" />
          <line x1="19" y1="12" x2="22" y2="12" />
          <line x1="5" y1="19" x2="7.5" y2="16.5" />
          <line x1="16.5" y1="7.5" x2="19" y2="5" />
        </svg>
      ),
      action: () => {
        onSelectFeature?.('brainstorm');
        onOpenNewSession?.();
      },
    },
    {
      id: 'decisions',
      title: 'Make decisions',
      featureSubtext: 'Concept Decay Check',
      badge: 'Analytics',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 6L6 18" />
          <path d="M8 6h10v10" />
          <path d="M4 12v6h6" />
        </svg>
      ),
      action: () => {
        if (onOpenDecay) onOpenDecay();
        else navigate('/dashboard/decay');
      },
    },
    {
      id: 'checkin',
      title: 'Check-in',
      featureSubtext: 'Slide Synthesizer',
      badge: 'AI',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <line x1="7" y1="15" x2="7" y2="11" />
          <line x1="12" y1="15" x2="12" y2="8" />
          <line x1="17" y1="15" x2="17" y2="13" />
        </svg>
      ),
      action: () => {
        if (onOpenSyllabus) onOpenSyllabus();
        else navigate('/dashboard/syllabus');
      },
    },
    {
      id: 'feedback',
      title: 'Get live feedback',
      featureSubtext: 'Adaptive Branching',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
          <path d="M8 11h6" />
          <path d="M11 8v6" />
        </svg>
      ),
      action: () => {
        onSelectFeature?.('feedback');
        onOpenNewSession?.();
      },
    },
    {
      id: 'energize',
      title: 'Energize the room',
      featureSubtext: 'Peer Debate Arena',
      badge: 'Live',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <circle cx="8" cy="8" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
      ),
      action: () => {
        onSelectFeature?.('energize');
        navigate('/features/engage');
      },
    },
  ];

  return (
    <section className="ai-start-section">
      <div className="ai-start-header">
        <div className="ai-title-wrap">
          <span className="ai-title-text">Start with AI</span>
          <span className="ai-sparkle-symbol">✨</span>
        </div>

        <button
          type="button"
          className="ai-help-btn"
          onClick={() => navigate('/about')}
        >
          Help me get started
        </button>
      </div>

      <div className="ai-cards-row">
        {features.map((item) => (
          <button
            key={item.id}
            type="button"
            className="ai-action-card"
            onClick={item.action}
          >
            {item.badge && <span className={`ai-card-badge ${item.badge.toLowerCase()}`}>{item.badge}</span>}
            <div className="ai-card-icon-wrap">
              {item.icon}
            </div>
            <h4 className="ai-card-title">{item.title}</h4>
            <span className="ai-card-sub">{item.featureSubtext}</span>
          </button>
        ))}
      </div>

      <style>{`
        .ai-start-section {
          margin-bottom: 40px;
        }

        .ai-start-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .ai-title-wrap {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .ai-title-text {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 16px;
          font-weight: 700;
          color: #0F172A;
          letter-spacing: -0.01em;
        }

        .ai-sparkle-symbol {
          font-size: 16px;
        }

        .ai-help-btn {
          background: none;
          border: none;
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 13.5px;
          font-weight: 500;
          color: #475569;
          cursor: pointer;
          transition: color 0.15s ease;
          padding: 0;
        }

        .ai-help-btn:hover {
          color: #0F172A;
          text-decoration: underline;
        }

        /* Horizontal 5 Cards Row matching Mentimeter screenshot */
        .ai-cards-row {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 16px;
        }

        .ai-action-card {
          position: relative;
          background: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 16px;
          padding: 24px 16px 20px 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          cursor: pointer;
          transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
          box-sizing: border-box;
          min-height: 124px;
          justify-content: center;
        }

        .ai-action-card:hover {
          transform: translateY(-2px);
          border-color: #CBD5E1;
          box-shadow: 0 8px 24px -4px rgba(15, 23, 42, 0.08);
        }

        .ai-card-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          font-size: 9.5px;
          font-weight: 700;
          text-transform: uppercase;
          padding: 2px 6px;
          border-radius: 4px;
          background: #EFF6FF;
          color: #2563EB;
          letter-spacing: 0.04em;
        }

        .ai-card-badge.ai {
          background: #F3E8FF;
          color: #7E22CE;
        }

        .ai-card-badge.live {
          background: #DCFCE7;
          color: #15803D;
        }

        .ai-card-icon-wrap {
          color: #1E293B;
          margin-bottom: 10px;
          transition: transform 0.15s ease;
        }

        .ai-action-card:hover .ai-card-icon-wrap {
          transform: scale(1.08);
          color: #2563EB;
        }

        .ai-card-title {
          margin: 0 0 3px 0;
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 13.5px;
          font-weight: 600;
          color: #0F172A;
          line-height: 1.25;
        }

        .ai-card-sub {
          font-size: 11px;
          color: #64748B;
          font-weight: 500;
        }

        /* ── Dark Mode ── */
        [data-theme="dark"] .ai-title-text {
          color: #FFFFFF;
        }

        [data-theme="dark"] .ai-help-btn {
          color: #94A3B8;
        }

        [data-theme="dark"] .ai-help-btn:hover {
          color: #FFFFFF;
        }

        [data-theme="dark"] .ai-action-card {
          background: #111620;
          border-color: rgba(255, 255, 255, 0.08);
          box-shadow: 0 4px 16px -2px rgba(0, 0, 0, 0.4);
        }

        [data-theme="dark"] .ai-action-card:hover {
          border-color: rgba(255, 255, 255, 0.2);
          box-shadow: 0 10px 30px -4px rgba(0, 0, 0, 0.7);
        }

        [data-theme="dark"] .ai-card-icon-wrap {
          color: #F8FAFC;
        }

        [data-theme="dark"] .ai-action-card:hover .ai-card-icon-wrap {
          color: #60A5FA;
        }

        [data-theme="dark"] .ai-card-title {
          color: #FFFFFF;
        }

        [data-theme="dark"] .ai-card-sub {
          color: #94A3B8;
        }

        /* Responsive */
        @media (max-width: 1100px) {
          .ai-cards-row {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 640px) {
          .ai-cards-row {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
    </section>
  );
}
