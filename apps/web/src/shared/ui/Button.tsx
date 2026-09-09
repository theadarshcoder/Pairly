import React, { type ButtonHTMLAttributes } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../lib/utils.js';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      style,
      ...props
    },
    ref,
  ) => {
    const baseStyles: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'var(--space-2)',
      fontWeight: 'var(--weight-semibold)',
      fontFamily: 'var(--font-sans)',
      borderRadius: 'var(--radius-lg)',
      transition: 'all var(--transition-fast)',
      cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.6 : 1,
      outline: 'none',
      border: '1px solid transparent',
      textDecoration: 'none',
      userSelect: 'none',
    };

    const sizeStyles: Record<string, React.CSSProperties> = {
      sm: {
        padding: 'var(--space-1) var(--space-3)',
        fontSize: 'var(--text-xs)',
        height: '2rem',
      },
      md: {
        padding: 'var(--space-2) var(--space-4)',
        fontSize: 'var(--text-sm)',
        height: '2.5rem',
      },
      lg: {
        padding: 'var(--space-3) var(--space-6)',
        fontSize: 'var(--text-base)',
        height: '3rem',
      },
    };

    const variantStyles: Record<string, React.CSSProperties> = {
      primary: {
        backgroundColor: 'var(--color-brand-primary)',
        color: '#ffffff',
        boxShadow: '0 2px 8px hsl(250 84% 60% / 0.35)',
      },
      secondary: {
        backgroundColor: 'var(--color-bg-elevated)',
        color: 'var(--color-text-primary)',
        borderColor: 'var(--color-border-default)',
      },
      outline: {
        backgroundColor: 'transparent',
        color: 'var(--color-text-primary)',
        borderColor: 'var(--color-border-strong)',
      },
      ghost: {
        backgroundColor: 'transparent',
        color: 'var(--color-text-secondary)',
      },
      danger: {
        backgroundColor: 'var(--color-error)',
        color: '#ffffff',
      },
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        style={{
          ...baseStyles,
          ...sizeStyles[size],
          ...variantStyles[variant],
          ...style,
        }}
        className={cn('pairly-btn', className)}
        {...props}
      >
        {isLoading ? (
          <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  },
);

Button.displayName = 'Button';
