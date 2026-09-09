import React from 'react';
import { Play, Pause, Square, ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react';
import { Button } from '@shared/ui/index.js';
import { useSessionStore } from '@entities/session/model/useSessionStore.js';
import { socket } from '@shared/api/socket.js';

interface PresenterActionBarProps {
  roomCode: string;
}

export function PresenterActionBar({ roomCode }: PresenterActionBarProps) {
  const { session } = useSessionStore();
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  const currentSlideIndex = session?.currentSlideIndex ?? 0;
  const totalSlides = session?.totalSlides ?? 1;
  const status = session?.status ?? 'idle';

  const handleAdvance = (direction: 'next' | 'prev') => {
    socket.emit('slide:advance', { roomCode, direction });
  };

  const handleControl = (action: 'start' | 'pause' | 'resume' | 'end') => {
    socket.emit('session:control', { roomCode, action });
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--space-4)',
        padding: 'var(--space-2) var(--space-4)',
        backgroundColor: 'hsla(220, 18%, 10%, 0.85)',
        backdropFilter: 'blur(12px)',
        border: '1px solid var(--color-border-default)',
        borderRadius: 'var(--radius-full)',
        boxShadow: 'var(--shadow-lg)',
      }}
    >
      {/* Session State Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
        {status === 'idle' && (
          <Button
            size="sm"
            variant="primary"
            onClick={() => handleControl('start')}
            leftIcon={<Play size={14} />}
          >
            Start
          </Button>
        )}
        {status === 'active' && (
          <Button
            size="sm"
            variant="secondary"
            onClick={() => handleControl('pause')}
            leftIcon={<Pause size={14} />}
          >
            Pause
          </Button>
        )}
        {status === 'paused' && (
          <Button
            size="sm"
            variant="primary"
            onClick={() => handleControl('resume')}
            leftIcon={<Play size={14} />}
          >
            Resume
          </Button>
        )}
        {status !== 'ended' && status !== 'idle' && (
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleControl('end')}
            leftIcon={<Square size={14} />}
          >
            End
          </Button>
        )}
      </div>

      {/* Slide Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
        <button
          onClick={() => handleAdvance('prev')}
          disabled={currentSlideIndex <= 0}
          style={{
            padding: 'var(--space-1) var(--space-2)',
            borderRadius: 'var(--radius-md)',
            color: currentSlideIndex <= 0 ? 'var(--color-text-tertiary)' : 'var(--color-text-primary)',
            cursor: currentSlideIndex <= 0 ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background var(--transition-fast)',
          }}
          title="Previous slide"
        >
          <ChevronLeft size={20} />
        </button>

        <span
          style={{
            fontSize: 'var(--text-xs)',
            fontWeight: 'var(--weight-semibold)',
            fontFamily: 'var(--font-mono)',
            color: 'var(--color-text-secondary)',
            minWidth: '60px',
            textAlign: 'center',
          }}
        >
          {currentSlideIndex + 1} / {Math.max(totalSlides, 1)}
        </span>

        <button
          onClick={() => handleAdvance('next')}
          disabled={currentSlideIndex >= totalSlides - 1}
          style={{
            padding: 'var(--space-1) var(--space-2)',
            borderRadius: 'var(--radius-md)',
            color: currentSlideIndex >= totalSlides - 1 ? 'var(--color-text-tertiary)' : 'var(--color-text-primary)',
            cursor: currentSlideIndex >= totalSlides - 1 ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background var(--transition-fast)',
          }}
          title="Next slide"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Screen Mode */}
      <button
        onClick={toggleFullscreen}
        style={{
          padding: 'var(--space-1) var(--space-2)',
          borderRadius: 'var(--radius-md)',
          color: 'var(--color-text-secondary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
      >
        {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
      </button>
    </div>
  );
}
