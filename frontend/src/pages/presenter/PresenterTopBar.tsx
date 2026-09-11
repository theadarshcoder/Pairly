import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useConnectionStore } from '@entities/connection/model/useConnectionStore.js';
import { useSessionStore } from '@entities/session/model/useSessionStore.js';
import { useThrottled } from '@shared/lib/useThrottled.js';
import { ConnectionDot } from '@shared/ui/ConnectionDot.js';

interface PresenterTopBarProps {
  slideLabel?: string;
  room?: string;
  participantCount?: number;
  timer?: string;
  connectionStatus?: string;
  onEnterPresentMode?: () => void;
  // Legacy optional props for backward compatibility
  slideCounter?: string;
  timerDisplay?: string;
}

export function PresenterTopBar({
  slideLabel = 'Slide 1',
  room,
  participantCount: propParticipantCount,
  timer: propTimer,
  connectionStatus: propConnectionStatus,
  onEnterPresentMode,
  slideCounter,
  timerDisplay,
}: PresenterTopBarProps) {
  const storeStatus = useConnectionStore((s) => s.status);
  const storeRoom = useConnectionStore((s) => s.roomCode);
  const rawParticipantCount = useSessionStore((s) => s.participantCount);
  const throttledCount = useThrottled(rawParticipantCount, 1000);

  const status = propConnectionStatus ?? storeStatus;
  const roomCode = room ?? storeRoom ?? 'DEMO';
  const participantCount = propParticipantCount ?? throttledCount;
  const timer = propTimer ?? timerDisplay ?? '00:00';

  const [showReconnectBanner, setShowReconnectBanner] = useState(false);
  const [wasDisconnected, setWasDisconnected] = useState(false);

  useEffect(() => {
    if (status === 'connecting' || status === 'disconnected' || status === 'error') {
      setShowReconnectBanner(true);
      setWasDisconnected(true);
      return;
    }
    if (wasDisconnected && (status === 'connected' || status === 'in-room')) {
      const t = setTimeout(() => {
        setShowReconnectBanner(false);
        setWasDisconnected(false);
      }, 800);
      return () => clearTimeout(t);
    }
    return;
  }, [status, wasDisconnected]);

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 56,
          background: 'var(--surface-1)',
          borderBottom: '1px solid var(--hairline)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 var(--sp-5, 20px)',
          gap: 'var(--sp-5, 20px)',
          zIndex: 'var(--z-dock, 50)' as any,
        }}
      >
        <span style={{ fontFamily: 'var(--font-sans)', color: 'var(--fg-muted)', fontSize: 14 }}>
          {slideLabel}
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--fg)', letterSpacing: '0.2em', fontSize: 14 }}>
          {roomCode}
        </span>
        {slideCounter && (
          <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--fg-muted)', fontSize: 13 }}>
            {slideCounter}
          </span>
        )}

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 'var(--sp-5, 20px)' }}>
          <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--fg)', fontSize: 15 }}>
            {participantCount}
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--fg-muted)', fontSize: 15 }}>
            {timer}
          </span>
          <ConnectionDot status={status as any} size={8} />
        </div>
      </header>

      {/* Reconnect Banner */}
      <AnimatePresence>
        {showReconnectBanner && status !== 'in-room' && status !== 'connected' && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              top: 56,
              left: 0,
              right: 0,
              overflow: 'hidden',
              zIndex: 49,
            }}
          >
            <div
              style={{
                padding: '6px var(--sp-6, 24px)',
                background: 'rgb(255 176 32 / 0.08)',
                borderBottom: '1px solid rgb(255 176 32 / 0.2)',
                color: 'var(--warn, #FFB020)',
                fontSize: '12px',
                fontWeight: 500,
                textAlign: 'center',
              }}
            >
              {status === 'disconnected' || status === 'error'
                ? 'Disconnected — attempting to reconnect…'
                : 'Reconnecting…'}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
