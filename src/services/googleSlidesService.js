import { CONFIG } from '../config';

/**
 * Service to replace placeholders in Google Presentation via Google Apps Script Web App.
 */

export async function generateGoogleSlidePdf(placeholdersData) {
  const scriptUrl = CONFIG.GOOGLE_APPS_SCRIPT_URL || localStorage.getItem('biobalance_apps_script_url');

  if (!scriptUrl) {
    console.log('Google Apps Script URL not configured.');
    return null;
  }

  try {
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

    const result = await response.json();
    if (result && result.status === 'success') {
      return result;
    } else {
      console.warn('Apps script response error:', result?.message);
    }
  } catch (error) {
    console.warn('Google Apps Script endpoint warning, using client-side fallback:', error);
  }
  return null;
}
