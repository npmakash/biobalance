import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DynamicQuestionnaire from './components/DynamicQuestionnaire';
import HiddenSlideRenderer from './components/HiddenSlideRenderer';
import CleanDownloadCard from './components/CleanDownloadCard';
import ApiKeyModal from './components/ApiKeyModal';
import { generateDietPlanWithGemini } from './services/geminiService';
import { Leaf } from 'lucide-react';

export default function App() {
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiData, setAiData] = useState(null);
  const [userData, setUserData] = useState(null);

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
      console.error('Failed to generate diet plan:', err);
      alert('Error generating diet plan. Please try again.');
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

        {/* Hidden Slide Renderer (Off-Screen 16:9 Deck for Crisp PDF Export) */}
        <HiddenSlideRenderer aiData={aiData} />

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
