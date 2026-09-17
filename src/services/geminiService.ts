import type { WordData } from '../types/game';
import { CATEGORY_OPTIONS, getWord } from '../data/presetWords';
import { supabase, isSupabaseConfigured } from './supabaseClient';

export const isGeminiConfigured = isSupabaseConfigured;

/**
 * Resolves a category ID (or raw string) into a specific human-readable CategoryOption.
 * If 'random', picks a random category from the predefined set.
 */
function resolveCategory(categoryId?: string) {
  const specificOptions = CATEGORY_OPTIONS.filter((c) => c.id !== 'random');

  if (!categoryId || categoryId === 'random') {
    return specificOptions[Math.floor(Math.random() * specificOptions.length)];
  }

  const found = CATEGORY_OPTIONS.find((c) => c.id === categoryId);
  if (found) return found;

  // If passed an exact name directly
  const foundByName = CATEGORY_OPTIONS.find((c) => c.name.toLowerCase() === categoryId.toLowerCase());
  if (foundByName) return foundByName;

  // Fallback to random specific category
  return specificOptions[Math.floor(Math.random() * specificOptions.length)];
}

/**
 * Generate a dynamic secret word and cryptic imposter hint using the secure Supabase Edge Function ('generate-word').
 * The API key is stored privately in Supabase Secrets and never exposed to the client.
 * Automatically falls back to curated preset words if offline or during edge function cold-starts.
 */
export async function generateAiWord(categoryId?: string): Promise<WordData> {
  const selectedCategory = resolveCategory(categoryId);

  if (!isSupabaseConfigured) {
    return getWord(selectedCategory.id);
  }

  try {
    // 12s timeout accommodates server-side multi-model retry during Google demand spikes
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Edge function generation timed out after 12000ms')), 12000)
    );

    const invokePromise = supabase.functions.invoke('generate-word', {
      body: {
        category: selectedCategory.id,
        categoryName: selectedCategory.name,
        categoryDescription: selectedCategory.description,
      },
    });

    const { data, error } = await Promise.race([invokePromise, timeoutPromise]);

    if (error || !data) {
      let detailMsg = error?.message || 'Empty response from generate-word edge function.';
      try {
        if (error && 'context' in error && (error as any).context) {
          const body = await (error as any).context.json();
          if (body?.details || body?.error) {
            detailMsg = `${body.error || ''} ${body.details || ''}`.trim();
          }
        }
      } catch {
        // Fall through to default detail message
      }
      throw new Error(detailMsg);
    }

    if (data.error) {
      throw new Error(data.details ? `${data.error}: ${data.details}` : data.error);
    }

    if (!data.secretWord || !data.imposterHint) {
      throw new Error('Incomplete data received from generate-word edge function.');
    }

    return {
      category: selectedCategory.name,
      secretWord: String(data.secretWord).trim(),
      imposterHint: String(data.imposterHint).trim(),
    };
  } catch (error) {
    console.warn('Backend AI generation failed or unconfigured, falling back to preset words deck:', error);
    return getWord(selectedCategory.id);
  }
}