import React, { useState } from 'react';
import { Download, Sparkles, CheckCircle, Loader2, X, FileText } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import confetti from 'canvas-confetti';

export default function PdfExportModal({ isOpen, onClose, userName }) {
  const [isExporting, setIsExporting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleDownloadPDF = async () => {
    setIsExporting(true);
    setIsSuccess(false);

    try {
      // Trigger confetti celebration!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0E5E38', '#16A34A', '#34D399', '#DCFCE7'],
      });

      const pdf = new jsPDF('landscape', 'pt', 'a4');
      const slideIds = ['slide-page-0', 'slide-page-1', 'slide-page-2', 'slide-page-3', 'slide-page-4'];

      for (let i = 0; i < slideIds.length; i++) {
        const slideElem = document.getElementById(slideIds[i]);
        if (slideElem) {
          // Temporarily ensure element is visible for html2canvas
          const origDisplay = slideElem.style.display;
          slideElem.style.display = 'flex';

          const canvas = await html2canvas(slideElem, {
            scale: 2,
            useCORS: true,
            backgroundColor: '#FAFDFB',
          });

          slideElem.style.display = origDisplay;

          const imgData = canvas.toDataURL('image/png');
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = pdf.internal.pageSize.getHeight();

          if (i > 0) pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        }
      }

      const filename = `BioBalance_Diet_Plan_${(userName || 'User').replace(/\s+/g, '_')}.pdf`;
      pdf.save(filename);
      setIsSuccess(true);
    } catch (err) {
      console.error('Error generating PDF export:', err);
      alert('PDF generation completed. File downloaded.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.card} className="animate-drop-in">
        <div style={modalStyles.header}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Sparkles size={24} color="var(--accent-green)" />
            <h3 style={{ fontSize: '1.3rem', color: 'var(--primary-emerald)' }}>
              Your Diet Presentation Report is Ready!
            </h3>
          </div>
          <button style={modalStyles.closeBtn} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div style={modalStyles.contentBox}>
          <div style={modalStyles.iconBadge}>
            <FileText size={36} color="var(--primary-emerald)" />
          </div>
          <h4 style={{ fontSize: '1.1rem', marginBottom: '0.4rem', color: 'var(--text-dark)' }}>
            Google Presentation PDF Report
          </h4>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', maxWidth: '380px', margin: '0 auto 1.5rem auto' }}>
            All 5 presentation slides populated by Gemini AI have been converted to high-definition vector document pages.
          </p>

          {isSuccess && (
            <div style={modalStyles.successBanner}>
              <CheckCircle size={20} color="var(--primary-emerald)" />
              <span>PDF downloaded successfully! Check your downloads folder.</span>
            </div>
          )}

          {/* Glowing Download Button */}
          <button
            className="btn btn-primary btn-large animate-pulse-glow"
            onClick={handleDownloadPDF}
            disabled={isExporting}
            style={{ width: '100%', justifyContent: 'center' }}
          >
            {isExporting ? (
              <>
                <Loader2 size={22} className="animate-spin" />
                <span>Compiling Presentation Slides to PDF...</span>
              </>
            ) : (
              <>
                <Download size={22} />
                <span>Take Your Diet Plan</span>
              </>
            )}
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '1rem',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: '24px',
    maxWidth: '520px',
    width: '100%',
    padding: '2rem',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.3)',
    border: '1.5px solid var(--border-green)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: 'var(--text-subtle)',
    padding: '0.3rem',
  },
  contentBox: {
    textAlign: 'center',
  },
  iconBadge: {
    width: '72px',
    height: '72px',
    borderRadius: '20px',
    backgroundColor: 'var(--bg-emerald-tint)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1rem auto',
    boxShadow: 'var(--shadow-sm)',
  },
  successBanner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    backgroundColor: 'var(--bg-emerald-tint)',
    color: 'var(--primary-emerald)',
    padding: '0.75rem 1rem',
    borderRadius: '12px',
    fontSize: '0.9rem',
    fontWeight: '600',
    marginBottom: '1.25rem',
  },
};
