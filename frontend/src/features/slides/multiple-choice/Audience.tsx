import { useState } from 'react';
import { motion } from 'framer-motion';
import { haptic } from '../../../shared/lib/haptic.js';
import { RewardCheck } from '../../../shared/ui/RewardCheck.js';
import type { MultipleChoiceSlide } from '@pairly/schemas';

export function MultipleChoiceAudience({
  slide,
  onSubmit,
}: {
  slide: MultipleChoiceSlide;
  onSubmit: (optionId: string) => void;
}) {
  const [submitted, setSubmitted] = useState<string | null>(null);

  if (submitted) {
    return (
      <div
        className="audience-submitted"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'var(--space-4)',
          padding: 'var(--space-8)',
          textAlign: 'center',
        }}
      >
        <RewardCheck />
        <p style={{ color: 'var(--fg-muted, #9393A0)', fontSize: 'var(--text-base)' }}>Answer recorded</p>
      </div>
    );
  }

  return (
    <div
      className="audience-mc"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-3)',
        width: '100%',
        maxWidth: '440px',
        padding: 'var(--space-4)',
      }}
    >
      {slide.options.map((opt) => (
        <motion.button
          key={opt.id}
          className="audience-mc-option"
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            haptic(10);
            setSubmitted(opt.id);
            onSubmit(opt.id);
          }}
          style={{
            padding: 'var(--space-4)',
            borderRadius: 'var(--radius-lg, 12px)',
            background: 'var(--surface-2, #18181C)',
            border: '1px solid var(--border-default, #2E2E38)',
            color: 'var(--fg-base, #F2F2F4)',
            fontSize: 'var(--text-lg, 18px)',
            fontWeight: 500,
            cursor: 'pointer',
            textAlign: 'left',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            transition: 'background 0.15s ease, border-color 0.15s ease',
          }}
        >
          <span>{opt.label}</span>
        </motion.button>
      ))}
    </div>
  );
}
