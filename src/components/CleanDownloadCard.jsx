import React, { useState } from 'react';
import { Download, Sparkles, CheckCircle, Loader2, AlertTriangle, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';
import { generateGoogleSlidePdf } from '../services/googleSlidesService';

export default function CleanDownloadCard({ userName, aiData }) {
  const [isExporting, setIsExporting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [googleDrivePdfUrl, setGoogleDrivePdfUrl] = useState(null);

  const handleDownloadPDF = async () => {
    setIsExporting(true);
    setIsSuccess(false);
    setErrorMessage(null);

    try {
      // Call Google Apps Script Web App to duplicate presentation and replace 24 placeholders
      const googleResult = await generateGoogleSlidePdf(aiData);

      if (googleResult && googleResult.status === 'success') {
        // Trigger festive celebration confetti
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#0E5E38', '#16A34A', '#34D399', '#DCFCE7'],
        });

        if (googleResult.pdfBase64) {
          const link = document.createElement('a');
          link.href = `data:application/pdf;base64,${googleResult.pdfBase64}`;
          link.download = `BioBalance_Diet_Plan_${(userName || 'User').replace(/\s+/g, '_')}.pdf`;
          link.click();
        } else if (googleResult.downloadUrl) {
          window.open(googleResult.downloadUrl, '_blank');
        }

        if (googleResult.presentationUrl) {
          setGoogleDrivePdfUrl(googleResult.presentationUrl);
        }

        setIsSuccess(true);
      } else {
        throw new Error(googleResult?.message || 'Google Apps Script failed to process presentation PDF.');
      }
    } catch (err) {
      console.error('Error generating Google Presentation PDF:', err);
      setErrorMessage(err.message || 'Failed to replace presentation placeholders on Google Apps Script.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div id="download-card-section" style={cardStyles.wrapper} className="animate-drop-in">
      <div className="glass-card" style={cardStyles.card}>
        <div style={cardStyles.badge}>
          <Sparkles size={20} color="var(--primary-emerald)" />
          <span>Diet Report Generated Successfully</span>
        </div>

        <h2 style={cardStyles.title}>Your Personalized Diet Report is Ready</h2>
        <p style={cardStyles.subtitle}>
          Gemini AI has processed your assessment and generated all 24 presentation placeholders.
        </p>

        {/* Error Notification Banner */}
        {errorMessage && (
          <div style={cardStyles.errorNotice}>
            <AlertTriangle size={20} color="#DC2626" />
            <div>
              <strong>Slide Generation Error:</strong>
              <p style={{ fontSize: '0.88rem', marginTop: '0.2rem' }}>{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Success Notification Banner */}
        {isSuccess && (
          <div style={cardStyles.successNotice}>
            <CheckCircle size={20} color="var(--primary-emerald)" />
            <span>Google Presentation copied & PDF downloaded successfully!</span>
          </div>
        )}

        {googleDrivePdfUrl && (
          <div style={{ marginBottom: '1.2rem' }}>
            <a
              href={googleDrivePdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ fontSize: '0.9rem', padding: '0.6rem 1.1rem' }}
            >
              <ExternalLink size={16} /> Open Replaced Google Presentation Copy
            </a>
          </div>
        )}

        {/* Primary Glowing Action Button */}
        <div style={cardStyles.ctaWrap}>
          <button
            className="btn btn-primary btn-large animate-pulse-glow"
            onClick={handleDownloadPDF}
            disabled={isExporting}
            style={cardStyles.button}
          >
            {isExporting ? (
              <>
                <Loader2 size={24} className="animate-spin" />
                <span>Replacing Placeholders on Google Drive...</span>
              </>
            ) : (
              <>
                <Download size={24} />
                <span>Take Your Diet Plan</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

const cardStyles = {
  wrapper: {
    padding: '2rem 0 4rem 0',
    display: 'flex',
    justifyContent: 'center',
  },
  card: {
    maxWidth: '620px',
    width: '100%',
    textAlign: 'center',
    padding: '2.5rem 2rem',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: 'var(--bg-emerald-tint)',
    color: 'var(--primary-emerald)',
    padding: '0.4rem 1.1rem',
    borderRadius: 'var(--radius-full)',
    fontSize: '0.88rem',
    fontWeight: '700',
    marginBottom: '1rem',
  },
  title: {
    fontSize: '2rem',
    color: 'var(--primary-emerald)',
    marginBottom: '0.5rem',
  },
  subtitle: {
    fontSize: '0.95rem',
    color: 'var(--text-muted)',
    maxWidth: '460px',
    margin: '0 auto 2rem auto',
    lineHeight: '1.5',
  },
  errorNotice: {
    display: 'flex',
    alignItems: 'flex-start',
    textAlign: 'left',
    gap: '0.75rem',
    backgroundColor: '#FEF2F2',
    color: '#991B1B',
    border: '1.5px solid #FCA5A5',
    padding: '0.9rem 1.1rem',
    borderRadius: '12px',
    fontSize: '0.92rem',
    marginBottom: '1.5rem',
  },
  successNotice: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    backgroundColor: 'var(--bg-emerald-tint)',
    color: 'var(--primary-emerald)',
    padding: '0.75rem 1rem',
    borderRadius: '12px',
    fontSize: '0.92rem',
    fontWeight: '600',
    marginBottom: '1.5rem',
  },
  ctaWrap: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    width: '100%',
    maxWidth: '400px',
    padding: '1.25rem 2rem',
    fontSize: '1.2rem',
  },
};
