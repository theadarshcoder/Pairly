import type { SpatialHotspotSlide } from '@pairly/schemas';
import { socket } from '@shared/api/socket.js';
import { useParticipantStore } from '@entities/participant/model/useParticipantStore.js';

interface Props { slide: SpatialHotspotSlide }

export function AudienceTapTarget({ slide }: Props) {
  const participantId = useParticipantStore((s) => s.participantId);

  function handleTap(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    socket.emit('hotspot:tap', { slideId: slide.id, x, y, timestamp: Date.now() });
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', padding: 'var(--space-6)' }}>
      <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--weight-semibold)', textAlign: 'center' }}>{slide.title}</h2>
      <p style={{ color: 'var(--color-text-secondary)', textAlign: 'center', fontSize: 'var(--text-sm)' }}>{slide.prompt}</p>
      <div
        onClick={handleTap}
        style={{
          flex: 1,
          background: 'var(--color-bg-elevated)',
          borderRadius: 'var(--radius-xl)',
          cursor: 'crosshair',
          position: 'relative',
          border: '2px dashed var(--color-border-default)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          userSelect: 'none',
        }}
      >
        <span style={{ color: 'var(--color-text-tertiary)', fontSize: 'var(--text-sm)', pointerEvents: 'none' }}>
          Tap anywhere on the image
        </span>
      </div>
    </div>
  );
}
