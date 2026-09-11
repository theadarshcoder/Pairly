import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AudienceLayout } from './AudienceLayout.js';
import { PinInput } from '@shared/ui/PinInput.js';
import { socket } from '@shared/api/socket.js';
import { SlideRenderer } from '@widgets/SlideRenderer.js';
import { useSessionStore } from '@entities/session/model/useSessionStore.js';
import { useParticipantStore } from '@entities/participant/model/useParticipantStore.js';
import { useConnectionStore } from '@entities/connection/model/useConnectionStore.js';

export default function JoinPage() {
  const { pin: urlRoomCode = '' } = useParams<{ pin: string }>();
  const [pin, setPin] = useState(urlRoomCode);
  const [name, setName] = useState('');
  const [nameInputFocused, setNameInputFocused] = useState(false);

  const { session, participantCount } = useSessionStore();
  const { participantId, setParticipant } = useParticipantStore();
  const { roomCode: connectedRoomCode, setRoomCode: setStoreRoomCode } = useConnectionStore();

  const isJoined = Boolean(connectedRoomCode && participantId);

  useEffect(() => {
    if (urlRoomCode && !pin) {
      setPin(urlRoomCode);
    }
  }, [urlRoomCode]);

  const handleJoinSession = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = pin.trim().toUpperCase();
    const cleanNick = name.trim();
    if (!cleanPin || !cleanNick) return;

    if (!socket.connected) {
      socket.auth = { role: 'participant', roomCode: cleanPin };
      socket.connect();
    }

    socket.emit('room:join', {
      roomCode: cleanPin,
      role: 'participant',
      nickname: cleanNick,
    });

    setStoreRoomCode(cleanPin);
    setParticipant({
      participantId: socket.id ?? `temp-${Date.now()}`,
      role: 'participant',
      nickname: cleanNick,
    });
  };

  // State 1: PIN entry state
  if (!pin) {
    return (
      <AudienceLayout>
        <div style={{ maxWidth: 440, width: '100%', margin: '0 auto', textAlign: 'center' }}>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 40,
              fontWeight: 500,
              color: 'var(--fg)',
              margin: '0 0 8px 0',
              textAlign: 'center',
            }}
          >
            Pairly
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              color: 'var(--fg-muted)',
              fontSize: 15,
              margin: '0 0 40px 0',
              textAlign: 'center',
            }}
          >
            Enter your session code
          </p>
          <PinInput
            onComplete={(enteredPin) => setPin(enteredPin)}
            initialValue={urlRoomCode}
          />
        </div>
      </AudienceLayout>
    );
  }

  // State 2: Name entry state
  if (!isJoined) {
    return (
      <AudienceLayout>
        <form
          onSubmit={handleJoinSession}
          style={{
            maxWidth: 440,
            width: '100%',
            margin: '0 auto',
            background: 'var(--surface-1)',
            borderRadius: 'var(--r-card)',
            padding: 'var(--sp-6)',
            border: '1px solid var(--hairline)',
            boxSizing: 'border-box',
          }}
        >
          <label
            htmlFor="participant-name"
            style={{
              display: 'block',
              fontFamily: 'var(--font-sans)',
              color: 'var(--fg-muted)',
              fontSize: 14,
              marginBottom: 'var(--sp-3, 12px)',
            }}
          >
            What should we call you?
          </label>
          <input
            id="participant-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={() => setNameInputFocused(true)}
            onBlur={() => setNameInputFocused(false)}
            placeholder="Your name"
            autoFocus
            style={{
              width: '100%',
              height: 56,
              background: 'var(--surface-3)',
              fontFamily: 'var(--font-sans)',
              fontSize: 18,
              color: 'var(--fg)',
              border: nameInputFocused ? '1px solid var(--accent)' : '1px solid var(--hairline)',
              borderRadius: 'var(--r-card)',
              padding: '0 var(--sp-4, 16px)',
              boxSizing: 'border-box',
              outline: 'none',
              marginBottom: 'var(--sp-5, 20px)',
              transition: 'border-color 120ms ease',
            }}
          />
          <button
            type="submit"
            disabled={!name.trim()}
            style={{
              width: '100%',
              height: 56,
              borderRadius: 'var(--r-pill)',
              background: 'var(--accent)',
              color: 'var(--fg)',
              border: 'none',
              fontFamily: 'var(--font-sans)',
              fontSize: 16,
              fontWeight: 500,
              cursor: name.trim() ? 'pointer' : 'default',
              opacity: name.trim() ? 1 : 0.6,
              transition: 'opacity 120ms ease',
            }}
          >
            Continue
          </button>
        </form>
      </AudienceLayout>
    );
  }

  // Active slide
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

  // State 3: Lobby state
  return (
    <AudienceLayout>
      <div style={{ maxWidth: 440, width: '100%', margin: '0 auto', textAlign: 'center' }}>
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 32,
            fontWeight: 500,
            color: 'var(--fg)',
            textAlign: 'center',
            margin: '0 0 12px 0',
          }}
        >
          You're in
        </h1>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 24,
            color: 'var(--accent)',
            textAlign: 'center',
          }}
        >
          {participantCount || 1}
        </div>
      </div>
    </AudienceLayout>
  );
}
