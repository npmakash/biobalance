/**
 * BioBalance Configuration File
 * Configure default Gemini API key and Google Presentation Template details here.
 */

export const CONFIG = {
  // Read Gemini API Key from environment variables or localStorage (to prevent repository push secret scanning blocks)
  GEMINI_API_KEY: import.meta.env.VITE_GEMINI_API_KEY || '',

  // Provided Live Google Apps Script Web App URL for Google Drive presentation duplication & placeholder replacement
  GOOGLE_APPS_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbyxsM-3soYvejTXvCGBcvKYX3zlInmkeF8QIaWUH8GbJgRw9yA2SBM_TptYNlwNJ-f8-w/exec',

  // Official Google Presentation Template Details
  GOOGLE_SLIDES_TEMPLATE_ID: '1tI98DhLl4OUOyeFryFDnvOaSgSFP7yYLH878CpSwfZ0',
  GOOGLE_SLIDES_TEMPLATE_URL: 'https://docs.google.com/presentation/d/1tI98DhLl4OUOyeFryFDnvOaSgSFP7yYLH878CpSwfZ0/edit?slide=id.g409d654c841_0_80#slide=id.g409d654c841_0_80',
  GOOGLE_SLIDES_EMBED_URL: 'https://docs.google.com/presentation/d/1tI98DhLl4OUOyeFryFDnvOaSgSFP7yYLH878CpSwfZ0/embed?start=false&loop=false&delayms=3000',
};
