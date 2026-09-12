import React from 'react';

export interface AiFeatureItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  action: () => void;
}

interface AiQuickStartSectionProps {
  onSelectFeature?: (featureId: string) => void;
  onOpenSyllabus?: () => void;
  onOpenDecay?: () => void;
  onOpenNewSession?: (type?: string) => void;
  onOpenHelp?: () => void;
}

export function AiQuickStartSection({
  onSelectFeature,
  onOpenSyllabus,
  onOpenDecay,
  onOpenNewSession,
  onOpenHelp,
}: AiQuickStartSectionProps) {
  const features: AiFeatureItem[] = [
    {
      id: 'brainstorm',
      title: 'Brainstorm ideas',
      icon: (
        /* Idea burst spark icon matching screenshot */
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="2.5" />
          <path d="M12 3v3" />
          <path d="M12 18v3" />
          <path d="M3 12h3" />
          <path d="M18 12h3" />
          <path d="M5.6 5.6l2.1 2.1" />
          <path d="M16.3 16.3l2.1 2.1" />
          <path d="M5.6 18.4l2.1-2.1" />
          <path d="M16.3 7.7l2.1-2.1" />
        </svg>
      ),
      action: () => {
        onSelectFeature?.('brainstorm');
        onOpenNewSession?.('spatial');
      },
    },
    {
      id: 'decisions',
      title: 'Make decisions',
      icon: (
        /* Branching arrow decision icon matching screenshot */
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 18h6a4 4 0 0 0 4-4V6" />
          <path d="M16 9l-3-3-3 3" />
          <path d="M13 14a4 4 0 0 1 4-4h4" />
          <path d="M18 7l3 3-3 3" />
        </svg>
      ),
      action: () => {
        onSelectFeature?.('decisions');
        onOpenDecay?.();
      },
    },
    {
      id: 'checkin',
      title: 'Check-in',
      icon: (
        /* Podium with 3 bar charts matching screenshot */
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="15" rx="2" />
          <line x1="7" y1="15" x2="7" y2="10" />
          <line x1="12" y1="15" x2="12" y2="7" />
          <line x1="17" y1="15" x2="17" y2="12" />
          <line x1="8" y1="19" x2="16" y2="19" />
        </svg>
      ),
      action: () => {
        onSelectFeature?.('checkin');
        onOpenSyllabus?.();
      },
    },
    {
      id: 'feedback',
      title: 'Get live feedback',
      icon: (
        /* Speech bubble with search / feedback magnifying glass */
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <circle cx="12" cy="10" r="2.5" />
          <path d="M14 12l2 2" />
        </svg>
      ),
      action: () => {
        onSelectFeature?.('feedback');
        onOpenNewSession?.('survey');
      },
    },
    {
      id: 'energize',
      title: 'Energize the room',
      icon: (
        /* Presentation screen / picture frame matching screenshot */
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M8 21h8" />
          <path d="M12 17v4" />
          <path d="M7 11l3-3 4 4 3-3" />
        </svg>
      ),
      action: () => {
        onSelectFeature?.('energize');
        onOpenNewSession?.('debate');
      },
    },
  ];

  return (
    <section className="menti-ai-section">
      <div className="menti-ai-header">
        <h2 className="menti-ai-title">Start with AI ✨</h2>
        <button
          type="button"
          className="menti-help-link"
          onClick={onOpenHelp}
        >
          Help me get started
        </button>
      </div>

      <div className="menti-ai-grid">
        {features.map((feature) => (
          <button
            key={feature.id}
            type="button"
            className="menti-ai-card"
            onClick={feature.action}
          >
            <div className="menti-card-icon">
              {feature.icon}
            </div>
            <span className="menti-card-title">{feature.title}</span>
          </button>
        ))}
      </div>

      <style>{`
        .menti-ai-section {
          margin-bottom: 36px;
        }

        .menti-ai-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }

        .menti-ai-title {
          font-size: 16px;
          font-weight: 600;
          color: #111827;
          margin: 0;
          letter-spacing: -0.01em;
        }

        .menti-help-link {
          background: none;
          border: none;
          padding: 0;
          font-size: 13px;
          font-weight: 500;
          color: #4B5563;
          cursor: pointer;
          font-family: inherit;
          transition: color 0.12s ease;
        }

        .menti-help-link:hover {
          color: #111827;
          text-decoration: underline;
        }

        /* 5 Column Grid matching Mentimeter */
        .menti-ai-grid {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 14px;
        }

        .menti-ai-card {
          background: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 14px;
          height: 98px;
          padding: 16px 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          cursor: pointer;
          font-family: inherit;
          text-align: center;
          transition: border-color 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease;
        }

        .menti-ai-card:hover {
          border-color: #D1D5DB;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          transform: translateY(-2px);
        }

        .menti-ai-card:active {
          transform: translateY(0);
        }

        .menti-card-icon {
          color: #111827;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .menti-card-title {
          font-size: 13.5px;
          font-weight: 500;
          color: #111827;
          line-height: 1.2;
          white-space: nowrap;
        }

        /* Dark Mode */
        [data-theme="dark"] .menti-ai-title {
          color: #F9FAFB;
        }

        [data-theme="dark"] .menti-help-link {
          color: #9CA3AF;
        }

        [data-theme="dark"] .menti-help-link:hover {
          color: #F9FAFB;
        }

        [data-theme="dark"] .menti-ai-card {
          background: #151820;
          border-color: #272E3B;
        }

        [data-theme="dark"] .menti-ai-card:hover {
          border-color: #3B4455;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
        }

        [data-theme="dark"] .menti-card-icon {
          color: #F3F4F6;
        }

        [data-theme="dark"] .menti-card-title {
          color: #F3F4F6;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .menti-ai-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 640px) {
          .menti-ai-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </section>
  );
}
