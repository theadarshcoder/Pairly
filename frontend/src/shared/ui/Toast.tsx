import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertTriangle, Info, WifiOff } from 'lucide-react';

/**
 * Toast — Issue 30: Notification toasts.
 *
 * Used for: "Session ended", "Answer submitted", "Reconnecting", etc.
 * Uses --z-toast from tokens.
 *
 * Auto-dismisses after `duration` ms (default 4000).
 */

type ToastVariant = 'success' | 'error' | 'warning' | 'info';

interface ToastData {
  id: string;
  message: string;
  variant: ToastVariant;
  duration?: number;
}

const icons: Record<ToastVariant, typeof CheckCircle> = {
  success: CheckCircle,
  error: WifiOff,
  warning: AlertTriangle,
  info: Info,
};

const colors: Record<ToastVariant, string> = {
  success: 'var(--ok, #2DD4A7)',
  error: 'var(--bad, #FF4D6D)',
  warning: 'var(--warn, #FFB020)',
  info: 'var(--accent, #7C5CFF)',
};

// ── Global toast state (singleton) ─────────────────────────────────────

let toastListeners: Array<(toasts: ToastData[]) => void> = [];
let toastQueue: ToastData[] = [];

function notifyListeners() {
  toastListeners.forEach((fn) => fn([...toastQueue]));
}

/** Show a toast from anywhere (no React context needed) */
export function showToast(message: string, variant: ToastVariant = 'info', duration = 4000) {
  const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  toastQueue.push({ id, message, variant, duration });
  notifyListeners();

  // Auto-dismiss
  setTimeout(() => {
    toastQueue = toastQueue.filter((t) => t.id !== id);
    notifyListeners();
  }, duration);
}

// ── Toast Container Component ──────────────────────────────────────────

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  useEffect(() => {
    toastListeners.push(setToasts);
    return () => {
      toastListeners = toastListeners.filter((fn) => fn !== setToasts);
    };
  }, []);

  const dismiss = useCallback((id: string) => {
    toastQueue = toastQueue.filter((t) => t.id !== id);
    notifyListeners();
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 'var(--sp-4, 16px)',
        right: 'var(--sp-4, 16px)',
        zIndex: 'var(--z-toast, 400)' as any,
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--sp-2, 8px)',
        maxWidth: '380px',
        pointerEvents: 'none',
      }}
    >
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = icons[toast.variant];
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--sp-3, 12px)',
                padding: 'var(--sp-3, 12px) var(--sp-4, 16px)',
                background: 'var(--surface-2, #1A1A1F)',
                border: `1px solid ${colors[toast.variant]}33`,
                borderRadius: 'var(--r-card, 8px)',
                fontSize: '13px',
                color: 'var(--fg, #F2F2F4)',
                pointerEvents: 'all',
                boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
              }}
            >
              <Icon size={16} style={{ color: colors[toast.variant], flexShrink: 0 }} />
              <span style={{ flex: 1 }}>{toast.message}</span>
              <button
                onClick={() => dismiss(toast.id)}
                aria-label="Dismiss"
                style={{
                  color: 'var(--fg-subtle, #7A7A88)',
                  cursor: 'pointer',
                  flexShrink: 0,
                  padding: '2px',
                }}
              >
                <X size={14} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
