import { type ReactNode, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

/**
 * BottomSheet — Issue 11: Audience-only confirmation sheet.
 *
 * Modal.tsx is scoped to presenter and dashboard ONLY.
 * The audience side uses BottomSheet for confirmations.
 * It slides up from the bottom 60% of the viewport — native mobile feel.
 * No modal on the audience side, ever.
 */

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export function BottomSheet({ isOpen, onClose, title, children }: BottomSheetProps) {
  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 'var(--z-modal, 300)' as any,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}
        >
          {/* Scrim */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(2px)',
            }}
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
              position: 'relative',
              maxHeight: '60vh',
              background: 'var(--surface-1, #121215)',
              borderTop: '1px solid var(--hairline-strong, rgba(255,255,255,0.14))',
              borderRadius: 'var(--r-stage, 12px) var(--r-stage, 12px) 0 0',
              overflow: 'auto',
              zIndex: 1,
            }}
          >
            {/* Drag handle */}
            <div
              style={{
                width: '36px',
                height: '4px',
                borderRadius: 'var(--r-pill, 9999px)',
                background: 'var(--hairline-strong, rgba(255,255,255,0.14))',
                margin: '12px auto 0',
              }}
            />

            {/* Header */}
            {title && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 'var(--sp-4, 16px) var(--sp-6, 24px)',
                }}
              >
                <h3
                  style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: 'var(--fg, #F2F2F4)',
                  }}
                >
                  {title}
                </h3>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  style={{
                    color: 'var(--fg-muted, #9A9AA4)',
                    padding: '4px',
                    borderRadius: 'var(--r-card, 8px)',
                    display: 'flex',
                    cursor: 'pointer',
                  }}
                >
                  <X size={20} />
                </button>
              </div>
            )}

            {/* Content */}
            <div style={{ padding: '0 var(--sp-6, 24px) var(--sp-6, 24px)' }}>
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
