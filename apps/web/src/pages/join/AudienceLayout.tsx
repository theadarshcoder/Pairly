import React, { type ReactNode } from 'react';
import { ConnectionStatusBar } from '@widgets/ConnectionStatusBar.js';
import { useConnectionStore } from '@entities/connection/model/useConnectionStore.js';
import { useParticipantStore } from '@entities/participant/model/useParticipantStore.js';
import { Sparkles } from 'lucide-react';

interface AudienceLayoutProps {
  children: ReactNode;
}

export function AudienceLayout({ children }: AudienceLayoutProps) {
  const { roomCode } = useConnectionStore();
  const { nickname } = useParticipantStore();

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--color-bg-base)',
        color: 'var(--color-text-primary)',
        fontFamily: 'var(--font-sans)',
      }}
    >
      {/* Top Mobile App Header */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 'var(--space-3) var(--space-4)',
          borderBottom: '1px solid var(--color-border-subtle)',
          backgroundColor: 'hsla(220, 20%, 6%, 0.8)',
          backdropFilter: 'blur(10px)',
          position: 'sticky',
          top: 0,
          zIndex: 40,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <div
            style={{
              width: '1.75rem',
              height: '1.75rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-brand-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
            }}
          >
            <Sparkles size={14} />
          </div>
          <span
            style={{
              fontWeight: 'var(--weight-bold)',
              fontSize: 'var(--text-base)',
              letterSpacing: '-0.02em',
              background: 'linear-gradient(135deg, var(--color-text-primary), var(--color-brand-accent))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Pairly
          </span>
        </div>

        {roomCode && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                fontWeight: 'var(--weight-bold)',
                padding: '2px var(--space-2)',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-bg-elevated)',
                border: '1px solid var(--color-border-default)',
                color: 'var(--color-brand-accent)',
              }}
            >
              #{roomCode}
            </span>
            {nickname && (
              <span
                style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-text-secondary)',
                  maxWidth: '100px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {nickname}
              </span>
            )}
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'var(--space-4)',
          position: 'relative',
        }}
      >
        {children}
      </main>

      {/* Persistent Connection Status Footer */}
      <ConnectionStatusBar />
    </div>
  );
}
