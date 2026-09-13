import React from 'react';
import { Leaf, Settings, Info, Lock } from 'lucide-react';

export default function Navbar({ onOpenKeyModal, onOpenAbout, onOpenPrivacy }) {
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

        {/* Action Controls & Navigation Links */}
        <div style={navStyles.actionsGroup}>
          <button style={navStyles.linkButton} onClick={onOpenAbout}>
            <Info size={16} color="var(--primary-emerald)" />
            <span style={navStyles.linkText}>About</span>
          </button>

          <button style={navStyles.linkButton} onClick={onOpenPrivacy}>
            <Lock size={16} color="var(--primary-emerald)" />
            <span style={navStyles.linkText}>Privacy</span>
          </button>

          <button
            style={navStyles.settingsButton}
            onClick={onOpenKeyModal}
            title="BioBalance Settings"
          >
            <Settings size={18} color="var(--primary-emerald)" />
            <span style={navStyles.linkText}>Settings</span>
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
    gap: '0.6rem',
  },
  linkButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.35rem',
    padding: '0.5rem 0.85rem',
    borderRadius: 'var(--radius-full)',
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '0.86rem',
    fontWeight: '600',
    color: 'var(--primary-emerald)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  settingsButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.35rem',
    padding: '0.5rem 0.95rem',
    borderRadius: 'var(--radius-full)',
    backgroundColor: '#FFFFFF',
    border: '1.5px solid var(--border-green)',
    fontSize: '0.86rem',
    fontWeight: '600',
    color: 'var(--primary-emerald)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: 'var(--shadow-sm)',
  },
  linkText: {
    '@media (maxWidth: 520px)': {
      display: 'none',
    },
  },
};
