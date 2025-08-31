import { GoogleGenAI } from '@google/genai';
import { getAIAPIKey, getAIConfig } from './ai-config';
import type { AIContextRequest, AIContextResponse } from '@/types/ai';

// Initialize Google GenAI - API key is automatically picked up from GEMINI_API_KEY env var
const ai = new GoogleGenAI({
    apiKey: getAIAPIKey(),
});

/**
 * Generate context for an English sentence using AI
 * This function uses Next.js cache mechanism
 */
export async function generateContext(request: AIContextRequest): Promise<AIContextResponse> {
    try {
        const config = getAIConfig();

        // Use the correct API call format according to Google AI docs
        const response = await ai.models.generateContent({
            model: config.model,
            contents: request.sentence,
            config: {
                maxOutputTokens: config.maxTokens,
                temperature: config.temperature,
            },
        });

        const text = response.text;

        if (!text) {
            return {
                success: false,
                error: {
                    message: 'No response text from AI model',
                    code: 'NO_RESPONSE_TEXT',
                },
            };
        }

        // AI now returns natural text, so we can use it directly
        return {
            success: true,
            data: {
                context: text,
                examples: [],
                usage: 'AI generated response',
                timestamp: new Date().toISOString(),
            },
        };
    } catch (error) {
        console.error('AI context generation failed:', error);
        return {
            success: false,
            error: {
                message: error instanceof Error ? error.message : 'Unknown error occurred',
                code: 'AI_GENERATION_FAILED',
            },
        };
    }
}
