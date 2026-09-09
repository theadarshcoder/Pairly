import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, WifiOff, Loader2, Users } from 'lucide-react';
import { useConnectionStore } from '@entities/connection/model/useConnectionStore.js';
import { useSessionStore } from '@entities/session/model/useSessionStore.js';

const statusConfig = {
  idle: { icon: WifiOff, label: 'Not connected', color: 'var(--color-text-tertiary)' },
  connecting: { icon: Loader2, label: 'Connecting…', color: 'var(--color-warning)' },
  connected: { icon: Wifi, label: 'Connected', color: 'var(--color-success)' },
  'in-room': { icon: Wifi, label: 'Live', color: 'var(--color-success)' },
  disconnected: { icon: WifiOff, label: 'Disconnected', color: 'var(--color-error)' },
  error: { icon: WifiOff, label: 'Connection error', color: 'var(--color-error)' },
} as const;

export function ConnectionStatusBar() {
  const { status, latencyMs, roomCode } = useConnectionStore();
  const { participantCount } = useSessionStore();
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-3)',
        padding: 'var(--space-2) var(--space-4)',
        background: 'var(--color-bg-surface)',
        borderBottom: '1px solid var(--color-border-subtle)',
        fontSize: 'var(--text-xs)',
        color: 'var(--color-text-secondary)',
      }}
    >
      <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)', color: config.color }}>
        <Icon size={12} style={status === 'connecting' ? { animation: 'spin 1s linear infinite' } : undefined} />
        {config.label}
      </span>

      {roomCode && (
        <>
          <span style={{ color: 'var(--color-border-strong)' }}>·</span>
          <span>Room <strong style={{ color: 'var(--color-text-primary)' }}>{roomCode}</strong></span>
        </>
      )}

      {status === 'in-room' && (
        <>
          <span style={{ color: 'var(--color-border-strong)' }}>·</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)' }}>
            <Users size={11} />
            <AnimatePresence mode="wait">
              <motion.span
                key={participantCount}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                style={{ fontWeight: 'var(--weight-semibold)', color: 'var(--color-text-primary)' }}
              >
                {participantCount}
              </motion.span>
            </AnimatePresence>
          </span>
        </>
      )}

      {latencyMs !== null && (
        <span style={{ marginLeft: 'auto', color: latencyMs > 200 ? 'var(--color-warning)' : 'var(--color-text-tertiary)' }}>
          {latencyMs}ms
        </span>
      )}
    </div>
  );
}
