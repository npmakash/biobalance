import React, { useState } from 'react';
import { Presentation, Eye, Code, ArrowRight, ExternalLink, Sparkles, CheckCircle, Flame, HeartPulse, Coffee, ShieldAlert, Copy, Check } from 'lucide-react';
import { CONFIG } from '../config';

export default function GoogleSlideTemplate({ aiData, onDownloadTrigger }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [showPlaceholdersOnly, setShowPlaceholdersOnly] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);

  if (!aiData) return null;

  // Helper to render value or raw placeholder tag e.g. {{patient_name}}
  const r = (key, defaultVal = '') => {
    if (showPlaceholdersOnly) return `{{${key}}}`;
    return aiData[key] || defaultVal || `{{${key}}}`;
  };

  const copyJsonPayload = () => {
    navigator.clipboard.writeText(JSON.stringify(aiData, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  return (
    <div style={slideStyles.wrapper} className="animate-slide-up" id="slides-deck-section">
      {/* Presentation Control Top Bar */}
      <div style={slideStyles.controlBar}>
        <div style={slideStyles.presentationTitle}>
          <div style={slideStyles.gSlideLogo}>
            <Presentation size={22} color="#FFFFFF" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.15rem', color: 'var(--primary-emerald)' }}>
              Google Presentation Live Template Viewer
            </h3>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-subtle)' }}>
              Mapped to: <code>1tI98DhLl4OUOyeFryFDnvOaSgSFP7yYLH878CpSwfZ0</code>
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <a
            href={CONFIG.GOOGLE_SLIDES_TEMPLATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            style={{ fontSize: '0.85rem', padding: '0.55rem 0.95rem', textDecoration: 'none' }}
          >
            <ExternalLink size={15} /> Open Original Template
          </a>

          <button
            className="btn btn-secondary"
            onClick={copyJsonPayload}
            style={{ fontSize: '0.85rem', padding: '0.55rem 0.95rem' }}
          >
            {copiedJson ? <Check size={15} color="var(--accent-green)" /> : <Copy size={15} />}
            {copiedJson ? 'JSON Copied!' : 'Copy 24 Placeholders JSON'}
          </button>

          <button
            className="btn btn-secondary"
            onClick={() => setShowPlaceholdersOnly(!showPlaceholdersOnly)}
            style={{ fontSize: '0.85rem', padding: '0.55rem 0.95rem' }}
          >
            {showPlaceholdersOnly ? (
              <>
                <Eye size={15} /> Show Gemini Filled Data
              </>
            ) : (
              <>
                <Code size={15} /> View {"{{placeholders}}"} Mode
              </>
            )}
          </button>

          <button
            className="btn btn-primary animate-pulse-glow"
            onClick={onDownloadTrigger}
            style={{ fontSize: '0.95rem', padding: '0.65rem 1.35rem' }}
          >
            <span>Take Your Diet Plan</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Main Slide Deck Layout */}
      <div style={slideStyles.canvasLayout}>
        {/* Left Slide Thumbnails */}
        <div style={slideStyles.thumbnailBar}>
          {[
            'Cover & Patient Overview',
            'Targets & Macro Alignment',
            '5-Stage Daily Meal Plan',
            'Nutrient Distribution Matrix',
            'Clinical Action Points',
          ].map((title, idx) => (
            <div
              key={idx}
              style={{
                ...slideStyles.thumbCard,
                borderColor: activeSlide === idx ? 'var(--accent-green)' : 'var(--border-light)',
                backgroundColor: activeSlide === idx ? 'var(--bg-emerald-tint)' : '#FFFFFF',
              }}
              onClick={() => setActiveSlide(idx)}
            >
              <div style={slideStyles.thumbNumber}>Slide {idx + 1}</div>
              <div style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--text-dark)' }}>{title}</div>
            </div>
          ))}
        </div>

        {/* Active 16:9 Slide Stage View (Rendered for Canvas PDF compiling) */}
        <div style={slideStyles.stageWrapper}>
          <div id="exportable-slides-container">
            {/* SLIDE 1: COVER & PATIENT OVERVIEW */}
            <div
              id="slide-page-0"
              style={{
                ...slideStyles.slide16x9,
                display: activeSlide === 0 ? 'flex' : 'none',
              }}
            >
              <div style={slideStyles.slideHeaderBrand}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Sparkles size={24} color="var(--accent-green)" />
                  <span style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--primary-emerald)' }}>BioBalance Precision Deck</span>
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-subtle)' }}>
                  Report Date: <strong>{r('report_date')}</strong>
                </div>
              </div>

              <div style={{ margin: '1rem 0' }}>
                <h1 style={slideStyles.slideTitle}>Metabolic & Clinical Diet Blueprint</h1>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                  Personalized bio-active dietary protocol generated via Google Gemini AI.
                </p>
              </div>

              <div style={slideStyles.profileBadgeGrid}>
                <div style={slideStyles.profileTag}>
                  <span style={slideStyles.tagLabel}>Patient Name:</span>
                  <strong style={slideStyles.tagValue}>{r('patient_name')}</strong>
                </div>
                <div style={slideStyles.profileTag}>
                  <span style={slideStyles.tagLabel}>Age:</span>
                  <strong style={slideStyles.tagValue}>{r('age')} years</strong>
                </div>
                <div style={slideStyles.profileTag}>
                  <span style={slideStyles.tagLabel}>Height & Weight:</span>
                  <strong style={slideStyles.tagValue}>{r('height_and_weight')}</strong>
                </div>
              </div>

              <div style={slideStyles.summaryBox}>
                <h4 style={{ color: 'var(--primary-emerald)', marginBottom: '0.3rem' }}>Primary Clinical Targets:</h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-dark)', lineHeight: '1.5' }}>
                  {r('primary_targets')}
                </p>
              </div>
            </div>

            {/* SLIDE 2: TARGETS & MACRO ALIGNMENT */}
            <div
              id="slide-page-1"
              style={{
                ...slideStyles.slide16x9,
                display: activeSlide === 1 ? 'flex' : 'none',
              }}
            >
              <div style={slideStyles.slideHeader}>
                <Flame size={24} color="var(--primary-emerald)" />
                <h2>Slide 2: Caloric Alignment & Baselines</h2>
              </div>

              <div style={slideStyles.targetBanner}>
                <h4 style={{ color: 'var(--primary-emerald)', marginBottom: '0.4rem' }}>Caloric Alignment:</h4>
                <p style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--text-dark)' }}>
                  {r('caloric_alignment')}
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                <div style={slideStyles.infoCard}>
                  <h4 style={{ color: 'var(--primary-emerald)', marginBottom: '0.3rem' }}>Hydration Baseline:</h4>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-dark)' }}>{r('hyderation_baseline')}</p>
                </div>

                <div style={slideStyles.infoCard}>
                  <h4 style={{ color: 'var(--primary-emerald)', marginBottom: '0.3rem' }}>Key Habit Focus:</h4>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-dark)' }}>{r('key_habit_focus')}</p>
                </div>
              </div>
            </div>

            {/* SLIDE 3: 5-STAGE DAILY MEAL PLAN */}
            <div
              id="slide-page-2"
              style={{
                ...slideStyles.slide16x9,
                display: activeSlide === 2 ? 'flex' : 'none',
              }}
            >
              <div style={slideStyles.slideHeader}>
                <Coffee size={24} color="var(--primary-emerald)" />
                <h2>Slide 3: 5-Stage Bio-Active Meal Schedule</h2>
              </div>

              <div style={slideStyles.mealGrid5}>
                <div style={slideStyles.mealBoxSmall}>
                  <h5 style={slideStyles.mealLabel}>1. Breakfast</h5>
                  <p style={slideStyles.mealContent}>{r('breakfast')}</p>
                </div>
                <div style={slideStyles.mealBoxSmall}>
                  <h5 style={slideStyles.mealLabel}>2. Mid Morning</h5>
                  <p style={slideStyles.mealContent}>{r('mid_morning')}</p>
                </div>
                <div style={slideStyles.mealBoxSmall}>
                  <h5 style={slideStyles.mealLabel}>3. Lunch</h5>
                  <p style={slideStyles.mealContent}>{r('lunch')}</p>
                </div>
                <div style={slideStyles.mealBoxSmall}>
                  <h5 style={slideStyles.mealLabel}>4. Evening Snack</h5>
                  <p style={slideStyles.mealContent}>{r('evening_snack')}</p>
                </div>
                <div style={slideStyles.mealBoxSmall}>
                  <h5 style={slideStyles.mealLabel}>5. Dinner</h5>
                  <p style={slideStyles.mealContent}>{r('dinner')}</p>
                </div>
              </div>
            </div>

            {/* SLIDE 4: NUTRIENT DISTRIBUTION MATRIX */}
            <div
              id="slide-page-3"
              style={{
                ...slideStyles.slide16x9,
                display: activeSlide === 3 ? 'flex' : 'none',
              }}
            >
              <div style={slideStyles.slideHeader}>
                <CheckCircle size={24} color="var(--primary-emerald)" />
                <h2>Slide 4: Nutrient Distribution Matrix</h2>
              </div>

              <div style={slideStyles.macroMatrixGrid}>
                <div style={slideStyles.macroBox}>
                  <h4 style={{ color: 'var(--primary-emerald)' }}>Protein Distribution</h4>
                  <p style={slideStyles.macroText}>{r('protein_distribution')}</p>
                </div>
                <div style={slideStyles.macroBox}>
                  <h4 style={{ color: 'var(--primary-emerald)' }}>Complex Carbohydrates</h4>
                  <p style={slideStyles.macroText}>{r('complex_carbohydrates')}</p>
                </div>
                <div style={slideStyles.macroBox}>
                  <h4 style={{ color: 'var(--primary-emerald)' }}>Healthy Fats</h4>
                  <p style={slideStyles.macroText}>{r('healthy_fats')}</p>
                </div>
                <div style={slideStyles.macroBox}>
                  <h4 style={{ color: 'var(--primary-emerald)' }}>Dietary Fiber Baseline</h4>
                  <p style={slideStyles.macroText}>{r('dietry_fiber')}</p>
                </div>
              </div>
            </div>

            {/* SLIDE 5: CLINICAL ACTION POINTS */}
            <div
              id="slide-page-4"
              style={{
                ...slideStyles.slide16x9,
                display: activeSlide === 4 ? 'flex' : 'none',
              }}
            >
              <div style={slideStyles.slideHeader}>
                <Sparkles size={24} color="var(--primary-emerald)" />
                <h2>Slide 5: Clinical Action Recommendations</h2>
              </div>

              <div style={slideStyles.resPointsGrid}>
                <div style={slideStyles.resCard}>
                  <strong style={slideStyles.resPointTitle}>1. {r('res_point_1')}</strong>
                  <p style={slideStyles.resPointDes}>{r('one_line_des_point_1')}</p>
                </div>

                <div style={slideStyles.resCard}>
                  <strong style={slideStyles.resPointTitle}>2. {r('res_point_2')}</strong>
                  <p style={slideStyles.resPointDes}>{r('one_line_des_point_2')}</p>
                </div>

                <div style={slideStyles.resCard}>
                  <strong style={slideStyles.resPointTitle}>3. {r('res_point_3')}</strong>
                  <p style={slideStyles.resPointDes}>{r('one_line_des_point_3')}</p>
                </div>

                <div style={slideStyles.resCard}>
                  <strong style={slideStyles.resPointTitle}>4. {r('res_point_4')}</strong>
                  <p style={slideStyles.resPointDes}>{r('one_line_des_point_4')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const slideStyles = {
  wrapper: {
    padding: '2rem 0',
  },
  controlBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: '1.2rem 1.5rem',
    borderRadius: '18px',
    border: '1px solid var(--border-green)',
    boxShadow: 'var(--shadow-sm)',
    marginBottom: '1.5rem',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  presentationTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  gSlideLogo: {
    width: '42px',
    height: '42px',
    borderRadius: '12px',
    backgroundColor: 'var(--primary-emerald)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  canvasLayout: {
    display: 'grid',
    gridTemplateColumns: '240px 1fr',
    gap: '1.5rem',
    alignItems: 'start',
  },
  thumbnailBar: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  thumbCard: {
    padding: '0.85rem',
    borderRadius: '12px',
    border: '2px solid',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  thumbNumber: {
    fontSize: '0.75rem',
    fontWeight: '700',
    color: 'var(--primary-emerald)',
    marginBottom: '0.2rem',
    textTransform: 'uppercase',
  },
  stageWrapper: {
    backgroundColor: '#FFFFFF',
    borderRadius: '20px',
    border: '1px solid var(--border-green)',
    boxShadow: 'var(--shadow-lg)',
    padding: '1.5rem',
    overflow: 'hidden',
  },
  slide16x9: {
    aspectRatio: '16 / 9',
    backgroundColor: '#FAFDFB',
    borderRadius: '16px',
    border: '1px solid #E2E8F0',
    padding: '2.25rem',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxShadow: 'inset 0 0 20px rgba(14, 94, 56, 0.03)',
  },
  slideHeaderBrand: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  slideTitle: {
    fontSize: '2rem',
    color: 'var(--primary-emerald)',
    marginBottom: '0.3rem',
  },
  profileBadgeGrid: {
    display: 'flex',
    gap: '0.75rem',
    marginBottom: '1rem',
    flexWrap: 'wrap',
  },
  profileTag: {
    backgroundColor: '#FFFFFF',
    border: '1px solid var(--border-green)',
    padding: '0.5rem 0.9rem',
    borderRadius: '10px',
    fontSize: '0.88rem',
  },
  tagLabel: {
    color: 'var(--text-subtle)',
    marginRight: '0.35rem',
  },
  tagValue: {
    color: 'var(--primary-emerald)',
  },
  summaryBox: {
    backgroundColor: 'var(--bg-emerald-light)',
    padding: '1rem 1.25rem',
    borderRadius: '12px',
    borderLeft: '4px solid var(--primary-emerald)',
  },
  slideHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    color: 'var(--primary-emerald)',
    marginBottom: '1.25rem',
  },
  targetBanner: {
    backgroundColor: 'var(--bg-emerald-tint)',
    padding: '1.2rem',
    borderRadius: '14px',
    border: '1.5px solid var(--border-green)',
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    padding: '1rem 1.2rem',
    borderRadius: '12px',
    border: '1px solid var(--border-light)',
  },
  mealGrid5: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '0.6rem',
  },
  mealBoxSmall: {
    backgroundColor: '#FFFFFF',
    padding: '0.85rem',
    borderRadius: '10px',
    border: '1px solid var(--border-green)',
    height: '100%',
  },
  mealLabel: {
    fontSize: '0.85rem',
    color: 'var(--primary-emerald)',
    marginBottom: '0.3rem',
    fontWeight: '700',
  },
  mealContent: {
    fontSize: '0.8rem',
    color: 'var(--text-dark)',
    lineHeight: '1.35',
  },
  macroMatrixGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
  },
  macroBox: {
    backgroundColor: '#FFFFFF',
    padding: '1.1rem',
    borderRadius: '12px',
    border: '1px solid var(--border-green)',
  },
  macroText: {
    fontSize: '0.9rem',
    color: 'var(--text-dark)',
    marginTop: '0.25rem',
  },
  resPointsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
  },
  resCard: {
    backgroundColor: '#FFFFFF',
    padding: '1.1rem',
    borderRadius: '12px',
    border: '1px solid var(--border-green)',
  },
  resPointTitle: {
    color: 'var(--primary-emerald)',
    fontSize: '0.95rem',
    display: 'block',
    marginBottom: '0.25rem',
  },
  resPointDes: {
    fontSize: '0.88rem',
    color: 'var(--text-muted)',
    lineHeight: '1.4',
  },
};
