import React, { useState } from 'react';
import { Check, Copy, AlertTriangle, TrendingUp, TrendingDown, Cpu, Hash } from 'lucide-react';

export default function ResultCard({ result }) {
  const [copied, setCopied] = useState(false);

  if (!result) return null;

  const isPositive = result.sentiment === 'Positive';
  const confidencePercent = Math.round(result.confidence * 100);
  const scorePercent = Math.round(result.score * 100);

  const handleCopy = () => {
    const text = `KhushiRNN Sentiment Analysis:
Review: "${result.review}"
Verdict: ${result.sentiment}
Confidence: ${confidencePercent}%
Score: ${result.score}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="editorial-card animate-fade-in-up"
      style={{
        padding: '2.25rem',
        marginBottom: '2rem',
        borderLeft: `5px solid ${isPositive ? 'var(--color-positive)' : 'var(--color-negative)'}`,
      }}
    >
      {/* Top Banner */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid var(--border-subtle)',
        paddingBottom: '1.25rem',
        marginBottom: '1.5rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: isPositive ? 'var(--color-positive-bg)' : 'var(--color-negative-bg)',
            border: `1px solid ${isPositive ? 'var(--color-positive-border)' : 'var(--color-negative-border)'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isPositive ? 'var(--color-positive)' : 'var(--color-negative)',
          }}>
            {isPositive ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
          </div>
          <div>
            <span style={{
              fontSize: '0.72rem',
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: isPositive ? 'var(--color-positive)' : 'var(--color-negative)',
            }}>
              Classification Verdict
            </span>
            <h3 style={{
              fontSize: '2rem',
              fontWeight: 600,
              color: isPositive ? 'var(--color-positive)' : 'var(--color-negative)',
              lineHeight: 1.1,
            }}>
              {result.sentiment} Review
            </h3>
          </div>
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            backgroundColor: 'var(--bg-subtle)',
            border: '1px solid var(--border-card)',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.82rem',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          title="Copy result summary"
        >
          {copied ? <Check size={14} color="var(--color-positive)" /> : <Copy size={14} />}
          <span>{copied ? 'Copied' : 'Share'}</span>
        </button>
      </div>

      {/* Probability Gauge Bar */}
      <div style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', alignItems: 'baseline' }}>
          <span style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
            Confidence Level: <strong style={{ color: 'var(--text-primary)' }}>{confidencePercent}%</strong>
          </span>
          <span style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}>
            Sigmoid output (z): {result.score.toFixed(4)}
          </span>
        </div>

        {/* Gradient Progress Bar */}
        <div style={{
          height: '10px',
          width: '100%',
          backgroundColor: 'var(--bg-subtle)',
          borderRadius: 'var(--radius-full)',
          overflow: 'hidden',
          position: 'relative',
          border: '1px solid var(--border-card)',
        }}>
          {/* Threshold marker at 50% */}
          <div style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: '2px',
            backgroundColor: 'var(--border-strong)',
            zIndex: 2,
          }} title="Decision Boundary (0.5)" />

          <div
            style={{
              height: '100%',
              width: `${scorePercent}%`,
              background: isPositive
                ? 'linear-gradient(90deg, #86efac, #15803d)'
                : 'linear-gradient(90deg, #f87171, #991b1b)',
              borderRadius: 'var(--radius-full)',
              transition: 'width 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '0.72rem',
          color: 'var(--text-tertiary)',
          fontFamily: 'var(--font-mono)',
          marginTop: '6px',
        }}>
          <span>0.00 (Extreme Negative)</span>
          <span>0.50 (Neutral Threshold)</span>
          <span>1.00 (Extreme Positive)</span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '1rem',
      }}>
        {/* Token Count */}
        <div style={{
          padding: '1rem',
          backgroundColor: 'var(--bg-subtle)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-tertiary)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            <Hash size={13} />
            <span>Tokens Processed</span>
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: 600, marginTop: '4px', fontFamily: 'var(--font-serif-display)' }}>
            {result.token_count}
            <span style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', fontWeight: 400, marginLeft: '4px' }}>
              / {result.total_tokens}
            </span>
          </div>
        </div>

        {/* Truncation Status */}
        <div style={{
          padding: '1rem',
          backgroundColor: 'var(--bg-subtle)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-tertiary)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            <Cpu size={13} />
            <span>Sequence Scope</span>
          </div>
          <div style={{ fontSize: '1.1rem', fontWeight: 500, marginTop: '4px' }}>
            {result.truncated ? (
              <span style={{ color: 'var(--accent-gold)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <AlertTriangle size={15} /> Truncated at 120
              </span>
            ) : (
              <span style={{ color: 'var(--text-primary)' }}>Full Passage Analyzed</span>
            )}
          </div>
        </div>

        {/* Model Specs */}
        <div style={{
          padding: '1rem',
          backgroundColor: 'var(--bg-subtle)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-tertiary)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            <span>Architecture</span>
          </div>
          <div style={{ fontSize: '1.1rem', fontWeight: 500, marginTop: '4px', fontFamily: 'var(--font-mono)' }}>
            Elman RNN (25D)
          </div>
        </div>
      </div>
    </div>
  );
}

