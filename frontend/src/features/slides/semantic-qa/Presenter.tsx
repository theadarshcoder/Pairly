import React from 'react';

interface QuestionThread {
  id: string;
  question: string;
  count: number;
  timeAgo: string;
}

const THREADS: QuestionThread[] = [
  {
    id: 'q1',
    question: 'How does the Raft consensus algorithm prevent split votes from stalling leader election?',
    count: 16,
    timeAgo: '2m ago',
  },
  {
    id: 'q2',
    question: 'Why prefer LSM-trees over B+ Trees for write-heavy storage workloads like Cassandra?',
    count: 12,
    timeAgo: '5m ago',
  },
  {
    id: 'q3',
    question: 'Can HTTP/3 QUIC connection migration completely survive Wi-Fi to cellular IP switching?',
    count: 9,
    timeAgo: '8m ago',
  },
  {
    id: 'q4',
    question: 'What is the actual garbage collection cost of high-frequency immutable state clones?',
    count: 6,
    timeAgo: '11m ago',
  },
];

export function SemanticQAPresenter({ slide }: { slide?: any }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
        padding: '0 160px',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 1100,
          background: 'var(--surface-1)',
          border: '1px solid var(--hairline)',
          borderRadius: 'var(--r-card)',
          overflow: 'hidden',
          boxShadow: '0 4px 30px rgba(0,0,0,0.3)',
        }}
      >
        {THREADS.map((thread, index) => (
          <div
            key={thread.id}
            style={{
              padding: '24px 32px',
              borderBottom: index < THREADS.length - 1 ? '1px solid var(--hairline)' : 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--sp-3, 12px)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <h2
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 22,
                  fontWeight: 500,
                  color: 'var(--fg)',
                  margin: 0,
                  lineHeight: 1.35,
                }}
              >
                {thread.question}
              </h2>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 12,
                  color: 'var(--fg-subtle)',
                  whiteSpace: 'nowrap',
                  marginLeft: 24,
                }}
              >
                {thread.timeAgo}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  background: 'var(--surface-3)',
                  color: 'var(--fg-muted)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 13,
                  fontWeight: 500,
                  padding: '5px 14px',
                  borderRadius: 'var(--r-pill)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 600,
                    color: 'var(--accent)',
                    marginRight: 6,
                  }}
                >
                  {thread.count}
                </span>
                students asked this
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
