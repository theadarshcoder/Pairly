import React, { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Plus, Sliders, UploadCloud, Star, Filter, Sparkles, Layers } from 'lucide-react';
import { DashboardLayout } from './components/DashboardLayout.js';
import { AiQuickStartSection } from './components/AiQuickStartCard.js';
import { SessionCard, DashboardSession } from './components/SessionCard.js';
import { CreateSessionModal } from './components/CreateSessionModal.js';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const filterParam = searchParams.get('filter');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'presentation' | 'survey' | 'spatial'>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'presentation' | 'survey' | 'import'>('presentation');

  // Realistic sample course decks matching Mentimeter/Pairly architecture
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
      previewColor: 'dark-navy',
      thumbnailType: 'tree',
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
      previewColor: 'deep-ruby',
      thumbnailType: 'cardiac',
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
      previewColor: 'forest',
      thumbnailType: 'chemistry',
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
      previewColor: 'indigo',
      thumbnailType: 'physics',
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

  // Filter sessions by search and category
  const filteredSessions = useMemo(() => {
    return sessions.filter((s) => {
      const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.courseTag.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || s.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [sessions, searchQuery, selectedCategory]);

  return (
    <DashboardLayout
      activeNav={filterParam === 'recents' ? 'recents' : filterParam === 'sessions' ? 'sessions' : filterParam === 'shared' ? 'shared' : 'home'}
      onOpenCreateModal={() => handleOpenCreateModal('presentation')}
      onOpenImportModal={() => handleOpenCreateModal('import')}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
    >
      {/* ── Welcome Greeting Section ───────────────────────────────────── */}
      <section className="dash-hero-banner">
        <h1 className="dash-welcome-h1">
          Welcome Adarsh Pratap singh!
        </h1>

        {/* 3 Quick Action Pills matching user screenshot */}
        <div className="dash-quick-actions">
          <button
            type="button"
            className="action-pill primary"
            onClick={() => handleOpenCreateModal('presentation')}
          >
            <Plus size={15} strokeWidth={2.5} />
            <span>New presentation</span>
          </button>

          <button
            type="button"
            className="action-pill"
            onClick={() => handleOpenCreateModal('survey')}
          >
            <Sliders size={15} />
            <span>New survey</span>
          </button>

          <button
            type="button"
            className="action-pill import"
            onClick={() => navigate('/dashboard/syllabus')}
          >
            <UploadCloud size={15} />
            <span>Import presentation</span>
            <span className="import-star-badge" title="AI Syllabus & Slide Synthesizer">
              <Star size={11} fill="#15803D" color="#15803D" />
            </span>
          </button>
        </div>
      </section>

      {/* ── Start with AI Row ─────────────────────────────────────────── */}
      <AiQuickStartSection
        onOpenSyllabus={() => navigate('/dashboard/syllabus')}
        onOpenDecay={() => navigate('/dashboard/decay')}
        onOpenNewSession={() => handleOpenCreateModal('presentation')}
      />

      {/* ── Recently Viewed Sessions Grid ─────────────────────────────── */}
      <section className="dash-recents-section">
        <div className="dash-recents-header">
          <h2 className="dash-section-title">Recently viewed</h2>

          {/* Filter Pills */}
          <div className="dash-filter-pills">
            <button
              type="button"
              className={`filter-pill ${selectedCategory === 'all' ? 'is-active' : ''}`}
              onClick={() => setSelectedCategory('all')}
            >
              All Decks ({sessions.length})
            </button>
            <button
              type="button"
              className={`filter-pill ${selectedCategory === 'presentation' ? 'is-active' : ''}`}
              onClick={() => setSelectedCategory('presentation')}
            >
              Presentations
            </button>
            <button
              type="button"
              className={`filter-pill ${selectedCategory === 'spatial' ? 'is-active' : ''}`}
              onClick={() => setSelectedCategory('spatial')}
            >
              Spatial Canvases
            </button>
            <button
              type="button"
              className={`filter-pill ${selectedCategory === 'survey' ? 'is-active' : ''}`}
              onClick={() => setSelectedCategory('survey')}
            >
              Decay Diagnostics
            </button>
          </div>
        </div>

        {/* Sessions Grid */}
        {filteredSessions.length > 0 ? (
          <div className="dash-session-grid">
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
          <div className="dash-empty-state">
            <Layers size={32} className="empty-icon" />
            <h3>No sessions found</h3>
            <p>Try searching for a different keyword or create a new presentation.</p>
            <button
              type="button"
              className="action-pill primary mt"
              onClick={() => handleOpenCreateModal('presentation')}
            >
              <Plus size={15} />
              <span>Create New Session</span>
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
        /* ── Welcome Banner ── */
        .dash-hero-banner {
          margin-bottom: 32px;
        }

        .dash-welcome-h1 {
          font-family: var(--font-body, 'Inter', -apple-system, sans-serif);
          font-size: 32px;
          font-weight: 500;
          color: #0F172A;
          letter-spacing: -0.02em;
          margin: 0 0 20px 0;
        }

        .dash-quick-actions {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .action-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          height: 38px;
          padding: 0 16px;
          border-radius: 9999px;
          border: 1px solid #E2E8F0;
          background: #F1F5F9;
          color: #1E293B;
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 13.5px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.15s ease;
          position: relative;
        }

        .action-pill:hover {
          background: #E2E8F0;
          transform: translateY(-1px);
        }

        .action-pill.primary {
          background: #FFFFFF;
          border-color: #CBD5E1;
          color: #0F172A;
          font-weight: 600;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
        }

        .action-pill.primary:hover {
          background: #F8FAFC;
          border-color: #0F172A;
        }

        .action-pill.import {
          padding-right: 12px;
        }

        .import-star-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #DCFCE7;
          margin-left: 2px;
        }

        /* ── Recents Section ── */
        .dash-recents-section {
          margin-top: 10px;
        }

        .dash-recents-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 14px;
        }

        .dash-section-title {
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 17px;
          font-weight: 700;
          color: #0F172A;
          margin: 0;
          letter-spacing: -0.01em;
        }

        .dash-filter-pills {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .filter-pill {
          height: 30px;
          padding: 0 12px;
          border-radius: 9999px;
          border: 1px solid transparent;
          background: transparent;
          font-size: 12.5px;
          font-weight: 500;
          color: #64748B;
          cursor: pointer;
          transition: all 0.12s ease;
        }

        .filter-pill:hover {
          background: #F1F5F9;
          color: #0F172A;
        }

        .filter-pill.is-active {
          background: #FFFFFF;
          border-color: #CBD5E1;
          color: #0F172A;
          font-weight: 600;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
        }

        /* Sessions Grid */
        .dash-session-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
          gap: 22px;
        }

        .dash-empty-state {
          padding: 60px 20px;
          text-align: center;
          background: #FFFFFF;
          border-radius: 16px;
          border: 1px dashed #CBD5E1;
          color: #64748B;
        }

        .empty-icon {
          color: #94A3B8;
          margin-bottom: 12px;
        }

        .dash-empty-state h3 {
          margin: 0 0 6px 0;
          color: #0F172A;
          font-size: 16px;
        }

        .dash-empty-state p {
          margin: 0;
          font-size: 13.5px;
        }

        .action-pill.mt {
          margin-top: 16px;
        }

        /* ── Dark Mode ── */
        [data-theme="dark"] .dash-welcome-h1 {
          color: #FFFFFF;
        }

        [data-theme="dark"] .action-pill {
          background: #161B24;
          border-color: rgba(255, 255, 255, 0.1);
          color: #CBD5E1;
        }

        [data-theme="dark"] .action-pill:hover {
          background: #1F2633;
          color: #FFFFFF;
        }

        [data-theme="dark"] .action-pill.primary {
          background: #1E293B;
          border-color: rgba(255, 255, 255, 0.15);
          color: #FFFFFF;
        }

        [data-theme="dark"] .dash-section-title {
          color: #FFFFFF;
        }

        [data-theme="dark"] .filter-pill {
          color: #94A3B8;
        }

        [data-theme="dark"] .filter-pill:hover {
          background: rgba(255, 255, 255, 0.08);
          color: #FFFFFF;
        }

        [data-theme="dark"] .filter-pill.is-active {
          background: #161B24;
          border-color: rgba(255, 255, 255, 0.15);
          color: #FFFFFF;
        }

        [data-theme="dark"] .dash-empty-state {
          background: #111620;
          border-color: rgba(255, 255, 255, 0.1);
        }

        [data-theme="dark"] .dash-empty-state h3 {
          color: #FFFFFF;
        }
      `}</style>
    </DashboardLayout>
  );
}
