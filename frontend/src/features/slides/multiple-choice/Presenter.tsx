import { useRef } from 'react';
import { useLiveCanvas } from '../../../shared/lib/useLiveCanvas.js';
import type { MultipleChoiceSlide } from '@pairly/schemas';

const DEFAULT_DEMO_COUNTS: Record<string, number> = {
  'opt-a': 24,
  'opt-b': 168,
  'opt-c': 15,
  'opt-d': 7,
};

export function MultipleChoicePresenter({ slide }: { slide: MultipleChoiceSlide }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useLiveCanvas({
    canvasRef,
    continuous: false,
    paint: (ctx, liveData) => {
      const w = ctx.canvas.width;
      const h = ctx.canvas.height;
      // Read from `liveData.multipleChoiceCounts` or fallback to demo counts
      const counts =
        liveData.multipleChoiceCounts && Object.keys(liveData.multipleChoiceCounts).length > 0
          ? liveData.multipleChoiceCounts
          : DEFAULT_DEMO_COUNTS;
      const total = (Object.values(counts) as number[]).reduce((a, b) => a + b, 0) || 1;

      ctx.clearRect(0, 0, w, h);
      const barW = w / slide.options.length;
      slide.options.forEach((opt, i) => {
        const count = counts[opt.id] ?? 0;
        const pct = count / total;
        const barH = pct * (h - 220);
        ctx.fillStyle = '#7C5CFF';
        ctx.fillRect(i * barW + 50, h - barH - 80, barW - 100, barH);
        ctx.fillStyle = '#F2F2F4';
        ctx.font = '500 24px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(opt.label, i * barW + barW / 2, h - 30);
        ctx.font = '600 28px "JetBrains Mono"';
        ctx.fillText(`${Math.round(pct * 100)}%`, i * barW + barW / 2, h - barH - 100);
      });
    },
  });

  return (
    <div className="slide-multiple-choice" style={{ width: '100%', height: '100%', position: 'relative' }}>
      <canvas
        ref={canvasRef}
        width={1920}
        height={1080}
        className="w-full h-full"
        style={{ width: '100%', height: '100%', display: 'block' }}
      />
    </div>
  );
}
