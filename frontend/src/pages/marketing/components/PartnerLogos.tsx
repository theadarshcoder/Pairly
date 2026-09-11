import React from 'react';

export function StanfordLogo({ height = 22, className = '' }: { height?: number; className?: string }) {
  return (
    <span
      style={{
        fontFamily: '"Times New Roman", Times, Georgia, serif',
        fontSize: `${height * 1.15}px`,
        fontWeight: 600,
        letterSpacing: '0.04em',
        textTransform: 'capitalize',
        whiteSpace: 'nowrap',
      }}
      className={className}
    >
      Stanford
    </span>
  );
}

export function HarvardLogo({ height = 22, className = '' }: { height?: number; className?: string }) {
  return (
    <span
      style={{
        fontFamily: 'Georgia, "Times New Roman", serif',
        fontSize: `${height * 1.05}px`,
        fontWeight: 700,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
      }}
      className={className}
    >
      Harvard
    </span>
  );
}

export function MITLogo({ height = 20, className = '' }: { height?: number; className?: string }) {
  return (
    <svg height={height} viewBox="0 0 74 34" fill="currentColor" className={className} aria-label="MIT">
      {/* MIT Iconic geometric bar logo */}
      {/* M */}
      <rect x="0" y="0" width="8" height="34" />
      <rect x="14" y="0" width="8" height="22" />
      <rect x="28" y="0" width="8" height="34" />
      {/* I */}
      <rect x="42" y="0" width="8" height="34" />
      {/* T */}
      <rect x="42" y="0" width="32" height="8" />
      <rect x="54" y="0" width="8" height="34" />
    </svg>
  );
}

export function BerkeleyLogo({ height = 22, className = '' }: { height?: number; className?: string }) {
  return (
    <span
      style={{
        fontFamily: 'Georgia, "Times New Roman", serif',
        fontSize: `${height * 1.1}px`,
        fontWeight: 600,
        letterSpacing: '0.02em',
        whiteSpace: 'nowrap',
      }}
      className={className}
    >
      Berkeley
    </span>
  );
}

export function OxfordLogo({ height = 22, className = '' }: { height?: number; className?: string }) {
  return (
    <span
      style={{
        fontFamily: '"Times New Roman", Times, Georgia, serif',
        fontSize: `${height * 1.05}px`,
        fontWeight: 600,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
      }}
      className={className}
    >
      Oxford
    </span>
  );
}

export function CambridgeLogo({ height = 22, className = '' }: { height?: number; className?: string }) {
  return (
    <span
      style={{
        fontFamily: '"Times New Roman", Times, Georgia, serif',
        fontSize: `${height * 1.05}px`,
        fontWeight: 600,
        letterSpacing: '0.08em',
        textTransform: 'capitalize',
        whiteSpace: 'nowrap',
      }}
      className={className}
    >
      Cambridge
    </span>
  );
}

export function AmazonLogo({ height = 24, className = '' }: { height?: number; className?: string }) {
  return (
    <svg height={height} viewBox="0 0 100 30" fill="currentColor" className={className} aria-label="Amazon">
      <path d="M52.3 22.8c-7.2 5.3-17.7 8.1-26.7 8.1-12.6 0-23.9-4.6-32.5-12.3-.7-.6-.1-1.4.7-1 9.1 5.2 20.3 8.4 31.8 8.4 8 0 16.8-1.9 24.9-5.9 1.2-.6 2.3.9 1.8 2.7zm3.1-1.9c-.9-1.2-6-5.8-6-5.8s3.9-.3 7.8 1.4c3.9 1.7 5.5 4.5 5.5 4.5s-2.1 1.7-7.3-.1z"/>
      <path d="M12.9 18.2h-3.3v-12h3.3v12zm1.9-8.4c0-2.6-2.1-4.2-5.2-4.2-2.9 0-5 1.6-5.2 3.8h3c.1-.9.9-1.6 2.2-1.6 1.3 0 2 .6 2 1.6v.7c-4.4.3-6.6 1.3-6.6 3.9 0 2.2 1.6 3.4 3.7 3.4 1.8 0 3-.8 3.6-2.1v1.8h3.1V9.8h-1.8zm-3.1 5.6c-.6.9-1.5 1.3-2.5 1.3-1.1 0-1.8-.6-1.8-1.7 0-1.3 1.1-1.9 3.5-2.1l.8-.1v2.6zm9.3-5.6v-1.2h-3.1v11.4h3.1v-6.3c0-1.7.9-2.7 2.3-2.7.4 0 .7.1 1 .2V9.8c-.3-.1-.7-.1-1.1-.1-1.1 0-1.9.6-2.2 1.5zm11.2 5.8c-2.4 0-4-1.8-4-4.5 0-2.6 1.6-4.5 4-4.5 2.4 0 4 1.8 4 4.5 0 2.6-1.6 4.5-4 4.5zm0-11.7c-4.1 0-7.2 3.1-7.2 7.2 0 4.1 3.1 7.2 7.2 7.2 4.1 0 7.2-3.1 7.2-7.2 0-4.1-3.1-7.2-7.2-7.2zm11.4 11.5v-7.1c0-1.7.9-2.7 2.3-2.7 1.4 0 2.1 1 2.1 2.7v7.1h3.1v-7.6c0-3.1-1.7-4.6-4.2-4.6-1.6 0-2.8.8-3.3 2.1V9.8h-3.1v11.4h3.1z"/>
    </svg>
  );
}

export function AdobeLogo({ height = 24, className = '' }: { height?: number; className?: string }) {
  return (
    <svg height={height} viewBox="0 0 110 26" fill="currentColor" className={className} aria-label="Adobe">
      <path d="M15.4 0H0v25.2h15.4V0zM6.9 16.5l8.5-16.5h8.5v25.2h-6.2v-7.6h-7.1l-3.7 8.9H0L6.9 16.5zm10.8-3.4v-6.4l-3.3 6.4h3.3zM25.7 0l8.5 25.2h-6.2l-2.1-6.3H17.8L25.7 0z" />
      <text x="36" y="19" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="700" fontSize="20" letterSpacing="-0.5">Adobe</text>
    </svg>
  );
}

export function VercelLogo({ height = 22, className = '' }: { height?: number; className?: string }) {
  return (
    <div className={`inline-flex items-center gap-2 ${className}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
      <svg height={height * 0.75} viewBox="0 0 76 65" fill="currentColor" aria-label="Vercel mark">
        <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
      </svg>
      <span style={{ fontFamily: 'system-ui, sans-serif', fontWeight: 700, fontSize: `${height * 0.95}px`, letterSpacing: '-0.03em' }}>
        Vercel
      </span>
    </div>
  );
}

export function ZoomLogo({ height = 24, className = '' }: { height?: number; className?: string }) {
  return (
    <svg height={height} viewBox="0 0 110 30" fill="currentColor" className={className} aria-label="Zoom">
      <text x="0" y="24" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="28" letterSpacing="-0.04em">
        zoom
      </text>
    </svg>
  );
}

export function LATimesLogo({ height = 24, className = '' }: { height?: number; className?: string }) {
  return (
    <span style={{ fontFamily: '"Old English Text MT", "UnifrakturMaguntia", "Cloister Black", Georgia, serif', fontSize: `${height * 1.05}px`, fontWeight: 700, letterSpacing: '0.02em', whiteSpace: 'nowrap' }} className={className}>
      Los Angeles Times
    </span>
  );
}
