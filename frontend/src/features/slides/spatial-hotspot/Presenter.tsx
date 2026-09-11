import { useRef } from 'react';
import { useLiveCanvas } from '../../../shared/lib/useLiveCanvas.js';
import { paintHeat } from './paint.js';

const DEMO_POINTS = new Float32Array([
  0.48, 0.45, 0.49, 0.46, 0.50, 0.45, 0.51, 0.47, 0.52, 0.44,
  0.50, 0.48, 0.47, 0.46, 0.53, 0.46, 0.35, 0.60, 0.36, 0.62,
  0.34, 0.61, 0.65, 0.38, 0.66, 0.39, 0.64, 0.40, 0.50, 0.46,
]);

export function SpatialHotspotPresenter({ slide }: { slide?: any }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useLiveCanvas({
    canvasRef,
    continuous: false,
    paint: (ctx, liveData) => {
      const w = ctx.canvas.width;
      const h = ctx.canvas.height;
      const pts = (liveData.hotspots && liveData.hotspots.length > 0)
        ? liveData.hotspots
        : DEMO_POINTS;
      paintHeat(ctx, pts, w, h);
    },
  });

  const imageUrl = slide?.imageUrl || 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1920&q=80';

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: 'var(--surface-1)', borderRadius: 'var(--r-stage)' }}>
      <img src={imageUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      <canvas
        ref={canvasRef}
        width={1920}
        height={1080}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      />
    </div>
  );
}
