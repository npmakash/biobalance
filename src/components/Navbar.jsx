import React from 'react';
import { Leaf, Settings } from 'lucide-react';

export default function Navbar({ onOpenKeyModal }) {
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
            <span style={navStyles.brandSubtitle}>AI Health Precision</span>
          </div>
        </div>

        {/* Action Controls - Clean Settings Gear Button */}
        <div style={navStyles.actionsGroup}>
          <button
            style={navStyles.settingsButton}
            onClick={onOpenKeyModal}
            title="BioBalance Settings"
          >
            <Settings size={20} color="var(--primary-emerald)" />
            <span style={navStyles.settingsText}>Settings</span>
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
    backgroundColor: 'rgba(246, 250, 247, 0.92)',
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
    width: '42px',
    height: '42px',
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
    fontSize: '0.72rem',
    fontWeight: '600',
    color: 'var(--text-subtle)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  actionsGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  settingsButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.45rem',
    padding: '0.55rem 1rem',
    borderRadius: 'var(--radius-full)',
    backgroundColor: '#FFFFFF',
    border: '1.5px solid var(--border-green)',
    fontSize: '0.88rem',
    fontWeight: '600',
    color: 'var(--primary-emerald)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: 'var(--shadow-sm)',
  },
  settingsText: {
    '@media (maxWidth: 480px)': {
      display: 'none',
    },
  },
};
