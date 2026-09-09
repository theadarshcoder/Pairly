import type { QnaDedupSlide } from '@pairly/schemas';
interface Props { slide: QnaDedupSlide }
export function PresenterQuestionFeed({ slide }: Props) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', padding: 'var(--space-6)' }}>
      <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--weight-semibold)' }}>{slide.title}</h2>
      <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>{slide.prompt}</p>
      <div style={{ flex: 1, background: 'var(--color-bg-elevated)', borderRadius: 'var(--radius-xl)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--color-border-subtle)' }}>
        <span style={{ color: 'var(--color-text-tertiary)', fontSize: 'var(--text-sm)' }}>Live deduplicated question feed — clustered by AI embeddings</span>
      </div>
    </div>
  );
}
