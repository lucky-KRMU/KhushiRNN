import React from 'react';
import { Sun, Moon, Settings, Radio } from 'lucide-react';

export default function Header({
  theme,
  toggleTheme,
  backendStatus,
  apiUrl,
  onOpenConfig,
}) {
  return (
    <header style={{
      borderBottom: '1px solid var(--border-subtle)',
      backgroundColor: 'var(--bg-app)',
      position: 'sticky',
      top: 0,
      zIndex: 40,
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      transition: 'var(--transition-theme)',
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '1.25rem',
        paddingBottom: '1.25rem',
      }}>
        {/* Brand Monogram & Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--accent-gold-border)',
            background: 'var(--accent-gold-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-gold)',
            fontSize: '1.4rem',
            fontFamily: 'var(--font-serif-display)',
            boxShadow: 'var(--shadow-sm)',
          }}>
            ✦
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h1 style={{
                fontSize: '1.45rem',
                fontWeight: 600,
                letterSpacing: '0.02em',
                lineHeight: 1.1,
              }}>
                Khushi<span style={{ color: 'var(--accent-gold)' }}>RNN</span>
              </h1>
              <span style={{
                fontSize: '0.65rem',
                fontFamily: 'var(--font-mono)',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                padding: '2px 7px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-card)',
                backgroundColor: 'var(--bg-subtle)',
                color: 'var(--text-tertiary)',
              }}>
                v1.0
              </span>
            </div>
            <p style={{
              fontSize: '0.82rem',
              color: 'var(--text-secondary)',
              fontStyle: 'italic',
              marginTop: '2px',
            }}>
              Recurrent Neural Network Sentiment Classifier
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Backend Status Badge */}
          <button
            onClick={onOpenConfig}
            title={`Backend URL: ${apiUrl} (Click to configure)`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: 'var(--radius-full)',
              border: `1px solid ${
                backendStatus.online ? 'var(--color-positive-border)' : 'var(--border-card)'
              }`,
              backgroundColor: backendStatus.online
                ? 'var(--color-positive-bg)'
                : 'var(--bg-subtle)',
              color: backendStatus.online
                ? 'var(--color-positive)'
                : 'var(--text-tertiary)',
              fontSize: '0.78rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <span
              className="pulse-dot"
              style={{
                backgroundColor: backendStatus.online
                  ? 'var(--color-positive)'
                  : '#a8a29e',
              }}
            />
            <span style={{ fontWeight: 500 }}>
              {backendStatus.loading
                ? 'Connecting...'
                : backendStatus.online
                ? 'API Online'
                : 'API Offline'}
            </span>
          </button>

          {/* Settings / API Endpoint Modal trigger */}
          <button
            onClick={onOpenConfig}
            aria-label="API Settings"
            title="Configure Backend URL"
            style={{
              width: '38px',
              height: '38px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-card)',
              backgroundColor: 'var(--bg-card)',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-sm)',
              transition: 'all 0.2s ease',
            }}
          >
            <Settings size={17} />
          </button>

          {/* Dark / Light Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Theme`}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Theme`}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-card)',
              backgroundColor: 'var(--bg-card)',
              color: theme === 'dark' ? 'var(--accent-gold)' : 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-sm)',
              transition: 'all 0.2s ease',
            }}
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>
        </div>
      </div>
    </header>
  );
}

