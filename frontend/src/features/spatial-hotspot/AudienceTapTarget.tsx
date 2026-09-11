import React, { useState } from 'react';
import type { SpatialHotspotSlide } from '@pairly/schemas';
import { socket } from '@shared/api/socket.js';
import { enqueue } from '@shared/lib/offlineQueue.js';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, CheckCircle2, Sparkles } from 'lucide-react';

interface Props {
  slide: SpatialHotspotSlide;
}

interface LocalTap {
  id: string;
  x: number; // 0..1
  y: number; // 0..1
}

export function AudienceTapTarget({ slide }: Props) {
  const maxTaps = slide.maxTapsPerParticipant ?? 5;
  const [taps, setTaps] = useState<LocalTap[]>([]);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const tapsRemaining = Math.max(0, maxTaps - taps.length);
  const canTap = tapsRemaining > 0;

  function handleTap(e: React.MouseEvent<HTMLDivElement>) {
    if (!canTap) return;

    const rect = e.currentTarget.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    // Normalize coordinates strictly to [0, 1]
    const rawX = (e.clientX - rect.left) / rect.width;
    const rawY = (e.clientY - rect.top) / rect.height;
    const x = Math.max(0, Math.min(1, rawX));
    const y = Math.max(0, Math.min(1, rawY));

    // Emit over socket or queue if offline (Step 4 / Issue 15)
    const tapPayload = {
      slideId: slide.id,
      x: Number(x.toFixed(4)),
      y: Number(y.toFixed(4)),
      timestamp: Date.now(),
    };
    if (socket.connected) {
      socket.emit('hotspot:tap', tapPayload);
    } else {
      enqueue('hotspot:tap', tapPayload);
    }

    // Immediate haptic feedback
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(35);
    }

    // Add local visual feedback ripple
    const tapId = `${Date.now()}_${Math.random()}`;
    setTaps((prev) => [...prev, { id: tapId, x, y }]);
  }

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-4)',
        padding: 'var(--space-4)',
        maxWidth: '540px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      {/* Header & Prompt */}
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--space-1)',
            padding: '2px 10px',
            borderRadius: 'var(--radius-full)',
            background: 'hsl(250 84% 60% / 0.12)',
            color: 'var(--color-brand-primary)',
            fontSize: 'var(--text-xs)',
            fontWeight: 'var(--weight-semibold)',
            marginBottom: 'var(--space-2)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          <Sparkles size={12} />
          Spatial Hotspot
        </div>
        <h2
          style={{
            fontSize: 'var(--text-lg)',
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

      {/* Tap quota badge */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 'var(--text-xs)',
          color: 'var(--color-text-tertiary)',
          padding: '0 var(--space-1)',
        }}
      >
        <span>
          {canTap ? 'Tap on the image below to submit your answer' : 'All taps submitted!'}
        </span>
        <span
          style={{
            fontWeight: 'var(--weight-semibold)',
            color: canTap ? 'var(--color-brand-primary)' : 'var(--color-success)',
          }}
        >
          {canTap ? `${tapsRemaining} tap${tapsRemaining > 1 ? 's' : ''} left` : 'Completed ✓'}
        </span>
      </div>

      {/* Interactive image area */}
      <div
        id="audience-hotspot-container"
        onClick={handleTap}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: slide.aspectRatio ? `${slide.aspectRatio}` : '16/10',
          maxHeight: '52vh',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          cursor: canTap ? 'crosshair' : 'default',
          border: canTap
            ? '2px solid var(--color-brand-primary)'
            : '2px solid var(--color-border-subtle)',
          boxShadow: 'var(--shadow-md)',
          background: 'var(--color-bg-elevated)',
          touchAction: 'manipulation',
          userSelect: 'none',
        }}
      >
        {/* Background Image / Schematic */}
        {slide.imageUrl && !imageError ? (
          <img
            src={slide.imageUrl}
            alt={slide.imageAlt ?? slide.title}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              pointerEvents: 'none',
              opacity: imageLoaded ? 1 : 0.4,
              transition: 'opacity 0.3s ease',
            }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--space-2)',
              background: 'linear-gradient(135deg, hsl(230 25% 12%), hsl(250 30% 16%))',
              color: 'var(--color-text-secondary)',
            }}
          >
            <MapPin size={36} style={{ color: 'var(--color-brand-primary)' }} />
            <span style={{ fontSize: 'var(--text-sm)' }}>Interactive Diagram</span>
          </div>
        )}

        {/* Tap ripple markers */}
        <AnimatePresence>
          {taps.map((tap, index) => (
            <React.Fragment key={tap.id}>
              {/* Outer expanding ripple */}
              <motion.div
                initial={{ scale: 0.2, opacity: 0.9 }}
                animate={{ scale: 2.4, opacity: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  left: `${tap.x * 100}%`,
                  top: `${tap.y * 100}%`,
                  width: '36px',
                  height: '36px',
                  marginLeft: '-18px',
                  marginTop: '-18px',
                  borderRadius: '50%',
                  border: '2px solid hsl(250 100% 70%)',
                  background: 'hsl(250 100% 65% / 0.3)',
                  pointerEvents: 'none',
                }}
              />
              {/* Persistent pin point */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                style={{
                  position: 'absolute',
                  left: `${tap.x * 100}%`,
                  top: `${tap.y * 100}%`,
                  width: '18px',
                  height: '18px',
                  marginLeft: '-9px',
                  marginTop: '-9px',
                  borderRadius: '50%',
                  background: 'var(--color-brand-primary)',
                  border: '2px solid white',
                  boxShadow: '0 0 10px hsl(250 100% 60% / 0.8)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '9px',
                  fontWeight: 'bold',
                  pointerEvents: 'none',
                }}
              >
                {index + 1}
              </motion.div>
            </React.Fragment>
          ))}
        </AnimatePresence>
      </div>

      {/* Submission status banner */}
      {taps.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--space-2)',
            padding: 'var(--space-2) var(--space-3)',
            borderRadius: 'var(--radius-lg)',
            background: 'hsl(142 76% 45% / 0.12)',
            color: 'var(--color-success)',
            fontSize: 'var(--text-xs)',
            fontWeight: 'var(--weight-medium)',
          }}
        >
          <CheckCircle2 size={14} />
          <span>
            {taps.length} tap{taps.length > 1 ? 's' : ''} sent in real time to the presenter screen!
          </span>
        </motion.div>
      )}
    </div>
  );
}
