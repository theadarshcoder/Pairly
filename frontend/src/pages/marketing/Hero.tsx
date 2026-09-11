import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MoveRight, PlayCircle, Users, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  const navigate = useNavigate();

  // Dynamic cycling titles powered by framer-motion spring physics
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ['think.', 'reason.', 'solve.', 'connect.', 'learn.'],
    []
  );

  // Static longest title reservation keeps "See how they" completely stationary
  const longestTitle = useMemo(
    () => titles.reduce((longest, current) => (current.length > longest.length ? current : longest), ''),
    [titles]
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2200);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  // 6-digit PIN input state prefilled with DEMO00
  const [digits, setDigits] = useState<string[]>(['D', 'E', 'M', 'O', '0', '0']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Product mockup scroll animation state
  const mockRef = useRef<HTMLDivElement>(null);
  const [mockVisible, setMockVisible] = useState(false);

  useEffect(() => {
    const el = mockRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMockVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      navigate('/join/DEMO');
      return;
    }
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleChange = (index: number, val: string) => {
    const char = val.slice(-1).toUpperCase();
    const next = [...digits];
    next[index] = char;
    setDigits(next);
    if (char && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
    if (next.every((d) => d.length > 0) && next.join('').length === 6) {
      navigate('/join/DEMO');
    }
  };

  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '160px 32px 80px',
        boxSizing: 'border-box',
      }}
    >
      {/* Centered Hero Content */}
      <div
        style={{
          maxWidth: 880,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        {/* Craft signature: Italic serif pill */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '6px 14px',
            border: '1px solid var(--hairline-light-strong)',
            borderRadius: 9999,
            marginBottom: 28,
            userSelect: 'none',
          }}
        >
          <span
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontStyle: 'italic',
              fontSize: 14,
              color: 'var(--fg-light-muted)',
            }}
          >
            Live in the classroom
          </span>
        </div>

        {/* Headline: Instrument Serif + Framer Motion Kinetic Cycling Typography */}
        <h1
          style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontWeight: 400,
            fontSize: 'clamp(3rem, 7.5vw, 6.5rem)',
            letterSpacing: '-0.035em',
            lineHeight: 1.0,
            color: 'var(--fg-light)',
            margin: 0,
          }}
        >
          <span>Ask better questions.</span>
          <br />
          <span>See how they</span>{' '}
          <span className="relative inline-block text-left" style={{ verticalAlign: 'baseline' }}>
            <span className="invisible select-none opacity-0 font-serif italic" aria-hidden="true">
              {longestTitle}
            </span>
            <AnimatePresence>
              <motion.span
                key={titles[titleNumber]}
                className="absolute left-0 top-0 font-serif italic text-indigo-600 dark:text-indigo-400 whitespace-nowrap"
                initial={{ opacity: 0, y: -24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 24 }}
                transition={{ type: 'spring', stiffness: 80, damping: 15 }}
              >
                {titles[titleNumber]}
              </motion.span>
            </AnimatePresence>
          </span>
        </h1>

        {/* Subtext */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 18,
            color: 'var(--fg-light-muted)',
            maxWidth: 560,
            lineHeight: 1.6,
            marginTop: 32,
            marginBottom: 0,
          }}
        >
          Students tap, draw, and sort on their phones. You see who actually
          understands, and who's just nodding along.
        </p>

        {/* CTA row using shadcn Buttons */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginTop: 48,
          }}
        >
          <Button
            size="lg"
            className="gap-2 rounded-full px-7 h-12 text-base font-medium"
            onClick={() => navigate('/join/DEMO')}
          >
            Get started free <MoveRight className="w-4 h-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="gap-2 rounded-full px-7 h-12 text-base font-medium border-neutral-300 hover:bg-neutral-100"
            onClick={() => {
              const el = document.getElementById('features');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            See it in action
          </Button>
        </div>

        {/* Slido-inspired PIN demo */}
        <div style={{ marginTop: 56, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              color: 'var(--fg-light-subtle)',
              marginBottom: 14,
            }}
          >
            Enter the demo room
          </span>

          <div style={{ display: 'flex', gap: 10 }}>
            {digits.map((ch, i) => (
              <input
                key={i}
                ref={(el) => {
                  inputRefs.current[i] = el;
                }}
                value={ch}
                maxLength={1}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                onClick={(e) => (e.target as HTMLInputElement).select()}
                style={{
                  width: 56,
                  height: 64,
                  background: 'var(--surface-light-1, #FFFFFF)',
                  border: '1px solid var(--hairline-light-strong, rgba(0, 0, 0, 0.12))',
                  borderRadius: 12,
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontSize: 28,
                  textAlign: 'center',
                  color: 'var(--fg-light, #1A1A1A)',
                  boxShadow: 'var(--shadow-card, 0 1px 2px rgba(0,0,0,0.04))',
                  outline: 'none',
                  transition: 'border-color 150ms ease, box-shadow 150ms ease',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--accent-light, #5B4DE8)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--hairline-light-strong, rgba(0, 0, 0, 0.12))')}
                aria-label={`Digit ${i + 1} of 6`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Hero product visual - CSS mock of presenter view with scroll tilt */}
      <div
        ref={mockRef}
        style={{
          width: '100%',
          maxWidth: 1100,
          marginTop: 96,
          background: 'var(--surface-light-1, #FFFFFF)',
          borderRadius: 20,
          boxShadow: 'var(--shadow-soft, 0 16px 40px rgba(0, 0, 0, 0.06))',
          border: '1px solid var(--hairline-light, rgba(0, 0, 0, 0.06))',
          padding: '24px 28px',
          boxSizing: 'border-box',
          transform: mockVisible ? 'rotate(0deg) scale(1)' : 'rotate(-1deg) scale(0.98)',
          transition: 'transform 800ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Mock presenter stage header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--hairline-light, rgba(0, 0, 0, 0.06))',
            paddingBottom: 16,
            marginBottom: 28,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: 'var(--accent-light, #5B4DE8)',
                display: 'inline-block',
              }}
            />
            <span
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: 18,
                color: 'var(--fg-light, #1A1A1A)',
              }}
            >
              Pairly Presenter
            </span>
          </div>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              fontVariantNumeric: 'tabular-nums',
              color: 'var(--fg-light-muted, #6B6B6B)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <Users className="w-4 h-4 text-neutral-400" />
            <span style={{ color: 'var(--fg-light, #1A1A1A)', fontWeight: 500 }}>142</span>
            <span>connected students</span>
          </div>
        </div>

        {/* Slide mock content */}
        <div style={{ padding: '8px 24px 24px' }}>
          <h3
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontSize: 'clamp(22px, 3vw, 28px)',
              fontWeight: 400,
              color: 'var(--fg-light, #1A1A1A)',
              letterSpacing: '-0.02em',
              margin: '0 0 32px 0',
              maxWidth: 720,
              lineHeight: 1.25,
            }}
          >
            Which consistency model guarantees sequential updates without global clock synchronization?
          </h3>

          {/* Bar chart mock */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-around',
              height: 200,
              borderBottom: '1px solid var(--hairline-light, rgba(0, 0, 0, 0.06))',
              paddingBottom: 16,
              gap: 24,
            }}
          >
            {[
              { label: 'Strict Serializability', pct: 18, count: '26' },
              { label: 'Linearizability', pct: 72, count: '102' },
              { label: 'Causal Consistency', pct: 34, count: '48' },
              { label: 'Read-Your-Writes', pct: 12, count: '17' },
            ].map((col) => (
              <div
                key={col.label}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <div className="flex items-center gap-1">
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 13,
                      fontVariantNumeric: 'tabular-nums',
                      fontWeight: 500,
                      color: 'var(--fg-light, #1A1A1A)',
                    }}
                  >
                    {col.pct}%
                  </span>
                  {col.pct === 72 && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />}
                </div>
                <div
                  style={{
                    width: '100%',
                    maxWidth: 100,
                    height: `${col.pct * 1.6}px`,
                    background: col.pct === 72 ? 'var(--accent-light, #5B4DE8)' : 'var(--accent-light, #5B4DE8)',
                    borderRadius: '6px 6px 0 0',
                    opacity: col.pct === 72 ? 1 : 0.45,
                    transition: 'height 400ms ease',
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 12,
                    color: 'var(--fg-light-muted, #6B6B6B)',
                    textAlign: 'center',
                    lineHeight: 1.3,
                  }}
                >
                  {col.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reassurance line below product visual */}
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 13,
          color: 'var(--fg-light-subtle, #A0A0A0)',
          textAlign: 'center',
          marginTop: 28,
          marginBottom: 0,
        }}
      >
        No install. No account. Works on any phone.
      </p>
    </section>
  );
}
