import React, { useRef, useCallback, useEffect, useState } from 'react';
import { hapticTap } from '@shared/lib/haptic.js';

/**
 * PinInput — Issue 22: Accessible 6-digit PIN input.
 *
 * Accessibility:
 *   - One <label class="sr-only">Room code</label> linked via htmlFor to first input
 *   - Each input: aria-label="Digit N of 6", inputMode="numeric", pattern="[0-9]*"
 *   - autoComplete="one-time-code" on the first field
 *
 * Behavior:
 *   - Auto-focus, auto-advance between digits
 *   - Auto-submit when 6 digits entered
 *   - Haptic feedback per keystroke (Issue 16)
 *   - Native numeric keyboard (inputMode="numeric")
 *
 * Issue 36: Paste edge cases:
 *   - 7-digit paste truncates to 6
 *   - Letters strip out
 *   - Paste with spaces works (stripped)
 *   - Paste with dashes (123-456) works (stripped)
 */

interface PinInputProps {
  /** Called when all 6 digits are entered */
  onComplete: (pin: string) => void;
  /** Initial value (e.g., from URL param) */
  initialValue?: string;
  /** Disable input */
  disabled?: boolean;
}

export const PIN_LENGTH = 6;

/**
 * Issue 36: Clean and truncate pasted PIN text.
 * Strips non-numeric characters and limits to PIN_LENGTH.
 */
export function cleanPastedPin(pasted: string): string {
  return pasted.replace(/[^0-9]/g, '').slice(0, PIN_LENGTH);
}

export function PinInput({ onComplete, initialValue = '', disabled = false }: PinInputProps) {
  const [digits, setDigits] = useState<string[]>(() => {
    const cleaned = initialValue.replace(/[^0-9]/g, '').slice(0, PIN_LENGTH);
    const arr = new Array(PIN_LENGTH).fill('');
    for (let i = 0; i < cleaned.length; i++) {
      arr[i] = cleaned[i];
    }
    return arr;
  });

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const hasAutoSubmitted = useRef(false);

  // Auto-submit when complete
  useEffect(() => {
    const pin = digits.join('');
    if (pin.length === PIN_LENGTH && /^\d{6}$/.test(pin) && !hasAutoSubmitted.current) {
      hasAutoSubmitted.current = true;
      onComplete(pin);
    }
  }, [digits, onComplete]);

  // Auto-focus first empty digit on mount
  useEffect(() => {
    const firstEmpty = digits.findIndex((d) => d === '');
    const idx = firstEmpty === -1 ? 0 : firstEmpty;
    inputRefs.current[idx]?.focus();
  }, []);

  const handleChange = useCallback(
    (index: number, value: string) => {
      // Only accept a single digit
      const digit = value.replace(/[^0-9]/g, '').slice(-1);
      if (!digit) return;

      hapticTap();

      setDigits((prev) => {
        const next = [...prev];
        next[index] = digit;
        return next;
      });

      // Auto-advance to next input
      if (index < PIN_LENGTH - 1) {
        inputRefs.current[index + 1]?.focus();
      }

      hasAutoSubmitted.current = false;
    },
    [],
  );

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace') {
        e.preventDefault();
        setDigits((prev) => {
          const next = [...prev];
          if (next[index]) {
            next[index] = '';
          } else if (index > 0) {
            next[index - 1] = '';
            inputRefs.current[index - 1]?.focus();
          }
          return next;
        });
        hasAutoSubmitted.current = false;
      } else if (e.key === 'ArrowLeft' && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else if (e.key === 'ArrowRight' && index < PIN_LENGTH - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    },
    [],
  );

  /**
   * Issue 36: Paste handler
   * Strips non-numeric, truncates to 6, distributes across fields, auto-submits.
   * Handles: "123456", "123-456", "12 34 56", "1234567" (truncated), "abc123def456"
   */
  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pasted = e.clipboardData.getData('text');
      const cleaned = cleanPastedPin(pasted);

      if (cleaned.length === 0) return;

      hapticTap();

      const newDigits = new Array(PIN_LENGTH).fill('');
      for (let i = 0; i < cleaned.length; i++) {
        newDigits[i] = cleaned[i];
      }
      setDigits(newDigits);
      hasAutoSubmitted.current = false;

      // Focus the field after the last pasted digit
      const focusIdx = Math.min(cleaned.length, PIN_LENGTH - 1);
      inputRefs.current[focusIdx]?.focus();
    },
    [],
  );

  return (
    <div>
      {/* Issue 22: Screen-reader label */}
      <label htmlFor="pin-digit-0" className="sr-only">
        Room code
      </label>

      <div
        style={{
          display: 'flex',
          gap: 'var(--sp-2, 8px)',
          justifyContent: 'center',
        }}
      >
        {digits.map((digit, i) => (
          <input
            key={i}
            ref={(el) => { inputRefs.current[i] = el; }}
            id={i === 0 ? 'pin-digit-0' : undefined}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={digit}
            disabled={disabled}
            aria-label={`Digit ${i + 1} of ${PIN_LENGTH}`}
            autoComplete={i === 0 ? 'one-time-code' : 'off'}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            onFocus={(e) => e.target.select()}
            style={{
              width: '64px',
              height: '72px',
              fontSize: '32px',
              fontFamily: 'var(--font-mono)',
              fontWeight: 500,
              textAlign: 'center',
              background: 'var(--surface-3)',
              color: 'var(--fg)',
              border: digit
                ? '1px solid var(--accent)'
                : '1px solid var(--hairline)',
              borderRadius: 'var(--r-card)',
              outline: 'none',
              transition: 'border-color 120ms ease, background-color 120ms ease',
              caretColor: 'var(--accent)',
            }}
          />
        ))}
      </div>
    </div>
  );
}
