import React, { useState, useEffect } from 'react';
import { Leaf, Key, Sparkles, ShieldCheck } from 'lucide-react';

export default function Navbar({ onOpenKeyModal, onScrollToSection }) {
  const [hasKey, setHasKey] = useState(false);

  useEffect(() => {
    const key = localStorage.getItem('biobalance_gemini_key');
    setHasKey(!!key);
  }, []);

  return (
    <header style={navStyles.header}>
      <div className="container" style={navStyles.container}>
        {/* Brand Logo */}
        <div style={navStyles.logoGroup} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div style={navStyles.logoBadge} className="animate-float">
            <Leaf size={24} color="#FFFFFF" />
          </div>
          <div>
            <h1 style={navStyles.brandTitle}>
              Bio<span style={{ color: 'var(--accent-green)' }}>Balance</span>
            </h1>
            <span style={navStyles.brandSubtitle}>AI Diet & Health Precision</span>
          </div>
        </div>

        {/* Action Controls */}
        <div style={navStyles.actionsGroup}>
          <button style={navStyles.keyButton} onClick={onOpenKeyModal}>
            {hasKey ? (
              <>
                <ShieldCheck size={16} color="var(--accent-green)" />
                <span>Gemini API Active</span>
              </>
            ) : (
              <>
                <Key size={16} color="var(--primary-emerald)" />
                <span>Gemini API Key</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

const navStyles = {
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    backgroundColor: 'rgba(246, 250, 247, 0.85)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    borderBottom: '1px solid rgba(187, 247, 208, 0.5)',
    padding: '0.85rem 0',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    cursor: 'pointer',
  },
  logoBadge: {
    width: '44px',
    height: '44px',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, var(--primary-emerald) 0%, var(--accent-green) 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: 'var(--shadow-sm)',
  },
  brandTitle: {
    fontSize: '1.45rem',
    fontWeight: '800',
    letterSpacing: '-0.03em',
    lineHeight: '1.1',
    color: 'var(--primary-emerald)',
  },
  brandSubtitle: {
    fontSize: '0.75rem',
    fontWeight: '600',
    color: 'var(--text-subtle)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  actionsGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  keyButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.45rem',
    padding: '0.55rem 1rem',
    borderRadius: 'var(--radius-full)',
    backgroundColor: 'var(--bg-card)',
    border: '1.5px solid var(--border-green)',
    fontSize: '0.85rem',
    fontWeight: '600',
    color: 'var(--primary-emerald)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: 'var(--shadow-sm)',
  },
};
