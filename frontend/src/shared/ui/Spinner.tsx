import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../lib/utils.js';

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
  label?: string;
}

export function Spinner({
  size = 24,
  label,
  className,
  style,
  ...props
}: SpinnerProps) {
  return (
    <div
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--space-2)',
        color: 'var(--color-brand-primary)',
        ...style,
      }}
      className={cn('pairly-spinner-container', className)}
      {...props}
    >
      <Loader2 size={size} style={{ animation: 'spin 1s linear infinite' }} />
      {label && (
        <span
          style={{
            fontSize: 'var(--text-sm)',
            color: 'var(--color-text-secondary)',
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}
