import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, FileText, Sparkles, ArrowRight, CheckCircle2, RefreshCw, Play, MapPin, Sliders, Layers } from 'lucide-react';
import { DashboardLayout } from './components/DashboardLayout.js';

interface GeneratedQuestion {
  id: string;
  type: 'spatial' | 'decay' | 'debate';
  title: string;
  topic: string;
  prompt: string;
  targetDescription: string;
  diagramName: string;
}

export default function SyllabusPage() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<string | null>('CS106B_Syllabus_Week4.pdf');
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'spatial' | 'decay' | 'debate'>('all');

  const sampleDecks: GeneratedQuestion[] = [
    {
      id: 'q-1',
      type: 'spatial',
      title: 'Binary Search Tree Rotations',
      topic: 'CS106B: Module 4',
      prompt: 'Click directly on the pivot node that triggers an AVL double-left rotation after inserting node 42.',
      targetDescription: 'Target: Node 38 (Right child of left subtree)',
      diagramName: 'Binary Search Tree Imbalance Matrix',
    },
    {
      id: 'q-2',
      type: 'spatial',
      title: 'Memory Heap vs Stack Boundary',
      topic: 'CS106B: Module 3',
      prompt: 'Identify the exact memory coordinate where heap fragmentation leaks into unallocated page buffers.',
      targetDescription: 'Target: Offset 0x7FFF42A0 (Heap overflow marker)',
      diagramName: 'C++ Virtual Memory Layout Diagram',
    },
    {
      id: 'q-3',
      type: 'decay',
      title: 'Pointer Arithmetic Retention Diagnostic',
      topic: 'Week 1 Concept — 84% Historical Decay',
      prompt: 'Determine the dereferenced value after two void* cast incrementations.',
      targetDescription: 'Retention Check: Scheduled for 15-week decay probe',
      diagramName: 'Pointer Reference Graph',
    },
    {
      id: 'q-4',
      type: 'debate',
      title: 'Iterative vs Recursive Traversal Trade-offs',
      topic: 'Peer Discussion Arena',
      prompt: 'When does stack depth overhead make recursion prohibitive compared to Morris traversal in memory-constrained systems?',
      targetDescription: 'Pair-and-share prompt (2 minute discussion timer)',
      diagramName: 'Call Stack Visualization',
    },
  ];

  const handleSimulateUpload = (fileName: string) => {
    setSelectedFile(fileName);
    setIsSynthesizing(true);
    setTimeout(() => {
      setIsSynthesizing(false);
    }, 900);
  };

  const filteredQuestions = sampleDecks.filter((q) => activeTab === 'all' || q.type === activeTab);

  return (
    <DashboardLayout activeNav="syllabus">
      <div className="syllabus-container">
        {/* Top Header */}
        <div className="syllabus-header">
          <div>
            <h1 className="syllabus-h1">Import & Syllabus Synthesizer</h1>
            <p className="syllabus-sub">
              Upload course syllabus modules or presentation slides (PDF, PPTX) to extract interactive questions and spatial diagram polls.
            </p>
          </div>

          <button
            type="button"
            className="launch-presenter-cta"
            onClick={() => navigate('/presenter')}
          >
            <Play size={15} fill="currentColor" />
            <span>Launch Generated Deck</span>
          </button>
        </div>

        {/* Upload Box & Preset Pills */}
        <div className="syllabus-upload-card">
          <div className="dropzone-area">
            <div className="upload-icon-circle">
              <UploadCloud size={32} />
            </div>
            <h3 className="upload-title">Drop your syllabus or slide deck here</h3>
            <p className="upload-sub">Supports PDF, PowerPoint (.pptx), Word (.docx), or plain text up to 50MB</p>

            <div className="file-actions-row">
              <label className="file-select-btn">
                <span>Browse Local Files</span>
                <input
                  type="file"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      handleSimulateUpload(e.target.files[0].name);
                    }
                  }}
                />
              </label>

              <span className="file-or-sep">or try university sample:</span>

              <button
                type="button"
                className="sample-file-chip"
                onClick={() => handleSimulateUpload('Stanford_CS106B_Week4_Trees.pdf')}
              >
                <FileText size={13} />
                <span>Stanford CS106B (Trees)</span>
              </button>

              <button
                type="button"
                className="sample-file-chip"
                onClick={() => handleSimulateUpload('Bio101_CellularRespiration.pptx')}
              >
                <FileText size={13} />
                <span>Bio 101 (Cell Respiration)</span>
              </button>
            </div>
          </div>

          {selectedFile && (
            <div className="active-file-status">
              <div className="file-info-left">
                <CheckCircle2 size={18} className="check-emerald" />
                <span>Parsed active file: <strong>{selectedFile}</strong></span>
              </div>
              {isSynthesizing ? (
                <div className="synthesizing-pill">
                  <RefreshCw size={14} className="spin-icon" />
                  <span>Synthesizing Spatial Questions...</span>
                </div>
              ) : (
                <span className="ready-pill">Ready for Classroom Presentation</span>
              )}
            </div>
          )}
        </div>

        {/* Generated Questions Section */}
        <div className="generated-section">
          <div className="generated-nav-row">
            <h2 className="generated-title">Generated Interactive Questions ({sampleDecks.length})</h2>

            <div className="tab-pill-group">
              <button
                type="button"
                className={`tab-pill ${activeTab === 'all' ? 'is-active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                All Prompts ({sampleDecks.length})
              </button>
              <button
                type="button"
                className={`tab-pill ${activeTab === 'spatial' ? 'is-active' : ''}`}
                onClick={() => setActiveTab('spatial')}
              >
                Spatial Hotspots (2)
              </button>
              <button
                type="button"
                className={`tab-pill ${activeTab === 'decay' ? 'is-active' : ''}`}
                onClick={() => setActiveTab('decay')}
              >
                Decay Probes (1)
              </button>
              <button
                type="button"
                className={`tab-pill ${activeTab === 'debate' ? 'is-active' : ''}`}
                onClick={() => setActiveTab('debate')}
              >
                Peer Debate (1)
              </button>
            </div>
          </div>

          {/* Question Cards Grid */}
          <div className="question-cards-grid">
            {filteredQuestions.map((q, idx) => (
              <div key={q.id} className="prompt-card">
                <div className="prompt-card-top">
                  <div className="prompt-type-badge">
                    {q.type === 'spatial' && <><MapPin size={12} /><span>Spatial Diagram</span></>}
                    {q.type === 'decay' && <><Sliders size={12} /><span>Decay Diagnostic</span></>}
                    {q.type === 'debate' && <><Layers size={12} /><span>Peer Debate</span></>}
                  </div>
                  <span className="prompt-topic-tag">{q.topic}</span>
                </div>

                <h3 className="prompt-card-h3">
                  <span className="prompt-num">Q{idx + 1}.</span> {q.title}
                </h3>
                <p className="prompt-card-desc">{q.prompt}</p>

                <div className="prompt-target-box">
                  <span className="target-label">AI Diagnostic Target:</span>
                  <span className="target-val">{q.targetDescription}</span>
                </div>

                <div className="prompt-card-footer">
                  <span className="diagram-name-tag">📐 {q.diagramName}</span>
                  <button
                    type="button"
                    className="test-prompt-btn"
                    onClick={() => navigate('/presenter')}
                  >
                    <span>Test on Stage</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .syllabus-container {
          max-width: 1200px;
        }

        .syllabus-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 32px;
          flex-wrap: wrap;
        }

        .syllabus-badge {
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
          margin-bottom: 12px;
        }

        .sparkle-icon {
          color: #2563EB;
        }

        .syllabus-h1 {
          font-family: var(--font-display, 'UntitledSerif', Georgia, serif);
          font-size: 32px;
          font-weight: 700;
          color: #0F172A;
          letter-spacing: -0.02em;
          margin: 0 0 8px 0;
        }

        .syllabus-sub {
          margin: 0;
          font-size: 14.5px;
          color: #64748B;
          max-width: 680px;
          line-height: 1.5;
        }

        .launch-presenter-cta {
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

        .launch-presenter-cta:hover {
          background: #1E293B;
          transform: translateY(-1px);
        }

        /* Upload Card */
        .syllabus-upload-card {
          background: #FFFFFF;
          border-radius: 20px;
          border: 1px solid #E2E8F0;
          padding: 32px;
          margin-bottom: 36px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
        }

        .dropzone-area {
          border: 2px dashed #CBD5E1;
          border-radius: 16px;
          padding: 36px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          background: #FAFAFA;
        }

        .upload-icon-circle {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #EFF6FF;
          color: #2563EB;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 14px;
        }

        .upload-title {
          margin: 0 0 6px 0;
          font-size: 16px;
          font-weight: 600;
          color: #0F172A;
        }

        .upload-sub {
          margin: 0 0 20px 0;
          font-size: 13px;
          color: #64748B;
        }

        .file-actions-row {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .file-select-btn {
          height: 38px;
          padding: 0 18px;
          border-radius: 9999px;
          background: #0F172A;
          color: #FFFFFF;
          font-size: 13px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .file-select-btn:hover {
          background: #1E293B;
        }

        .file-or-sep {
          font-size: 12.5px;
          color: #94A3B8;
        }

        .sample-file-chip {
          height: 34px;
          padding: 0 14px;
          border-radius: 9999px;
          border: 1px solid #E2E8F0;
          background: #FFFFFF;
          font-size: 12.5px;
          font-weight: 500;
          color: #334155;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          transition: all 0.12s ease;
        }

        .sample-file-chip:hover {
          background: #F1F5F9;
          border-color: #CBD5E1;
          color: #0F172A;
        }

        .active-file-status {
          margin-top: 20px;
          padding-top: 16px;
          border-top: 1px solid #F1F5F9;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 13px;
          flex-wrap: wrap;
          gap: 12px;
        }

        .file-info-left {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #0F172A;
        }

        .check-emerald {
          color: #10B981;
        }

        .synthesizing-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 600;
          color: #2563EB;
          background: #EFF6FF;
          padding: 4px 12px;
          border-radius: 9999px;
        }

        .spin-icon {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .ready-pill {
          font-size: 12px;
          font-weight: 600;
          color: #166534;
          background: #DCFCE7;
          padding: 4px 12px;
          border-radius: 9999px;
        }

        /* Generated Questions */
        .generated-section {
          margin-top: 10px;
        }

        .generated-nav-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 22px;
          flex-wrap: wrap;
          gap: 14px;
        }

        .generated-title {
          font-size: 18px;
          font-weight: 700;
          color: #0F172A;
          margin: 0;
        }

        .tab-pill-group {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .tab-pill {
          height: 32px;
          padding: 0 14px;
          border-radius: 9999px;
          border: 1px solid transparent;
          background: transparent;
          font-size: 12.5px;
          font-weight: 500;
          color: #64748B;
          cursor: pointer;
          transition: all 0.12s ease;
        }

        .tab-pill:hover {
          background: #F1F5F9;
          color: #0F172A;
        }

        .tab-pill.is-active {
          background: #FFFFFF;
          border-color: #CBD5E1;
          color: #0F172A;
          font-weight: 600;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
        }

        .question-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
          gap: 20px;
        }

        .prompt-card {
          background: #FFFFFF;
          border-radius: 16px;
          border: 1px solid #E2E8F0;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }

        .prompt-card:hover {
          transform: translateY(-2px);
          border-color: #CBD5E1;
          box-shadow: 0 8px 24px -4px rgba(15, 23, 42, 0.08);
        }

        .prompt-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .prompt-type-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 11.5px;
          font-weight: 600;
          color: #2563EB;
          background: #EFF6FF;
          padding: 2px 8px;
          border-radius: 6px;
        }

        .prompt-topic-tag {
          font-size: 11.5px;
          color: #64748B;
        }

        .prompt-card-h3 {
          margin: 0;
          font-size: 16px;
          font-weight: 600;
          color: #0F172A;
          line-height: 1.35;
        }

        .prompt-num {
          color: #2563EB;
          margin-right: 4px;
        }

        .prompt-card-desc {
          margin: 0;
          font-size: 13.5px;
          color: #475569;
          line-height: 1.45;
        }

        .prompt-target-box {
          background: #F8FAFC;
          border-radius: 10px;
          padding: 10px 14px;
          font-size: 12px;
          border-left: 3px solid #2563EB;
        }

        .target-label {
          color: #64748B;
          margin-right: 6px;
          font-weight: 500;
        }

        .target-val {
          color: #0F172A;
          font-weight: 600;
        }

        .prompt-card-footer {
          margin-top: 4px;
          padding-top: 14px;
          border-top: 1px solid #F1F5F9;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .diagram-name-tag {
          font-size: 12px;
          color: #64748B;
        }

        .test-prompt-btn {
          background: transparent;
          border: none;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 12.5px;
          font-weight: 600;
          color: #2563EB;
          cursor: pointer;
          transition: gap 0.15s ease;
        }

        .test-prompt-btn:hover {
          gap: 8px;
          text-decoration: underline;
        }

        /* ── Dark Mode ── */
        [data-theme="dark"] .syllabus-h1 {
          color: #FFFFFF;
        }

        [data-theme="dark"] .syllabus-upload-card {
          background: #111620;
          border-color: rgba(255, 255, 255, 0.08);
        }

        [data-theme="dark"] .dropzone-area {
          background: #161B24;
          border-color: rgba(255, 255, 255, 0.12);
        }

        [data-theme="dark"] .upload-title {
          color: #FFFFFF;
        }

        [data-theme="dark"] .file-select-btn {
          background: #FFFFFF;
          color: #0F172A;
        }

        [data-theme="dark"] .sample-file-chip {
          background: #1E293B;
          border-color: rgba(255, 255, 255, 0.1);
          color: #CBD5E1;
        }

        [data-theme="dark"] .active-file-status {
          border-top-color: rgba(255, 255, 255, 0.06);
        }

        [data-theme="dark"] .file-info-left {
          color: #FFFFFF;
        }

        [data-theme="dark"] .generated-title {
          color: #FFFFFF;
        }

        [data-theme="dark"] .tab-pill {
          color: #94A3B8;
        }

        [data-theme="dark"] .tab-pill.is-active {
          background: #161B24;
          border-color: rgba(255, 255, 255, 0.15);
          color: #FFFFFF;
        }

        [data-theme="dark"] .prompt-card {
          background: #111620;
          border-color: rgba(255, 255, 255, 0.08);
        }

        [data-theme="dark"] .prompt-card-h3 {
          color: #FFFFFF;
        }

        [data-theme="dark"] .prompt-card-desc {
          color: #CBD5E1;
        }

        [data-theme="dark"] .prompt-target-box {
          background: #161B24;
        }

        [data-theme="dark"] .target-val {
          color: #FFFFFF;
        }

        [data-theme="dark"] .prompt-card-footer {
          border-top-color: rgba(255, 255, 255, 0.06);
        }

        @media (max-width: 768px) {
          .question-cards-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </DashboardLayout>
  );
}
