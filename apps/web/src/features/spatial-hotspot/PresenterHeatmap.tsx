import type { SpatialHotspotSlide } from '@pairly/schemas';

// ─── Presenter Component (D3 heatmap — heavy, stays in presenter chunk) ──────
interface Props { slide: SpatialHotspotSlide }

export function PresenterHeatmap({ slide }: Props) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', padding: 'var(--space-6)' }}>
      <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--weight-semibold)' }}>{slide.title}</h2>
      <p style={{ color: 'var(--color-text-secondary)' }}>{slide.prompt}</p>
      <div style={{ flex: 1, background: 'var(--color-bg-elevated)', borderRadius: 'var(--radius-xl)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--color-border-subtle)' }}>
        <span style={{ color: 'var(--color-text-tertiary)', fontSize: 'var(--text-sm)' }}>
          D3 Heatmap Canvas — renders when participants tap
        </span>
      </div>
    </div>
  );
}
