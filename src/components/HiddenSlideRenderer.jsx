import React from 'react';
import { Sparkles, CheckCircle, Flame, Coffee, HeartPulse } from 'lucide-react';

export default function HiddenSlideRenderer({ aiData }) {
  if (!aiData) return null;

  const r = (key, defaultVal = '') => aiData[key] || defaultVal || '';

  return (
    <div style={hiddenStyles.offscreenContainer}>
      <div id="exportable-slides-container">
        {/* SLIDE 1: COVER & PATIENT OVERVIEW */}
        <div id="slide-page-0" style={hiddenStyles.slide16x9}>
          <div style={hiddenStyles.slideHeaderBrand}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={26} color="#16A34A" />
              <span style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0E5E38' }}>BioBalance Precision Deck</span>
            </div>
            <div style={{ fontSize: '0.9rem', color: '#6B7280' }}>
              Report Date: <strong>{r('report_date')}</strong>
            </div>
          </div>

          <div style={{ margin: '1.5rem 0' }}>
            <h1 style={{ fontSize: '2.5rem', color: '#0E5E38', marginBottom: '0.4rem', fontFamily: 'Outfit, sans-serif' }}>
              Metabolic & Clinical Diet Blueprint
            </h1>
            <p style={{ fontSize: '1.05rem', color: '#4B5563' }}>
              Personalized bio-active dietary protocol generated via Google Gemini AI.
            </p>
          </div>

          <div style={hiddenStyles.profileBadgeGrid}>
            <div style={hiddenStyles.profileTag}>
              <span style={hiddenStyles.tagLabel}>Patient Name:</span>
              <strong style={hiddenStyles.tagValue}>{r('patient_name')}</strong>
            </div>
            <div style={hiddenStyles.profileTag}>
              <span style={hiddenStyles.tagLabel}>Age:</span>
              <strong style={hiddenStyles.tagValue}>{r('age')} years</strong>
            </div>
            <div style={hiddenStyles.profileTag}>
              <span style={hiddenStyles.tagLabel}>Height & Weight:</span>
              <strong style={hiddenStyles.tagValue}>{r('height_and_weight')}</strong>
            </div>
          </div>

          <div style={hiddenStyles.summaryBox}>
            <h4 style={{ color: '#0E5E38', marginBottom: '0.4rem', fontSize: '1.1rem' }}>Primary Clinical Targets:</h4>
            <p style={{ fontSize: '1rem', color: '#111827', lineHeight: '1.5' }}>
              {r('primary_targets')}
            </p>
          </div>
        </div>

        {/* SLIDE 2: TARGETS & MACRO ALIGNMENT */}
        <div id="slide-page-1" style={hiddenStyles.slide16x9}>
          <div style={hiddenStyles.slideHeader}>
            <Flame size={28} color="#0E5E38" />
            <h2 style={{ fontSize: '1.8rem', color: '#0E5E38' }}>Slide 2: Caloric Alignment & Baselines</h2>
          </div>

          <div style={hiddenStyles.targetBanner}>
            <h4 style={{ color: '#0E5E38', marginBottom: '0.4rem', fontSize: '1.1rem' }}>Caloric Alignment:</h4>
            <p style={{ fontSize: '1.3rem', fontWeight: '700', color: '#111827' }}>
              {r('caloric_alignment')}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginTop: '1.25rem' }}>
            <div style={hiddenStyles.infoCard}>
              <h4 style={{ color: '#0E5E38', marginBottom: '0.4rem', fontSize: '1.05rem' }}>Hydration Baseline:</h4>
              <p style={{ fontSize: '1rem', color: '#111827' }}>{r('hyderation_baseline')}</p>
            </div>

            <div style={hiddenStyles.infoCard}>
              <h4 style={{ color: '#0E5E38', marginBottom: '0.4rem', fontSize: '1.05rem' }}>Key Habit Focus:</h4>
              <p style={{ fontSize: '1rem', color: '#111827' }}>{r('key_habit_focus')}</p>
            </div>
          </div>
        </div>

        {/* SLIDE 3: 5-STAGE DAILY MEAL PLAN */}
        <div id="slide-page-2" style={hiddenStyles.slide16x9}>
          <div style={hiddenStyles.slideHeader}>
            <Coffee size={28} color="#0E5E38" />
            <h2 style={{ fontSize: '1.8rem', color: '#0E5E38' }}>Slide 3: 5-Stage Bio-Active Meal Schedule</h2>
          </div>

          <div style={hiddenStyles.mealGrid5}>
            <div style={hiddenStyles.mealBoxSmall}>
              <h5 style={hiddenStyles.mealLabel}>1. Breakfast</h5>
              <p style={hiddenStyles.mealContent}>{r('breakfast')}</p>
            </div>
            <div style={hiddenStyles.mealBoxSmall}>
              <h5 style={hiddenStyles.mealLabel}>2. Mid Morning</h5>
              <p style={hiddenStyles.mealContent}>{r('mid_morning')}</p>
            </div>
            <div style={hiddenStyles.mealBoxSmall}>
              <h5 style={hiddenStyles.mealLabel}>3. Lunch</h5>
              <p style={hiddenStyles.mealContent}>{r('lunch')}</p>
            </div>
            <div style={hiddenStyles.mealBoxSmall}>
              <h5 style={hiddenStyles.mealLabel}>4. Evening Snack</h5>
              <p style={hiddenStyles.mealContent}>{r('evening_snack')}</p>
            </div>
            <div style={hiddenStyles.mealBoxSmall}>
              <h5 style={hiddenStyles.mealLabel}>5. Dinner</h5>
              <p style={hiddenStyles.mealContent}>{r('dinner')}</p>
            </div>
          </div>
        </div>

        {/* SLIDE 4: NUTRIENT DISTRIBUTION MATRIX */}
        <div id="slide-page-3" style={hiddenStyles.slide16x9}>
          <div style={hiddenStyles.slideHeader}>
            <CheckCircle size={28} color="#0E5E38" />
            <h2 style={{ fontSize: '1.8rem', color: '#0E5E38' }}>Slide 4: Nutrient Distribution Matrix</h2>
          </div>

          <div style={hiddenStyles.macroMatrixGrid}>
            <div style={hiddenStyles.macroBox}>
              <h4 style={{ color: '#0E5E38', fontSize: '1.1rem' }}>Protein Distribution</h4>
              <p style={hiddenStyles.macroText}>{r('protein_distribution')}</p>
            </div>
            <div style={hiddenStyles.macroBox}>
              <h4 style={{ color: '#0E5E38', fontSize: '1.1rem' }}>Complex Carbohydrates</h4>
              <p style={hiddenStyles.macroText}>{r('complex_carbohydrates')}</p>
            </div>
            <div style={hiddenStyles.macroBox}>
              <h4 style={{ color: '#0E5E38', fontSize: '1.1rem' }}>Healthy Fats</h4>
              <p style={hiddenStyles.macroText}>{r('healthy_fats')}</p>
            </div>
            <div style={hiddenStyles.macroBox}>
              <h4 style={{ color: '#0E5E38', fontSize: '1.1rem' }}>Dietary Fiber Baseline</h4>
              <p style={hiddenStyles.macroText}>{r('dietry_fiber')}</p>
            </div>
          </div>
        </div>

        {/* SLIDE 5: CLINICAL ACTION POINTS */}
        <div id="slide-page-4" style={hiddenStyles.slide16x9}>
          <div style={hiddenStyles.slideHeader}>
            <Sparkles size={28} color="#0E5E38" />
            <h2 style={{ fontSize: '1.8rem', color: '#0E5E38' }}>Slide 5: Clinical Action Recommendations</h2>
          </div>

          <div style={hiddenStyles.resPointsGrid}>
            <div style={hiddenStyles.resCard}>
              <strong style={hiddenStyles.resPointTitle}>1. {r('res_point_1')}</strong>
              <p style={hiddenStyles.resPointDes}>{r('one_line_des_point_1')}</p>
            </div>

            <div style={hiddenStyles.resCard}>
              <strong style={hiddenStyles.resPointTitle}>2. {r('res_point_2')}</strong>
              <p style={hiddenStyles.resPointDes}>{r('one_line_des_point_2')}</p>
            </div>

            <div style={hiddenStyles.resCard}>
              <strong style={hiddenStyles.resPointTitle}>3. {r('res_point_3')}</strong>
              <p style={hiddenStyles.resPointDes}>{r('one_line_des_point_3')}</p>
            </div>

            <div style={hiddenStyles.resCard}>
              <strong style={hiddenStyles.resPointTitle}>4. {r('res_point_4')}</strong>
              <p style={hiddenStyles.resPointDes}>{r('one_line_des_point_4')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const hiddenStyles = {
  offscreenContainer: {
    position: 'absolute',
    left: '-9999px',
    top: '-9999px',
    width: '1280px',
  },
  slide16x9: {
    width: '1280px',
    height: '720px',
    backgroundColor: '#FAFDFB',
    padding: '3rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    fontFamily: 'Plus Jakarta Sans, sans-serif',
    boxSizing: 'border-box',
    border: '1px solid #E2E8F0',
  },
  slideHeaderBrand: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileBadgeGrid: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1.25rem',
  },
  profileTag: {
    backgroundColor: '#FFFFFF',
    border: '1.5px solid #BBF7D0',
    padding: '0.65rem 1.1rem',
    borderRadius: '12px',
    fontSize: '1rem',
  },
  tagLabel: {
    color: '#6B7280',
    marginRight: '0.4rem',
  },
  tagValue: {
    color: '#0E5E38',
  },
  summaryBox: {
    backgroundColor: '#E6F4EA',
    padding: '1.25rem 1.5rem',
    borderRadius: '14px',
    borderLeft: '5px solid #0E5E38',
  },
  slideHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '1.5rem',
  },
  targetBanner: {
    backgroundColor: '#DCFCE7',
    padding: '1.5rem',
    borderRadius: '16px',
    border: '1.5px solid #BBF7D0',
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    padding: '1.25rem 1.5rem',
    borderRadius: '14px',
    border: '1px solid #E2E8F0',
  },
  mealGrid5: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '0.75rem',
    height: '420px',
  },
  mealBoxSmall: {
    backgroundColor: '#FFFFFF',
    padding: '1.1rem',
    borderRadius: '14px',
    border: '1.5px solid #BBF7D0',
    display: 'flex',
    flexDirection: 'column',
  },
  mealLabel: {
    fontSize: '1rem',
    color: '#0E5E38',
    marginBottom: '0.5rem',
    fontWeight: '700',
  },
  mealContent: {
    fontSize: '0.92rem',
    color: '#111827',
    lineHeight: '1.45',
  },
  macroMatrixGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1.25rem',
  },
  macroBox: {
    backgroundColor: '#FFFFFF',
    padding: '1.35rem',
    borderRadius: '14px',
    border: '1.5px solid #BBF7D0',
  },
  macroText: {
    fontSize: '1rem',
    color: '#111827',
    marginTop: '0.35rem',
  },
  resPointsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1.25rem',
  },
  resCard: {
    backgroundColor: '#FFFFFF',
    padding: '1.35rem',
    borderRadius: '14px',
    border: '1.5px solid #BBF7D0',
  },
  resPointTitle: {
    color: '#0E5E38',
    fontSize: '1.05rem',
    display: 'block',
    marginBottom: '0.35rem',
  },
  resPointDes: {
    fontSize: '0.95rem',
    color: '#4B5563',
    lineHeight: '1.45',
  },
};
