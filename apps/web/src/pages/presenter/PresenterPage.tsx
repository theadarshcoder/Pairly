import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PresenterLayout } from './PresenterLayout.js';
import { SlideRenderer } from '@widgets/SlideRenderer.js';
import { useSessionStore } from '@entities/session/model/useSessionStore.js';
import { useParticipantStore } from '@entities/participant/model/useParticipantStore.js';
import { useConnectionStore } from '@entities/connection/model/useConnectionStore.js';
import { socket } from '@shared/api/socket.js';
import { fadeInUp } from '@shared/lib/animations.js';
import { Loader2, ChevronLeft, ChevronRight, Play, Pause, Square } from 'lucide-react';

/**
 * PresenterPage — Entry point for the presenter route (/presenter?room=XXXX).
 *
 * This component is loaded via React.lazy() in router.tsx.
 * All D3-dependent feature components inside SlideRenderer are also lazy-loaded,
 * ensuring they never reach the audience's JavaScript bundle.
 */
export default function PresenterPage() {
  const [searchParams] = useSearchParams();
  const roomCode = searchParams.get('room');
  const { session, participantCount } = useSessionStore();
  const { status: connectionStatus } = useConnectionStore();

  useEffect(() => {
    if (!roomCode) return;
    if (socket.connected) return;

    socket.auth = { role: 'host', token: localStorage.getItem('pairly_host_token') ?? '', roomCode };
    socket.connect();

    socket.emit('room:join', {
      roomCode,
      role: 'host',
      nickname: 'Host',
    });
  }, [roomCode]);

  function handleAdvance(direction: 'next' | 'prev') {
    if (!roomCode) return;
    socket.emit('slide:advance', { roomCode, direction });
  }

  function handleSessionControl(action: 'start' | 'pause' | 'resume' | 'end') {
    if (!roomCode) return;
    socket.emit('session:control', { roomCode, action });
  }

  if (!roomCode) {
    return (
      <PresenterLayout>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <p style={{ color: 'var(--color-text-secondary)' }}>No room code specified.</p>
          <p style={{ color: 'var(--color-text-tertiary)', fontSize: 'var(--text-sm)' }}>
            Use <code style={{ fontFamily: 'var(--font-mono)' }}>/presenter?room=ROOM-CODE</code>
          </p>
        </div>
      </PresenterLayout>
    );
  }

  if (connectionStatus === 'connecting' || connectionStatus === 'idle') {
    return (
      <PresenterLayout>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-3)' }}>
          <Loader2 size={20} style={{ animation: 'spin 1s linear infinite', color: 'var(--color-brand-primary)' }} />
          <span style={{ color: 'var(--color-text-secondary)' }}>Connecting to room {roomCode}…</span>
        </div>
      </PresenterLayout>
    );
  }

  const currentSlide = session?.currentSlide;

  return (
    <PresenterLayout>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--color-border-subtle)' }}>
        <div>
          <h1 style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--weight-semibold)' }}>
            {session?.title ?? 'Loading…'}
          </h1>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-tertiary)' }}>
            Slide {(session?.currentSlideIndex ?? 0) + 1} of {session?.totalSlides ?? '—'}
          </p>
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          {session?.status === 'idle' && (
            <button onClick={() => handleSessionControl('start')}
              style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', padding: 'var(--space-2) var(--space-4)', background: 'var(--color-brand-primary)', color: 'white', borderRadius: 'var(--radius-lg)', fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-medium)' }}>
              <Play size={14} /> Start Session
            </button>
          )}
          {session?.status === 'active' && (
            <>
              <button onClick={() => handleSessionControl('pause')}
                style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', padding: 'var(--space-2) var(--space-4)', background: 'var(--color-bg-overlay)', color: 'var(--color-text-primary)', borderRadius: 'var(--radius-lg)', fontSize: 'var(--text-sm)' }}>
                <Pause size={14} /> Pause
              </button>
              <button onClick={() => handleSessionControl('end')}
                style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', padding: 'var(--space-2) var(--space-4)', background: 'hsl(0 84% 30%)', color: 'white', borderRadius: 'var(--radius-lg)', fontSize: 'var(--text-sm)' }}>
                <Square size={14} /> End
              </button>
            </>
          )}
        </div>
      </div>

      {/* Slide area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {currentSlide ? (
          <SlideRenderer slide={currentSlide} slideIndex={session?.currentSlideIndex ?? 0} />
        ) : (
          <motion.div variants={fadeInUp} initial="hidden" animate="visible"
            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <p style={{ color: 'var(--color-text-tertiary)', fontSize: 'var(--text-sm)' }}>
              Session is {session?.status ?? 'loading'}. Start the session to begin.
            </p>
          </motion.div>
        )}
      </div>

      {/* Navigation bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-4)', padding: 'var(--space-4)', borderTop: '1px solid var(--color-border-subtle)' }}>
        <button onClick={() => handleAdvance('prev')}
          style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)', padding: 'var(--space-2) var(--space-4)', background: 'var(--color-bg-elevated)', color: 'var(--color-text-secondary)', borderRadius: 'var(--radius-lg)', fontSize: 'var(--text-sm)', border: '1px solid var(--color-border-subtle)' }}>
          <ChevronLeft size={16} /> Prev
        </button>
        <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-tertiary)' }}>
          {(session?.currentSlideIndex ?? 0) + 1} / {session?.totalSlides ?? '—'}
        </span>
        <button onClick={() => handleAdvance('next')}
          style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)', padding: 'var(--space-2) var(--space-4)', background: 'var(--color-bg-elevated)', color: 'var(--color-text-secondary)', borderRadius: 'var(--radius-lg)', fontSize: 'var(--text-sm)', border: '1px solid var(--color-border-subtle)' }}>
          Next <ChevronRight size={16} />
        </button>
      </div>
    </PresenterLayout>
  );
}
