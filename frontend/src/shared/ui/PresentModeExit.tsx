/**
 * PresentModeExit — Issue 12: Always-visible exit affordance in present mode.
 *
 * In Present mode (chrome hidden), this is a 32×32 icon button at 20% opacity
 * in the top-right of the stage that becomes 100% on hover.
 *
 * Reason: clickers without keyboards exist; ESC alone is not sufficient.
 * Issue 37 is also covered here.
 */

import { X } from 'lucide-react';

interface PresentModeExitProps {
  onExit: () => void;
}

export function PresentModeExit({ onExit }: PresentModeExitProps) {
  return (
    <button
      onClick={onExit}
      aria-label="Exit present mode"
      title="Exit present mode (ESC)"
      className="present-mode-exit"
      style={{
        position: 'fixed',
        top: 'var(--sp-3, 12px)',
        right: 'var(--sp-3, 12px)',
        width: '32px',
        height: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 'var(--r-pill, 9999px)',
        background: 'var(--surface-2, #1A1A1F)',
        border: '1px solid var(--hairline, rgba(255,255,255,0.07))',
        color: 'var(--fg-muted, #9A9AA4)',
        cursor: 'pointer',
        opacity: 0.2,
        transition: 'opacity 200ms ease',
        zIndex: 'var(--z-overlay, 200)' as any,
      }}
      onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }}
      onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.2'; }}
      onFocus={(e) => { e.currentTarget.style.opacity = '1'; }}
      onBlur={(e) => { e.currentTarget.style.opacity = '0.2'; }}
    >
      <X size={16} />
    </button>
  );
}
