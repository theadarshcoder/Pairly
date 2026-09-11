import React, { useState, useMemo } from 'react';
import type { PeerReviewSlide } from '@pairly/schemas';
import { usePeerReviewStore } from './model/usePeerReviewStore.js';
import { socket } from '@shared/api/socket.js';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Send,
  CheckCircle2,
  HelpCircle,
  Clock,
  Award,
  ArrowRight,
  RotateCcw,
  ShieldCheck,
  FileText,
} from 'lucide-react';

interface Props {
  slide: PeerReviewSlide;
}

export function AudienceGradeCards({ slide }: Props) {
  // Phase & state from store
  const activePhase = usePeerReviewStore(
    (s) => s.activePhaseBySlide[slide.id] ?? slide.currentPhase ?? 'grading',
  );
  const rawAssignedCards = usePeerReviewStore(
    (s) => s.assignedCardsBySlide[slide.id] ?? [],
  );
  const submittedCardIds = usePeerReviewStore(
    (s) => s.submittedCardIdsBySlide[slide.id] ?? {},
  );
  const currentIndex = usePeerReviewStore(
    (s) => s.currentCardIndexBySlide[slide.id] ?? 0,
  );
  const answerSubmitted = usePeerReviewStore(
    (s) => s.answerSubmittedBySlide[slide.id] ?? false,
  );

  // Fallback cards for demo or initial preview mode if server hasn't dealt yet
  const cards = useMemo(() => {
    if (rawAssignedCards.length > 0) return rawAssignedCards;
    if (slide.answerCards && slide.answerCards.length > 0) {
      return slide.answerCards.slice(0, 3).map((c) => ({ id: c.id, content: c.content }));
    }
    return [];
  }, [rawAssignedCards, slide.answerCards]);

  // Current answer submission text in submission phase
  const [submissionText, setSubmissionText] = useState('');

  // Current grading form state for current active card
  const currentCard = cards[currentIndex];
  const isCurrentCardSubmitted = currentCard ? !!submittedCardIds[currentCard.id] : false;

  // Initial score defaults (middle score: 3)
  const defaultScores = useMemo(() => {
    const s: Record<string, number> = {};
    for (const crit of slide.rubric) {
      s[crit.id] = Math.round((crit.minScore + crit.maxScore) / 2);
    }
    return s;
  }, [slide.rubric]);

  const [scores, setScores] = useState<Record<string, number>>(defaultScores);
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check if all assigned cards are completed
  const allGraded = cards.length > 0 && cards.every((c) => submittedCardIds[c.id]);

  // Handle participant answer submission (Phase 1)
  const handleSubmitProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submissionText.trim()) return;

    socket.emit('review:submit_answer', {
      slideId: slide.id,
      content: submissionText.trim(),
    });

    usePeerReviewStore.getState().setAnswerSubmitted(slide.id, true);
  };

  // Handle score selection
  const handleScoreChange = (criterionId: string, value: number) => {
    setScores((prev) => ({ ...prev, [criterionId]: value }));
  };

  // Handle submitting grade for current card (Phase 2)
  const handleSubmitGrade = () => {
    if (!currentCard || isSubmitting) return;

    setIsSubmitting(true);

    socket.emit('review:grade', {
      slideId: slide.id,
      answerId: currentCard.id,
      scores,
      feedback: feedback.trim() || undefined,
    });

    usePeerReviewStore.getState().markCardGraded(slide.id, currentCard.id);

    // Reset local feedback for next card
    setFeedback('');
    setScores(defaultScores);
    setIsSubmitting(false);
  };

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-4)',
        padding: 'var(--space-4)',
        maxWidth: '680px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      {/* Slide Header & Metadata */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-2)' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-1)',
              padding: '2px 8px',
              borderRadius: 'var(--radius-full)',
              background: 'hsl(250 84% 60% / 0.15)',
              border: '1px solid hsl(250 84% 60% / 0.3)',
              color: 'hsl(250 100% 75%)',
              fontSize: 'var(--text-xs)',
              fontWeight: 'var(--weight-semibold)',
            }}
          >
            <ShieldCheck size={12} />
            <span>Anonymous Peer Review</span>
          </div>

          <div
            style={{
              fontSize: 'var(--text-xs)',
              color: 'var(--color-text-tertiary)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Phase: <strong style={{ color: 'var(--color-text-secondary)' }}>{activePhase}</strong>
          </div>
        </div>

        <h1
          style={{
            fontSize: 'var(--text-xl)',
            fontWeight: 'var(--weight-bold)',
            color: 'var(--color-text-primary)',
            lineHeight: 1.3,
            margin: 0,
          }}
        >
          {slide.title}
        </h1>
        <p
          style={{
            fontSize: 'var(--text-sm)',
            color: 'var(--color-text-secondary)',
            margin: 0,
            lineHeight: 1.4,
          }}
        >
          {slide.prompt}
        </p>
      </div>

      {/* ── PHASE 1: SUBMISSION ────────────────────────────────────────────── */}
      {activePhase === 'submission' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: 'var(--color-bg-surface)',
            border: '1px solid var(--color-border-subtle)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-5)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-4)',
          }}
        >
          {answerSubmitted ? (
            <div
              style={{
                textAlign: 'center',
                padding: 'var(--space-6) var(--space-4)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 'var(--space-3)',
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 'var(--radius-full)',
                  background: 'hsl(142 76% 45% / 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-success)',
                }}
              >
                <CheckCircle2 size={32} />
              </div>
              <h3 style={{ margin: 0, fontSize: 'var(--text-lg)', fontWeight: 'var(--weight-semibold)' }}>
                Proposal Submitted!
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-secondary)',
                  maxWidth: '380px',
                }}
              >
                Your response is saved anonymously. When the presenter begins grading, you will be dealt 3 peer
                submissions to evaluate.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmitProposal} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <label
                htmlFor="peer-submission-input"
                style={{
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--weight-medium)',
                  color: 'var(--color-text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                }}
              >
                <FileText size={16} />
                Your Solution / Proposal
              </label>
              <textarea
                id="peer-submission-input"
                value={submissionText}
                onChange={(e) => setSubmissionText(e.target.value)}
                placeholder="Write your architectural proposal or solution here (max 1,000 characters)..."
                maxLength={1000}
                rows={5}
                style={{
                  width: '100%',
                  padding: 'var(--space-3)',
                  background: 'var(--color-bg-elevated)',
                  border: '1px solid var(--color-border-default)',
                  borderRadius: 'var(--radius-lg)',
                  color: 'var(--color-text-primary)',
                  fontSize: 'var(--text-sm)',
                  fontFamily: 'var(--font-sans)',
                  resize: 'vertical',
                  outline: 'none',
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-tertiary)' }}>
                  {submissionText.length} / 1000 characters
                </span>
                <button
                  id="submit-proposal-btn"
                  type="submit"
                  disabled={!submissionText.trim()}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 'var(--space-2)',
                    padding: '8px 18px',
                    borderRadius: 'var(--radius-full)',
                    background: submissionText.trim() ? 'var(--color-brand-primary)' : 'var(--color-border-default)',
                    color: '#fff',
                    border: 'none',
                    fontWeight: 'var(--weight-semibold)',
                    fontSize: 'var(--text-sm)',
                    cursor: submissionText.trim() ? 'pointer' : 'not-allowed',
                    transition: 'var(--transition-base)',
                  }}
                >
                  <Send size={14} />
                  Submit Proposal
                </button>
              </div>
            </form>
          )}
        </motion.div>
      )}

      {/* ── PHASE 2: GRADING ──────────────────────────────────────────────── */}
      {activePhase === 'grading' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {cards.length === 0 ? (
            /* Waiting for server shuffle-and-deal */
            <div
              style={{
                background: 'var(--color-bg-surface)',
                border: '1px solid var(--color-border-subtle)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--space-8) var(--space-4)',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 'var(--space-3)',
              }}
            >
              <Clock size={32} style={{ color: 'var(--color-brand-primary)', animation: 'pulse 2s infinite' }} />
              <h3 style={{ margin: 0, fontSize: 'var(--text-base)', fontWeight: 'var(--weight-semibold)' }}>
                Dealing Anonymous Answer Cards...
              </h3>
              <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', maxWidth: '340px' }}>
                The server is distributing 3 balanced, anonymous peer submissions for you to review.
              </p>
            </div>
          ) : allGraded ? (
            /* Celebratory All-Graded Screen */
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{
                background: 'var(--color-bg-surface)',
                border: '1px solid hsl(142 76% 45% / 0.3)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--space-8) var(--space-5)',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 'var(--space-4)',
              }}
            >
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 'var(--radius-full)',
                  background: 'hsl(142 76% 45% / 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-success)',
                }}
              >
                <Award size={36} />
              </div>
              <h2 style={{ margin: 0, fontSize: 'var(--text-xl)', fontWeight: 'var(--weight-bold)' }}>
                All {cards.length} Reviews Submitted! 🎉
              </h2>
              <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', maxWidth: '400px' }}>
                Thank you! Your ratings and feedback have been added to the real-time swarm aggregate.
                Watch the presenter screen for the leaderboard reveal!
              </p>
            </motion.div>
          ) : (
            /* Card Grading Deck */
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {/* Deck Progress Bar & Step Indicator */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--weight-semibold)', color: 'var(--color-text-secondary)' }}>
                    Reviewing Card {currentIndex + 1} of {cards.length}
                  </span>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {cards.map((c, i) => (
                      <div
                        key={c.id}
                        onClick={() => usePeerReviewStore.getState().setCurrentCardIndex(slide.id, i)}
                        style={{
                          width: 22,
                          height: 6,
                          borderRadius: 'var(--radius-full)',
                          background: submittedCardIds[c.id]
                            ? 'var(--color-success)'
                            : i === currentIndex
                            ? 'var(--color-brand-primary)'
                            : 'var(--color-border-default)',
                          cursor: 'pointer',
                          transition: 'var(--transition-fast)',
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Active Answer Card */}
              <AnimatePresence mode="wait">
                {currentCard && (
                  <motion.div
                    key={currentCard.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      background: 'var(--color-bg-surface)',
                      border: '1px solid var(--color-border-subtle)',
                      borderRadius: 'var(--radius-xl)',
                      padding: 'var(--space-5)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 'var(--space-4)',
                      boxShadow: 'var(--shadow-md)',
                    }}
                  >
                    {/* Anonymous Submission Quote Box */}
                    <div
                      style={{
                        background: 'var(--color-bg-elevated)',
                        border: '1px solid var(--color-border-default)',
                        borderRadius: 'var(--radius-lg)',
                        padding: 'var(--space-4)',
                        position: 'relative',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 'var(--space-1)',
                          color: 'var(--color-text-tertiary)',
                          fontSize: 'var(--text-xs)',
                          marginBottom: 'var(--space-2)',
                        }}
                      >
                        <ShieldCheck size={14} style={{ color: 'var(--color-brand-primary)' }} />
                        <span>Anonymous Peer Submission #{currentIndex + 1}</span>
                      </div>
                      <p
                        style={{
                          margin: 0,
                          fontSize: 'var(--text-sm)',
                          lineHeight: 1.5,
                          color: 'var(--color-text-primary)',
                          fontStyle: 'italic',
                        }}
                      >
                        "{currentCard.content}"
                      </p>
                    </div>

                    {/* Rubric Criteria Rating Selectors */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                      <span
                        style={{
                          fontSize: 'var(--text-xs)',
                          fontWeight: 'var(--weight-bold)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          color: 'var(--color-text-secondary)',
                        }}
                      >
                        Grade Against Rubric
                      </span>

                      {slide.rubric.map((crit) => {
                        const currentScore = scores[crit.id] ?? crit.minScore;
                        const scoreRange = Array.from(
                          { length: crit.maxScore - crit.minScore + 1 },
                          (_, idx) => crit.minScore + idx,
                        );

                        return (
                          <div
                            key={crit.id}
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              gap: 'var(--space-2)',
                              padding: 'var(--space-3)',
                              background: 'var(--color-bg-base)',
                              borderRadius: 'var(--radius-lg)',
                              border: '1px solid var(--color-border-subtle)',
                            }}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                              <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-semibold)', color: 'var(--color-text-primary)' }}>
                                {crit.title}
                              </span>
                              <span
                                style={{
                                  fontSize: 'var(--text-xs)',
                                  fontWeight: 'var(--weight-bold)',
                                  color: 'var(--color-brand-primary)',
                                }}
                              >
                                {currentScore} / {crit.maxScore}
                              </span>
                            </div>

                            {crit.description && (
                              <p style={{ margin: 0, fontSize: 'var(--text-xs)', color: 'var(--color-text-tertiary)' }}>
                                {crit.description}
                              </p>
                            )}

                            {/* 1..5 Rating Buttons */}
                            <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: '4px' }}>
                              {scoreRange.map((val) => {
                                const isSelected = currentScore === val;
                                return (
                                  <button
                                    key={val}
                                    id={`rate-${crit.id}-${val}`}
                                    type="button"
                                    onClick={() => handleScoreChange(crit.id, val)}
                                    style={{
                                      flex: 1,
                                      padding: '8px 0',
                                      borderRadius: 'var(--radius-md)',
                                      border: isSelected
                                        ? '1px solid var(--color-brand-primary)'
                                        : '1px solid var(--color-border-subtle)',
                                      background: isSelected
                                        ? 'hsl(250 84% 60% / 0.25)'
                                        : 'var(--color-bg-elevated)',
                                      color: isSelected ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                                      fontWeight: isSelected ? 'var(--weight-bold)' : 'var(--weight-medium)',
                                      fontSize: 'var(--text-sm)',
                                      cursor: 'pointer',
                                      transition: 'var(--transition-fast)',
                                      boxShadow: isSelected ? 'var(--shadow-glow-brand)' : 'none',
                                    }}
                                  >
                                    {val}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Optional Feedback Input */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                      <label
                        htmlFor="peer-feedback-input"
                        style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', fontWeight: 'var(--weight-medium)' }}
                      >
                        Anonymous Peer Feedback (Optional)
                      </label>
                      <input
                        id="peer-feedback-input"
                        type="text"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="e.g., Nice idea on the witness node, but consider latency..."
                        maxLength={500}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          background: 'var(--color-bg-base)',
                          border: '1px solid var(--color-border-subtle)',
                          borderRadius: 'var(--radius-md)',
                          color: 'var(--color-text-primary)',
                          fontSize: 'var(--text-sm)',
                          outline: 'none',
                        }}
                      />
                    </div>

                    {/* Submission Button */}
                    <button
                      id="submit-review-grade-btn"
                      type="button"
                      disabled={isSubmitting}
                      onClick={handleSubmitGrade}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 'var(--space-2)',
                        padding: '12px 20px',
                        borderRadius: 'var(--radius-full)',
                        background: 'linear-gradient(135deg, var(--color-brand-primary), var(--color-brand-secondary))',
                        color: '#fff',
                        border: 'none',
                        fontWeight: 'var(--weight-semibold)',
                        fontSize: 'var(--text-sm)',
                        cursor: 'pointer',
                        boxShadow: 'var(--shadow-md)',
                        marginTop: 'var(--space-2)',
                        transition: 'var(--transition-base)',
                      }}
                    >
                      <span>
                        {isCurrentCardSubmitted
                          ? 'Update Grade'
                          : currentIndex === cards.length - 1
                          ? 'Submit Final Review'
                          : 'Submit & Next Card'}
                      </span>
                      <ArrowRight size={16} />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      )}

      {/* ── PHASE 3: REVEAL ───────────────────────────────────────────────── */}
      {activePhase === 'reveal' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: 'var(--color-bg-surface)',
            border: '1px solid var(--color-border-subtle)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-8) var(--space-5)',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'var(--space-4)',
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 'var(--radius-full)',
              background: 'hsl(250 84% 60% / 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-brand-primary)',
            }}
          >
            <Sparkles size={32} />
          </div>
          <h2 style={{ margin: 0, fontSize: 'var(--text-xl)', fontWeight: 'var(--weight-bold)' }}>
            Results Revealed!
          </h2>
          <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', maxWidth: '400px' }}>
            Grading is closed. Look at the presenter screen to see the swarm rating distribution, criteria averages, and
            top-ranked proposals!
          </p>
        </motion.div>
      )}
    </div>
  );
}
