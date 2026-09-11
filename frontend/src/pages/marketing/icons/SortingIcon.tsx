import React from 'react';

export function SortingIcon({ size = 26, className = '' }: { size?: number; className?: string }) {
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
      {/* Three lines with curved arrow indicating sequential sorting */}
      <line x1="4" y1="6" x2="14" y2="6" />
      <line x1="4" y1="13" x2="14" y2="13" />
      <line x1="4" y1="20" x2="14" y2="20" />
      <path d="M19 8v10m0 0l-3-3m3 3l3-3" />
    </svg>
  );
}
