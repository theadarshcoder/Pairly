/**
 * ConnectionDot — Issue 8: Presenter-only connection status dot.
 *
 * This component is used ONLY in the presenter top bar.
 * The audience side uses a quiet amber hairline (inline in AudienceLayout),
 * NOT this dot. Two visuals, two purposes — never a single component for both.
 *
 * Colors:
 *   --accent when live (pulsing)
 *   --warn when reconnecting
 *   --bad when disconnected
 */

interface ConnectionDotProps {
  status: 'idle' | 'connecting' | 'connected' | 'in-room' | 'disconnected' | 'error';
  size?: number;
}

export function ConnectionDot({ status, size = 8 }: ConnectionDotProps) {
  const color =
    status === 'in-room' || status === 'connected'
      ? 'var(--accent, #7C5CFF)'
      : status === 'connecting'
        ? 'var(--warn, #FFB020)'
        : status === 'idle'
          ? 'var(--fg-subtle, #7A7A88)'
          : 'var(--bad, #FF4D6D)';

  const isLive = status === 'in-room' || status === 'connected';

  return (
    <div
      role="status"
      aria-label={`Connection: ${status}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        backgroundColor: color,
        animation: isLive ? 'pulse-dot 2s ease-in-out infinite' : undefined,
        flexShrink: 0,
      }}
    />
  );
}
