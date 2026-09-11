import React from 'react';
import { Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSessionStore } from '@entities/session/model/useSessionStore.js';

export function ParticipantCounter() {
  const { participantCount } = useSessionStore();

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--space-2)',
        padding: 'var(--space-1) var(--space-3)',
        borderRadius: 'var(--radius-full)',
        backgroundColor: 'var(--color-bg-elevated)',
        border: '1px solid var(--color-border-subtle)',
        fontSize: 'var(--text-xs)',
        fontWeight: 'var(--weight-medium)',
        color: 'var(--color-text-secondary)',
      }}
    >
      <Users size={14} style={{ color: 'var(--color-brand-primary)' }} />
      <motion.span
        key={participantCount}
        initial={{ scale: 1.2, color: 'var(--color-brand-primary)' }}
        animate={{ scale: 1, color: 'var(--color-text-primary)' }}
        transition={{ duration: 0.2 }}
        style={{ fontWeight: 'var(--weight-bold)', fontFamily: 'var(--font-mono)' }}
      >
        {participantCount}
      </motion.span>
      <span>joined</span>
    </div>
  );
}
