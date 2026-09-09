import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn, Sparkles, AlertCircle } from 'lucide-react';
import { Button } from '@shared/ui/index.js';
import { socket } from '@shared/api/socket.js';
import { useConnectionStore } from '@entities/connection/model/useConnectionStore.js';
import { useParticipantStore } from '@entities/participant/model/useParticipantStore.js';

interface AudienceJoinFormProps {
  initialRoomCode?: string;
  onJoined?: (roomCode: string, nickname: string) => void;
}

export function AudienceJoinForm({ initialRoomCode = '', onJoined }: AudienceJoinFormProps) {
  const [roomCode, setRoomCode] = useState(initialRoomCode);
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { setRoomCode: setStoreRoomCode } = useConnectionStore();
  const { setParticipant } = useParticipantStore();

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase().replace(/[^A-Z0-9-]/g, '').slice(0, 8);
    setRoomCode(val);
    if (error) setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = roomCode.trim().toUpperCase();
    const cleanNick = nickname.trim();

    if (!cleanCode) {
      setError('Please enter a room code');
      return;
    }
    if (!cleanNick) {
      setError('Please enter a nickname');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    if (!socket.connected) {
      socket.auth = { role: 'participant', roomCode: cleanCode };
      socket.connect();
    }

    socket.emit('room:join', {
      roomCode: cleanCode,
      role: 'participant',
      nickname: cleanNick,
    });

    // Optimistically update local participant state
    setStoreRoomCode(cleanCode);
    setParticipant({
      participantId: socket.id ?? `temp-${Date.now()}`,
      role: 'participant',
      nickname: cleanNick,
    });

    setIsSubmitting(false);
    onJoined?.(cleanCode, cleanNick);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        width: '100%',
        maxWidth: '420px',
        backgroundColor: 'var(--color-bg-surface)',
        borderRadius: 'var(--radius-2xl)',
        border: '1px solid var(--color-border-default)',
        padding: 'var(--space-8) var(--space-6)',
        boxShadow: 'var(--shadow-lg)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative top accent glow */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '15%',
          right: '15%',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, var(--color-brand-primary), var(--color-brand-accent), transparent)',
        }}
      />

      <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '3.5rem',
            height: '3.5rem',
            borderRadius: 'var(--radius-xl)',
            backgroundColor: 'hsl(250 84% 60% / 0.12)',
            color: 'var(--color-brand-primary)',
            marginBottom: 'var(--space-4)',
          }}
        >
          <Sparkles size={28} />
        </div>
        <h2
          style={{
            fontSize: 'var(--text-2xl)',
            fontWeight: 'var(--weight-bold)',
            color: 'var(--color-text-primary)',
            letterSpacing: '-0.02em',
          }}
        >
          Join Session
        </h2>
        <p
          style={{
            fontSize: 'var(--text-sm)',
            color: 'var(--color-text-secondary)',
            marginTop: 'var(--space-1)',
          }}
        >
          Enter the code displayed on the presenter screen
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {error && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              padding: 'var(--space-3)',
              backgroundColor: 'hsl(0 84% 60% / 0.12)',
              border: '1px solid var(--color-error)',
              borderRadius: 'var(--radius-lg)',
              color: 'var(--color-error)',
              fontSize: 'var(--text-sm)',
            }}
          >
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <div>
          <label
            htmlFor="roomCode"
            style={{
              display: 'block',
              fontSize: 'var(--text-xs)',
              fontWeight: 'var(--weight-semibold)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'var(--color-text-secondary)',
              marginBottom: 'var(--space-1)',
            }}
          >
            Room Code
          </label>
          <input
            id="roomCode"
            type="text"
            placeholder="e.g. A3F8"
            value={roomCode}
            onChange={handleCodeChange}
            autoComplete="off"
            autoCapitalize="characters"
            style={{
              width: '100%',
              padding: 'var(--space-3) var(--space-4)',
              fontSize: 'var(--text-xl)',
              fontWeight: 'var(--weight-bold)',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.15em',
              textAlign: 'center',
              backgroundColor: 'var(--color-bg-elevated)',
              border: '1px solid var(--color-border-default)',
              borderRadius: 'var(--radius-lg)',
              color: 'var(--color-text-primary)',
              transition: 'border-color var(--transition-fast)',
            }}
          />
        </div>

        <div>
          <label
            htmlFor="nickname"
            style={{
              display: 'block',
              fontSize: 'var(--text-xs)',
              fontWeight: 'var(--weight-semibold)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'var(--color-text-secondary)',
              marginBottom: 'var(--space-1)',
            }}
          >
            Your Nickname
          </label>
          <input
            id="nickname"
            type="text"
            placeholder="Enter your name"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            maxLength={25}
            style={{
              width: '100%',
              padding: 'var(--space-3) var(--space-4)',
              fontSize: 'var(--text-base)',
              backgroundColor: 'var(--color-bg-elevated)',
              border: '1px solid var(--color-border-default)',
              borderRadius: 'var(--radius-lg)',
              color: 'var(--color-text-primary)',
              transition: 'border-color var(--transition-fast)',
            }}
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isSubmitting}
          leftIcon={<LogIn size={20} />}
          style={{ width: '100%', marginTop: 'var(--space-2)' }}
        >
          Join Session
        </Button>
      </form>
    </motion.div>
  );
}
