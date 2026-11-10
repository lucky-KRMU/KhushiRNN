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
            boxShadow: 'var(--shadow-sm)',
            flexShrink: 0,
          }}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="KhushiRNN Neural Logo"
            >
              {/* Recurrent neural cycle arcs */}
              <path
                d="M12 3a9 9 0 0 1 9 9c0 4.2-2.9 7.7-6.9 8.7"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <path
                d="M12 21a9 9 0 0 1-9-9c0-4.2 2.9-7.7 6.9-8.7"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              {/* Directional arrow heads representing recurrent feedback loop */}
              <polyline
                points="15.5 22 14.1 19.8 16.5 18.9"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <polyline
                points="8.5 2 9.9 4.2 7.5 5.1"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Central neural core */}
              <circle cx="12" cy="12" r="3.2" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="1.6" />
              <circle cx="12" cy="12" r="1.3" fill="currentColor" />
            </svg>
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

