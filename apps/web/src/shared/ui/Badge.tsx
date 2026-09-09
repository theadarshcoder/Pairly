import React from 'react';
import { cn } from '../lib/utils.js';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'brand' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md';
}

export function Badge({
  className,
  variant = 'default',
  size = 'md',
  children,
  style,
  ...props
}: BadgeProps) {
  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--space-1)',
    borderRadius: 'var(--radius-full)',
    fontWeight: 'var(--weight-semibold)',
    fontFamily: 'var(--font-sans)',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
  };

  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: {
      padding: '2px var(--space-2)',
      fontSize: '0.6875rem',
    },
    md: {
      padding: 'var(--space-1) var(--space-3)',
      fontSize: 'var(--text-xs)',
    },
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    default: {
      backgroundColor: 'var(--color-bg-elevated)',
      color: 'var(--color-text-secondary)',
      border: '1px solid var(--color-border-subtle)',
    },
    brand: {
      backgroundColor: 'hsl(250 84% 60% / 0.15)',
      color: 'var(--color-brand-primary)',
      border: '1px solid hsl(250 84% 60% / 0.3)',
    },
    success: {
      backgroundColor: 'hsl(142 76% 45% / 0.15)',
      color: 'var(--color-success)',
      border: '1px solid hsl(142 76% 45% / 0.3)',
    },
    warning: {
      backgroundColor: 'hsl(38 100% 50% / 0.15)',
      color: 'var(--color-warning)',
      border: '1px solid hsl(38 100% 50% / 0.3)',
    },
    error: {
      backgroundColor: 'hsl(0 84% 60% / 0.15)',
      color: 'var(--color-error)',
      border: '1px solid hsl(0 84% 60% / 0.3)',
    },
  };

  return (
    <span
      style={{
        ...baseStyles,
        ...sizeStyles[size],
        ...variantStyles[variant],
        ...style,
      }}
      className={cn('pairly-badge', className)}
      {...props}
    >
      {children}
    </span>
  );
}
