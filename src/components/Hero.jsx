import React from 'react';
import { Sparkles, ArrowRight, FileText, Zap, ShieldCheck } from 'lucide-react';

export default function Hero({ onStartPlanning }) {
  return (
    <section style={heroStyles.section}>
      <div className="container" style={heroStyles.container}>
        {/* Floating Badge */}
        <div style={heroStyles.badge} className="animate-slide-up">
          <Sparkles size={16} color="var(--accent-green)" />
          <span>Powered by Artificial Doctor</span>
        </div>

        {/* Main Heading */}
        <h1 style={heroStyles.heading} className="animate-slide-up">
          Transform Your Metabolic Health with <span className="text-gradient">BioBalance</span>
        </h1>

        {/* Subtitle */}
        <p style={heroStyles.subheading} className="animate-slide-up">
          Intelligent personalized diet planning tailored to your exact health profile, lab reports, and lifestyle goals. Clinical precision powered by Artificial Intelligence.
        </p>

        {/* Primary CTA Button */}
        <div style={heroStyles.ctaGroup} className="animate-slide-up">
          <button className="btn btn-primary btn-large animate-pulse-glow" onClick={onStartPlanning}>
            <span>Plan My Diet</span>
            <ArrowRight size={20} />
          </button>
        </div>

        {/* Highlights Bar */}
        <div style={heroStyles.featuresGrid}>
          <div style={heroStyles.featureCard}>
            <div style={heroStyles.iconWrap}>
              <Sparkles size={22} color="var(--primary-emerald)" />
            </div>
            <div>
              <h4 style={heroStyles.featureTitle}>AI Doctor Precision</h4>
              <p style={heroStyles.featureDesc}>Generates personalized bio-nutritional protocols tailored to your body.</p>
            </div>
          </div>

          <div style={heroStyles.featureCard}>
            <div style={heroStyles.iconWrap}>
              <Zap size={22} color="var(--primary-emerald)" />
            </div>
            <div>
              <h4 style={heroStyles.featureTitle}>Instant Diet Plan</h4>
              <p style={heroStyles.featureDesc}>Instant personalized diet plan generated from your health intake and medical lab reports.</p>
            </div>
          </div>

          <div style={heroStyles.featureCard}>
            <div style={heroStyles.iconWrap}>
              <FileText size={22} color="var(--primary-emerald)" />
            </div>
            <div>
              <h4 style={heroStyles.featureTitle}>Medical PDF Analyzer</h4>
              <p style={heroStyles.featureDesc}>Extracts diagnostic lab parameters directly from your uploaded medical report PDF.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const heroStyles = {
  section: {
    padding: '3rem 0 2.5rem 0',
    textAlign: 'center',
    background: 'radial-gradient(circle at 50% 20%, rgba(220, 252, 231, 0.45) 0%, rgba(246, 250, 247, 0) 70%)',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: 'var(--bg-emerald-tint)',
    border: '1px solid var(--border-green)',
    padding: '0.45rem 1.1rem',
    borderRadius: 'var(--radius-full)',
    fontSize: '0.88rem',
    fontWeight: '700',
    color: 'var(--primary-emerald)',
    marginBottom: '1.5rem',
  },
  heading: {
    fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
    maxWidth: '840px',
    lineHeight: '1.15',
    marginBottom: '1.2rem',
  },
  subheading: {
    fontSize: '1.1rem',
    color: 'var(--text-muted)',
    maxWidth: '680px',
    marginBottom: '2rem',
    lineHeight: '1.6',
  },
  ctaGroup: {
    marginBottom: '3rem',
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '1.25rem',
    width: '100%',
    marginTop: '1rem',
  },
  featureCard: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1rem',
    backgroundColor: '#FFFFFF',
    padding: '1.35rem',
    borderRadius: '16px',
    border: '1px solid var(--border-green)',
    boxShadow: 'var(--shadow-sm)',
    textAlign: 'left',
  },
  iconWrap: {
    width: '42px',
    height: '42px',
    borderRadius: '12px',
    backgroundColor: 'var(--bg-emerald-light)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  featureTitle: {
    fontSize: '1.05rem',
    fontWeight: '700',
    marginBottom: '0.25rem',
    color: 'var(--text-dark)',
  },
  featureDesc: {
    fontSize: '0.86rem',
    color: 'var(--text-muted)',
    lineHeight: '1.45',
  },
};
