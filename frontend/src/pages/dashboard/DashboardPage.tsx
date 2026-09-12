import React, { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Plus, Smartphone, Upload, Star, Layers } from 'lucide-react';
import { DashboardLayout } from './components/DashboardLayout.js';
import { AiQuickStartSection } from './components/AiQuickStartCard.js';
import { SessionCard, DashboardSession } from './components/SessionCard.js';
import { CreateSessionModal } from './components/CreateSessionModal.js';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const filterParam = searchParams.get('filter');

  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'presentation' | 'survey' | 'import'>('presentation');

  // Decks matching Mentimeter/Pairly architecture
  const [sessions, setSessions] = useState<DashboardSession[]>([
    {
      id: 'dsa-contest-1',
      title: 'DSA Contest: Data Structures & Algorithms Quiz',
      courseTag: 'CS106B',
      questionCount: 8,
      responseCount: 142,
      lastEdited: 'Edited 2h ago',
      category: 'presentation',
      status: 'live',
    },
    {
      id: 'cardiac-cycle-2',
      title: 'Anatomy & Physiology: Cardiac Cycle Hotspot Pinning',
      courseTag: 'BIO204',
      questionCount: 5,
      responseCount: 89,
      lastEdited: 'Edited yesterday',
      category: 'spatial',
      status: 'analyzed',
    },
    {
      id: 'orgo-mechanisms-3',
      title: 'Organic Chemistry: Reaction Mechanisms & Retrosynthesis',
      courseTag: 'CHEM301',
      questionCount: 6,
      responseCount: 64,
      lastEdited: 'Edited 3d ago',
      category: 'survey',
      status: 'analyzed',
    },
    {
      id: 'newton-laws-4',
      title: 'Physics 101: Newton’s Laws & Friction Vectors',
      courseTag: 'PHYS101',
      questionCount: 7,
      responseCount: 112,
      lastEdited: 'Edited 5d ago',
      category: 'spatial',
      status: 'draft',
    },
  ]);

  const handleOpenCreateModal = (mode: 'presentation' | 'survey' | 'import' = 'presentation') => {
    setModalMode(mode);
    setIsCreateModalOpen(true);
  };

  const handleSessionCreated = (newSession: DashboardSession) => {
    setSessions((prev) => [newSession, ...prev]);
  };

  const handleDeleteSession = (id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
  };

  const handleDuplicateSession = (session: DashboardSession) => {
    const dupe: DashboardSession = {
      ...session,
      id: `dupe-${Date.now()}`,
      title: `${session.title} (Copy)`,
      responseCount: 0,
      lastEdited: 'Just now',
      status: 'draft',
    };
    setSessions((prev) => [dupe, ...prev]);
  };

  // Filter sessions by search
  const filteredSessions = useMemo(() => {
    if (!searchQuery.trim()) return sessions;
    const q = searchQuery.toLowerCase();
    return sessions.filter((s) => s.title.toLowerCase().includes(q) || s.courseTag.toLowerCase().includes(q));
  }, [sessions, searchQuery]);

  return (
    <DashboardLayout
      activeNav={filterParam === 'recents' ? 'recents' : filterParam === 'sessions' ? 'sessions' : filterParam === 'shared' ? 'shared' : 'home'}
      onOpenCreateModal={() => handleOpenCreateModal('presentation')}
      onOpenImportModal={() => handleOpenCreateModal('import')}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
    >
      {/* ── Welcome Greeting Section ───────────────────────────────────── */}
      <section className="menti-hero-banner">
        <h1 className="menti-welcome-title">
          Welcome Adarsh Pratap singh!
        </h1>

        {/* 3 Quick Action Pills matching user screenshot */}
        <div className="menti-actions-row">
          <button
            type="button"
            className="menti-action-pill"
            onClick={() => handleOpenCreateModal('presentation')}
          >
            <span className="pill-icon">+</span>
            <span>New presentation</span>
          </button>

          <button
            type="button"
            className="menti-action-pill"
            onClick={() => handleOpenCreateModal('survey')}
          >
            <Smartphone size={15} strokeWidth={1.8} className="pill-icon-svg" />
            <span>New survey</span>
          </button>

          <div className="menti-pill-wrap">
            <button
              type="button"
              className="menti-action-pill import-pill"
              onClick={() => navigate('/dashboard/syllabus')}
            >
              <Upload size={14} strokeWidth={1.9} className="pill-icon-svg" />
              <span>Import presentation</span>
            </button>
            {/* Green star badge floating on top-right corner matching screenshot */}
            <span className="menti-star-badge" title="AI Import">
              <Star size={10} fill="#166534" color="#166534" />
            </span>
          </div>
        </div>
      </section>

      {/* ── Start with AI Section ──────────────────────────────────────── */}
      <AiQuickStartSection
        onOpenSyllabus={() => navigate('/dashboard/syllabus')}
        onOpenDecay={() => navigate('/dashboard/decay')}
        onOpenNewSession={(type) => handleOpenCreateModal(type === 'survey' ? 'survey' : 'presentation')}
        onOpenHelp={() => navigate('/tutorials')}
      />

      {/* ── Recently Viewed Section ────────────────────────────────────── */}
      <section className="menti-recents-section">
        <h2 className="menti-recents-title">Recently viewed</h2>

        {filteredSessions.length > 0 ? (
          <div className="menti-decks-grid">
            {filteredSessions.map((session) => (
              <SessionCard
                key={session.id}
                session={session}
                onDelete={handleDeleteSession}
                onDuplicate={handleDuplicateSession}
              />
            ))}
          </div>
        ) : (
          <div className="menti-empty-box">
            <Layers size={36} strokeWidth={1.5} className="empty-glyph" />
            <h3>No presentations found</h3>
            <p>Try searching for a different course code or create a new presentation.</p>
            <button
              type="button"
              className="menti-action-pill mt-3"
              onClick={() => handleOpenCreateModal('presentation')}
            >
              <Plus size={15} />
              <span>Create New Presentation</span>
            </button>
          </div>
        )}
      </section>

      {/* ── Create Session Modal ───────────────────────────────────────── */}
      <CreateSessionModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSessionCreated={handleSessionCreated}
        initialMode={modalMode}
      />

      <style>{`
        /* Hero Banner */
        .menti-hero-banner {
          margin-top: 6px;
          margin-bottom: 34px;
        }

        .menti-welcome-title {
          font-family: inherit;
          font-size: 33px;
          font-weight: 500;
          color: #111827;
          letter-spacing: -0.025em;
          margin: 0 0 20px 0;
          line-height: 1.2;
        }

        /* 3 Action Pills */
        .menti-actions-row {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .menti-action-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          height: 38px;
          padding: 0 18px;
          border-radius: 9999px;
          border: none;
          background: #F3F4F6;
          color: #111827;
          font-family: inherit;
          font-size: 13.5px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.12s ease, transform 0.1s ease;
        }

        .menti-action-pill:hover {
          background: #E5E7EB;
        }

        .menti-action-pill:active {
          transform: scale(0.98);
        }

        .pill-icon {
          font-size: 16px;
          font-weight: 400;
          margin-right: -2px;
        }

        .pill-icon-svg {
          color: #374151;
        }

        /* Import pill with floating star badge */
        .menti-pill-wrap {
          position: relative;
          display: inline-flex;
        }

        .menti-action-pill.import-pill {
          padding-right: 20px;
        }

        .menti-star-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          width: 19px;
          height: 19px;
          border-radius: 50%;
          background: #DCFCE7;
          border: 2px solid #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
        }

        /* Recents Section */
        .menti-recents-section {
          margin-top: 10px;
        }

        .menti-recents-title {
          font-size: 17px;
          font-weight: 600;
          color: #111827;
          margin: 0 0 16px 0;
          letter-spacing: -0.01em;
        }

        .menti-decks-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }

        /* Empty State */
        .menti-empty-box {
          background: #FFFFFF;
          border: 1px dashed #D1D5DB;
          border-radius: 12px;
          padding: 48px 24px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .empty-glyph {
          color: #9CA3AF;
          margin-bottom: 6px;
        }

        .menti-empty-box h3 {
          font-size: 16px;
          font-weight: 600;
          color: #111827;
          margin: 0;
        }

        .menti-empty-box p {
          font-size: 13.5px;
          color: #6B7280;
          margin: 0;
          max-width: 380px;
        }

        .mt-3 {
          margin-top: 12px;
        }

        /* Dark Mode Overrides */
        [data-theme="dark"] .menti-welcome-title {
          color: #F9FAFB;
        }

        [data-theme="dark"] .menti-action-pill {
          background: #181C24;
          color: #F3F4F6;
        }

        [data-theme="dark"] .menti-action-pill:hover {
          background: #232936;
        }

        [data-theme="dark"] .pill-icon-svg {
          color: #D1D5DB;
        }

        [data-theme="dark"] .menti-star-badge {
          background: #14532D;
          border-color: #0E1015;
        }

        [data-theme="dark"] .menti-star-badge svg {
          fill: #86EFAC;
          color: #86EFAC;
        }

        [data-theme="dark"] .menti-recents-title {
          color: #F9FAFB;
        }

        [data-theme="dark"] .menti-empty-box {
          background: #151820;
          border-color: #2D3544;
        }

        [data-theme="dark"] .menti-empty-box h3 {
          color: #F9FAFB;
        }

        [data-theme="dark"] .menti-empty-box p {
          color: #9CA3AF;
        }
      `}</style>
    </DashboardLayout>
  );
}
