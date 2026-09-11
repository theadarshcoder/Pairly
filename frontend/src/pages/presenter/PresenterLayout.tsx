import type { ReactNode } from 'react';
import { StageScaler } from './StageScaler.js';

/**
 * PresenterLayout — Issue 1: renders <StageScaler> and nothing else.
 *
 * The stage scaling logic lives exclusively in StageScaler.tsx.
 * This layout provides the full-height flex container.
 *
 * Issue 2: The PresenterDock is a viewport-fixed element rendered by
 * PresenterPage, NOT a child of the scaled stage or this layout.
 * The dock sits at position: fixed; bottom: 0 with z-index: var(--z-dock).
 */

interface PresenterLayoutProps {
  children: ReactNode;
}

export function PresenterLayout({ children }: PresenterLayoutProps) {
  return (
    <div
      style={{
        // Full viewport minus dock height
        height: 'calc(100vh - var(--dock-height, 72px))',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--bg, var(--color-bg-base))',
        color: 'var(--fg, var(--color-text-primary))',
        overflow: 'hidden',
      }}
    >
      <StageScaler>{children}</StageScaler>
    </div>
  );
}
