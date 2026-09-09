import React from 'react';
import { PresenterActionBar } from '@features/session-control/index.js';
import { ParticipantCounter } from './ParticipantCounter.js';

interface PresenterControlsProps {
  roomCode: string;
}

export function PresenterControls({ roomCode }: PresenterControlsProps) {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 'var(--space-6)',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-3)',
      }}
    >
      <PresenterActionBar roomCode={roomCode} />
      <ParticipantCounter />
    </div>
  );
}
