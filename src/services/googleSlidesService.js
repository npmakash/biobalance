import { CONFIG } from '../config';

/**
 * Service to call Google Apps Script Web App for duplicating Google Presentation 1tI98DhLl4OUOyeFryFDnvOaSgSFP7yYLH878CpSwfZ0,
 * replacing the 24 placeholders, and downloading the PDF.
 */

export async function generateGoogleSlidePdf(placeholdersData) {
  const scriptUrl =
    CONFIG.GOOGLE_APPS_SCRIPT_URL ||
    localStorage.getItem('biobalance_apps_script_url') ||
    'https://script.google.com/macros/s/AKfycbyxsM-3soYvejTXvCGBcvKYX3zlInmkeF8QIaWUH8GbJgRw9yA2SBM_TptYNlwNJ-f8-w/exec';

  if (!scriptUrl) {
    throw new Error('Google Apps Script Web App URL is not configured.');
  }

  const response = await fetch(scriptUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8',
    },
    body: JSON.stringify({
      templateId: CONFIG.GOOGLE_SLIDES_TEMPLATE_ID,
      data: placeholdersData,
    }),
  });

  if (!response.ok) {
    throw new Error(`Google Apps Script Web App returned HTTP status ${response.status}`);
  }

  const result = await response.json();

  if (!result || result.status !== 'success') {
    throw new Error(result?.message || 'Google Apps Script failed to generate presentation PDF.');
  }

  return result;
}
