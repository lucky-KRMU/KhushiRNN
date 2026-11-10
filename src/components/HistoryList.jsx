import React from 'react';
import { History, Trash2, ArrowUpRight } from 'lucide-react';

export default function HistoryList({ history, onSelectReview, onClearHistory }) {
  if (!history || history.length === 0) return null;

  return (
    <div className="editorial-card" style={{ padding: '2rem', marginTop: '2rem' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.25rem',
        borderBottom: '1px solid var(--border-subtle)',
        paddingBottom: '0.85rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <History size={18} color="var(--accent-gold)" />
          <h3 style={{ fontSize: '1.4rem', fontWeight: 500 }}>Recent Evaluations</h3>
          <span style={{
            fontSize: '0.75rem',
            fontFamily: 'var(--font-mono)',
            backgroundColor: 'var(--bg-subtle)',
            padding: '2px 8px',
            borderRadius: 'var(--radius-full)',
            color: 'var(--text-tertiary)',
          }}>
            {history.length}
          </span>
        </div>

        <button
          onClick={onClearHistory}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-tertiary)',
            fontSize: '0.82rem',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
          }}
          title="Clear evaluation history"
        >
          <Trash2 size={13} /> Clear
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {history.map((item, idx) => {
          const isPos = item.sentiment === 'Positive';
          return (
            <div
              key={idx}
              onClick={() => onSelectReview(item)}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.85rem 1rem',
                backgroundColor: 'var(--bg-subtle)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-gold)';
                e.currentTarget.style.transform = 'translateX(4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
                e.currentTarget.style.transform = 'translateX(0)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                {/* Verdict Pill */}
                <span style={{
                  padding: '3px 9px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  backgroundColor: isPos ? 'var(--color-positive-bg)' : 'var(--color-negative-bg)',
                  border: `1px solid ${isPos ? 'var(--color-positive-border)' : 'var(--color-negative-border)'}`,
                  color: isPos ? 'var(--color-positive)' : 'var(--color-negative)',
                  whiteSpace: 'nowrap',
                }}>
                  {item.sentiment}
                </span>

                {/* Review Snippet */}
                <span style={{
                  fontSize: '0.95rem',
                  color: 'var(--text-primary)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  fontStyle: 'italic',
                }}>
                  "{item.review}"
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: '1rem', whiteSpace: 'nowrap' }}>
                <span style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}>
                  {Math.round(item.confidence * 100)}%
                </span>
                <ArrowUpRight size={15} color="var(--text-tertiary)" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

