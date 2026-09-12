import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Play, BarChart3, MoreVertical, Clock, Users, Copy, Trash2, ExternalLink } from 'lucide-react';

export interface DashboardSession {
  id: string;
  title: string;
  courseTag: string;
  questionCount: number;
  responseCount: number;
  lastEdited: string;
  category: 'presentation' | 'survey' | 'spatial' | 'ai';
  status: 'live' | 'draft' | 'analyzed';
  previewColor: string;
  thumbnailType: 'tree' | 'cardiac' | 'chemistry' | 'physics' | 'brain';
}

interface SessionCardProps {
  session: DashboardSession;
  onDelete?: (id: string) => void;
  onDuplicate?: (session: DashboardSession) => void;
}

export function SessionCard({ session, onDelete, onDuplicate }: SessionCardProps) {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleLaunchPresenter = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate('/presenter');
  };

  const handleViewAnalytics = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate('/dashboard/decay');
  };

  return (
    <div className="session-card" onClick={() => navigate('/presenter')}>
      {/* Visual Thumbnail Area */}
      <div className={`session-thumbnail ${session.previewColor}`}>
        {/* Course badge */}
        <span className="session-course-badge">{session.courseTag}</span>

        {/* Status Indicator */}
        {session.status === 'live' && (
          <span className="session-live-pill">
            <span className="session-pulse-dot" />
            <span>Live Session</span>
          </span>
        )}

        {/* Thumbnail Diagram Visualization */}
        <div className="session-diag-preview">
          {session.thumbnailType === 'tree' && (
            <svg viewBox="0 0 200 120" className="diag-svg">
              <circle cx="100" cy="24" r="14" fill="rgba(255, 255, 255, 0.25)" stroke="#FFFFFF" strokeWidth="2" />
              <text x="100" y="28" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">ROOT</text>
              <line x1="90" y1="36" x2="60" y2="60" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="110" y1="36" x2="140" y2="60" stroke="#FFFFFF" strokeWidth="1.5" />
              <circle cx="56" cy="72" r="12" fill="rgba(239, 68, 68, 0.4)" stroke="#EF4444" strokeWidth="2" />
              <circle cx="144" cy="72" r="12" fill="rgba(34, 197, 94, 0.4)" stroke="#22C55E" strokeWidth="2" />
              {/* Heatmap pins */}
              <circle cx="58" cy="70" r="3" fill="#FFFFFF" />
              <circle cx="142" cy="74" r="3" fill="#FFFFFF" />
              <circle cx="146" cy="70" r="3" fill="#FFFFFF" />
            </svg>
          )}

          {session.thumbnailType === 'cardiac' && (
            <svg viewBox="0 0 200 120" className="diag-svg">
              <path
                d="M100 95 C60 70 40 45 60 25 C75 10 95 20 100 35 C105 20 125 10 140 25 C160 45 140 70 100 95 Z"
                fill="rgba(239, 68, 68, 0.2)"
                stroke="#F87171"
                strokeWidth="2"
              />
              <circle cx="85" cy="50" r="8" fill="rgba(59, 130, 246, 0.6)" />
              <circle cx="115" cy="50" r="8" fill="rgba(34, 197, 94, 0.6)" />
              <text x="100" y="110" fill="rgba(255,255,255,0.7)" fontSize="9" textAnchor="middle">Mitral Valve Hotspot</text>
            </svg>
          )}

          {session.thumbnailType === 'chemistry' && (
            <svg viewBox="0 0 200 120" className="diag-svg">
              <polygon points="100,20 140,42 140,86 100,108 60,86 60,42" fill="none" stroke="#FBBF24" strokeWidth="2" />
              <circle cx="100" cy="20" r="4" fill="#60A5FA" />
              <circle cx="140" cy="42" r="4" fill="#34D399" />
              <circle cx="60" cy="42" r="4" fill="#F87171" />
              <line x1="140" y1="42" x2="170" y2="25" stroke="#FFFFFF" strokeWidth="1.5" />
              <text x="178" y="24" fill="#FFFFFF" fontSize="10" fontWeight="bold">OH</text>
            </svg>
          )}

          {session.thumbnailType === 'physics' && (
            <svg viewBox="0 0 200 120" className="diag-svg">
              <line x1="30" y1="90" x2="170" y2="90" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
              <rect x="75" y="55" width="50" height="35" rx="3" fill="rgba(255,255,255,0.2)" stroke="#FFFFFF" strokeWidth="1.5" />
              <text x="100" y="76" fill="#FFFFFF" fontSize="11" textAnchor="middle" fontWeight="bold">m = 5kg</text>
              <line x1="125" y1="72" x2="165" y2="72" stroke="#60A5FA" strokeWidth="2" markerEnd="url(#arrow)" />
              <line x1="75" y1="72" x2="45" y2="72" stroke="#EF4444" strokeWidth="2" />
            </svg>
          )}

          {session.thumbnailType === 'brain' && (
            <svg viewBox="0 0 200 120" className="diag-svg">
              <ellipse cx="100" cy="60" rx="45" ry="32" fill="rgba(168, 85, 247, 0.2)" stroke="#C084FC" strokeWidth="2" />
              <circle cx="85" cy="50" r="5" fill="#38BDF8" />
              <circle cx="115" cy="52" r="5" fill="#F472B6" />
              <circle cx="100" cy="72" r="5" fill="#4ADE80" />
              <text x="100" y="105" fill="rgba(255,255,255,0.7)" fontSize="9" textAnchor="middle">Synaptic Cleft</text>
            </svg>
          )}
        </div>

        {/* Hover Quick Action Overlay */}
        <div className="session-hover-overlay">
          <button
            type="button"
            className="session-present-btn"
            onClick={handleLaunchPresenter}
            title="Start live lecture session"
          >
            <Play size={14} fill="currentColor" />
            <span>Present</span>
          </button>
        </div>
      </div>

      {/* Card Info Details */}
      <div className="session-info">
        <div className="session-title-row">
          <h3 className="session-title" title={session.title}>{session.title}</h3>

          <div className="session-menu-wrap" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="session-menu-btn"
              onClick={() => setShowMenu(!showMenu)}
              aria-label="Session options"
            >
              <MoreVertical size={16} />
            </button>

            {showMenu && (
              <div className="session-menu-popup">
                <button
                  type="button"
                  className="session-menu-item"
                  onClick={() => {
                    setShowMenu(false);
                    navigate('/presenter');
                  }}
                >
                  <Play size={14} />
                  <span>Present Live</span>
                </button>
                <button
                  type="button"
                  className="session-menu-item"
                  onClick={() => {
                    setShowMenu(false);
                    navigate('/dashboard/decay');
                  }}
                >
                  <BarChart3 size={14} />
                  <span>View Decay Curve</span>
                </button>
                <button
                  type="button"
                  className="session-menu-item"
                  onClick={() => {
                    setShowMenu(false);
                    onDuplicate?.(session);
                  }}
                >
                  <Copy size={14} />
                  <span>Duplicate</span>
                </button>
                <div className="session-menu-sep" />
                <button
                  type="button"
                  className="session-menu-item danger"
                  onClick={() => {
                    setShowMenu(false);
                    onDelete?.(session.id);
                  }}
                >
                  <Trash2 size={14} />
                  <span>Delete Session</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Metadata Footer */}
        <div className="session-meta-row">
          <div className="session-meta-left">
            <span className="session-meta-tag">{session.questionCount} questions</span>
            <span className="session-meta-sep">·</span>
            <span className="session-meta-tag">
              <Users size={12} className="inline-icon" />
              {session.responseCount} responses
            </span>
          </div>

          <div className="session-meta-right">
            <Clock size={12} className="inline-icon" />
            <span>{session.lastEdited}</span>
          </div>
        </div>
      </div>

      <style>{`
        .session-card {
          background: #FFFFFF;
          border-radius: 16px;
          border: 1px solid #E5E7EB;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
          position: relative;
        }

        .session-card:hover {
          transform: translateY(-3px);
          border-color: #CBD5E1;
          box-shadow: 0 12px 28px -6px rgba(15, 23, 42, 0.12);
        }

        /* ── Thumbnail Canvas ── */
        .session-thumbnail {
          height: 150px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0F172A;
          overflow: hidden;
        }

        .session-thumbnail.dark-navy {
          background: linear-gradient(135deg, #090D16 0%, #111827 100%);
        }

        .session-thumbnail.deep-ruby {
          background: linear-gradient(135deg, #1C0A0E 0%, #2A1118 100%);
        }

        .session-thumbnail.forest {
          background: linear-gradient(135deg, #071A12 0%, #0F2D20 100%);
        }

        .session-thumbnail.indigo {
          background: linear-gradient(135deg, #0F1126 0%, #1E1B4B 100%);
        }

        .session-course-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          background: rgba(255, 255, 255, 0.16);
          color: #FFFFFF;
          padding: 3px 8px;
          border-radius: 6px;
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .session-live-pill {
          position: absolute;
          top: 12px;
          right: 12px;
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 10.5px;
          font-weight: 600;
          background: rgba(220, 38, 38, 0.85);
          color: #FFFFFF;
          padding: 2px 8px;
          border-radius: 9999px;
          backdrop-filter: blur(6px);
        }

        .session-pulse-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #FFFFFF;
          animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.8); }
        }

        .session-diag-preview {
          width: 80%;
          height: 80%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease;
        }

        .session-card:hover .session-diag-preview {
          transform: scale(1.04);
        }

        .diag-svg {
          width: 100%;
          height: 100%;
        }

        /* Hover Overlay */
        .session-hover-overlay {
          position: absolute;
          inset: 0;
          background: rgba(15, 23, 42, 0.45);
          backdrop-filter: blur(2px);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.15s ease;
        }

        .session-card:hover .session-hover-overlay {
          opacity: 1;
        }

        .session-present-btn {
          height: 38px;
          padding: 0 18px;
          border-radius: 9999px;
          background: #FFFFFF;
          color: #0F172A;
          border: none;
          display: flex;
          align-items: center;
          gap: 7px;
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
          transform: translateY(4px);
          transition: all 0.15s ease;
        }

        .session-card:hover .session-present-btn {
          transform: translateY(0);
        }

        .session-present-btn:hover {
          background: #F8FAFC;
          transform: scale(1.05);
        }

        /* ── Card Content ── */
        .session-info {
          padding: 16px 18px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .session-title-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 8px;
        }

        .session-title {
          margin: 0;
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 14.5px;
          font-weight: 600;
          color: #0F172A;
          line-height: 1.35;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .session-menu-wrap {
          position: relative;
          flex-shrink: 0;
        }

        .session-menu-btn {
          width: 28px;
          height: 28px;
          border-radius: 6px;
          border: none;
          background: transparent;
          color: #94A3B8;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.12s ease;
        }

        .session-menu-btn:hover {
          background: #F1F5F9;
          color: #0F172A;
        }

        .session-menu-popup {
          position: absolute;
          right: 0;
          top: calc(100% + 4px);
          background: #FFFFFF;
          border-radius: 10px;
          border: 1px solid #E2E8F0;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.15);
          padding: 4px;
          width: 170px;
          z-index: 50;
        }

        .session-menu-item {
          display: flex;
          align-items: center;
          gap: 8px;
          width: 100%;
          padding: 7px 10px;
          border-radius: 6px;
          border: none;
          background: transparent;
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 12px;
          font-weight: 500;
          color: #334155;
          cursor: pointer;
          text-align: left;
        }

        .session-menu-item:hover {
          background: #F1F5F9;
          color: #0F172A;
        }

        .session-menu-item.danger {
          color: #DC2626;
        }

        .session-menu-item.danger:hover {
          background: #FEE2E2;
        }

        .session-menu-sep {
          height: 1px;
          background: #F1F5F9;
          margin: 4px 0;
        }

        /* Metadata */
        .session-meta-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 12px;
          color: #64748B;
        }

        .session-meta-left {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .session-meta-sep {
          color: #CBD5E1;
        }

        .session-meta-right {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 11.5px;
        }

        .inline-icon {
          margin-right: 3px;
          vertical-align: -1px;
        }

        /* ── Dark Mode ── */
        [data-theme="dark"] .session-card {
          background: #111620;
          border-color: rgba(255, 255, 255, 0.08);
          box-shadow: 0 4px 16px -2px rgba(0, 0, 0, 0.4);
        }

        [data-theme="dark"] .session-card:hover {
          border-color: rgba(255, 255, 255, 0.2);
          box-shadow: 0 12px 32px -4px rgba(0, 0, 0, 0.7);
        }

        [data-theme="dark"] .session-title {
          color: #FFFFFF;
        }

        [data-theme="dark"] .session-menu-popup {
          background: #161B24;
          border-color: rgba(255, 255, 255, 0.12);
        }

        [data-theme="dark"] .session-menu-item {
          color: #CBD5E1;
        }

        [data-theme="dark"] .session-menu-item:hover {
          background: rgba(255, 255, 255, 0.08);
          color: #FFFFFF;
        }

        [data-theme="dark"] .session-meta-row {
          color: #94A3B8;
        }
      `}</style>
    </div>
  );
}
