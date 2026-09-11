import React, { Component, type ErrorInfo, type ReactNode } from 'react';

/**
 * SlideErrorBoundary — Issue 14: Error boundary around slide renderers.
 *
 * One boundary per slide, not one per page. A crash in one slide must
 * not kill the session.
 *
 * Presenter fallback: shows slide title + "Reload slide" button.
 * Audience fallback: shows "Something went wrong — reloading…" and retries after 2s.
 */

interface Props {
  children: ReactNode;
  slideTitle?: string;
  isAudience?: boolean;
  onRetry?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class SlideErrorBoundary extends Component<Props, State> {
  private retryTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[SlideErrorBoundary] Slide crashed:', error, info.componentStack);
  }

  componentDidUpdate(_prevProps: Props, prevState: State) {
    // Issue 14: Audience auto-retry after 2 seconds
    if (this.props.isAudience && this.state.hasError && !prevState.hasError) {
      this.retryTimer = setTimeout(() => {
        this.setState({ hasError: false, error: null });
      }, 2000);
    }
  }

  componentWillUnmount() {
    if (this.retryTimer) clearTimeout(this.retryTimer);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
    this.props.onRetry?.();
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    // Audience fallback: auto-retrying
    if (this.props.isAudience) {
      return (
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            padding: '24px',
            textAlign: 'center',
          }}
        >
          <p style={{ color: 'var(--fg-muted, #9A9AA4)', fontSize: '14px' }}>
            Something went wrong — reloading…
          </p>
          <div
            style={{
              width: '24px',
              height: '24px',
              border: '2px solid var(--hairline, rgba(255,255,255,0.07))',
              borderTopColor: 'var(--accent, #7C5CFF)',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }}
          />
        </div>
      );
    }

    // Presenter fallback: manual retry
    return (
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          padding: '32px',
          textAlign: 'center',
        }}
      >
        {this.props.slideTitle && (
          <h2
            style={{
              fontFamily: 'var(--font-serif, Georgia)',
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
              letterSpacing: '-0.03em',
              color: 'var(--fg, #F2F2F4)',
              fontWeight: 500,
            }}
          >
            {this.props.slideTitle}
          </h2>
        )}
        <p style={{ color: 'var(--fg-muted, #9A9AA4)', fontSize: '14px' }}>
          This slide encountered an error.
        </p>
        <button
          onClick={this.handleRetry}
          style={{
            padding: '8px 20px',
            borderRadius: 'var(--r-pill, 9999px)',
            background: 'var(--accent, #7C5CFF)',
            color: '#fff',
            fontSize: '14px',
            fontWeight: 500,
            cursor: 'pointer',
            border: 'none',
          }}
        >
          Reload slide
        </button>
        {this.state.error && (
          <pre
            style={{
              fontSize: '11px',
              color: 'var(--fg-subtle, #7A7A88)',
              fontFamily: 'var(--font-mono)',
              maxWidth: '600px',
              overflow: 'auto',
              marginTop: '8px',
            }}
          >
            {this.state.error.message}
          </pre>
        )}
      </div>
    );
  }
}
