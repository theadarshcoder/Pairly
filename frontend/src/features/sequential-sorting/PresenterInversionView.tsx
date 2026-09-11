import type { SequentialSortingSlide } from '@pairly/schemas';
interface Props { slide: SequentialSortingSlide }
export function PresenterInversionView({ slide }: Props) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', padding: 'var(--space-6)' }}>
      <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--weight-semibold)' }}>{slide.title}</h2>
      <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>{slide.prompt}</p>
      <div style={{ flex: 1, background: 'var(--color-bg-elevated)', borderRadius: 'var(--radius-xl)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--color-border-subtle)' }}>
        <span style={{ color: 'var(--color-text-tertiary)', fontSize: 'var(--text-sm)' }}>Kendall-tau Inversion Distribution — bar chart of swap confusion</span>
      </div>
    </div>
  );
}
