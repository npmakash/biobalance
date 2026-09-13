import React, { useState, useEffect } from 'react';
import { Settings, ShieldCheck, X, Key } from 'lucide-react';

export default function ApiKeyModal({ isOpen, onClose, onSave }) {
  const [apiKey, setApiKey] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const existingKey = localStorage.getItem('biobalance_gemini_key');
    if (existingKey) setApiKey(existingKey);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (apiKey.trim()) {
      localStorage.setItem('biobalance_gemini_key', apiKey.trim());
    } else {
      localStorage.removeItem('biobalance_gemini_key');
    }

    setSaved(true);
    if (onSave) onSave(apiKey.trim());
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 800);
  };

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modalCard} className="animate-drop-in">
        <div style={modalStyles.header}>
          <div style={modalStyles.headerTitle}>
            <Settings size={22} color="var(--primary-emerald)" />
            <h3>BioBalance Application Settings</h3>
          </div>
          <button style={modalStyles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.25rem', lineHeight: '1.5' }}>
          Configure your personal AI Doctor API Key settings.
        </p>

        <div className="form-group">
          <label className="form-label">
            <Key size={16} color="var(--primary-emerald)" />
            AI Doctor API Key (Google AI Studio Key)
          </label>
          <input
            type="password"
            className="form-input"
            placeholder="AIzaSy..."
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
          <span style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', marginTop: '0.25rem' }}>
            Free API keys start with <code>AIzaSy...</code> from Google AI Studio.
          </span>
        </div>

        {saved && (
          <div style={modalStyles.alertSuccess}>
            <ShieldCheck size={18} /> Settings saved successfully in your browser!
          </div>
        )}

        <div style={modalStyles.actions}>
          <button className="btn btn-secondary" onClick={onClose} style={{ padding: '0.65rem 1.1rem', fontSize: '0.9rem' }}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSave} style={{ flex: 1 }}>
            {saved ? 'Saved!' : 'Save Settings'}
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
    backgroundColor: 'rgba(15, 23, 42, 0.55)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
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
    marginTop: '0.5rem',
  },
  actions: {
    display: 'flex',
    gap: '0.75rem',
    marginTop: '1.5rem',
  },
};
