import React from 'react';
import { NetworkMatchIcon } from '../icons/NetworkMatchIcon.js';
import { HotspotIcon } from '../icons/HotspotIcon.js';
import { SortingIcon } from '../icons/SortingIcon.js';
import { PeerReviewIcon } from '../icons/PeerReviewIcon.js';
import { QnaIcon } from '../icons/QnaIcon.js';

interface CapabilityItem {
  icon: React.ReactNode;
  label: string;
}

const CAPABILITIES: CapabilityItem[] = [
  {
    icon: <NetworkMatchIcon size={26} />,
    label: 'Network Matching',
  },
  {
    icon: <HotspotIcon size={26} />,
    label: 'Spatial Hotspots',
  },
  {
    icon: <SortingIcon size={26} />,
    label: 'Sequential Sorting',
  },
  {
    icon: <PeerReviewIcon size={26} />,
    label: 'Peer Review Swarm',
  },
  {
    icon: <QnaIcon size={26} />,
    label: 'Q&A Dedup',
  },
];

export function CapabilityRow() {
  return (
    <section className="landing-section capability-section" id="how-it-works">
      <div className="landing-container" style={{ textAlign: 'center' }}>
        <h2 className="section-h2" style={{ marginBottom: '44px' }}>
          Five ways to see a room think
        </h2>

        <div className="capability-row-grid">
          {CAPABILITIES.map((item, idx) => (
            <div key={idx} className="capability-item">
              <div className="capability-icon-tile">
                {item.icon}
              </div>
              <span className="capability-label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .capability-row-grid {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 24px;
        }

        .capability-item {
          flex: 1 1 160px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          min-width: 140px;
        }

        .capability-icon-tile {
          width: 64px;
          height: 64px;
          border-radius: 16px;
          background-color: var(--paper-card);
          border: 1.5px solid var(--line);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--ink);
          box-shadow: var(--shadow-sm);
          transition: transform 0.15s ease, border-color 0.15s ease;
        }

        .capability-item:hover .capability-icon-tile {
          transform: translateY(-2px);
          border-color: var(--ink-soft);
        }

        .capability-label {
          font-family: var(--font-body);
          font-weight: 600;
          font-size: 0.94rem;
          color: var(--ink);
          text-align: center;
          line-height: 1.3;
        }
      `}</style>
    </section>
  );
}
