import React, { useState, useEffect } from 'react';
import { Key, ShieldCheck, X, Sparkles, AlertCircle } from 'lucide-react';

export default function ApiKeyModal({ isOpen, onClose, onSave }) {
  const [apiKey, setApiKey] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const existing = localStorage.getItem('biobalance_gemini_key');
    if (existing) {
      setApiKey(existing);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    localStorage.setItem('biobalance_gemini_key', apiKey.trim());
    setSaved(true);
    if (onSave) onSave(apiKey.trim());
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 800);
  };

  const handleClear = () => {
    localStorage.removeItem('biobalance_gemini_key');
    setApiKey('');
    if (onSave) onSave('');
  };

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modalCard} className="animate-drop-in">
        <div style={modalStyles.header}>
          <div style={modalStyles.headerTitle}>
            <Key size={22} color="var(--accent-green)" />
            <h3>Google Gemini API Settings</h3>
          </div>
          <button style={modalStyles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '1.2rem' }}>
          BioBalance uses Google Gemini to generate custom diet plans. Enter your API key below or test with our built-in demo model.
        </p>

        <div className="form-group">
          <label className="form-label">
            Gemini API Key
          </label>
          <input
            type="password"
            className="form-input"
            placeholder="AIzaSy..."
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
        </div>

        {saved && (
          <div style={modalStyles.alertSuccess}>
            <ShieldCheck size={18} /> API Key saved securely in your browser!
          </div>
        )}

        <div style={modalStyles.notice}>
          <Sparkles size={16} color="var(--primary-emerald)" />
          <span>
            No key? Don't worry! BioBalance includes realistic AI simulation fallback mode so you can generate diet plans immediately.
          </span>
        </div>

        <div style={modalStyles.actions}>
          {apiKey && (
            <button className="btn btn-secondary" onClick={handleClear} style={{ padding: '0.6rem 1.1rem', fontSize: '0.9rem' }}>
              Clear Key
            </button>
          )}
          <button className="btn btn-primary" onClick={handleSave} style={{ flex: 1 }}>
            {saved ? 'Saved!' : 'Save & Continue'}
          </button>
        </div>
      </div>
    </div>
  );
}

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    backdropFilter: 'blur(6px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '1rem',
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: '20px',
    maxWidth: '480px',
    width: '100%',
    padding: '1.8rem',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    border: '1px solid var(--border-green)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  headerTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: 'var(--text-subtle)',
    padding: '0.3rem',
  },
  alertSuccess: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: 'var(--bg-emerald-tint)',
    color: 'var(--primary-emerald)',
    padding: '0.75rem 1rem',
    borderRadius: '10px',
    fontSize: '0.9rem',
    fontWeight: '600',
    marginBottom: '1rem',
  },
  notice: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.6rem',
    backgroundColor: 'var(--bg-emerald-light)',
    padding: '0.85rem 1rem',
    borderRadius: '12px',
    fontSize: '0.85rem',
    color: 'var(--primary-emerald)',
    marginBottom: '1.5rem',
    lineHeight: '1.4',
  },
  actions: {
    display: 'flex',
    gap: '0.75rem',
  },
};
