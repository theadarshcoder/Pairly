import React, { useState, useMemo, useRef, useEffect } from 'react';
import type { SpatialHotspotSlide } from '@pairly/schemas';
import { live } from '@shared/lib/liveBuffer.js';
import * as d3 from 'd3';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Flame, CheckCircle2, XCircle, Info, Sparkles } from 'lucide-react';

interface Props {
  slide: SpatialHotspotSlide;
}

export function PresenterHeatmap({ slide }: Props) {
  const [showAnswers, setShowAnswers] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
    width: 800,
    height: 500,
  });

  // Hotspot state from liveBuffer (Issue 3 / Step 3)
  const densityGrid = live.hotspots;
  const totalTaps = live.hotspotTotalTaps;
  const regionHits = {} as Record<string, number>;
  const recentTaps = [] as Array<{ x: number; y: number }>;

  // Update container dimensions on resize
  useEffect(() => {
    if (!containerRef.current) return;
    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          setDimensions({ width: rect.width, height: rect.height });
        }
      }
    };
    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Compute D3 contours from the 50x50 density grid
  const contours = useMemo(() => {
    if (!densityGrid || densityGrid.length !== 2500 || totalTaps === 0) {
      return [];
    }

    try {
      const contourGen = d3
        .contours()
        .size([50, 50])
        .thresholds([0.08, 0.2, 0.35, 0.55, 0.75, 0.9]);

      return contourGen(densityGrid as any);
    } catch {
      return [];
    }
  }, [densityGrid, totalTaps]);

  // D3 color interpolator (Inferno for vivid, high-contrast thermal aesthetic)
  const colorScale = useMemo(() => {
    return d3.scaleSequential(d3.interpolateInferno).domain([0, 1]);
  }, []);

  const pathGenerator = useMemo(() => d3.geoPath(), []);

  // Scale factor from 50x50 grid to container dimensions
  const scaleX = dimensions.width / 50;
  const scaleY = dimensions.height / 50;

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-4)',
        padding: 'var(--space-6)',
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      {/* Slide Header & Controls */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: 'var(--space-4)',
        }}
      >
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-1)',
              padding: '2px 8px',
              borderRadius: 'var(--radius-full)',
              background: 'hsl(250 84% 60% / 0.12)',
              color: 'var(--color-brand-primary)',
              fontSize: 'var(--text-xs)',
              fontWeight: 'var(--weight-semibold)',
              marginBottom: 'var(--space-1)',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}
          >
            <Sparkles size={12} /> Live Spatial Heatmap
          </div>
          <h2
            style={{
              fontSize: 'var(--text-2xl)',
              fontWeight: 'var(--weight-bold)',
              color: 'var(--color-text-primary)',
            }}
          >
            {slide.title}
          </h2>
          <p
            style={{
              color: 'var(--color-text-secondary)',
              fontSize: 'var(--text-sm)',
              marginTop: 'var(--space-1)',
            }}
          >
            {slide.prompt}
          </p>
        </div>

        {/* HUD & Control Toolbar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          {/* Real-time Tap Count badge */}
          <div
            id="presenter-tap-counter"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              padding: 'var(--space-2) var(--space-4)',
              borderRadius: 'var(--radius-lg)',
              background: totalTaps > 0 ? 'hsl(14 100% 50% / 0.15)' : 'var(--color-bg-elevated)',
              color: totalTaps > 0 ? 'hsl(14 100% 60%)' : 'var(--color-text-tertiary)',
              border: '1px solid var(--color-border-subtle)',
              fontWeight: 'var(--weight-semibold)',
              fontSize: 'var(--text-sm)',
            }}
          >
            <Flame size={16} />
            <span>{totalTaps} Total Taps</span>
          </div>

          {/* Reveal Target Regions Button */}
          {slide.targetRegions && slide.targetRegions.length > 0 && (
            <button
              onClick={() => setShowAnswers((prev) => !prev)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                padding: 'var(--space-2) var(--space-4)',
                borderRadius: 'var(--radius-lg)',
                background: showAnswers
                  ? 'var(--color-brand-primary)'
                  : 'var(--color-bg-elevated)',
                color: showAnswers ? 'white' : 'var(--color-text-primary)',
                border: '1px solid var(--color-border-subtle)',
                cursor: 'pointer',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--weight-medium)',
                transition: 'all 0.2s ease',
              }}
            >
              {showAnswers ? <EyeOff size={16} /> : <Eye size={16} />}
              <span>{showAnswers ? 'Hide Answers' : 'Reveal Answers'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Visualizer Canvas Container */}
      <div
        id="presenter-heatmap-canvas"
        ref={containerRef}
        style={{
          flex: 1,
          minHeight: '440px',
          position: 'relative',
          borderRadius: 'var(--radius-2xl)',
          overflow: 'hidden',
          background: 'hsl(230 25% 10%)',
          border: '1px solid var(--color-border-subtle)',
          boxShadow: 'var(--shadow-xl)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Base Slide Image */}
        {slide.imageUrl && (
          <img
            src={slide.imageUrl}
            alt={slide.imageAlt ?? slide.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
              inset: 0,
              opacity: 0.85,
              pointerEvents: 'none',
            }}
          />
        )}

        {/* D3 Heatmap Overlay Layer */}
        <svg
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
        >
          <defs>
            <filter id="heat-blur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" />
            </filter>
          </defs>

          {/* D3 Contour Polygons rendered from bounded 50x50 density grid */}
          <g
            transform={`scale(${scaleX}, ${scaleY})`}
            filter="url(#heat-blur)"
            style={{ mixBlendMode: 'screen' }}
          >
            {contours.map((contour, idx) => {
              const pathStr = pathGenerator(contour);
              if (!pathStr) return null;
              const fill = colorScale(contour.value);
              const opacity = 0.35 + contour.value * 0.55;

              return (
                <path
                  key={idx}
                  d={pathStr}
                  fill={fill}
                  fillOpacity={opacity}
                  stroke={fill}
                  strokeWidth="0.4"
                  strokeOpacity={0.7}
                />
              );
            })}
          </g>

          {/* Momentary Ripple Rings for Recent Taps */}
          {recentTaps.map((pt, i) => (
            <g key={`${pt.x}_${pt.y}_${i}`}>
              <circle
                cx={pt.x * dimensions.width}
                cy={pt.y * dimensions.height}
                r="18"
                fill="none"
                stroke="hsl(50 100% 70%)"
                strokeWidth="2.5"
                opacity="0.8"
                style={{
                  animation: 'pulse 1s cubic-bezier(0, 0, 0.2, 1) infinite',
                }}
              />
              <circle
                cx={pt.x * dimensions.width}
                cy={pt.y * dimensions.height}
                r="4"
                fill="white"
                style={{ filter: 'drop-shadow(0 0 6px white)' }}
              />
            </g>
          ))}

          {/* Target Regions (when revealed by presenter) */}
          {showAnswers &&
            slide.targetRegions?.map((region) => {
              const cx = region.x * dimensions.width;
              const cy = region.y * dimensions.height;
              const r = (region.radius ?? 0.05) * Math.min(dimensions.width, dimensions.height);
              const hits = regionHits[region.id] ?? 0;
              const percent = totalTaps > 0 ? Math.round((hits / totalTaps) * 100) : 0;
              const isCorrect = region.isCorrect !== false;

              return (
                <g key={region.id}>
                  {/* Region boundary circle */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={r}
                    fill={isCorrect ? 'hsl(142 76% 45% / 0.2)' : 'hsl(0 84% 60% / 0.2)'}
                    stroke={isCorrect ? 'var(--color-success)' : 'var(--color-error)'}
                    strokeWidth="3"
                    strokeDasharray="6 4"
                  />
                  {/* Center pin */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r="6"
                    fill={isCorrect ? 'var(--color-success)' : 'var(--color-error)'}
                    stroke="white"
                    strokeWidth="2"
                  />
                </g>
              );
            })}
        </svg>

        {/* Target Region Floating Badges (HTML layer for rich typography) */}
        {showAnswers &&
          slide.targetRegions?.map((region) => {
            const hits = regionHits[region.id] ?? 0;
            const percent = totalTaps > 0 ? Math.round((hits / totalTaps) * 100) : 0;
            const isCorrect = region.isCorrect !== false;

            return (
              <motion.div
                key={`badge_${region.id}`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{
                  position: 'absolute',
                  left: `${region.x * 100}%`,
                  top: `${Math.max(8, region.y * 100 - 10)}%`,
                  transform: 'translate(-50%, -100%)',
                  background: isCorrect ? 'hsl(142 76% 25% / 0.95)' : 'hsl(0 84% 30% / 0.95)',
                  backdropFilter: 'blur(8px)',
                  color: 'white',
                  padding: 'var(--space-2) var(--space-3)',
                  borderRadius: 'var(--radius-lg)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 'var(--weight-semibold)',
                  boxShadow: 'var(--shadow-lg)',
                  border: isCorrect
                    ? '1px solid hsl(142 76% 45%)'
                    : '1px solid hsl(0 84% 60%)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  pointerEvents: 'none',
                  whiteSpace: 'nowrap',
                  zIndex: 20,
                }}
              >
                {isCorrect ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                <span>{region.label ?? 'Target'}</span>
                <span
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    padding: '1px 6px',
                    borderRadius: 'var(--radius-full)',
                  }}
                >
                  {hits} hits ({percent}%)
                </span>
              </motion.div>
            );
          })}

        {/* Empty state prompt if 0 taps yet */}
        {totalTaps === 0 && (
          <div
            style={{
              position: 'absolute',
              bottom: 'var(--space-6)',
              padding: 'var(--space-2) var(--space-4)',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(0, 0, 0, 0.65)',
              backdropFilter: 'blur(6px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: 'var(--color-text-secondary)',
              fontSize: 'var(--text-xs)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
            }}
          >
            <Info size={14} />
            <span>Waiting for audience taps — heatmap will render dynamically in real-time</span>
          </div>
        )}
      </div>

      {/* Explanation Banner (shown when answers revealed) */}
      {showAnswers && slide.explanation && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: 'var(--color-bg-elevated)',
            border: '1px solid var(--color-border-subtle)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-4)',
            fontSize: 'var(--text-sm)',
            color: 'var(--color-text-secondary)',
            display: 'flex',
            gap: 'var(--space-3)',
            alignItems: 'flex-start',
          }}
        >
          <Info size={18} style={{ color: 'var(--color-brand-primary)', flexShrink: 0, marginTop: '2px' }} />
          <div>
            <strong style={{ color: 'var(--color-text-primary)' }}>Explanation: </strong>
            {slide.explanation}
          </div>
        </motion.div>
      )}
    </div>
  );
}
