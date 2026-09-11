import React, { Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Slide } from '@pairly/schemas';
import { useParticipantStore } from '@entities/participant/model/useParticipantStore.js';
import { slideTransition } from '@shared/lib/animations.js';
import { SlideErrorBoundary } from '@shared/ui/SlideErrorBoundary.js';
import { Loader2 } from 'lucide-react';
import { emitSafe } from '@shared/api/socketBridge.js';

// Presenter components
import { MultipleChoicePresenter } from '@features/slides/multiple-choice/Presenter.js';
import { SpatialHotspotPresenter } from '@features/slides/spatial-hotspot/Presenter.js';
import { NetworkMatchingPresenter } from '@features/slides/network-matching/Presenter.js';
import { SequentialSortingPresenter } from '@features/slides/sequential-sorting/Presenter.js';
import { PeerReviewPresenter } from '@features/slides/peer-review/Presenter.js';
import { SemanticQAPresenter } from '@features/slides/semantic-qa/Presenter.js';
import { ConceptDecayPresenter } from '@features/slides/concept-decay/Presenter.js';

// Audience components
import { MultipleChoiceAudience } from '@features/slides/multiple-choice/Audience.js';
import { SpatialHotspotAudience } from '@features/slides/spatial-hotspot/Audience.js';
import { AudienceMatcher } from '@features/network-matching/AudienceMatcher.js';
import { AudienceDragSort } from '@features/sequential-sorting/AudienceDragSort.js';
import { AudienceGradeCards } from '@features/peer-review-swarm/AudienceGradeCards.js';
import { AudienceAskBox } from '@features/qna-dedup/AudienceAskBox.js';

interface SlideRendererProps {
  slide: Slide | any;
  slideIndex: number;
}

function SlideLoader() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <Loader2 size={24} style={{ animation: 'spin 1s linear infinite', color: 'var(--accent)' }} />
    </div>
  );
}

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
        style={{ display: 'flex', flexDirection: 'column', flex: 1, width: '100%', height: '100%' }}
      >
        <SlideErrorBoundary slideTitle={slide?.title} isAudience={!isHost}>
          <Suspense fallback={<SlideLoader />}>
            {slide.type === 'multiple-choice' && (
              isHost ? (
                <MultipleChoicePresenter slide={slide} />
              ) : (
                <MultipleChoiceAudience
                  slide={slide}
                  onSubmit={(optionId) => emitSafe('mc:vote', { slideId: slide.id, optionId })}
                />
              )
            )}

            {slide.type === 'spatial-hotspot' && (
              isHost ? (
                <SpatialHotspotPresenter slide={slide} />
              ) : (
                <SpatialHotspotAudience slide={slide} />
              )
            )}

            {slide.type === 'network-matching' && (
              isHost ? (
                <NetworkMatchingPresenter slide={slide} />
              ) : (
                <AudienceMatcher slide={slide} />
              )
            )}

            {slide.type === 'sequential-sorting' && (
              isHost ? (
                <SequentialSortingPresenter slide={slide} />
              ) : (
                <AudienceDragSort slide={slide} />
              )
            )}

            {(slide.type === 'peer-review' || slide.type === 'peer-review-swarm') && (
              isHost ? (
                <PeerReviewPresenter slide={slide} />
              ) : (
                <AudienceGradeCards slide={slide} />
              )
            )}

            {(slide.type === 'semantic-qa' || slide.type === 'qna-dedup') && (
              isHost ? (
                <SemanticQAPresenter slide={slide} />
              ) : (
                <AudienceAskBox slide={slide} />
              )
            )}

            {slide.type === 'concept-decay' && (
              isHost ? (
                <ConceptDecayPresenter slide={slide} />
              ) : (
                <div style={{ textAlign: 'center', color: 'var(--fg-muted)', padding: 'var(--sp-8)' }}>
                  Active visualization is displayed on the presenter screen.
                </div>
              )
            )}
          </Suspense>
        </SlideErrorBoundary>
      </motion.div>
    </AnimatePresence>
  );
}
