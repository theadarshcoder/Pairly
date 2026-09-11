import { describe, it, expect } from 'vitest';
import { cleanPastedPin, PIN_LENGTH } from './PinInput.js';

describe('PinInput paste edge cases (Issue 36 / V3)', () => {
  it('paste "123-456": fills all six digits and qualifies for auto-submit', () => {
    const raw = '123-456';
    const cleaned = cleanPastedPin(raw);
    expect(cleaned).toBe('123456');
    expect(cleaned.length).toBe(PIN_LENGTH);
    expect(/^\d{6}$/.test(cleaned)).toBe(true);
  });

  it('paste "1234567": truncates to six digits and qualifies for auto-submit', () => {
    const raw = '1234567';
    const cleaned = cleanPastedPin(raw);
    expect(cleaned).toBe('123456');
    expect(cleaned.length).toBe(PIN_LENGTH);
    expect(/^\d{6}$/.test(cleaned)).toBe(true);
  });

  it('paste "12ab34": strips letters resulting in 4 digits (no auto-submit)', () => {
    const raw = '12ab34';
    const cleaned = cleanPastedPin(raw);
    expect(cleaned).toBe('1234');
    expect(cleaned.length).toBe(4);
    expect(cleaned.length === PIN_LENGTH).toBe(false);
  });

  it('paste formatted with spaces "12 34 56": strips spaces into 6 digits', () => {
    const raw = '12 34 56';
    const cleaned = cleanPastedPin(raw);
    expect(cleaned).toBe('123456');
    expect(cleaned.length).toBe(PIN_LENGTH);
  });

  it('paste non-numeric only "abcdef": results in empty string', () => {
    const raw = 'abcdef';
    const cleaned = cleanPastedPin(raw);
    expect(cleaned).toBe('');
  });
});
