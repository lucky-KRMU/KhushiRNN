import React, { useState } from 'react';
import { Send, Sparkles, SlidersHorizontal, RotateCcw, CornerDownLeft } from 'lucide-react';

const SAMPLE_REVIEWS = [
  { label: '★ Cinematic Masterpiece', text: 'This movie was absolutely brilliant! Captivating from start to finish with breathtaking direction.' },
  { label: '★ Wonderful Dining', text: 'Delicious pizza, warm ambiance, and wonderfully attentive staff. Will definitely visit again!' },
  { label: '✕ Complete Disaster', text: 'Terrible customer service and bad food. It was a complete and utter waste of money.' },
  { label: '✕ Worst Experience', text: 'Worst experience never coming back. Dirty tables, rude waiter, and cold tasteless meals.' },
];

export default function ReviewForm({
  reviewText,
  setReviewText,
  threshold,
  setThreshold,
  onSubmit,
  isLoading,
  error,
}) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const wordCount = reviewText.trim() ? reviewText.trim().split(/\s+/).length : 0;
  const charCount = reviewText.length;

  const handleKeyDown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      if (reviewText.trim() && !isLoading) {
        onSubmit();
      }
    }
  };

  return (
    <div className="editorial-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
      {/* Card Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
        <div>
          <span style={{
            fontSize: '0.72rem',
            fontFamily: 'var(--font-mono)',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: 'var(--accent-gold)',
            display: 'block',
            marginBottom: '4px',
          }}>
            Input Evaluation
          </span>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 500 }}>Review Passage</h2>
        </div>

        {reviewText && (
          <button
            onClick={() => setReviewText('')}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-tertiary)',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.82rem',
              padding: '4px 8px',
              borderRadius: 'var(--radius-sm)',
              transition: 'color 0.2s ease',
            }}
            title="Clear text"
          >
            <RotateCcw size={13} /> Clear
          </button>
        )}
      </div>

      {/* Textarea */}
      <div style={{ position: 'relative' }}>
        <textarea
          rows={5}
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Compose or paste a movie, hospitality, or product review to evaluate sentiment..."
          style={{
            width: '100%',
            padding: '1.25rem',
            backgroundColor: 'var(--bg-input)',
            border: '1px solid var(--border-card)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--text-primary)',
            fontSize: '1.12rem',
            lineHeight: 1.6,
            resize: 'vertical',
            outline: 'none',
            boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.03)',
            transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = 'var(--accent-gold)';
            e.target.style.boxShadow = '0 0 0 3px var(--accent-gold-subtle)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'var(--border-card)';
            e.target.style.boxShadow = 'inset 0 1px 3px rgba(0,0,0,0.03)';
          }}
        />

        {/* Counter footer inside textarea */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '0.5rem',
          padding: '0 0.25rem',
          fontSize: '0.8rem',
          color: 'var(--text-tertiary)',
          fontFamily: 'var(--font-mono)',
        }}>
          <div>
            <span>{wordCount} {wordCount === 1 ? 'word' : 'words'}</span>
            <span style={{ margin: '0 6px' }}>•</span>
            <span>{charCount} characters</span>
            {wordCount > 120 && (
              <span style={{ color: 'var(--accent-gold)', marginLeft: '8px' }}>
                (first 120 tokens analyzed by RNN)
              </span>
            )}
          </div>
          <div style={{ fontStyle: 'italic', color: 'var(--text-tertiary)', fontFamily: 'var(--font-serif-body)' }}>
            Tip: Press <kbd style={{ padding: '1px 5px', border: '1px solid var(--border-card)', borderRadius: '3px', fontFamily: 'var(--font-mono)' }}>⌘ / Ctrl + ↵</kbd>
          </div>
        </div>
      </div>

      {/* Preset Review Chips */}
      <div style={{ marginTop: '1.25rem' }}>
        <div style={{
          fontSize: '0.75rem',
          color: 'var(--text-tertiary)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          marginBottom: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
        }}>
          <Sparkles size={12} color="var(--accent-gold)" /> Try a curated sample:
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {SAMPLE_REVIEWS.map((sample, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setReviewText(sample.text)}
              style={{
                background: 'var(--bg-subtle)',
                border: '1px solid var(--border-card)',
                borderRadius: 'var(--radius-full)',
                padding: '5px 12px',
                fontSize: '0.82rem',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-gold)';
                e.currentTarget.style.color = 'var(--text-primary)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-card)';
                e.currentTarget.style.color = 'var(--text-secondary)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {sample.label}
            </button>
          ))}
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div style={{
          marginTop: '1.25rem',
          padding: '0.85rem 1.25rem',
          backgroundColor: 'var(--color-negative-bg)',
          border: '1px solid var(--color-negative-border)',
          borderRadius: 'var(--radius-md)',
          color: 'var(--color-negative)',
          fontSize: '0.92rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <span>⚠</span>
          <span>{error}</span>
        </div>
      )}

      {/* Advanced Settings Accordion */}
      <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-secondary)',
            fontSize: '0.85rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 0',
          }}
        >
          <SlidersHorizontal size={14} />
          <span>{showAdvanced ? 'Hide' : 'Configure'} Decision Threshold ({threshold})</span>
        </button>

        {showAdvanced && (
          <div style={{
            marginTop: '0.85rem',
            padding: '1.25rem',
            backgroundColor: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-card)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: 500 }}>
                Classification Threshold: <strong style={{ color: 'var(--accent-gold)' }}>{threshold}</strong>
              </label>
              <button
                type="button"
                onClick={() => setThreshold(0.5)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-tertiary)',
                  fontSize: '0.78rem',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }}
              >
                Reset to 0.5
              </button>
            </div>
            <input
              type="range"
              min="0.1"
              max="0.9"
              step="0.05"
              value={threshold}
              onChange={(e) => setThreshold(parseFloat(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--accent-gold)', cursor: 'pointer' }}
            />
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '0.75rem',
              color: 'var(--text-tertiary)',
              marginTop: '4px',
            }}>
              <span>0.1 (Strict Negative)</span>
              <span>0.5 (Default Balanced)</span>
              <span>0.9 (Strict Positive)</span>
            </div>
          </div>
        )}
      </div>

      {/* Action Button */}
      <div style={{ marginTop: '1.75rem', display: 'flex', justifyContent: 'flex-end' }}>
        <button
          onClick={onSubmit}
          disabled={!reviewText.trim() || isLoading}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '0.85rem 1.85rem',
            backgroundColor: reviewText.trim() && !isLoading ? 'var(--text-primary)' : 'var(--bg-tag)',
            color: reviewText.trim() && !isLoading ? 'var(--text-inverted)' : 'var(--text-tertiary)',
            border: '1px solid var(--border-strong)',
            borderRadius: 'var(--radius-md)',
            fontSize: '1rem',
            fontWeight: 500,
            cursor: reviewText.trim() && !isLoading ? 'pointer' : 'not-allowed',
            boxShadow: reviewText.trim() && !isLoading ? 'var(--shadow-md)' : 'none',
            transition: 'all 0.2s ease',
            fontFamily: 'var(--font-serif-display)',
            letterSpacing: '0.04em',
          }}
          onMouseEnter={(e) => {
            if (reviewText.trim() && !isLoading) {
              e.currentTarget.style.backgroundColor = 'var(--accent-gold)';
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.borderColor = 'var(--accent-gold)';
            }
          }}
          onMouseLeave={(e) => {
            if (reviewText.trim() && !isLoading) {
              e.currentTarget.style.backgroundColor = 'var(--text-primary)';
              e.currentTarget.style.color = 'var(--text-inverted)';
              e.currentTarget.style.borderColor = 'var(--border-strong)';
            }
          }}
        >
          {isLoading ? (
            <>
              <span className="pulse-dot" style={{ backgroundColor: 'var(--accent-gold)' }} />
              <span>Analyzing Sequence...</span>
            </>
          ) : (
            <>
              <span>Evaluate Sentiment</span>
              <Send size={15} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

