import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AudienceLayout } from './AudienceLayout.js';
import { AudienceJoinForm } from '@features/room-join/index.js';
import { SlideRenderer } from '@widgets/SlideRenderer.js';
import { useSessionStore } from '@entities/session/model/useSessionStore.js';
import { useParticipantStore } from '@entities/participant/model/useParticipantStore.js';
import { useConnectionStore } from '@entities/connection/model/useConnectionStore.js';
import { fadeInUp } from '@shared/lib/animations.js';
import { Coffee, CheckCircle, Clock } from 'lucide-react';

export default function JoinPage() {
  const [searchParams] = useSearchParams();
  const urlRoomCode = searchParams.get('room') ?? '';

  const { session } = useSessionStore();
  const { participantId, nickname } = useParticipantStore();
  const { status: connectionStatus, roomCode: connectedRoomCode } = useConnectionStore();

  const isJoined = Boolean(connectedRoomCode && participantId);

  // If not joined, show the join form
  if (!isJoined) {
    return (
      <AudienceLayout>
        <AudienceJoinForm initialRoomCode={urlRoomCode} />
      </AudienceLayout>
    );
  }

  // Session has ended
  if (session?.status === 'ended') {
    return (
      <AudienceLayout>
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          style={{
            textAlign: 'center',
            maxWidth: '360px',
            padding: 'var(--space-8) var(--space-4)',
          }}
        >
          <div
            style={{
              width: '4rem',
              height: '4rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'hsl(142 76% 45% / 0.15)',
              color: 'var(--color-success)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto var(--space-4)',
            }}
          >
            <CheckCircle size={32} />
          </div>
          <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--weight-bold)' }}>
            Session Finished
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
            Thanks for participating, {nickname}! Your responses have been recorded.
          </p>
        </motion.div>
      </AudienceLayout>
    );
  }

  // Session is paused
  if (session?.status === 'paused') {
    return (
      <AudienceLayout>
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          style={{
            textAlign: 'center',
            maxWidth: '360px',
            padding: 'var(--space-8) var(--space-4)',
          }}
        >
          <div
            style={{
              width: '4rem',
              height: '4rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'hsl(38 100% 50% / 0.15)',
              color: 'var(--color-warning)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto var(--space-4)',
            }}
          >
            <Clock size={32} />
          </div>
          <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--weight-bold)' }}>
            Session Paused
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
            The presenter has paused the session. Look up at the main screen!
          </p>
        </motion.div>
      </AudienceLayout>
    );
  }

  // Current slide interactive view
  const currentSlide = session?.currentSlide;

  if (session?.status === 'active' && currentSlide) {
    return (
      <AudienceLayout>
        <div style={{ width: '100%', maxWidth: '500px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <SlideRenderer slide={currentSlide} slideIndex={session.currentSlideIndex} />
        </div>
      </AudienceLayout>
    );
  }

  // Waiting room (session waiting to start or waiting for presenter)
  return (
    <AudienceLayout>
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        style={{
          textAlign: 'center',
          maxWidth: '360px',
          padding: 'var(--space-8) var(--space-4)',
        }}
      >
        <div
          style={{
            width: '4rem',
            height: '4rem',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'hsl(250 84% 60% / 0.15)',
            color: 'var(--color-brand-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto var(--space-4)',
          }}
        >
          <Coffee size={32} />
        </div>
        <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--weight-bold)' }}>
          You're In, {nickname}!
        </h2>
        <p style={{ color: 'var(--color-text-secondary)', marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
          Sit tight — the presenter will begin shortly. Questions and activities will appear right here on your phone.
        </p>
      </motion.div>
    </AudienceLayout>
  );
}
