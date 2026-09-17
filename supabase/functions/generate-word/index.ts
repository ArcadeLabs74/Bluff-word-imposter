// Supabase Edge Function: generate-word
// Secure server-side word generation using Google Gemini 2.5 Flash
// Prevents exposing GEMINI_API_KEY to client-side browsers and ensures anti-cheat integrity.

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface RequestBody {
  category?: string;
  categoryName?: string;
  categoryDescription?: string;
}

Deno.serve(async (req: Request) => {
  // 1. Handle CORS Preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get('GEMINI_API_KEY');
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'GEMINI_API_KEY is not configured in Supabase Secrets.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 2. Parse request payload
    let body: RequestBody = {};
    try {
      body = await req.json();
    } catch {
      body = {};
    }

    const categoryName = body.categoryName || body.category || 'Random Mix';
    const categoryDesc = body.categoryDescription || 'General knowledge and fun concepts';

    // 3. Construct prompt with high-vagueness constraints for the imposter hint
    const systemPrompt = `You are the master game engine for a social deduction party game called "Guess The Imposter" (similar to Spyfall and Chameleon).

Your task: Generate ONE secret word and ONE intentionally VAGUE hint strictly inside the selected category below.

Selected Category: "${categoryName}" (${categoryDesc}).

Rules:
1. "category": Must be EXACTLY "${categoryName}".
2. "secretWord": Must be a well-known, concrete noun or popular concept that belongs CLEARLY to "${categoryName}". (1 to 3 words max).
3. "imposterHint": Must be INTENTIONALLY VAGUE, ABSTRACT, AND BROAD (1 short sentence).
   - CRITICAL REQUIREMENT: The hint must NOT give away the secret word! The imposter must NOT be able to deduce the exact word just by reading the hint.
   - The purpose of this hint is only to give the imposter a loose theme, sensory vibe, or general direction so they can blend in without looking completely lost.
   - It should describe a broad feeling, setting, texture, or general attribute that could easily apply to at least 5 to 10 DIFFERENT items in this category.
   - NEVER mention signature traits, defining mechanics, exact locations, famous names, specific ingredients, or giveaway details.
   - Examples of BAD (too obvious) vs GOOD (appropriately vague):
     * Word: "Batmobile" -> BAD: "An armored vigilante car patrolling Gotham" | GOOD: "Associated with rapid mobility and nighttime operations."
     * Word: "Sushi" -> BAD: "Rolled vinegar rice with fresh raw fish" | GOOD: "Often served chilled and requires careful craftsmanship."
     * Word: "Eiffel Tower" -> BAD: "A famous iron lattice monument in Paris" | GOOD: "Known for towering elevation and tourist appeal."
     * Word: "Pizza" -> BAD: "Baked dough topped with tomato sauce and melted cheese" | GOOD: "Often shared among groups and enjoyed hot."
     * Word: "Penalty Kick" -> BAD: "A 12-yard soccer shot against the goalkeeper" | GOOD: "A tense, focused moment where precision under pressure is key."
4. Output valid JSON matching the schema.`;

    // 4. Call Google Gemini API using the standard gemini-2.0-flash model
    // Uses the recommended x-goog-api-key header instead of query parameters
    const geminiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

    const geminiPayload = {
      contents: [
        {
          parts: [{ text: systemPrompt }],
        },
      ],
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: 'OBJECT',
          properties: {
            category: { type: 'STRING' },
            secretWord: { type: 'STRING' },
            imposterHint: { type: 'STRING' },
          },
          required: ['category', 'secretWord', 'imposterHint'],
        },
      },
    };

    // 4. Call Google Gemini API using the exact models available on this API key
    const candidateEndpoints = [
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent',
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-lite-latest:generateContent',
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent',
      'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent',
    ];

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s for multi-model retry

    let res: Response | null = null;
    let lastErrText = '';

    for (const endpoint of candidateEndpoints) {
      const urlWithKey = `${endpoint}?key=${apiKey.trim()}`;
      try {
        res = await fetch(urlWithKey, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': apiKey.trim(),
          },
          body: JSON.stringify(geminiPayload),
          signal: controller.signal,
        });

        if (res.ok) {
          break; // Succeeded!
        }

        lastErrText = await res.text();
        // 404 = model not found, 503 = overloaded => try next model
        // For non-retryable errors (400 bad key, 403 quota), stop immediately
        if (res.status !== 404 && res.status !== 503 && res.status !== 429) {
          break;
        }
      } catch (err: any) {
        lastErrText = err.message || 'Fetch error';
      }
    }

    clearTimeout(timeoutId);

    if (!res || !res.ok) {
      // Diagnostic: Check which models are available on this key
      let availableModelsInfo = '';
      try {
        const listRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey.trim()}`);
        if (listRes.ok) {
          const listData = await listRes.json();
          const names = (listData.models || []).map((m: any) => m.name).slice(0, 8);
          availableModelsInfo = `Available models on your key: [${names.join(', ')}]`;
        } else {
          availableModelsInfo = `ListModels returned status ${listRes.status}: ${await listRes.text()}`;
        }
      } catch {
        // ignore
      }

      console.error('Gemini API error:', res?.status, lastErrText, availableModelsInfo);
      return new Response(
        JSON.stringify({
          error: `Gemini API responded with status ${res?.status || 502}`,
          details: lastErrText,
          diagnostics: availableModelsInfo,
        }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const geminiData = await res.json();
    const rawText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (!rawText) {
      return new Response(
        JSON.stringify({ error: 'Empty output from Gemini API.' }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const parsed = JSON.parse(rawText);

    if (!parsed.secretWord || !parsed.imposterHint) {
      return new Response(
        JSON.stringify({ error: 'Incomplete data structure returned from Gemini.' }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        category: categoryName,
        secretWord: parsed.secretWord.trim(),
        imposterHint: parsed.imposterHint.trim(),
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    console.error('generate-word edge function error:', err);
    return new Response(
      JSON.stringify({ error: err.message || 'Internal server error during word generation' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
