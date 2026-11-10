import React, { useState } from 'react';
import { X, Check, Globe, RefreshCw, ExternalLink } from 'lucide-react';

export default function ConfigModal({
  isOpen,
  onClose,
  apiUrl,
  onSaveApiUrl,
  onTestConnection,
  testStatus,
}) {
  const [urlInput, setUrlInput] = useState(apiUrl);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    let cleaned = urlInput.trim();
    if (cleaned.endsWith('/')) {
      cleaned = cleaned.slice(0, -1);
    }
    onSaveApiUrl(cleaned);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.65)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      padding: '1rem',
    }}>
      <div
        className="editorial-card animate-fade-in-up"
        style={{
          width: '100%',
          maxWidth: '520px',
          padding: '2rem',
          backgroundColor: 'var(--bg-card-elevated)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Globe size={18} color="var(--accent-gold)" />
            <h3 style={{ fontSize: '1.4rem', fontWeight: 500 }}>Backend Service URL</h3>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-tertiary)',
              cursor: 'pointer',
              padding: '4px',
            }}
          >
            <X size={18} />
          </button>
        </div>

        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
          Specify your local development server or deployed Render URL. The frontend will target this host for sentiment inference and health status.
        </p>

        <form onSubmit={handleSave}>
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)', marginBottom: '6px' }}>
              SERVICE ENDPOINT
            </label>
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="http://localhost:8000 or https://khushirnn.onrender.com"
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                backgroundColor: 'var(--bg-input)',
                border: '1px solid var(--border-card)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.95rem',
                outline: 'none',
              }}
            />
          </div>

          {/* Quick presets */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem' }}>
            <button
              type="button"
              onClick={() => setUrlInput('http://localhost:8000')}
              style={{
                fontSize: '0.75rem',
                padding: '4px 10px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-card)',
                background: 'var(--bg-subtle)',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
              }}
            >
              Default Localhost (8000)
            </button>
            <button
              type="button"
              onClick={() => onTestConnection(urlInput)}
              style={{
                fontSize: '0.75rem',
                padding: '4px 10px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--accent-gold-border)',
                background: 'var(--accent-gold-subtle)',
                color: 'var(--accent-gold)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <RefreshCw size={11} className={testStatus.loading ? 'pulse-dot' : ''} /> Test Connection
            </button>
          </div>

          {/* Test Status Feedback */}
          {testStatus.message && (
            <div style={{
              padding: '0.75rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.85rem',
              marginBottom: '1.5rem',
              backgroundColor: testStatus.success ? 'var(--color-positive-bg)' : 'var(--color-negative-bg)',
              color: testStatus.success ? 'var(--color-positive)' : 'var(--color-negative)',
              border: `1px solid ${testStatus.success ? 'var(--color-positive-border)' : 'var(--color-negative-border)'}`,
            }}>
              {testStatus.message}
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '0.65rem 1.25rem',
                backgroundColor: 'transparent',
                border: '1px solid var(--border-card)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: '0.65rem 1.5rem',
                backgroundColor: 'var(--accent-gold)',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                color: '#ffffff',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              Save Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

