import React from 'react';

export function PeerReviewIcon({ size = 26, className = '' }: { size?: number; className?: string }) {
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
      {/* A clean geometric star / constellation */}
      <polygon points="13,2.5 16.3,9.5 24,10.4 18.3,15.6 19.8,23.2 13,19.4 6.2,23.2 7.7,15.6 2,10.4 9.7,9.5" />
    </svg>
  );
}
