/**
 * QRJoinCode — Issue 18: SVG-based QR code for join URL.
 *
 * Uses react-qr-code (SVG-based, no canvas dependency).
 * Styled with --fg on --bg. Canvas-based QR libraries can't be token-styled.
 *
 * TODO: Install react-qr-code: pnpm --filter @pairly/web add react-qr-code
 * Until then, renders a placeholder.
 */

interface QRJoinCodeProps {
  pin: string;
  size?: number;
}

export function QRJoinCode({ pin, size = 120 }: QRJoinCodeProps) {
  const joinUrl = `${window.location.origin}/join/${pin}`;

  // TODO(Issue 18): Replace with react-qr-code once installed:
  // import QRCode from 'react-qr-code';
  // return <QRCode value={joinUrl} size={size} fgColor="var(--fg)" bgColor="var(--bg)" />

  return (
    <div
      title={joinUrl}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        background: 'var(--fg, #F2F2F4)',
        borderRadius: 'var(--r-card, 8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Placeholder grid pattern until react-qr-code is installed */}
      <svg width={size - 16} height={size - 16} viewBox="0 0 100 100">
        {/* Finder patterns */}
        <rect x="0" y="0" width="30" height="30" rx="3" fill="var(--accent, #7C5CFF)" />
        <rect x="4" y="4" width="22" height="22" rx="2" fill="var(--fg, #F2F2F4)" />
        <rect x="8" y="8" width="14" height="14" rx="1" fill="var(--accent, #7C5CFF)" />

        <rect x="70" y="0" width="30" height="30" rx="3" fill="var(--accent, #7C5CFF)" />
        <rect x="74" y="4" width="22" height="22" rx="2" fill="var(--fg, #F2F2F4)" />
        <rect x="78" y="8" width="14" height="14" rx="1" fill="var(--accent, #7C5CFF)" />

        <rect x="0" y="70" width="30" height="30" rx="3" fill="var(--accent, #7C5CFF)" />
        <rect x="4" y="74" width="22" height="22" rx="2" fill="var(--fg, #F2F2F4)" />
        <rect x="8" y="78" width="14" height="14" rx="1" fill="var(--accent, #7C5CFF)" />

        {/* Data area placeholder */}
        {Array.from({ length: 8 }).map((_, row) =>
          Array.from({ length: 8 }).map((_, col) => {
            const show = (row + col) % 3 !== 0;
            if (!show) return null;
            return (
              <rect
                key={`${row}-${col}`}
                x={35 + col * 4}
                y={35 + row * 4}
                width="3"
                height="3"
                fill="var(--bg, #0A0A0C)"
                opacity={0.6}
              />
            );
          })
        )}
      </svg>
      <div
        style={{
          position: 'absolute',
          bottom: '2px',
          fontSize: '7px',
          fontFamily: 'var(--font-mono)',
          color: 'var(--bg, #0A0A0C)',
          opacity: 0.5,
        }}
      >
        {pin}
      </div>
    </div>
  );
}
