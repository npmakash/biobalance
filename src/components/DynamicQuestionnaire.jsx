import React, { useState } from 'react';
import { User, Calendar, Ruler, Scale, AlertCircle, FileUp, Sparkles, CheckCircle2, ArrowRight, Loader2, RefreshCw } from 'lucide-react';
import { extractTextFromPDF } from '../services/pdfReaderService';

export default function DynamicQuestionnaire({ onSubmit, isGenerating }) {
  // Form State
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  
  // Progression Visibility Steps (for dynamic drop-in animation)
  const [showAgeHeight, setShowAgeHeight] = useState(false);
  const [showIssueQuestion, setShowIssueQuestion] = useState(false);
  
  // Health Issue Details
  const [hasIssue, setHasIssue] = useState(null); // true / false / null
  const [issueName, setIssueName] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [treatmentOngoing, setTreatmentOngoing] = useState(true);
  const [hasRelief, setHasRelief] = useState(false);

  // PDF Upload State
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfText, setPdfText] = useState('');
  const [isReadingPdf, setIsReadingPdf] = useState(false);

  // Handlers for step progression
  const handleNameChange = (val) => {
    setName(val);
    if (val.trim().length >= 2 && !showAgeHeight) {
      setShowAgeHeight(true);
    }
  };

  const handleAgeChange = (val) => {
    setAge(val);
    if (val.trim() !== '' && !showIssueQuestion) {
      setShowIssueQuestion(true);
    }
  };

  const handlePdfUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPdfFile(file);
    setIsReadingPdf(true);
    try {
      const text = await extractTextFromPDF(file);
      setPdfText(text);
    } catch (err) {
      console.error('Error reading PDF:', err);
      setPdfText('File attached: ' + file.name);
    } finally {
      setIsReadingPdf(false);
    }
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!name.trim()) return alert('Please enter your name');
    if (!age) return alert('Please enter your age');

    const formData = {
      name: name.trim(),
      age: age,
      height: height ? `${height} cm` : '175 cm',
      weight: weight ? `${weight} kg` : '70 kg',
      hasIssue: hasIssue === true,
      issueDetails: {
        issueName,
        issueDate,
        treatmentOngoing,
        hasRelief,
      },
      pdfReportText: pdfText,
      pdfFileName: pdfFile ? pdfFile.name : null,
    };

    onSubmit(formData);
  };

  return (
    <div id="questionnaire-section" style={qStyles.container}>
      <div className="glass-card" style={qStyles.card}>
        <div style={qStyles.cardHeader}>
          <div style={qStyles.headerBadge}>
            <Sparkles size={18} color="var(--primary-emerald)" />
            <span>Interactive Health Intake</span>
          </div>
          <h2 style={qStyles.title}>Personalized BioBalance Assessment</h2>
          <p style={qStyles.subtitle}>Fill in your details below to generate your custom diet plan & replace Google Presentation placeholders.</p>
        </div>

        <form onSubmit={handleSubmitForm} style={qStyles.form}>
          {/* STEP 1: NAME (Always visible first) */}
          <div className="form-group animate-drop-in" style={qStyles.stepBox}>
            <label className="form-label">
              <User size={18} color="var(--primary-emerald)" />
              1. What is your full name?
            </label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Sarah Jenkins"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              required
              autoFocus
            />
          </div>

          {/* STEP 2: AGE, HEIGHT & WEIGHT (Drops in after Name is entered) */}
          {(showAgeHeight || name.length >= 2) && (
            <div className="form-group animate-drop-in" style={qStyles.stepBox}>
              <label className="form-label" style={{ marginBottom: '0.8rem' }}>
                <Calendar size={18} color="var(--primary-emerald)" />
                2. Age, Height & Weight Profile
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label className="form-label" style={{ fontSize: '0.82rem' }}>
                    Age (years)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="120"
                    className="form-input"
                    placeholder="e.g. 32"
                    value={age}
                    onChange={(e) => handleAgeChange(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="form-label" style={{ fontSize: '0.82rem' }}>
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    className="form-input"
                    placeholder="e.g. 175"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                  />
                </div>

                <div>
                  <label className="form-label" style={{ fontSize: '0.82rem' }}>
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    className="form-input"
                    placeholder="e.g. 70"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: HEALTH ISSUES (Drops in after Age is entered) */}
          {(showIssueQuestion || (name.length >= 2 && age)) && (
            <div className="form-group animate-drop-in" style={qStyles.stepBox}>
              <label className="form-label">
                <AlertCircle size={18} color="var(--primary-emerald)" />
                3. Do you have any existing health or medical issues?
              </label>

              <div className="toggle-group" style={{ marginTop: '0.4rem' }}>
                <button
                  type="button"
                  className={`toggle-btn ${hasIssue === true ? 'active' : ''}`}
                  onClick={() => setHasIssue(true)}
                >
                  Yes, I have an issue
                </button>
                <button
                  type="button"
                  className={`toggle-btn ${hasIssue === false ? 'active' : ''}`}
                  onClick={() => setHasIssue(false)}
                >
                  No chronic issues
                </button>
              </div>

              {/* DYNAMIC SUB-INPUTS IF ISSUE IS YES */}
              {hasIssue === true && (
                <div style={qStyles.subIssueContainer} className="animate-drop-in">
                  <div className="form-group" style={{ marginBottom: '1rem' }}>
                    <label className="form-label" style={{ fontSize: '0.88rem' }}>
                      Issue / Condition Name:
                    </label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Acid Reflux, Type 2 Diabetes, High Blood Pressure, PCOS"
                      value={issueName}
                      onChange={(e) => setIssueName(e.target.value)}
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: '1rem' }}>
                    <label className="form-label" style={{ fontSize: '0.88rem' }}>
                      Date / Period When This Problem Happened:
                    </label>
                    <input
                      type="date"
                      className="form-input"
                      value={issueDate}
                      onChange={(e) => setIssueDate(e.target.value)}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '0.5rem' }}>
                    <div>
                      <label className="form-label" style={{ fontSize: '0.85rem' }}>
                        Treatment Continuing?
                      </label>
                      <div className="toggle-group">
                        <button
                          type="button"
                          className={`toggle-btn ${treatmentOngoing ? 'active' : ''}`}
                          onClick={() => setTreatmentOngoing(true)}
                          style={{ padding: '0.5rem', fontSize: '0.85rem' }}
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          className={`toggle-btn ${!treatmentOngoing ? 'active' : ''}`}
                          onClick={() => setTreatmentOngoing(false)}
                          style={{ padding: '0.5rem', fontSize: '0.85rem' }}
                        >
                          No
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="form-label" style={{ fontSize: '0.85rem' }}>
                        Is Any Relief Experienced?
                      </label>
                      <div className="toggle-group">
                        <button
                          type="button"
                          className={`toggle-btn ${hasRelief ? 'active' : ''}`}
                          onClick={() => setHasRelief(true)}
                          style={{ padding: '0.5rem', fontSize: '0.85rem' }}
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          className={`toggle-btn ${!hasRelief ? 'active' : ''}`}
                          onClick={() => setHasRelief(false)}
                          style={{ padding: '0.5rem', fontSize: '0.85rem' }}
                        >
                          No
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 4: PDF REPORT UPLOAD (Drops in once age & issue preference selected) */}
          {(hasIssue !== null || age) && (
            <div className="form-group animate-drop-in" style={qStyles.stepBox}>
              <label className="form-label">
                <FileUp size={18} color="var(--primary-emerald)" />
                4. Upload Medical Report (Optional PDF)
              </label>

              <div style={qStyles.fileUploadBox}>
                <input
                  type="file"
                  accept="application/pdf"
                  id="pdf-upload-input"
                  onChange={handlePdfUpload}
                  style={{ display: 'none' }}
                />
                <label htmlFor="pdf-upload-input" style={qStyles.fileUploadLabel}>
                  <FileUp size={28} color="var(--accent-green)" />
                  <div>
                    <span style={{ fontWeight: '600', color: 'var(--primary-emerald)' }}>
                      {pdfFile ? pdfFile.name : 'Click to select or drop PDF health report'}
                    </span>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-subtle)', marginTop: '0.2rem' }}>
                      Supports diagnostic blood tests, doctor's lab reports, or health summaries.
                    </p>
                  </div>
                </label>
              </div>

              {isReadingPdf && (
                <div style={qStyles.pdfNotice}>
                  <Loader2 size={16} className="animate-spin" color="var(--primary-emerald)" />
                  <span>Parsing medical report text for Gemini AI analysis...</span>
                </div>
              )}

              {pdfText && !isReadingPdf && (
                <div style={qStyles.pdfSuccess}>
                  <CheckCircle2 size={18} color="var(--accent-green)" />
                  <span>Report text extracted successfully ({pdfText.length} characters ready for Gemini).</span>
                </div>
              )}
            </div>
          )}

          {/* SUBMIT BUTTON */}
          {name && age && (
            <div style={{ marginTop: '1.5rem', textAlign: 'center' }} className="animate-drop-in">
              <button
                type="submit"
                className="btn btn-primary btn-large"
                disabled={isGenerating}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw size={22} className="animate-spin" />
                    <span>Gemini AI is Generating Slide Data...</span>
                  </>
                ) : (
                  <>
                    <span>Generate Diet Plan & Replace Slide Placeholders</span>
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

const qStyles = {
  container: {
    padding: '2rem 0 4rem 0',
    display: 'flex',
    justifyContent: 'center',
  },
  card: {
    maxWidth: '680px',
    width: '100%',
    margin: '0 auto',
  },
  cardHeader: {
    marginBottom: '2rem',
    textAlign: 'center',
  },
  headerBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    backgroundColor: 'var(--bg-emerald-tint)',
    color: 'var(--primary-emerald)',
    padding: '0.35rem 0.9rem',
    borderRadius: 'var(--radius-full)',
    fontSize: '0.82rem',
    fontWeight: '700',
    marginBottom: '0.75rem',
  },
  title: {
    fontSize: '1.8rem',
    color: 'var(--primary-emerald)',
    marginBottom: '0.4rem',
  },
  subtitle: {
    fontSize: '0.92rem',
    color: 'var(--text-muted)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  stepBox: {
    backgroundColor: 'var(--bg-card-subtle)',
    padding: '1.25rem',
    borderRadius: '16px',
    border: '1px solid var(--border-green)',
  },
  subIssueContainer: {
    marginTop: '1rem',
    padding: '1rem',
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
    border: '1px solid #CBD5E1',
  },
  fileUploadBox: {
    border: '2px dashed var(--border-green)',
    borderRadius: '14px',
    backgroundColor: '#FFFFFF',
    padding: '1.25rem',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    marginTop: '0.5rem',
  },
  fileUploadLabel: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.6rem',
    cursor: 'pointer',
  },
  pdfNotice: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.85rem',
    color: 'var(--primary-emerald)',
    marginTop: '0.5rem',
  },
  pdfSuccess: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.85rem',
    color: 'var(--primary-emerald)',
    backgroundColor: 'var(--bg-emerald-tint)',
    padding: '0.6rem 0.85rem',
    borderRadius: '10px',
    marginTop: '0.5rem',
    fontWeight: '600',
  },
};
