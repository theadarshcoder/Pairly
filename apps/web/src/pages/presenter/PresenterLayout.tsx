import type { ReactNode } from 'react';
import { ConnectionStatusBar } from '@widgets/ConnectionStatusBar.js';

interface PresenterLayoutProps {
  children: ReactNode;
}

export function PresenterLayout({ children }: PresenterLayoutProps) {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--color-bg-base)',
        color: 'var(--color-text-primary)',
      }}
    >
      <ConnectionStatusBar />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>{children}</main>
    </div>
  );
}
