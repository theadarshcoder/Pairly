import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { StageScaler } from './StageScaler.js';
import { PresenterTopBar } from './PresenterTopBar.js';
import { PresenterDock } from './PresenterDock.js';
import { SlideErrorBoundary } from '@shared/ui/SlideErrorBoundary.js';
import { SlideTitle } from './SlideTitle.js';
import { PresentModeExit } from '@shared/ui/PresentModeExit.js';
import { useSessionStore } from '@entities/session/model/useSessionStore.js';
import { useConnectionStore } from '@entities/connection/model/useConnectionStore.js';
import { socket } from '@shared/api/socket.js';

// Slide presenters for all 7 types
import { MultipleChoicePresenter } from '@features/slides/multiple-choice/Presenter.js';
import { SpatialHotspotPresenter } from '@features/slides/spatial-hotspot/Presenter.js';
import { NetworkMatchingPresenter } from '@features/slides/network-matching/Presenter.js';
import { SequentialSortingPresenter } from '@features/slides/sequential-sorting/Presenter.js';
import { PeerReviewPresenter } from '@features/slides/peer-review/Presenter.js';
import { SemanticQAPresenter } from '@features/slides/semantic-qa/Presenter.js';
import { ConceptDecayPresenter } from '@features/slides/concept-decay/Presenter.js';

const DEMO_SLIDES = [
  {
    id: 'demo-mc',
    title: 'Which data pipeline avoids React state re-renders?',
    type: 'multiple-choice',
    options: [
      { id: 'opt-a', label: 'Zustand Store + useSelector' },
      { id: 'opt-b', label: 'liveBuffer + useLiveCanvas' },
      { id: 'opt-c', label: 'React.useState at root' },
      { id: 'opt-d', label: 'Framer Motion layoutId' },
    ],
  },
  {
    id: 'demo-hotspot',
    title: 'Identify Primary Cortical Motor Strip',
    type: 'spatial-hotspot',
    imageUrl: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'demo-network',
    title: 'Match Network Protocol Primitives',
    type: 'network-matching',
  },
  {
    id: 'demo-sort',
    title: 'Sort Git Linear History Pipeline',
    type: 'sequential-sorting',
  },
  {
    id: 'demo-review',
    title: 'Peer Review: Distributed Consensus',
    type: 'peer-review',
  },
  {
    id: 'demo-qa',
    title: 'Live Semantic Q&A Threads',
    type: 'semantic-qa',
  },
  {
    id: 'demo-decay',
    title: 'Semester Knowledge Retention Decay',
    type: 'concept-decay',
  },
];

export default function PresenterPage() {
  const { pin: roomCode = 'DEMO' } = useParams<{ pin: string }>();
  const { session } = useSessionStore();
  const { status: connectionStatus } = useConnectionStore();
  const [presentMode, setPresentMode] = useState(false);
  const [localSlideIndex, setLocalSlideIndex] = useState(0);

  useEffect(() => {
    if (!roomCode) return;
    if (socket.connected) return;

    socket.auth = { role: 'host', token: localStorage.getItem('pairly_host_token') ?? '', roomCode };
    socket.connect();

    socket.emit('room:join', {
      roomCode,
      role: 'host',
      nickname: 'Host',
    });
  }, [roomCode]);

  // Wake Lock: acquire on present-mode entry, release on exit.
  useEffect(() => {
    if (!presentMode) return;
    let lock: any = null;
    if ('wakeLock' in navigator && (navigator as any).wakeLock?.request) {
      (navigator as any).wakeLock.request('screen')
        .then((l: any) => { lock = l; })
        .catch(() => {});
    }
    return () => { lock?.release?.(); };
  }, [presentMode]);

  // ESC key exits present mode
  useEffect(() => {
    if (!presentMode) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setPresentMode(false);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [presentMode]);

  useEffect(() => {
    if (typeof session?.currentSlideIndex === 'number') {
      setLocalSlideIndex(session.currentSlideIndex);
    }
  }, [session?.currentSlideIndex]);

  const activeSlides = DEMO_SLIDES;
  const currentSlideIndex = localSlideIndex;
  const currentSlide = activeSlides[currentSlideIndex] ?? activeSlides[0];
  const totalSlides = activeSlides.length;

  function handleAdvance(direction: 'next' | 'prev') {
    if (direction === 'next') {
      setLocalSlideIndex((prev) => Math.min(totalSlides - 1, prev + 1));
    } else {
      setLocalSlideIndex((prev) => Math.max(0, prev - 1));
    }
    if (roomCode && socket.connected) {
      socket.emit('slide:advance', { roomCode, direction });
    }
  }

  function handleSelectSlide(index: number) {
    setLocalSlideIndex(Math.max(0, Math.min(totalSlides - 1, index)));
  }

  function handleSessionControl(action: 'start' | 'pause' | 'resume' | 'end') {
    if (!roomCode) return;
    socket.emit('session:control', { roomCode, action });
  }

  function renderSlideContent(slide: any) {
    if (!slide) return null;
    switch (slide.type) {
      case 'multiple-choice':
        return <MultipleChoicePresenter slide={slide} />;
      case 'spatial-hotspot':
        return <SpatialHotspotPresenter slide={slide} />;
      case 'network-matching':
        return <NetworkMatchingPresenter slide={slide} />;
      case 'sequential-sorting':
        return <SequentialSortingPresenter slide={slide} />;
      case 'peer-review':
      case 'peer-review-swarm':
        return <PeerReviewPresenter slide={slide} />;
      case 'semantic-qa':
      case 'qna-dedup':
        return <SemanticQAPresenter slide={slide} />;
      case 'concept-decay':
        return <ConceptDecayPresenter slide={slide} />;
      default:
        return <div style={{ color: 'var(--fg-muted)', textAlign: 'center' }}>Unknown slide type: {slide.type}</div>;
    }
  }

  return (
    <div className="presenter-root" style={{ background: 'var(--bg)', minHeight: '100vh', overflow: 'hidden' }}>
      {!presentMode && (
        <PresenterTopBar
          slideLabel={`Slide ${currentSlideIndex + 1} of ${totalSlides}`}
          room={roomCode}
          connectionStatus={connectionStatus}
          onEnterPresentMode={() => setPresentMode(true)}
        />
      )}

      <div style={{ paddingTop: 56, paddingBottom: 88, height: '100vh', boxSizing: 'border-box' }}>
        <StageScaler>
          <SlideErrorBoundary slideTitle={currentSlide?.title}>
            <SlideTitle>{currentSlide?.title}</SlideTitle>
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
              {renderSlideContent(currentSlide)}
            </div>
          </SlideErrorBoundary>
        </StageScaler>
      </div>

      {!presentMode && (
        <PresenterDock
          currentSlideIndex={currentSlideIndex}
          totalSlides={totalSlides}
          hideResults={false}
          onAdvance={handleAdvance}
          onSelectSlide={handleSelectSlide}
          onToggleHideResults={() => {}}
          onEndSession={() => handleSessionControl('end')}
          onTogglePresentMode={() => setPresentMode(true)}
        />
      )}

      {presentMode && <PresentModeExit onExit={() => setPresentMode(false)} />}
    </div>
  );
}
