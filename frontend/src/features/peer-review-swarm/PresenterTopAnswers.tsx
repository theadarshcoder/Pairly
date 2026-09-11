import React, { useMemo } from 'react';
import type { PeerReviewSlide, AnswerGradeSummary } from '@pairly/schemas';
import { usePeerReviewStore } from './model/usePeerReviewStore.js';
import { socket } from '@shared/api/socket.js';
import { useConnectionStore } from '@entities/connection/model/useConnectionStore.js';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy,
  Users,
  Sparkles,
  BarChart3,
  MessageSquare,
  Shuffle,
  Eye,
  RotateCcw,
  CheckCircle2,
  Award,
  Star,
} from 'lucide-react';

interface Props {
  slide: PeerReviewSlide;
}

export function PresenterTopAnswers({ slide }: Props) {
  const roomCode = useConnectionStore((s) => s.roomCode);

  // Real-time state from store
  const summaries = usePeerReviewStore((s) => s.summariesBySlide[slide.id] ?? []);
  const totalReviews = usePeerReviewStore((s) => s.totalReviewsBySlide[slide.id] ?? 0);
  const activePhase = usePeerReviewStore(
    (s) => s.activePhaseBySlide[slide.id] ?? slide.currentPhase ?? 'grading',
  );
  const recentReviewsCount = usePeerReviewStore(
    (s) => s.recentReviewsCountBySlide[slide.id] ?? 0,
  );

  // Map answer cards from slide with real-time grade summaries
  const cardSummaries = useMemo(() => {
    const summaryMap = new Map<string, AnswerGradeSummary>();
    for (const s of summaries) {
      summaryMap.set(s.answerId, s);
    }

    const cards = slide.answerCards ?? [];
    return cards.map((card) => {
      const liveSummary = summaryMap.get(card.id);
      return {
        card,
        summary: liveSummary ?? {
          answerId: card.id,
          reviewCount: 0,
          averageScore: 0,
          criteriaAverages: {},
          scoreDistribution: {},
          recentFeedback: [],
        },
      };
    });
  }, [slide.answerCards, summaries]);

  // Ranked cards for reveal podium
  const rankedCards = useMemo(() => {
    return [...cardSummaries].sort(
      (a, b) => b.summary.averageScore - a.summary.averageScore || b.summary.reviewCount - a.summary.reviewCount,
    );
  }, [cardSummaries]);

  // Host action: trigger phase change
  const handleSetPhase = (phase: 'submission' | 'grading' | 'reveal') => {
    if (!roomCode) return;
    socket.emit('review:phase', {
      roomCode,
      slideId: slide.id,
      phase,
    });
    usePeerReviewStore.getState().setPhase(slide.id, phase);
  };

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-5)',
        padding: 'var(--space-6)',
        width: '100%',
        maxWidth: '1280px',
        margin: '0 auto',
      }}
    >
      {/* ── Header & Host Control Bar ───────────────────────────────────────── */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: 'var(--space-4)',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', maxWidth: '780px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-1)',
                padding: '3px 10px',
                borderRadius: 'var(--radius-full)',
                background: 'hsl(250 84% 60% / 0.15)',
                border: '1px solid hsl(250 84% 60% / 0.3)',
                color: 'hsl(250 100% 75%)',
                fontSize: 'var(--text-xs)',
                fontWeight: 'var(--weight-semibold)',
              }}
            >
              <Users size={12} />
              <span>Peer Review Swarm</span>
            </span>

            {slide.conceptTags?.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: 'var(--text-xs)',
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--color-bg-surface)',
                  color: 'var(--color-text-tertiary)',
                  border: '1px solid var(--color-border-subtle)',
                }}
              >
                #{tag}
              </span>
            ))}
          </div>

          <h1
            style={{
              fontSize: 'var(--text-2xl)',
              fontWeight: 'var(--weight-bold)',
              color: 'var(--color-text-primary)',
              margin: 0,
              lineHeight: 1.2,
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

        {/* Real-Time Live Metrics & Phase Control Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
          {/* Live Review Counter Badge */}
          <motion.div
            animate={recentReviewsCount > 0 ? { scale: [1, 1.08, 1] } : {}}
            transition={{ duration: 0.3 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              padding: '8px 16px',
              borderRadius: 'var(--radius-xl)',
              background: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border-default)',
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 'var(--radius-full)',
                background: recentReviewsCount > 0 ? 'var(--color-success)' : 'var(--color-brand-primary)',
                boxShadow: recentReviewsCount > 0 ? '0 0 8px var(--color-success)' : 'none',
              }}
            />
            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
              Total Reviews: <strong style={{ color: 'var(--color-text-primary)' }}>{totalReviews}</strong>
            </span>
          </motion.div>

          {/* Phase Control Buttons */}
          {activePhase === 'submission' && (
            <button
              id="host-start-grading-btn"
              type="button"
              onClick={() => handleSetPhase('grading')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                padding: '9px 18px',
                borderRadius: 'var(--radius-full)',
                background: 'linear-gradient(135deg, var(--color-brand-primary), var(--color-brand-secondary))',
                color: '#fff',
                border: 'none',
                fontWeight: 'var(--weight-semibold)',
                fontSize: 'var(--text-sm)',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <Shuffle size={15} />
              <span>Start Grading (Shuffle & Deal)</span>
            </button>
          )}

          {activePhase === 'grading' && (
            <button
              id="host-reveal-results-btn"
              type="button"
              onClick={() => handleSetPhase('reveal')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                padding: '9px 18px',
                borderRadius: 'var(--radius-full)',
                background: 'linear-gradient(135deg, hsl(38 100% 50%), hsl(25 100% 50%))',
                color: '#fff',
                border: 'none',
                fontWeight: 'var(--weight-semibold)',
                fontSize: 'var(--text-sm)',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <Trophy size={15} />
              <span>Reveal Top Answers</span>
            </button>
          )}

          {activePhase === 'reveal' && (
            <button
              id="host-back-to-grading-btn"
              type="button"
              onClick={() => handleSetPhase('grading')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                padding: '9px 16px',
                borderRadius: 'var(--radius-full)',
                background: 'var(--color-bg-surface)',
                color: 'var(--color-text-primary)',
                border: '1px solid var(--color-border-default)',
                fontWeight: 'var(--weight-semibold)',
                fontSize: 'var(--text-sm)',
                cursor: 'pointer',
              }}
            >
              <RotateCcw size={14} />
              <span>Resume Grading</span>
            </button>
          )}
        </div>
      </div>

      {/* ── PHASE VIEW: REVEAL (PODIUM LEADERBOARD) ────────────────────────── */}
      {activePhase === 'reveal' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}
        >
          {/* Podium Header Banner */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--space-3)',
              padding: 'var(--space-3) var(--space-4)',
              borderRadius: 'var(--radius-lg)',
              background: 'linear-gradient(90deg, hsl(38 100% 50% / 0.1), hsl(250 84% 60% / 0.1))',
              border: '1px solid hsl(38 100% 50% / 0.3)',
            }}
          >
            <Trophy size={20} style={{ color: 'hsl(38 100% 50%)' }} />
            <span style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--weight-bold)', color: 'hsl(38 100% 65%)' }}>
              Swarm Consensus Leaderboard
            </span>
          </div>

          {/* Podium Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 'var(--space-4)',
            }}
          >
            {rankedCards.map(({ card, summary }, rankIndex) => {
              const isGold = rankIndex === 0;
              const isSilver = rankIndex === 1;
              const isBronze = rankIndex === 2;

              const rankColor = isGold
                ? 'hsl(45, 100%, 55%)'
                : isSilver
                ? 'hsl(220, 15%, 75%)'
                : isBronze
                ? 'hsl(25, 80%, 55%)'
                : 'var(--color-border-default)';

              return (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: rankIndex * 0.1 }}
                  style={{
                    background: 'var(--color-bg-surface)',
                    border: `1px solid ${isGold ? 'hsl(45 100% 55% / 0.5)' : 'var(--color-border-subtle)'}`,
                    borderRadius: 'var(--radius-xl)',
                    padding: 'var(--space-5)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-4)',
                    boxShadow: isGold ? '0 0 24px hsl(45 100% 55% / 0.15)' : 'var(--shadow-md)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Rank Badge Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 'var(--space-1)',
                        padding: '4px 12px',
                        borderRadius: 'var(--radius-full)',
                        background: `${rankColor}22`,
                        border: `1px solid ${rankColor}66`,
                        color: rankColor,
                        fontWeight: 'var(--weight-bold)',
                        fontSize: 'var(--text-sm)',
                      }}
                    >
                      <Award size={14} />
                      <span>{rankIndex === 0 ? '🥇 1st Place' : rankIndex === 1 ? '🥈 2nd Place' : rankIndex === 2 ? '🥉 3rd Place' : `#${rankIndex + 1}`}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Star size={16} fill="hsl(45, 100%, 55%)" color="hsl(45, 100%, 55%)" />
                      <span style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--weight-bold)', color: 'var(--color-text-primary)' }}>
                        {summary.averageScore.toFixed(1)}
                      </span>
                      <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-tertiary)' }}>/ 5.0</span>
                    </div>
                  </div>

                  {/* Answer Content */}
                  <p
                    style={{
                      margin: 0,
                      fontSize: 'var(--text-sm)',
                      lineHeight: 1.5,
                      color: 'var(--color-text-primary)',
                      background: 'var(--color-bg-elevated)',
                      padding: 'var(--space-3)',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--color-border-subtle)',
                    }}
                  >
                    "{card.content}"
                  </p>

                  {/* Criteria Breakdown */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                    <span style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--weight-semibold)', color: 'var(--color-text-tertiary)', textTransform: 'uppercase' }}>
                      Rubric Breakdown ({summary.reviewCount} reviews)
                    </span>
                    {slide.rubric.map((crit) => {
                      const avg = summary.criteriaAverages[crit.id] ?? 0;
                      const pct = Math.min(100, Math.max(0, (avg / crit.maxScore) * 100));

                      return (
                        <div key={crit.id} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-xs)' }}>
                            <span style={{ color: 'var(--color-text-secondary)' }}>{crit.title}</span>
                            <span style={{ fontWeight: 'var(--weight-semibold)', color: 'var(--color-text-primary)' }}>
                              {avg.toFixed(1)} / {crit.maxScore}
                            </span>
                          </div>
                          <div
                            style={{
                              width: '100%',
                              height: 6,
                              borderRadius: 'var(--radius-full)',
                              background: 'var(--color-bg-base)',
                              overflow: 'hidden',
                            }}
                          >
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${pct}%` }}
                              transition={{ duration: 0.6 }}
                              style={{
                                height: '100%',
                                borderRadius: 'var(--radius-full)',
                                background: isGold
                                  ? 'linear-gradient(90deg, hsl(45, 100%, 55%), hsl(35, 100%, 50%))'
                                  : 'var(--color-brand-primary)',
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Recent Anonymous Feedback */}
                  {summary.recentFeedback.length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                      <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-tertiary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <MessageSquare size={12} />
                        Peer Feedback
                      </span>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {summary.recentFeedback.slice(0, 2).map((fb, idx) => (
                          <div
                            key={idx}
                            style={{
                              fontSize: 'var(--text-xs)',
                              color: 'var(--color-text-secondary)',
                              background: 'var(--color-bg-base)',
                              padding: '4px 8px',
                              borderRadius: 'var(--radius-sm)',
                              fontStyle: 'italic',
                            }}
                          >
                            "{fb}"
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* ── PHASE VIEW: GRADING / LIVE SWARM FEED ───────────────────────────── */}
      {activePhase !== 'reveal' && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: 'var(--space-4)',
          }}
        >
          {cardSummaries.map(({ card, summary }, index) => {
            return (
              <div
                key={card.id}
                style={{
                  background: 'var(--color-bg-surface)',
                  border: '1px solid var(--color-border-subtle)',
                  borderRadius: 'var(--radius-xl)',
                  padding: 'var(--space-5)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-4)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                {/* Header: Answer Identity & Score */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                    <span
                      style={{
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-md)',
                        background: 'var(--color-bg-elevated)',
                        color: 'var(--color-brand-accent)',
                        fontSize: 'var(--text-xs)',
                        fontWeight: 'var(--weight-bold)',
                        border: '1px solid var(--color-border-default)',
                      }}
                    >
                      Proposal #{index + 1}
                    </span>
                    {card.authorNickname && (
                      <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-tertiary)' }}>
                        by {card.authorNickname}
                      </span>
                    )}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                    <span
                      style={{
                        fontSize: 'var(--text-xs)',
                        color: 'var(--color-text-tertiary)',
                        padding: '2px 6px',
                        borderRadius: 'var(--radius-full)',
                        background: 'var(--color-bg-base)',
                      }}
                    >
                      {summary.reviewCount} reviews
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <Star size={14} fill="hsl(45, 100%, 55%)" color="hsl(45, 100%, 55%)" />
                      <strong style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)' }}>
                        {summary.averageScore > 0 ? summary.averageScore.toFixed(1) : '—'}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Answer Content */}
                <p
                  style={{
                    margin: 0,
                    fontSize: 'var(--text-sm)',
                    lineHeight: 1.5,
                    color: 'var(--color-text-primary)',
                    background: 'var(--color-bg-elevated)',
                    padding: 'var(--space-3)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--color-border-subtle)',
                  }}
                >
                  "{card.content}"
                </p>

                {/* Rubric Criteria Progress Bars */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  {slide.rubric.map((crit) => {
                    const avg = summary.criteriaAverages[crit.id] ?? 0;
                    const pct = Math.min(100, Math.max(0, (avg / crit.maxScore) * 100));

                    return (
                      <div key={crit.id} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-xs)' }}>
                          <span style={{ color: 'var(--color-text-secondary)' }}>{crit.title}</span>
                          <span style={{ fontWeight: 'var(--weight-semibold)', color: 'var(--color-text-primary)' }}>
                            {avg > 0 ? `${avg.toFixed(1)} / ${crit.maxScore}` : 'waiting...'}
                          </span>
                        </div>
                        <div
                          style={{
                            width: '100%',
                            height: 6,
                            borderRadius: 'var(--radius-full)',
                            background: 'var(--color-bg-base)',
                            overflow: 'hidden',
                          }}
                        >
                          <motion.div
                            animate={{ width: `${pct}%` }}
                            transition={{ duration: 0.4 }}
                            style={{
                              height: '100%',
                              borderRadius: 'var(--radius-full)',
                              background: 'var(--color-brand-primary)',
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Swarm Score Distribution Histogram (1..5 stars) */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-tertiary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <BarChart3 size={12} />
                    Score Distribution (1★ — 5★)
                  </span>
                  <div style={{ display: 'flex', alignItems: 'flex-end', height: 28, gap: '4px', paddingTop: '4px' }}>
                    {[1, 2, 3, 4, 5].map((star) => {
                      const count = summary.scoreDistribution[String(star)] ?? 0;
                      const maxCountInDistribution = Math.max(1, ...Object.values(summary.scoreDistribution));
                      const barHeightPct = summary.reviewCount > 0 ? (count / maxCountInDistribution) * 100 : 8;

                      return (
                        <div
                          key={star}
                          style={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            height: '100%',
                            justifyContent: 'flex-end',
                          }}
                        >
                          <motion.div
                            animate={{ height: `${barHeightPct}%` }}
                            transition={{ duration: 0.3 }}
                            style={{
                              width: '100%',
                              minHeight: 3,
                              borderRadius: '2px 2px 0 0',
                              background: count > 0 ? 'var(--color-brand-accent)' : 'var(--color-border-subtle)',
                            }}
                          />
                          <span style={{ fontSize: '9px', color: 'var(--color-text-tertiary)', marginTop: '2px' }}>
                            {star}★
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Recent Peer Feedback Snippets */}
                {summary.recentFeedback.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-tertiary)' }}>
                      Recent Feedback
                    </span>
                    {summary.recentFeedback.slice(0, 2).map((fb, idx) => (
                      <div
                        key={idx}
                        style={{
                          fontSize: 'var(--text-xs)',
                          color: 'var(--color-text-secondary)',
                          background: 'var(--color-bg-base)',
                          padding: '4px 8px',
                          borderRadius: 'var(--radius-sm)',
                          fontStyle: 'italic',
                        }}
                      >
                        "{fb}"
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
