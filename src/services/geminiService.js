import { CONFIG, getDefaultApiKey } from '../config';

/**
 * Gemini API Service supporting both API Keys (AIzaSy...) and Bearer Tokens (AQ... / ya29...)
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
  const cleanApiKey =
    apiKey ||
    localStorage.getItem('biobalance_gemini_key') ||
    import.meta.env.VITE_GEMINI_API_KEY ||
    CONFIG.GEMINI_API_KEY ||
    getDefaultApiKey() ||
    '';

  if (!cleanApiKey) {
    throw new Error('Gemini API Key is missing. Please click the key icon in the top right header to enter your Google Gemini API Key.');
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

  // Detect whether token is Bearer Access Token (AQ... or ya29...) or Standard API Key (AIzaSy...)
  const isBearerToken = cleanApiKey.startsWith('AQ.') || cleanApiKey.startsWith('ya29.');

  const headers = {
    'Content-Type': 'application/json',
  };

  if (isBearerToken) {
    headers['Authorization'] = `Bearer ${cleanApiKey}`;
  }

  // Model endpoints to try in order
  const models = ['gemini-2.5-flash', 'gemini-1.5-flash'];
  let lastError = null;

  for (const modelName of models) {
    const endpoint = isBearerToken
      ? `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent`
      : `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${cleanApiKey}`;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: headers,
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
        let msg = `Gemini API returned error (${response.status})`;
        try {
          const parsedErr = JSON.parse(errText);
          if (parsedErr.error?.message) {
            msg = `Gemini API Error: ${parsedErr.error.message}`;
          }
        } catch (_) {}
        lastError = new Error(msg);
        continue; // try fallback model if error
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
