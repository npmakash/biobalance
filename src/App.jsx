import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DynamicQuestionnaire from './components/DynamicQuestionnaire';
import CleanDownloadCard from './components/CleanDownloadCard';
import ApiKeyModal from './components/ApiKeyModal';
import { generateDietPlanWithGemini } from './services/geminiService';
import { Leaf, AlertTriangle } from 'lucide-react';

export default function App() {
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiData, setAiData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [geminiError, setGeminiError] = useState(null);

  // Scroll to questionnaire section when "Plan My Diet" CTA is clicked
  const handleStartPlanning = () => {
    const element = document.getElementById('questionnaire-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Submit dynamic questionnaire data to Gemini API
  const handleQuestionnaireSubmit = async (formData) => {
    setUserData(formData);
    setIsGenerating(true);
    setGeminiError(null);
    setAiData(null);

    try {
      const apiKey = localStorage.getItem('biobalance_gemini_key') || '';
      const resultData = await generateDietPlanWithGemini({
        apiKey,
        name: formData.name,
        age: formData.age,
        height: formData.height,
        weight: formData.weight,
        hasIssue: formData.hasIssue,
        issueDetails: formData.issueDetails,
        pdfReportText: formData.pdfReportText,
      });

      setAiData(resultData);

      // Auto scroll to clean download button card after generation
      setTimeout(() => {
        const downloadElem = document.getElementById('download-card-section');
        if (downloadElem) {
          downloadElem.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    } catch (err) {
      console.error('Gemini API Error:', err);
      setGeminiError(err.message || 'Failed to generate diet plan from Gemini API.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div style={appStyles.appWrapper}>
      {/* Top Navigation */}
      <Navbar onOpenKeyModal={() => setIsKeyModalOpen(true)} />

      {/* Main Content Area */}
      <main>
        {/* Hero Banner */}
        <Hero onStartPlanning={handleStartPlanning} />

        {/* Dynamic Animated Intake Form */}
        <div className="container">
          <DynamicQuestionnaire
            onSubmit={handleQuestionnaireSubmit}
            isGenerating={isGenerating}
          />
        </div>

        {/* Explicit Gemini API Error Alert */}
        {geminiError && (
          <div className="container" style={{ marginTop: '1.5rem', marginBottom: '2rem' }}>
            <div style={appStyles.geminiErrorBox} className="animate-drop-in">
              <AlertTriangle size={24} color="#DC2626" />
              <div>
                <strong style={{ fontSize: '1.05rem', color: '#991B1B' }}>Gemini API Execution Error</strong>
                <p style={{ fontSize: '0.92rem', color: '#7F1D1D', marginTop: '0.25rem', lineHeight: '1.4' }}>
                  {geminiError}
                </p>
                {geminiError.includes('API Key') && (
                  <button
                    className="btn btn-primary"
                    onClick={() => setIsKeyModalOpen(true)}
                    style={{ marginTop: '0.75rem', fontSize: '0.85rem', padding: '0.5rem 1rem' }}
                  >
                    Set Gemini API Key Now
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Clean Single Download Button Card */}
        {aiData && (
          <div className="container">
            <CleanDownloadCard
              userName={userData?.name}
              aiData={aiData}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={appStyles.footer}>
        <div className="container" style={appStyles.footerContainer}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Leaf size={20} color="var(--primary-emerald)" />
            <span style={{ fontWeight: '700', color: 'var(--primary-emerald)' }}>BioBalance</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-subtle)' }}>
              • Zero Backend GitHub Pages Ready
            </span>
          </div>

          <p style={{ fontSize: '0.85rem', color: 'var(--text-subtle)' }}>
            Empowering individual metabolic health with Google Gemini AI.
          </p>
        </div>
      </footer>

      {/* API Key Modal */}
      <ApiKeyModal
        isOpen={isKeyModalOpen}
        onClose={() => setIsKeyModalOpen(false)}
      />
    </div>
  );
}

const appStyles = {
  appWrapper: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'var(--bg-main)',
  },
  geminiErrorBox: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1rem',
    backgroundColor: '#FEF2F2',
    border: '1.5px solid #FCA5A5',
    padding: '1.25rem',
    borderRadius: '16px',
    maxWidth: '680px',
    margin: '0 auto',
    boxShadow: 'var(--shadow-sm)',
  },
  footer: {
    borderTop: '1px solid var(--border-green)',
    backgroundColor: '#FFFFFF',
    padding: '1.75rem 0',
    marginTop: '4rem',
  },
  footerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem',
  },
};
