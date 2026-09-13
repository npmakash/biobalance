import { CONFIG, getDefaultApiKey } from '../config';

/**
 * Gemini API Service supporting both AI Studio Keys (AIzaSy...) and Google Cloud Access Tokens (AQ... / ya29...)
 */

export async function generateDietPlanWithGemini({
  apiKey,
  name,
  age,
  height,
  weight,
  hasIssue,
  issueDetails,
  pdfReportText,
}) {
  const cleanApiKey = (
    apiKey ||
    localStorage.getItem('biobalance_gemini_key') ||
    import.meta.env.VITE_GEMINI_API_KEY ||
    CONFIG.GEMINI_API_KEY ||
    getDefaultApiKey() ||
    ''
  ).trim();

  if (!cleanApiKey) {
    throw new Error(
      'Gemini API Key is missing. Please click the key icon in the top right header to enter your Google Gemini API Key from https://aistudio.google.com/app/apikey.'
    );
  }

  const reportDateStr = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const heightWeightStr = height && weight ? `${height} / ${weight}` : 'Standard Profile';

  const issuePromptText = hasIssue
    ? `
- Health Condition: ${issueDetails.issueName || 'Not specified'}
- Onset Date/Duration: ${issueDetails.issueDate || 'Not specified'}
- Treatment Continuing: ${issueDetails.treatmentOngoing ? 'Yes' : 'No'}
- Experiencing Relief: ${issueDetails.hasRelief ? 'Yes' : 'No'}
`
    : '- No existing chronic health conditions declared.';

  const prompt = `
You are BioBalance AI, a clinical dietitian and health optimization expert.
Synthesize the patient profile and laboratory report below into a personalized diet & lifestyle blueprint.

PATIENT PROFILE:
- Patient Name: ${name}
- Age: ${age}
- Height & Weight: ${heightWeightStr}
- Report Date: ${reportDateStr}
- Health & Medical Context:
${issuePromptText}
${pdfReportText ? `\n- Diagnostic Medical PDF Summary:\n${pdfReportText.slice(0, 2500)}` : ''}

CRITICAL: You MUST return ONLY a VALID JSON object matching these EXACT 24 Google Presentation slide template placeholder keys:

{
  "patient_name": "${name}",
  "age": "${age}",
  "height_and_weight": "${heightWeightStr}",
  "report_date": "${reportDateStr}",
  "primary_targets": "Key metabolic & nutritional goals (e.g., Blood sugar stabilization, gut repair, lean muscle maintenance)",
  "caloric_alignment": "Daily caloric recommendation & macro breakdown (e.g., 2,100 kcal - 30% Protein, 45% Carbs, 25% Fat)",
  "hyderation_baseline": "Daily water & electrolyte intake target (e.g., 3.2 Liters water + herbal infusion)",
  "key_habit_focus": "Core daily routine habit (e.g., 15-min post-meal walk & 8h sleep)",
  "breakfast": "Detailed breakfast meal option (e.g., Warm oats with chia seeds, blueberries & crushed almonds)",
  "mid_morning": "Nutrient-dense mid-morning snack (e.g., Green apple with walnut butter)",
  "lunch": "Balanced lunch option (e.g., Wild salmon/tofu quinoa bowl with steamed broccoli & olive oil)",
  "evening_snack": "Light afternoon fuel (e.g., Roasted pumpkin seeds & warm chamomile tea)",
  "dinner": "Digestible evening meal (e.g., Sprouted lentil soup or baked chicken with spinach)",
  "protein_distribution": "Protein intake guidelines (e.g., 1.4g per kg body weight across 4 meals)",
  "complex_carbohydrates": "Carb sources (e.g., Steel-cut oats, quinoa, sweet potato, and organic brown rice)",
  "healthy_fats": "Fat sources (e.g., Extra virgin olive oil, avocados, flaxseeds, almonds)",
  "dietry_fiber": "Fiber baseline (e.g., 35g daily from leafy greens & berries)",
  "res_point_1": "Primary Clinical Insight 1",
  "one_line_des_point_1": "Concise 1-sentence action for Insight 1",
  "res_point_2": "Primary Clinical Insight 2",
  "one_line_des_point_2": "Concise 1-sentence action for Insight 2",
  "res_point_3": "Primary Clinical Insight 3",
  "one_line_des_point_3": "Concise 1-sentence action for Insight 3",
  "res_point_4": "Primary Clinical Insight 4",
  "one_line_des_point_4": "Concise 1-sentence action for Insight 4"
}
`;

  // Determine token type
  const isBearerToken = cleanApiKey.startsWith('AQ.') || cleanApiKey.startsWith('ya29.');

  // Array of endpoint configurations to try
  const requestConfigs = [];

  if (isBearerToken) {
    // 1. Bearer token on AI Studio endpoint
    requestConfigs.push({
      url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cleanApiKey}`,
      },
    });
    requestConfigs.push({
      url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cleanApiKey}`,
      },
    });
    // 2. Query key on AI Studio endpoint as fallback
    requestConfigs.push({
      url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${cleanApiKey}`,
      headers: { 'Content-Type': 'application/json' },
    });
  } else {
    // Standard API key (AIzaSy...)
    requestConfigs.push({
      url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${cleanApiKey}`,
      headers: { 'Content-Type': 'application/json' },
    });
    requestConfigs.push({
      url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${cleanApiKey}`,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let lastError = null;

  for (const cfg of requestConfigs) {
    try {
      const response = await fetch(cfg.url, {
        method: 'POST',
        headers: cfg.headers,
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            temperature: 0.3,
            responseMimeType: 'application/json',
          },
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        let msg = `Gemini API returned HTTP ${response.status}`;
        try {
          const parsedErr = JSON.parse(errText);
          if (parsedErr.error?.message) {
            msg = parsedErr.error.message;
          }
        } catch (_) {}

        if (msg.includes('invalid authentication credentials') || msg.includes('API_KEY_INVALID')) {
          lastError = new Error(
            `Invalid Gemini API Key or Token. Please generate a free Google Gemini API Key (starts with 'AIzaSy...') at https://aistudio.google.com/app/apikey and click the Key icon in top right to paste it.`
          );
        } else {
          lastError = new Error(`Gemini API Error: ${msg}`);
        }
        continue;
      }

      const data = await response.json();
      const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!candidateText) {
        throw new Error('Empty response received from Gemini API.');
      }

      const parsedJson = JSON.parse(candidateText);
      return parsedJson;
    } catch (err) {
      lastError = err;
    }
  }

  throw lastError || new Error('Failed to generate diet plan from Gemini API.');
}
