import React from 'react';

export function NetworkMatchIcon({ size = 26, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 26 26"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {/* Three connected nodes */}
      <circle cx="6" cy="7" r="2.5" />
      <circle cx="20" cy="7" r="2.5" />
      <circle cx="13" cy="20" r="2.5" />
      <line x1="8.3" y1="7" x2="17.7" y2="7" />
      <line x1="7.4" y1="9.2" x2="11.6" y2="17.8" />
      <line x1="18.6" y1="9.2" x2="14.4" y2="17.8" />
    </svg>
  );
}
