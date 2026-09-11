import React, { useState } from 'react';
import { RewardCheck } from '../../../shared/ui/RewardCheck.js';
import { hapticTap } from '../../../shared/lib/haptic.js';
import { emitSafe } from '../../../shared/api/socketBridge.js';

interface Tap {
  x: number;
  y: number;
}

export function SpatialHotspotAudience({
  slide,
  onSubmit,
}: {
  slide?: any;
  onSubmit?: (tap: { x: number; y: number }) => void;
}) {
  const [taps, setTaps] = useState<Tap[]>([]);
  const maxTaps = slide?.maxTaps ?? 3;
  const isComplete = taps.length >= maxTaps;

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isComplete) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));

    hapticTap();
    const newTaps = [...taps, { x, y }];
    setTaps(newTaps);

    if (onSubmit) {
      onSubmit({ x, y });
    } else {
      emitSafe('hotspot:tap', { slideId: slide?.id, x, y });
    }
  };

  const imageUrl = slide?.imageUrl || 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80';

  return (
    <div
      onClick={handlePointerDown}
      style={{
        position: 'relative',
        width: '100%',
        borderRadius: 'var(--r-stage)',
        overflow: 'hidden',
        border: '1px solid var(--hairline)',
        cursor: isComplete ? 'default' : 'crosshair',
        touchAction: 'none',
      }}
    >
      <img
        src={imageUrl}
        alt=""
        style={{
          width: '100%',
          display: 'block',
          opacity: isComplete ? 0.6 : 1,
          transition: 'opacity var(--dur-base) var(--ease-out)',
        }}
      />
      {taps.map((tap, i) => (
        <span
          key={i}
          style={{
            position: 'absolute',
            left: `${tap.x * 100}%`,
            top: `${tap.y * 100}%`,
            width: 24,
            height: 24,
            marginLeft: -12,
            marginTop: -12,
            borderRadius: '50%',
            border: '2px solid var(--accent)',
            background: 'var(--accent-soft)',
            pointerEvents: 'none',
          }}
        />
      ))}
      {isComplete && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--sp-3, 12px)',
            pointerEvents: 'none',
          }}
        >
          <RewardCheck />
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 20,
              color: 'var(--fg)',
            }}
          >
            Recorded
          </span>
        </div>
      )}
    </div>
  );
}
