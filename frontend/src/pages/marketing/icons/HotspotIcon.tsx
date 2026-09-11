import React from 'react';

export function HotspotIcon({ size = 26, className = '' }: { size?: number; className?: string }) {
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
      {/* Target / crosshair */}
      <circle cx="13" cy="13" r="8.5" />
      <circle cx="13" cy="13" r="3.5" />
      <line x1="13" y1="2" x2="13" y2="5" />
      <line x1="13" y1="21" x2="13" y2="24" />
      <line x1="2" y1="13" x2="5" y2="13" />
      <line x1="21" y1="13" x2="24" y2="13" />
    </svg>
  );
}
