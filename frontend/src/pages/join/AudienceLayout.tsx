import type { ReactNode } from 'react';
import { useConnectionStore } from '@entities/connection/model/useConnectionStore.js';

interface AudienceLayoutProps {
  children: ReactNode;
}

export function AudienceLayout({ children }: AudienceLayoutProps) {
  const { roomCode, status: connectionStatus } = useConnectionStore();

  return (
    <div
      style={{
        background: 'var(--bg)',
        color: 'var(--fg)',
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Amber hairline indicator when offline or reconnecting */}
      {connectionStatus !== 'connected' && connectionStatus !== 'in-room' && (
        <div
          role="status"
          aria-label="Reconnecting"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: 'var(--warn, #FFB020)',
            zIndex: 50,
          }}
        />
      )}

      <header
        style={{
          height: 56,
          display: 'flex',
          alignItems: 'center',
          padding: '0 var(--sp-5, 20px)',
          gap: 'var(--sp-4, 16px)',
          borderBottom: '1px solid var(--hairline)',
        }}
      >
        <span style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 500 }}>Pairly</span>
        {roomCode && (
          <span
            style={{
              marginLeft: 'auto',
              fontFamily: 'var(--font-mono)',
              color: 'var(--accent)',
              letterSpacing: '0.15em',
              fontSize: 14,
            }}
          >
            #{roomCode}
          </span>
        )}
      </header>

      <main
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: 'var(--sp-6, 24px)',
          paddingBottom: '40vh',
        }}
      >
        {children}
      </main>
    </div>
  );
}
