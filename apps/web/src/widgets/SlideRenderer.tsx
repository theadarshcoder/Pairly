import { lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Slide } from '@pairly/schemas';
import { useParticipantStore } from '@entities/participant/model/useParticipantStore.js';
import { slideTransition } from '@shared/lib/animations.js';
import { Loader2 } from 'lucide-react';

// Presenter-only components (D3 heavy — lazy loaded, stays in presenter chunk)
const PresenterHeatmap = lazy(() =>
  import('@features/spatial-hotspot/PresenterHeatmap.js').then((m) => ({ default: m.PresenterHeatmap })),
);
const PresenterGraph = lazy(() =>
  import('@features/network-matching/PresenterGraph.js').then((m) => ({ default: m.PresenterGraph })),
);
const PresenterInversionView = lazy(() =>
  import('@features/sequential-sorting/PresenterInversionView.js').then((m) => ({ default: m.PresenterInversionView })),
);
const PresenterTopAnswers = lazy(() =>
  import('@features/peer-review-swarm/PresenterTopAnswers.js').then((m) => ({ default: m.PresenterTopAnswers })),
);
const PresenterQuestionFeed = lazy(() =>
  import('@features/qna-dedup/PresenterQuestionFeed.js').then((m) => ({ default: m.PresenterQuestionFeed })),
);

// Audience components (lightweight — eagerly imported)
import { AudienceTapTarget } from '@features/spatial-hotspot/AudienceTapTarget.js';
import { AudienceMatcher } from '@features/network-matching/AudienceMatcher.js';
import { AudienceDragSort } from '@features/sequential-sorting/AudienceDragSort.js';
import { AudienceGradeCards } from '@features/peer-review-swarm/AudienceGradeCards.js';
import { AudienceAskBox } from '@features/qna-dedup/AudienceAskBox.js';

interface SlideRendererProps {
  slide: Slide;
  slideIndex: number;
}

function SlideLoader() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <Loader2 size={24} style={{ animation: 'spin 1s linear infinite', color: 'var(--color-brand-primary)' }} />
    </div>
  );
}

/**
 * SlideRenderer — the ONLY place in the app that switches on slide.type.
 * Renders the correct feature component based on the user's role.
 *
 * Presenter components: wrapped in React.lazy — D3 stays in presenter chunk.
 * Audience components: eagerly imported — no D3 ever reaches the audience bundle.
 */
export function SlideRenderer({ slide, slideIndex }: SlideRendererProps) {
  const role = useParticipantStore((s) => s.role);
  const isHost = role === 'host';

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={slideIndex}
        variants={slideTransition}
        initial="hidden"
        animate="visible"
        exit="exit"
        style={{ display: 'flex', flexDirection: 'column', flex: 1 }}
      >
        <Suspense fallback={<SlideLoader />}>
          {slide.type === 'spatial-hotspot' &&
            (isHost ? <PresenterHeatmap slide={slide} /> : <AudienceTapTarget slide={slide} />)}

          {slide.type === 'network-matching' &&
            (isHost ? <PresenterGraph slide={slide} /> : <AudienceMatcher slide={slide} />)}

          {slide.type === 'sequential-sorting' &&
            (isHost ? <PresenterInversionView slide={slide} /> : <AudienceDragSort slide={slide} />)}

          {slide.type === 'peer-review-swarm' &&
            (isHost ? <PresenterTopAnswers slide={slide} /> : <AudienceGradeCards slide={slide} />)}

          {slide.type === 'qna-dedup' &&
            (isHost ? <PresenterQuestionFeed slide={slide} /> : <AudienceAskBox slide={slide} />)}
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}
