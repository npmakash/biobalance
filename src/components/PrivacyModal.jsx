import React from 'react';
import { Lock, ShieldCheck, X, FileText, ServerOff } from 'lucide-react';

export default function PrivacyModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modalCard} className="animate-drop-in">
        <div style={modalStyles.header}>
          <div style={modalStyles.headerTitle}>
            <Lock size={24} color="var(--primary-emerald)" />
            <h3>Privacy Policy</h3>
          </div>
          <button style={modalStyles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div style={modalStyles.content}>
          <div style={modalStyles.banner}>
            <ShieldCheck size={20} color="var(--primary-emerald)" />
            <span>100% Client-Side Privacy Commitment</span>
          </div>

          <p style={modalStyles.paragraph}>
            At <strong>BioBalance</strong>, we treat your health data with maximum confidentiality and security standards.
          </p>

          <div style={modalStyles.grid}>
            <div style={modalStyles.privacyItem}>
              <ServerOff size={22} color="var(--primary-emerald)" />
              <div>
                <strong style={{ fontSize: '0.92rem' }}>Zero Server Storage</strong>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                  Your personal assessment details and medical reports are processed transiently for generating your diet plan and are never stored on external databases or tracking servers.
                </p>
              </div>
            </div>

            <div style={modalStyles.privacyItem}>
              <FileText size={22} color="var(--primary-emerald)" />
              <div>
                <strong style={{ fontSize: '0.92rem' }}>Local PDF Processing</strong>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                  Uploaded medical report PDFs are read directly inside your browser session using client-side JavaScript parser tools.
                </p>
              </div>
            </div>
          </div>

          <p style={{ fontSize: '0.85rem', color: 'var(--text-subtle)', lineHeight: '1.5' }}>
            We do not sell, share, or monetize your health information.
          </p>
        </div>

        <div style={modalStyles.actions}>
          <button className="btn btn-primary" onClick={onClose} style={{ width: '100%' }}>
            Understood
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
    borderRadius: '24px',
    maxWidth: '520px',
    width: '100%',
    padding: '2rem',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    border: '1.5px solid var(--border-green)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.2rem',
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
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  banner: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    backgroundColor: 'var(--bg-emerald-tint)',
    color: 'var(--primary-emerald)',
    padding: '0.4rem 0.9rem',
    borderRadius: 'var(--radius-full)',
    fontSize: '0.85rem',
    fontWeight: '700',
    marginBottom: '0.5rem',
  },
  paragraph: {
    fontSize: '0.92rem',
    color: 'var(--text-dark)',
    lineHeight: '1.6',
  },
  grid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    margin: '0.5rem 0',
  },
  privacyItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.75rem',
    backgroundColor: 'var(--bg-card-subtle)',
    padding: '0.85rem 1rem',
    borderRadius: '14px',
    border: '1px solid var(--border-green)',
  },
  actions: {
    marginTop: '1.5rem',
  },
};
