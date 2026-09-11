import React from 'react';

export function QnaIcon({ size = 26, className = '' }: { size?: number; className?: string }) {
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
      {/* A speech bubble with two lines inside */}
      <path d="M21 13c0 4.418-3.806 8-8.5 8a9.42 9.42 0 01-3.2-.56L4 22l1.2-3.2A7.8 7.8 0 014 13c0-4.418 3.806-8 8.5-8s8.5 3.582 8.5 8z" />
      <line x1="8.5" y1="11.5" x2="16.5" y2="11.5" />
      <line x1="8.5" y1="14.5" x2="13.5" y2="14.5" />
    </svg>
  );
}
