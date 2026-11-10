import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import ReviewForm from './components/ReviewForm';
import ResultCard from './components/ResultCard';
import HistoryList from './components/HistoryList';
import ConfigModal from './components/ConfigModal';

const DEFAULT_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function App() {
  // Theme state: defaults to dark if user prefers dark or previous setting
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('khushi_theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // API URL state
  const [apiUrl, setApiUrl] = useState(() => {
    return localStorage.getItem('khushi_api_url') || DEFAULT_API_URL;
  });

  // Backend status
  const [backendStatus, setBackendStatus] = useState({
    online: false,
    loading: true,
    latency: null,
  });

  // Evaluation states
  const [reviewText, setReviewText] = useState('');
  const [threshold, setThreshold] = useState(0.5);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // History state
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('khushi_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modal & test states
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [testStatus, setTestStatus] = useState({ loading: false, success: null, message: '' });

  // Apply theme class to <html>
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('khushi_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Check backend health
  const checkHealth = useCallback(async (targetUrl = apiUrl) => {
    setBackendStatus((prev) => ({ ...prev, loading: true }));
    const start = performance.now();
    try {
      const res = await fetch(`${targetUrl}/health`, {
        method: 'GET',
        headers: { Accept: 'application/json' },
      });
      const end = performance.now();
      if (res.ok) {
        setBackendStatus({
          online: true,
          loading: false,
          latency: Math.round(end - start),
        });
        return true;
      }
      throw new Error(`Status ${res.status}`);
    } catch {
      setBackendStatus({ online: false, loading: false, latency: null });
      return false;
    }
  }, [apiUrl]);

  // Initial health check
  useEffect(() => {
    checkHealth();
    const interval = setInterval(() => checkHealth(), 30000); // Heartbeat every 30s
    return () => clearInterval(interval);
  }, [checkHealth]);

  // Test custom connection from modal
  const handleTestConnection = async (testUrl) => {
    setTestStatus({ loading: true, success: null, message: 'Pinging /health endpoint...' });
    let clean = testUrl.trim();
    if (clean.endsWith('/')) clean = clean.slice(0, -1);

    const start = performance.now();
    try {
      const res = await fetch(`${clean}/health`);
      const end = performance.now();
      if (res.ok) {
        const data = await res.json();
        setTestStatus({
          loading: false,
          success: true,
          message: `Connected successfully! Model: ${data.model || 'KhushiRNN'} (${Math.round(end - start)}ms latency)`,
        });
      } else {
        throw new Error(`Server returned HTTP ${res.status}`);
      }
    } catch (err) {
      setTestStatus({
        loading: false,
        success: false,
        message: `Failed to reach service: ${err.message}`,
      });
    }
  };

  const handleSaveApiUrl = (newUrl) => {
    setApiUrl(newUrl);
    localStorage.setItem('khushi_api_url', newUrl);
    checkHealth(newUrl);
  };

  // Perform sentiment analysis
  const handleAnalyze = async () => {
    if (!reviewText.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`${apiUrl}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          review: reviewText.trim(),
          threshold: threshold,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.detail || `Server returned ${res.status}`);
      }

      const data = await res.json();
      setResult(data);

      // Save to history (keep latest 8)
      setHistory((prev) => {
        const updated = [data, ...prev.filter((i) => i.review !== data.review)].slice(0, 8);
        try {
          localStorage.setItem('khushi_history', JSON.stringify(updated));
        } catch {}
        return updated;
      });
    } catch (err) {
      setError(
        err.message ||
          'Failed to reach the sentiment analysis backend. Verify the API service is running.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectHistory = (item) => {
    setReviewText(item.review);
    setResult(item);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem('khushi_history');
  };

  return (
    <>
      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        backendStatus={backendStatus}
        apiUrl={apiUrl}
        onOpenConfig={() => setIsConfigOpen(true)}
      />

      <main style={{ flex: 1, padding: '2.5rem 0 4rem 0' }}>
        <div className="container">
          {/* Hero Banner */}
          <section style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{
              fontSize: '0.78rem',
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: 'var(--accent-gold)',
              display: 'inline-block',
              marginBottom: '0.75rem',
            }}>
              Neural Language Intelligence
            </span>
            <h2 style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
              lineHeight: 1.15,
              fontWeight: 400,
              maxWidth: '720px',
              margin: '0 auto 1rem auto',
            }}>
              Distill sentiment with <em style={{ fontStyle: 'italic', color: 'var(--accent-gold)' }}>mathematical</em> precision.
            </h2>
            <p style={{
              fontSize: '1.15rem',
              color: 'var(--text-secondary)',
              maxWidth: '560px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}>
              An Elman Recurrent Neural Network trained to decipher nuance and polarity across movie, dining, and consumer reviews.
            </p>
            <div className="gold-line" />
          </section>

          {/* Review Input Section */}
          <ReviewForm
            reviewText={reviewText}
            setReviewText={setReviewText}
            threshold={threshold}
            setThreshold={setThreshold}
            onSubmit={handleAnalyze}
            isLoading={isLoading}
            error={error}
          />

          {/* Results Display */}
          {result && <ResultCard result={result} />}

          {/* Evaluation History */}
          <HistoryList
            history={history}
            onSelectReview={handleSelectHistory}
            onClearHistory={handleClearHistory}
          />
        </div>
      </main>

      {/* Editorial Footer */}
      <footer style={{
        borderTop: '1px solid var(--border-subtle)',
        backgroundColor: 'var(--bg-card)',
        padding: '2.5rem 0',
        transition: 'var(--transition-theme)',
      }}>
        <div className="container" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          textAlign: 'center',
        }}>
          {/* Architecture Formula */}
          <div style={{
            fontFamily: 'var(--font-serif-display)',
            fontSize: '1.05rem',
            color: 'var(--text-secondary)',
            letterSpacing: '0.04em',
          }}>
            <span>h(t) = σ(W_in · x(t) + W_h · h(t-1) + b_h)</span>
            <span style={{ margin: '0 8px', color: 'var(--accent-gold)' }}>❦</span>
            <span>y = σ(W_out · h(T) + b_out)</span>
          </div>

          <div style={{
            display: 'flex',
            gap: '1.5rem',
            fontSize: '0.85rem',
            color: 'var(--text-tertiary)',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
            <a href={`${apiUrl}/docs`} target="_blank" rel="noreferrer">
              Swagger Documentation ↗
            </a>
            <span>•</span>
            <a href={`${apiUrl}/health`} target="_blank" rel="noreferrer">
              Health Check ↗
            </a>
            <span>•</span>
            <span>KhushiRNN Production Model</span>
          </div>

          <p style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', fontStyle: 'italic' }}>
            Handcrafted with aesthetic serif typography and Elman RNN architecture.
          </p>
        </div>
      </footer>

      {/* Endpoint Configuration Modal */}
      <ConfigModal
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
        apiUrl={apiUrl}
        onSaveApiUrl={handleSaveApiUrl}
        onTestConnection={handleTestConnection}
        testStatus={testStatus}
      />
    </>
  );
}
