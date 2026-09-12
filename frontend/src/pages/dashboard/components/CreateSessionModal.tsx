import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Sparkles, MapPin, Sliders, UploadCloud, Users, ArrowRight, Check } from 'lucide-react';

interface CreateSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSessionCreated?: (newSession: any) => void;
  initialMode?: 'presentation' | 'survey' | 'import';
}

export function CreateSessionModal({
  isOpen,
  onClose,
  onSessionCreated,
  initialMode = 'presentation',
}: CreateSessionModalProps) {
  const navigate = useNavigate();
  const [sessionTitle, setSessionTitle] = useState('');
  const [courseCode, setCourseCode] = useState('CS106B');
  const [selectedFormat, setSelectedFormat] = useState<'spatial' | 'decay' | 'ai' | 'debate'>(
    initialMode === 'survey' ? 'decay' : 'spatial'
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sessionTitle.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const newSession = {
        id: `sess-${Date.now()}`,
        title: sessionTitle.trim(),
        courseTag: courseCode,
        questionCount: selectedFormat === 'spatial' ? 4 : 6,
        responseCount: 0,
        lastEdited: 'Just now',
        category: selectedFormat === 'decay' ? 'survey' : 'presentation',
        status: 'draft',
        previewColor: selectedFormat === 'spatial' ? 'dark-navy' : selectedFormat === 'decay' ? 'forest' : 'deep-ruby',
        thumbnailType: selectedFormat === 'spatial' ? 'tree' : selectedFormat === 'decay' ? 'chemistry' : 'cardiac',
      };

      onSessionCreated?.(newSession);
      onClose();
      // Navigate to presenter studio
      navigate('/presenter');
    }, 600);
  };

  const handleImportClick = () => {
    onClose();
    navigate('/dashboard/syllabus');
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-head">
          <div className="modal-head-titles">
            <h2 className="modal-title">Create New Pairly Session</h2>
            <p className="modal-subtitle">Configure an interactive visual session for your classroom.</p>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleCreate} className="modal-form">
          <div className="modal-field">
            <label className="modal-label" htmlFor="sess-title">Session Title</label>
            <input
              id="sess-title"
              type="text"
              className="modal-input"
              placeholder="e.g. Week 4: Binary Trees & Spatial Heap Traversal"
              value={sessionTitle}
              onChange={(e) => setSessionTitle(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="modal-field">
            <label className="modal-label" htmlFor="course-code">Course Identifier</label>
            <input
              id="course-code"
              type="text"
              className="modal-input"
              placeholder="CS106B, BIO101, CHEM302..."
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
              required
            />
          </div>

          {/* Session Format Picker */}
          <div className="modal-field">
            <label className="modal-label">Pedagogical Format</label>
            <div className="modal-format-grid">
              <button
                type="button"
                className={`modal-format-card ${selectedFormat === 'spatial' ? 'is-selected' : ''}`}
                onClick={() => setSelectedFormat('spatial')}
              >
                <div className="format-icon-wrap blue">
                  <MapPin size={20} />
                </div>
                <div className="format-body">
                  <div className="format-title-row">
                    <strong>Spatial Diagram Hotspot</strong>
                    {selectedFormat === 'spatial' && <Check size={14} className="check-icon" />}
                  </div>
                  <p>Students pin coordinates directly on diagrams, code trees, or anatomical maps.</p>
                </div>
              </button>

              <button
                type="button"
                className={`modal-format-card ${selectedFormat === 'decay' ? 'is-selected' : ''}`}
                onClick={() => setSelectedFormat('decay')}
              >
                <div className="format-icon-wrap emerald">
                  <Sliders size={20} />
                </div>
                <div className="format-body">
                  <div className="format-title-row">
                    <strong>Cognitive Decay Probe</strong>
                    {selectedFormat === 'decay' && <Check size={14} className="check-icon" />}
                  </div>
                  <p>15-week retention check on high-decay concepts with automated curve tracking.</p>
                </div>
              </button>

              <button
                type="button"
                className={`modal-format-card ${selectedFormat === 'debate' ? 'is-selected' : ''}`}
                onClick={() => setSelectedFormat('debate')}
              >
                <div className="format-icon-wrap coral">
                  <Users size={20} />
                </div>
                <div className="format-body">
                  <div className="format-title-row">
                    <strong>Peer Debate Arena</strong>
                    {selectedFormat === 'debate' && <Check size={14} className="check-icon" />}
                  </div>
                  <p>Real-time pair-and-share prompt activated when comprehension drops below 60%.</p>
                </div>
              </button>
            </div>
          </div>

          {/* Import Alternative Callout */}
          <div className="modal-import-callout">
            <div className="import-callout-text">
              <Sparkles size={16} className="sparkle-gold" />
              <span>Have an existing syllabus or slide deck?</span>
            </div>
            <button
              type="button"
              className="import-link-btn"
              onClick={handleImportClick}
            >
              <UploadCloud size={14} />
              <span>Use AI Slide Synthesizer ↗</span>
            </button>
          </div>

          {/* Footer Actions */}
          <div className="modal-actions">
            <button
              type="button"
              className="modal-cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="modal-submit-btn"
              disabled={isSubmitting || !sessionTitle.trim()}
            >
              {isSubmitting ? (
                <span>Generating Session...</span>
              ) : (
                <>
                  <span>Create & Launch Stage</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .modal-dialog {
          width: 100%;
          max-width: 580px;
          background: #FFFFFF;
          border-radius: 20px;
          border: 1px solid #E2E8F0;
          box-shadow: 0 24px 64px -12px rgba(0, 0, 0, 0.25);
          overflow: hidden;
          animation: modalAppear 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes modalAppear {
          from {
            opacity: 0;
            transform: scale(0.96) translateY(8px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .modal-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding: 24px 28px 18px 28px;
          border-bottom: 1px solid #F1F5F9;
        }

        .modal-title {
          margin: 0 0 4px 0;
          font-family: var(--font-display, 'UntitledSerif', Georgia, serif);
          font-size: 22px;
          font-weight: 700;
          color: #0F172A;
        }

        .modal-subtitle {
          margin: 0;
          font-size: 13px;
          color: #64748B;
        }

        .modal-close-btn {
          background: transparent;
          border: none;
          color: #94A3B8;
          cursor: pointer;
          border-radius: 8px;
          padding: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.12s ease;
        }

        .modal-close-btn:hover {
          background: #F1F5F9;
          color: #0F172A;
        }

        .modal-form {
          padding: 22px 28px 26px 28px;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .modal-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .modal-label {
          font-size: 13px;
          font-weight: 600;
          color: #334155;
        }

        .modal-input {
          height: 42px;
          border-radius: 10px;
          border: 1px solid #CBD5E1;
          padding: 0 14px;
          font-family: var(--font-body, 'Inter', sans-serif);
          font-size: 14px;
          color: #0F172A;
          outline: none;
          transition: all 0.15s ease;
        }

        .modal-input:focus {
          border-color: #0F172A;
          box-shadow: 0 0 0 3px rgba(15, 23, 42, 0.08);
        }

        .modal-format-grid {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .modal-format-card {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 12px 14px;
          border-radius: 12px;
          border: 1.5px solid #E2E8F0;
          background: #FFFFFF;
          text-align: left;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .modal-format-card:hover {
          background: #F8FAFC;
          border-color: #CBD5E1;
        }

        .modal-format-card.is-selected {
          border-color: #2563EB;
          background: #EFF6FF;
        }

        .format-icon-wrap {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .format-icon-wrap.blue { background: #DBEAFE; color: #1D4ED8; }
        .format-icon-wrap.emerald { background: #DCFCE7; color: #15803D; }
        .format-icon-wrap.coral { background: #FEE2E2; color: #B91C1C; }

        .format-body {
          flex: 1;
        }

        .format-title-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 13.5px;
          color: #0F172A;
          margin-bottom: 2px;
        }

        .format-body p {
          margin: 0;
          font-size: 12px;
          color: #64748B;
          line-height: 1.4;
        }

        .check-icon {
          color: #2563EB;
        }

        .modal-import-callout {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 14px;
          border-radius: 10px;
          background: #F8FAFC;
          border: 1px dashed #CBD5E1;
          font-size: 12.5px;
        }

        .import-callout-text {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #475569;
        }

        .sparkle-gold {
          color: #D97706;
        }

        .import-link-btn {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 6px;
          padding: 4px 10px;
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 11.5px;
          font-weight: 600;
          color: #1E293B;
          cursor: pointer;
          transition: all 0.12s ease;
        }

        .import-link-btn:hover {
          background: #0F172A;
          color: #FFFFFF;
          border-color: #0F172A;
        }

        .modal-actions {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 8px;
        }

        .modal-cancel-btn {
          height: 40px;
          padding: 0 16px;
          border-radius: 10px;
          border: 1px solid #E2E8F0;
          background: #FFFFFF;
          font-size: 13.5px;
          font-weight: 500;
          color: #475569;
          cursor: pointer;
        }

        .modal-cancel-btn:hover {
          background: #F1F5F9;
          color: #0F172A;
        }

        .modal-submit-btn {
          height: 40px;
          padding: 0 20px;
          border-radius: 10px;
          background: #0F172A;
          color: #FFFFFF;
          border: none;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13.5px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
          box-shadow: 0 2px 8px rgba(15, 23, 42, 0.15);
        }

        .modal-submit-btn:hover:not(:disabled) {
          background: #1E293B;
          transform: translateY(-1px);
        }

        .modal-submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* ── Dark Mode ── */
        [data-theme="dark"] .modal-dialog {
          background: #111620;
          border-color: rgba(255, 255, 255, 0.1);
        }

        [data-theme="dark"] .modal-head {
          border-bottom-color: rgba(255, 255, 255, 0.08);
        }

        [data-theme="dark"] .modal-title {
          color: #FFFFFF;
        }

        [data-theme="dark"] .modal-subtitle {
          color: #94A3B8;
        }

        [data-theme="dark"] .modal-label {
          color: #CBD5E1;
        }

        [data-theme="dark"] .modal-input {
          background: #161B24;
          border-color: rgba(255, 255, 255, 0.12);
          color: #FFFFFF;
        }

        [data-theme="dark"] .modal-input:focus {
          border-color: #60A5FA;
          box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.15);
        }

        [data-theme="dark"] .modal-format-card {
          background: #161B24;
          border-color: rgba(255, 255, 255, 0.08);
        }

        [data-theme="dark"] .modal-format-card:hover {
          background: #1F2633;
        }

        [data-theme="dark"] .modal-format-card.is-selected {
          border-color: #3B82F6;
          background: rgba(59, 130, 246, 0.15);
        }

        [data-theme="dark"] .format-title-row {
          color: #FFFFFF;
        }

        [data-theme="dark"] .modal-import-callout {
          background: #161B24;
          border-color: rgba(255, 255, 255, 0.1);
        }

        [data-theme="dark"] .import-callout-text {
          color: #94A3B8;
        }

        [data-theme="dark"] .import-link-btn {
          background: #1E293B;
          border-color: rgba(255, 255, 255, 0.15);
          color: #FFFFFF;
        }

        [data-theme="dark"] .modal-cancel-btn {
          background: #161B24;
          border-color: rgba(255, 255, 255, 0.1);
          color: #94A3B8;
        }

        [data-theme="dark"] .modal-submit-btn {
          background: #FFFFFF;
          color: #0F172A;
        }
      `}</style>
    </div>
  );
}
