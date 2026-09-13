import React from 'react';
import { Heart, Sparkles, X, Shield, Activity, Award } from 'lucide-react';

export default function AboutModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modalCard} className="animate-drop-in">
        <div style={modalStyles.header}>
          <div style={modalStyles.headerTitle}>
            <Heart size={24} color="var(--primary-emerald)" />
            <h3>About BioBalance</h3>
          </div>
          <button style={modalStyles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div style={modalStyles.content}>
          <div style={modalStyles.banner}>
            <Sparkles size={20} color="var(--primary-emerald)" />
            <span>Empowering Individual Bio-Nutritional Science</span>
          </div>

          <p style={modalStyles.paragraph}>
            <strong>BioBalance</strong> is an advanced health and precision diet platform designed to optimize individual metabolic health, gut microbiome diversity, and anti-inflammatory cellular balance.
          </p>

          <div style={modalStyles.grid}>
            <div style={modalStyles.featureBox}>
              <Activity size={20} color="var(--primary-emerald)" />
              <div>
                <strong style={{ fontSize: '0.92rem' }}>Metabolic Target Alignment</strong>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                  Personalized daily macronutrient, calorie, and glycemic control baselines.
                </p>
              </div>
            </div>

            <div style={modalStyles.featureBox}>
              <Shield size={20} color="var(--primary-emerald)" />
              <div>
                <strong style={{ fontSize: '0.92rem' }}>Clinical Report Analysis</strong>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                  Integrates diagnostic blood panel markers directly into your nutrition plan.
                </p>
              </div>
            </div>
          </div>

          <p style={modalStyles.paragraph}>
            Our mission is to make clinical-grade nutrition planning accessible, scientific, and actionable for everyone.
          </p>
        </div>

        <div style={modalStyles.actions}>
          <button className="btn btn-primary" onClick={onClose} style={{ width: '100%' }}>
            Close
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
  featureBox: {
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
