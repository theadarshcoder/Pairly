import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, MoreVertical, Copy, Trash2, Edit2, ExternalLink } from 'lucide-react';

export interface DashboardSession {
  id: string;
  title: string;
  courseTag: string;
  questionCount: number;
  responseCount: number;
  lastEdited: string;
  category: 'presentation' | 'survey' | 'spatial' | 'ai';
  status: 'live' | 'draft' | 'analyzed';
  previewColor?: string;
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

  const handleCardClick = () => {
    navigate('/presenter');
  };

  return (
    <div className="menti-card" onClick={handleCardClick}>
      {/* ── Slide Preview (16:9 Aspect Ratio matching Mentimeter) ───────── */}
      <div className="menti-slide-preview">
        {/* Top Right Mini Slide Icon */}
        <div className="slide-type-glyph" title="Presentation Slide">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <rect x="2" y="3" width="12" height="9" rx="1.5" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" />
            <line x1="5" y1="14" x2="11" y2="14" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" />
            <line x1="8" y1="12" x2="8" y2="14" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" />
          </svg>
        </div>

        {/* Slide Title Text in the Slide View */}
        <div className="slide-content-stage">
          <h3 className="slide-headline-text">
            {session.title}
          </h3>
          {session.status === 'live' && (
            <div className="slide-live-tag">
              <span className="live-pulse" />
              <span>LIVE</span>
            </div>
          )}
        </div>

        {/* Hover Action Overlay */}
        <div className="slide-hover-actions">
          <button
            type="button"
            className="slide-present-cta"
            onClick={handleLaunchPresenter}
          >
            <Play size={14} fill="currentColor" />
            <span>Present</span>
          </button>
        </div>
      </div>

      {/* ── Card Footer / Metadata ─────────────────────────────────────── */}
      <div className="menti-card-footer">
        <div className="menti-card-info">
          <h4 className="menti-card-title" title={session.title}>
            {session.title}
          </h4>
          <div className="menti-card-meta">
            <span className="meta-course">{session.courseTag}</span>
            <span className="meta-sep">•</span>
            <span className="meta-time">{session.lastEdited}</span>
            {session.responseCount > 0 && (
              <>
                <span className="meta-sep">•</span>
                <span className="meta-responses">{session.responseCount} responses</span>
              </>
            )}
          </div>
        </div>

        <div className="menti-card-actions">
          {/* Quick Present Button */}
          <button
            type="button"
            className="menti-play-icon-btn"
            onClick={handleLaunchPresenter}
            title="Present presentation"
            aria-label="Present presentation"
          >
            <Play size={13} fill="currentColor" />
          </button>

          {/* Three Dots Menu Button */}
          <div className="menti-menu-wrap" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="menti-dots-btn"
              onClick={() => setShowMenu(!showMenu)}
              title="More options"
              aria-label="More options"
            >
              <MoreVertical size={16} />
            </button>

            {showMenu && (
              <div className="menti-card-dropdown">
                <button
                  type="button"
                  className="card-dropdown-item"
                  onClick={() => {
                    setShowMenu(false);
                    navigate('/presenter');
                  }}
                >
                  <Play size={14} />
                  <span>Present</span>
                </button>

                <button
                  type="button"
                  className="card-dropdown-item"
                  onClick={() => {
                    setShowMenu(false);
                    onDuplicate?.(session);
                  }}
                >
                  <Copy size={14} />
                  <span>Duplicate</span>
                </button>

                <button
                  type="button"
                  className="card-dropdown-item danger"
                  onClick={() => {
                    setShowMenu(false);
                    onDelete?.(session.id);
                  }}
                >
                  <Trash2 size={14} />
                  <span>Move to trash</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .menti-card {
          background: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          transition: border-color 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease;
          display: flex;
          flex-direction: column;
        }

        .menti-card:hover {
          border-color: #CBD5E1;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
          transform: translateY(-2px);
        }

        /* 16:9 Slide Preview Area */
        .menti-slide-preview {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9.5;
          background: #18181C;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px 20px;
          box-sizing: border-box;
          user-select: none;
        }

        .slide-type-glyph {
          position: absolute;
          top: 10px;
          right: 12px;
          opacity: 0.8;
          display: flex;
          align-items: center;
        }

        .slide-content-stage {
          text-align: center;
          width: 100%;
        }

        .slide-headline-text {
          color: #FFFFFF;
          font-family: inherit;
          font-size: 14.5px;
          font-weight: 600;
          line-height: 1.35;
          letter-spacing: -0.01em;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .slide-live-tag {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          margin-top: 8px;
          padding: 2px 8px;
          background: rgba(239, 68, 68, 0.2);
          border: 1px solid rgba(239, 68, 68, 0.4);
          border-radius: 9999px;
          color: #FCA5A5;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.05em;
        }

        .live-pulse {
          width: 6px;
          height: 6px;
          background: #EF4444;
          border-radius: 50%;
          animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.8); }
        }

        /* Hover Present Overlay */
        .slide-hover-actions {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(2px);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.15s ease;
        }

        .menti-card:hover .slide-hover-actions {
          opacity: 1;
          pointer-events: auto;
        }

        .slide-present-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          height: 36px;
          padding: 0 18px;
          background: #FFFFFF;
          color: #111827;
          border: none;
          border-radius: 9999px;
          font-size: 13.5px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          transition: transform 0.12s ease, background 0.12s ease;
        }

        .slide-present-cta:hover {
          transform: scale(1.05);
          background: #F3F4F6;
        }

        /* Card Footer */
        .menti-card-footer {
          padding: 12px 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          background: #FFFFFF;
        }

        .menti-card-info {
          display: flex;
          flex-direction: column;
          gap: 3px;
          min-width: 0;
          flex: 1;
        }

        .menti-card-title {
          font-size: 13.5px;
          font-weight: 600;
          color: #111827;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .menti-card-meta {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 12px;
          color: #6B7280;
        }

        .meta-course {
          font-weight: 500;
          color: #4B5563;
        }

        .meta-sep {
          color: #D1D5DB;
        }

        .meta-time {
          color: #6B7280;
        }

        .meta-responses {
          color: #2563EB;
          font-weight: 500;
        }

        .menti-card-actions {
          display: flex;
          align-items: center;
          gap: 4px;
          flex-shrink: 0;
        }

        .menti-play-icon-btn {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: none;
          background: transparent;
          color: #4B5563;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.12s ease, color 0.12s ease;
        }

        .menti-play-icon-btn:hover {
          background: #F3F4F6;
          color: #111827;
        }

        .menti-menu-wrap {
          position: relative;
        }

        .menti-dots-btn {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: none;
          background: transparent;
          color: #4B5563;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.12s ease, color 0.12s ease;
        }

        .menti-dots-btn:hover {
          background: #F3F4F6;
          color: #111827;
        }

        /* Card Dropdown Menu */
        .menti-card-dropdown {
          position: absolute;
          bottom: calc(100% + 4px);
          right: 0;
          width: 150px;
          background: #FFFFFF;
          border: 1px solid #E5E7EB;
          border-radius: 8px;
          box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.12);
          padding: 4px;
          z-index: 50;
        }

        .card-dropdown-item {
          width: 100%;
          height: 32px;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0 8px;
          border: none;
          background: transparent;
          border-radius: 4px;
          font-size: 12.5px;
          font-weight: 500;
          color: #374151;
          cursor: pointer;
          text-align: left;
          font-family: inherit;
        }

        .card-dropdown-item:hover {
          background: #F4F4F5;
          color: #111827;
        }

        .card-dropdown-item.danger {
          color: #EF4444;
        }

        .card-dropdown-item.danger:hover {
          background: #FEF2F2;
          color: #DC2626;
        }

        /* Dark Mode */
        [data-theme="dark"] .menti-card {
          background: #151820;
          border-color: #272E3B;
        }

        [data-theme="dark"] .menti-card:hover {
          border-color: #3B4455;
        }

        [data-theme="dark"] .menti-card-footer {
          background: #151820;
        }

        [data-theme="dark"] .menti-card-title {
          color: #F9FAFB;
        }

        [data-theme="dark"] .meta-course {
          color: #9CA3AF;
        }

        [data-theme="dark"] .menti-play-icon-btn {
          color: #9CA3AF;
        }

        [data-theme="dark"] .menti-play-icon-btn:hover {
          background: #1F242E;
          color: #F9FAFB;
        }

        [data-theme="dark"] .menti-dots-btn {
          color: #9CA3AF;
        }

        [data-theme="dark"] .menti-dots-btn:hover {
          background: #1F242E;
          color: #F9FAFB;
        }

        [data-theme="dark"] .menti-card-dropdown {
          background: #1A1E26;
          border-color: #2D3544;
        }

        [data-theme="dark"] .card-dropdown-item {
          color: #D1D5DB;
        }

        [data-theme="dark"] .card-dropdown-item:hover {
          background: #232936;
          color: #FFFFFF;
        }
      `}</style>
    </div>
  );
}
