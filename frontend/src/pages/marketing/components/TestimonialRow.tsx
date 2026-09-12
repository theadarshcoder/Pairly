import React from 'react';

export function TestimonialRow() {
  return (
    <section className="pairly-adapt-section" id="educators">
      <div className="adapt-header">
        <h2 className="adapt-headline">
          Structure That Adapts
          <br />
          to How Rooms Think
        </h2>
        <p className="adapt-subtitle">
          Choose any approach that fits your room: pinpoint concepts with spatial hotspots,
          diagnose reasoning with sequential sorting, or build structured consensus with Q&amp;A dedup
        </p>
      </div>

      <div className="adapt-cards-grid">
        {/* ── Card 1: Spatial Hotspots (Spaces style) ── */}
        <div className="adapt-card card-hotspots">
          <div className="card-top-content">
            <h3 className="card-title">Spatial Hotspots</h3>
            <p className="card-subtitle">
              Turn passive slides into live heatmap discussions
            </p>
          </div>

          <div className="card-visual-area">
            {/* Back floating card */}
            <div className="hotspot-back-card">
              <div className="mini-card-header">
                <div className="space-badge-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                <span className="mini-card-title">Anatomy Diagnostic</span>
                <span className="mini-chevron">▾</span>
              </div>
              <div className="space-section-label">TAPPED COORDINATES</div>
              <div className="space-item">
                <span className="space-dot" />
                <span className="space-item-text">Acetabular rim</span>
                <span className="space-item-count">18</span>
              </div>
              <div className="space-item">
                <span className="space-dot" />
                <span className="space-item-text">Iliac crest</span>
                <span className="space-item-count">12</span>
              </div>
              <div className="space-section-label" style={{ marginTop: '8px' }}>HOTSPOTS</div>
              <div className="space-item">
                <span className="space-folder-icon">📍</span>
                <span className="space-item-text">Sub-capital neck</span>
              </div>
            </div>

            {/* Front floating card (Overlapping with heatmap glows) */}
            <div className="hotspot-front-card">
              <div className="mini-card-header">
                <div className="space-badge-icon dark">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2.5">
                    <path d="M12 2v20M2 12h20" />
                  </svg>
                </div>
                <span className="mini-card-title">Live Response Cluster</span>
                <span className="mini-chevron">▾</span>
              </div>

              {/* Heatmap visualization viewport */}
              <div className="hotspot-canvas-view">
                <div className="canvas-grid-pattern" />
                {/* Amber Glow 1 */}
                <div className="amber-glow-primary">
                  <div className="glow-pin-dot" />
                  <span className="glow-pill-badge">88 agreed on fracture</span>
                </div>
                {/* Amber Glow 2 */}
                <div className="amber-glow-secondary">
                  <div className="glow-pin-dot" />
                  <span className="glow-pill-badge">42</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Card 2: Sequential Sorting (Folders & Tags style) ── */}
        <div className="adapt-card card-sorting">
          <div className="card-top-content">
            <h3 className="card-title">Sequential Sorting</h3>
            <p className="card-subtitle">
              Diagnose the exact algorithmic step the whole room reverses
            </p>
          </div>

          <div className="card-visual-area">
            {/* Left Card: Algorithm Steps */}
            <div className="sorting-steps-card">
              <div className="folder-card-title">Algorithm Steps</div>
              <div className="step-row">
                <span className="step-chevron">›</span>
                <span className="step-icon">🔢</span>
                <span className="step-name">Pivot Selection</span>
              </div>
              <div className="step-row">
                <span className="step-chevron">›</span>
                <span className="step-icon">📁</span>
                <span className="step-name">Partition Left</span>
              </div>
              <div className="step-row">
                <span className="step-chevron">›</span>
                <span className="step-icon">🔄</span>
                <span className="step-name">Recursive Halving</span>
              </div>
              <div className="step-row">
                <span className="step-chevron">›</span>
                <span className="step-icon">⚡</span>
                <span className="step-name">In-place Merge</span>
              </div>
            </div>

            {/* Right Card: Tags / Consensus (Tilted overlapping in front) */}
            <div className="sorting-tags-card">
              <div className="tag-card-title">Class Consensus</div>
              <div className="consensus-tag-item">
                <span className="tag-hash">#</span>
                <span className="tag-label">94% Step 1</span>
              </div>
              <div className="consensus-tag-item">
                <span className="tag-hash">#</span>
                <span className="tag-label">81% Step 2</span>
              </div>
              <div className="consensus-tag-item reversed-warning">
                <span className="tag-hash">#</span>
                <span className="tag-label">38% Step 3 (Reversed)</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Card 3: Q&A Dedup (Collections database table style) ── */}
        <div className="adapt-card card-qna">
          <div className="card-top-content">
            <h3 className="card-title">Q&amp;A Dedup</h3>
            <p className="card-subtitle">
              Cluster forty duplicate questions into one high-signal thread
            </p>
          </div>

          <div className="card-visual-area">
            <div className="table-collection-card">
              {/* Table Header */}
              <div className="collection-header-row">
                <span className="col-idx">#</span>
                <span className="col-title">Aa Question Thread</span>
                <span className="col-author">👍 Upvotes</span>
              </div>

              {/* Group Bar */}
              <div className="collection-group-bar">
                <span className="group-arrow">▾</span>
                <span className="group-pill">Live Lecture Hall</span>
                <span className="group-dots">···</span>
              </div>

              {/* Data Rows */}
              <div className="collection-row">
                <span className="row-num">1</span>
                <span className="row-title">
                  <span className="row-doc-icon">💬</span>
                  Why branch prediction fails on unsorted arrays
                </span>
                <span className="row-chip">+42 (18 merged)</span>
              </div>

              <div className="collection-row">
                <span className="row-num">2</span>
                <span className="row-title">
                  <span className="row-doc-icon">💬</span>
                  Is worst-case time complexity O(n log n)?
                </span>
                <span className="row-chip">+27 (12 merged)</span>
              </div>

              <div className="collection-row">
                <span className="row-num">3</span>
                <span className="row-title">
                  <span className="row-doc-icon">💬</span>
                  Can we use an iterative queue buffer instead?
                </span>
                <span className="row-chip">+15 (6 merged)</span>
              </div>

              <div className="collection-row">
                <span className="row-num">4</span>
                <span className="row-title">
                  <span className="row-doc-icon">💬</span>
                  Slide 14: CAS spinlock vs mutex locks
                </span>
                <span className="row-chip">+11 (4 merged)</span>
              </div>

              <div className="collection-row">
                <span className="row-num">5</span>
                <span className="row-title">
                  <span className="row-doc-icon">💬</span>
                  Memory barrier required on x86 architecture?
                </span>
                <span className="row-chip">+8 (3 merged)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .pairly-adapt-section {
          padding: 80px 32px 120px 32px;
          margin-top: 32px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .adapt-header {
          text-align: center;
          max-width: 820px;
          margin-bottom: 56px;
        }

        .adapt-headline {
          font-family: var(--font-display, 'UntitledSerif', Georgia, serif);
          font-weight: 500;
          font-size: clamp(2.4rem, 4.4vw, 3.6rem);
          line-height: 1.12;
          letter-spacing: -0.025em;
          color: #0F0F0F;
          margin: 0;
        }

        .adapt-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: 16px;
          line-height: 1.55;
          color: #555555;
          max-width: 680px;
          margin: 18px auto 0 auto;
        }

        .adapt-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          box-sizing: border-box;
        }

        .adapt-card {
          height: 440px;
          border-radius: 28px;
          overflow: hidden;
          position: relative;
          display: flex;
          flex-direction: column;
          box-shadow: 0 16px 36px -12px rgba(27, 23, 18, 0.12), 0 0 1px rgba(0, 0, 0, 0.08);
          background-size: cover;
          background-position: center bottom;
          background-repeat: no-repeat;
        }

        .card-hotspots {
          background-color: #DDE5F5;
          background-image: url('/images/mountain_purple_bg.png');
        }

        .card-sorting {
          background-color: #D2E7F5;
          background-image: url('/images/mountain_blue_bg.png');
        }

        .card-qna {
          background-color: #D6EAD8;
          background-image: url('/images/mountain_green_bg.png');
        }

        .card-top-content {
          padding: 32px 24px 16px 24px;
          text-align: center;
          z-index: 2;
        }

        .card-title {
          font-family: var(--font-display, 'UntitledSerif', Georgia, serif);
          font-size: 32px;
          font-weight: 500;
          color: #0F0F0F;
          margin: 0;
          line-height: 1.15;
          letter-spacing: -0.015em;
        }

        .card-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: 13.5px;
          color: #4A4A4A;
          margin: 8px auto 0 auto;
          max-width: 250px;
          line-height: 1.4;
        }

        .card-visual-area {
          flex: 1;
          position: relative;
          overflow: hidden;
          width: 100%;
        }

        /* ── Card 1: Spaces / Hotspots Overlapping Cards ── */
        .hotspot-back-card {
          position: absolute;
          left: 20px;
          top: 16px;
          width: 215px;
          background: #FFFFFF;
          border-radius: 16px;
          padding: 12px 14px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.07);
          box-sizing: border-box;
          z-index: 1;
        }

        .mini-card-header {
          display: flex;
          align-items: center;
          gap: 8px;
          padding-bottom: 8px;
          border-bottom: 1px solid #F0F0EE;
          margin-bottom: 8px;
        }

        .space-badge-icon {
          width: 22px;
          height: 22px;
          border-radius: 6px;
          background: #EFF6FF;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .space-badge-icon.dark {
          background: #FEF3C7;
        }

        .mini-card-title {
          font-family: 'Inter', sans-serif;
          font-size: 11.5px;
          font-weight: 600;
          color: #1A1A1A;
          flex: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .mini-chevron {
          font-size: 10px;
          color: #888888;
        }

        .space-section-label {
          font-family: 'Inter', sans-serif;
          font-size: 9px;
          font-weight: 700;
          color: #9CA3AF;
          letter-spacing: 0.05em;
          margin-bottom: 4px;
        }

        .space-item {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 3px 0;
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          color: #4B5563;
        }

        .space-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #9CA3AF;
        }

        .space-item-text {
          flex: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .space-item-count {
          font-size: 10px;
          font-weight: 600;
          color: #6B7280;
          background: #F3F4F6;
          padding: 1px 5px;
          border-radius: 4px;
        }

        .space-folder-icon {
          font-size: 11px;
        }

        .hotspot-front-card {
          position: absolute;
          left: 90px;
          top: 52px;
          width: 235px;
          background: #FFFFFF;
          border-radius: 16px;
          padding: 12px 14px;
          box-shadow: 0 14px 34px -4px rgba(0, 0, 0, 0.14), 0 0 1px rgba(0, 0, 0, 0.1);
          box-sizing: border-box;
          z-index: 2;
        }

        .hotspot-canvas-view {
          width: 100%;
          height: 120px;
          background: #18181B;
          border-radius: 10px;
          position: relative;
          overflow: hidden;
          margin-top: 4px;
        }

        .canvas-grid-pattern {
          position: absolute;
          inset: 0;
          background-size: 16px 16px;
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
        }

        .amber-glow-primary {
          position: absolute;
          top: 45%;
          left: 60%;
          transform: translate(-50%, -50%);
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(245, 158, 11, 0.85) 0%, rgba(245, 158, 11, 0.3) 45%, transparent 70%);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .amber-glow-secondary {
          position: absolute;
          top: 65%;
          left: 28%;
          transform: translate(-50%, -50%);
          width: 65px;
          height: 65px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(251, 191, 36, 0.8) 0%, rgba(245, 158, 11, 0.25) 45%, transparent 70%);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .glow-pin-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #FFFFFF;
          box-shadow: 0 0 8px #F59E0B;
        }

        .glow-pill-badge {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          margin-top: 2px;
          background: rgba(0, 0, 0, 0.75);
          color: #FDE68A;
          font-family: 'Inter', sans-serif;
          font-size: 9px;
          font-weight: 600;
          padding: 2px 6px;
          border-radius: 4px;
          white-space: nowrap;
          backdrop-filter: blur(4px);
        }

        /* ── Card 2: Folders & Tags (Sorting) ── */
        .sorting-steps-card {
          position: absolute;
          left: 20px;
          top: 20px;
          width: 200px;
          background: #FFFFFF;
          border-radius: 16px;
          padding: 14px 16px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
          box-sizing: border-box;
          z-index: 1;
        }

        .folder-card-title {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: #111111;
          margin-bottom: 10px;
        }

        .step-row {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 5px 0;
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          color: #374151;
        }

        .step-chevron {
          color: #9CA3AF;
          font-size: 12px;
        }

        .step-icon {
          font-size: 13px;
        }

        .step-name {
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .sorting-tags-card {
          position: absolute;
          left: 148px;
          top: 48px;
          width: 175px;
          background: #FFFFFF;
          border-radius: 16px;
          padding: 14px 16px;
          box-shadow: 0 14px 34px -4px rgba(0, 0, 0, 0.14), 0 0 1px rgba(0, 0, 0, 0.1);
          box-sizing: border-box;
          transform: rotate(3deg);
          z-index: 2;
        }

        .tag-card-title {
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 700;
          color: #111111;
          margin-bottom: 10px;
        }

        .consensus-tag-item {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #F3F4F6;
          padding: 5px 8px;
          border-radius: 8px;
          margin-bottom: 6px;
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 600;
          color: #374151;
        }

        .consensus-tag-item.reversed-warning {
          background: #FEF2F2;
          color: #DC2626;
          border: 1px solid #FECACA;
        }

        .tag-hash {
          color: #9CA3AF;
          font-weight: 700;
        }

        /* ── Card 3: Collections (Q&A Dedup Database Table) ── */
        .table-collection-card {
          position: absolute;
          left: 16px;
          right: 16px;
          top: 12px;
          bottom: 0;
          background: #FFFFFF;
          border-radius: 16px 16px 0 0;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          padding: 14px 16px 0 16px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
        }

        .collection-header-row {
          display: flex;
          align-items: center;
          font-family: 'Inter', sans-serif;
          font-size: 10.5px;
          font-weight: 600;
          color: #6B7280;
          padding-bottom: 8px;
          border-bottom: 1px solid #F3F4F6;
          gap: 12px;
        }

        .col-idx {
          width: 14px;
        }

        .col-title {
          flex: 1;
        }

        .col-author {
          text-align: right;
        }

        .collection-group-bar {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 0 6px 0;
        }

        .group-arrow {
          font-size: 10px;
          color: #9CA3AF;
        }

        .group-pill {
          background: #FEF3C7;
          color: #92400E;
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          font-weight: 600;
          padding: 2px 7px;
          border-radius: 999px;
        }

        .group-dots {
          margin-left: auto;
          color: #9CA3AF;
          font-size: 12px;
        }

        .collection-row {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 7px 0;
          border-bottom: 1px solid #F9FAFB;
          font-family: 'Inter', sans-serif;
          font-size: 11px;
        }

        .row-num {
          width: 14px;
          font-size: 10px;
          color: #9CA3AF;
          text-align: center;
        }

        .row-title {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 6px;
          color: #1F2937;
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .row-doc-icon {
          font-size: 11px;
        }

        .row-chip {
          font-size: 10px;
          font-weight: 600;
          color: #4B5563;
          background: #F3F4F6;
          padding: 2px 6px;
          border-radius: 4px;
          white-space: nowrap;
          font-variant-numeric: tabular-nums;
        }

        @media (max-width: 960px) {
          .adapt-cards-grid {
            grid-template-columns: 1fr;
            max-width: 440px;
          }
          .pairly-adapt-section {
            padding: 80px 20px;
            margin-top: 80px;
          }
        }

        /* ── Dark Mode Overrides ── */
        :root[data-theme="dark"] .adapt-headline,
        [data-theme="dark"] .adapt-headline {
          color: #F2F2F4;
        }

        :root[data-theme="dark"] .adapt-subtitle,
        [data-theme="dark"] .adapt-subtitle {
          color: #9E9EA8;
        }

        :root[data-theme="dark"] .adapt-card,
        [data-theme="dark"] .adapt-card {
          box-shadow: 0 16px 40px -10px rgba(0, 0, 0, 0.6), 0 0 1px rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        :root[data-theme="dark"] .card-hotspots,
        [data-theme="dark"] .card-hotspots {
          background-color: #101426 !important;
          background-image: linear-gradient(180deg, rgba(16, 20, 38, 0.88) 0%, #0B0E1B 100%), url('/images/mountain_purple_bg.png') !important;
          background-blend-mode: overlay;
        }

        :root[data-theme="dark"] .card-sorting,
        [data-theme="dark"] .card-sorting {
          background-color: #0C1A2B !important;
          background-image: linear-gradient(180deg, rgba(12, 26, 43, 0.88) 0%, #08121E 100%), url('/images/mountain_blue_bg.png') !important;
          background-blend-mode: overlay;
        }

        :root[data-theme="dark"] .card-qna,
        [data-theme="dark"] .card-qna {
          background-color: #0B1F17 !important;
          background-image: linear-gradient(180deg, rgba(11, 31, 23, 0.88) 0%, #07150F 100%), url('/images/mountain_green_bg.png') !important;
          background-blend-mode: overlay;
        }

        :root[data-theme="dark"] .card-title,
        [data-theme="dark"] .card-title {
          color: #FFFFFF !important;
        }

        :root[data-theme="dark"] .card-subtitle,
        [data-theme="dark"] .card-subtitle {
          color: rgba(255, 255, 255, 0.72) !important;
        }

        /* Hotspot Mini Cards */
        :root[data-theme="dark"] .hotspot-back-card,
        [data-theme="dark"] .hotspot-back-card {
          background: #171B28 !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5) !important;
        }

        :root[data-theme="dark"] .mini-card-header,
        [data-theme="dark"] .mini-card-header {
          border-bottom-color: rgba(255, 255, 255, 0.08) !important;
        }

        :root[data-theme="dark"] .mini-card-title,
        [data-theme="dark"] .mini-card-title {
          color: #F0F2F5 !important;
        }

        :root[data-theme="dark"] .space-section-label,
        [data-theme="dark"] .space-section-label {
          color: #7A8599 !important;
        }

        :root[data-theme="dark"] .space-item,
        [data-theme="dark"] .space-item {
          color: #C0C8D6 !important;
        }

        :root[data-theme="dark"] .space-item-count,
        [data-theme="dark"] .space-item-count {
          color: #8CA0BA !important;
        }

        :root[data-theme="dark"] .space-badge-icon,
        [data-theme="dark"] .space-badge-icon {
          background: rgba(37, 99, 235, 0.25) !important;
        }

        :root[data-theme="dark"] .hotspot-front-card,
        [data-theme="dark"] .hotspot-front-card {
          background: #1B2030 !important;
          border: 1px solid rgba(255, 255, 255, 0.12) !important;
          box-shadow: 0 14px 36px rgba(0, 0, 0, 0.6) !important;
        }

        /* Sorting Mini Cards */
        :root[data-theme="dark"] .sorting-steps-card,
        [data-theme="dark"] .sorting-steps-card {
          background: #151F2E !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5) !important;
        }

        :root[data-theme="dark"] .folder-card-title,
        [data-theme="dark"] .folder-card-title {
          color: #E2ECF8 !important;
        }

        :root[data-theme="dark"] .step-row,
        [data-theme="dark"] .step-row {
          color: #C0D2E5 !important;
        }

        :root[data-theme="dark"] .step-name,
        [data-theme="dark"] .step-name {
          color: #D6E4F5 !important;
        }

        :root[data-theme="dark"] .sorting-tags-card,
        [data-theme="dark"] .sorting-tags-card {
          background: #1B293E !important;
          border: 1px solid rgba(255, 255, 255, 0.12) !important;
          box-shadow: 0 14px 36px rgba(0, 0, 0, 0.6) !important;
        }

        :root[data-theme="dark"] .tag-card-title,
        [data-theme="dark"] .tag-card-title {
          color: #E2ECF8 !important;
        }

        :root[data-theme="dark"] .consensus-tag-item,
        [data-theme="dark"] .consensus-tag-item {
          background: rgba(255, 255, 255, 0.08) !important;
          color: #E2ECF8 !important;
        }

        :root[data-theme="dark"] .consensus-tag-item.reversed-warning,
        [data-theme="dark"] .consensus-tag-item.reversed-warning {
          background: rgba(239, 68, 68, 0.2) !important;
          color: #FCA5A5 !important;
        }

        /* Q&A Table Mini Card */
        :root[data-theme="dark"] .table-collection-card,
        [data-theme="dark"] .table-collection-card {
          background: #14241D !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.55) !important;
        }

        :root[data-theme="dark"] .collection-header-row,
        [data-theme="dark"] .collection-header-row {
          color: #8BB89F !important;
          border-bottom-color: rgba(255, 255, 255, 0.08) !important;
        }

        :root[data-theme="dark"] .collection-group-bar,
        [data-theme="dark"] .collection-group-bar {
          background: rgba(255, 255, 255, 0.05) !important;
        }

        :root[data-theme="dark"] .group-pill,
        [data-theme="dark"] .group-pill {
          background: rgba(45, 212, 167, 0.15) !important;
          color: #A3F3D2 !important;
        }

        :root[data-theme="dark"] .collection-row,
        [data-theme="dark"] .collection-row {
          border-bottom-color: rgba(255, 255, 255, 0.05) !important;
        }

        :root[data-theme="dark"] .row-num,
        [data-theme="dark"] .row-num {
          color: #6C8A79 !important;
        }

        :root[data-theme="dark"] .row-title,
        [data-theme="dark"] .row-title {
          color: #D6EFE1 !important;
        }

        :root[data-theme="dark"] .row-chip,
        [data-theme="dark"] .row-chip {
          background: rgba(255, 255, 255, 0.08) !important;
          color: #A3F3D2 !important;
        }
      `}</style>
    </section>
  );
}


