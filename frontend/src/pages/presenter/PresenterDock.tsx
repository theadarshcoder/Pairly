import { useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PresenterDockProps {
  currentSlideIndex: number;
  totalSlides: number;
  hideResults: boolean;
  onAdvance: (direction: 'next' | 'prev') => void;
  onToggleHideResults: () => void;
  onEndSession: () => void;
  onTogglePresentMode: () => void;
  onSelectSlide?: (index: number) => void;
  thumbnails?: React.ReactNode[];
}

export function PresenterDock({
  currentSlideIndex,
  totalSlides,
  hideResults,
  onAdvance,
  onToggleHideResults,
  onEndSession,
  onTogglePresentMode,
  onSelectSlide,
  thumbnails = [],
}: PresenterDockProps) {
  // Keyboard: Space -> next, ArrowLeft -> prev, ArrowRight -> next
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === ' ' || e.key === 'ArrowRight') {
        e.preventDefault();
        onAdvance('next');
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        onAdvance('prev');
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onAdvance]);

  return (
    <footer
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 88,
        background: 'var(--surface-1)',
        borderTop: '1px solid var(--hairline)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 var(--sp-6, 24px)',
        gap: 'var(--sp-6, 24px)',
        opacity: 0.3,
        transition: 'opacity var(--dur-base, 200ms) var(--ease-out, ease-out)',
        zIndex: 'var(--z-dock, 100)' as any,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.3')}
      onFocusCapture={(e) => (e.currentTarget.style.opacity = '1')}
      onBlurCapture={(e) => (e.currentTarget.style.opacity = '0.3')}
    >
      {/* Left: Hide-results toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3, 12px)' }}>
        <button
          type="button"
          onClick={onToggleHideResults}
          role="switch"
          aria-checked={hideResults}
          style={{
            width: 40,
            height: 22,
            borderRadius: 'var(--r-pill, 9999px)',
            background: hideResults ? 'var(--accent)' : 'var(--surface-3)',
            border: 'none',
            position: 'relative',
            cursor: 'pointer',
            padding: 2,
            transition: 'background 0.2s',
          }}
        >
          <span
            style={{
              display: 'block',
              width: 18,
              height: 18,
              borderRadius: '50%',
              background: 'var(--fg)',
              transform: hideResults ? 'translateX(18px)' : 'translateX(0)',
              transition: 'transform 0.2s',
            }}
          />
        </button>
        <span style={{ color: 'var(--fg-muted)', fontSize: 13, fontFamily: 'var(--font-sans)' }}>
          Hide results
        </span>
      </div>

      {/* Center: Prev arrow, Thumbnails, Next arrow */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-4, 16px)' }}>
        <button
          type="button"
          onClick={() => onAdvance('prev')}
          disabled={currentSlideIndex === 0}
          aria-label="Previous slide"
          style={{
            width: 44,
            height: 44,
            background: 'transparent',
            color: 'var(--fg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 'var(--r-card, 8px)',
            cursor: currentSlideIndex === 0 ? 'not-allowed' : 'pointer',
            opacity: currentSlideIndex === 0 ? 0.3 : 1,
            transition: 'background 0.15s',
          }}
          onMouseEnter={(e) => {
            if (currentSlideIndex > 0) e.currentTarget.style.background = 'var(--surface-2)';
          }}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        >
          <ChevronLeft size={24} />
        </button>

        <div
          style={{
            display: 'flex',
            gap: 'var(--sp-2, 8px)',
            overflowX: 'auto',
            maxWidth: 560,
            padding: '4px 0',
          }}
        >
          {thumbnails.length > 0 ? (
            thumbnails.map((thumb, i) => (
              <div
                key={i}
                style={{
                  width: 96,
                  height: 54,
                  flexShrink: 0,
                  borderRadius: 'var(--r-card)',
                  border: i === currentSlideIndex ? '1px solid var(--accent)' : '1px solid var(--hairline)',
                  background: i === currentSlideIndex ? 'var(--accent-soft)' : 'var(--surface-2)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                }}
              >
                {thumb}
              </div>
            ))
          ) : (
            Array.from({ length: totalSlides }).map((_, i) => (
              <div
                key={i}
                onClick={() => onSelectSlide?.(i)}
                style={{
                  width: 96,
                  height: 54,
                  flexShrink: 0,
                  borderRadius: 'var(--r-card)',
                  border: i === currentSlideIndex ? '1px solid var(--accent)' : '1px solid var(--hairline)',
                  background: i === currentSlideIndex ? 'var(--accent-soft)' : 'var(--surface-2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 12,
                  color: i === currentSlideIndex ? 'var(--fg)' : 'var(--fg-muted)',
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
              >
                Slide {i + 1}
              </div>
            ))
          )}
        </div>

        <button
          type="button"
          onClick={() => onAdvance('next')}
          disabled={currentSlideIndex >= totalSlides - 1}
          aria-label="Next slide"
          style={{
            width: 44,
            height: 44,
            background: 'transparent',
            color: 'var(--fg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 'var(--r-card, 8px)',
            cursor: currentSlideIndex >= totalSlides - 1 ? 'not-allowed' : 'pointer',
            opacity: currentSlideIndex >= totalSlides - 1 ? 0.3 : 1,
            transition: 'background 0.15s',
          }}
          onMouseEnter={(e) => {
            if (currentSlideIndex < totalSlides - 1) e.currentTarget.style.background = 'var(--surface-2)';
          }}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Right: End session, Present mode */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3, 12px)' }}>
        <button
          type="button"
          onClick={onEndSession}
          style={{
            background: 'transparent',
            color: 'var(--bad)',
            border: '1px solid var(--hairline)',
            borderRadius: 'var(--r-pill)',
            padding: '6px 16px',
            fontFamily: 'var(--font-sans)',
            fontSize: 13,
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          End session
        </button>

        <button
          type="button"
          onClick={onTogglePresentMode}
          style={{
            background: 'var(--accent)',
            color: 'var(--fg)',
            border: 'none',
            borderRadius: 'var(--r-pill)',
            padding: '6px 16px',
            fontFamily: 'var(--font-sans)',
            fontSize: 13,
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          Present mode
        </button>
      </div>
    </footer>
  );
}
