import type { AIConfig } from '@/types/ai';

/**
 * Get AI configuration from environment variables
 */
export function getAIConfig(): AIConfig {
    return {
        model: process.env.AI_MODEL || 'gemini-2.5-flash',
        maxTokens: parseInt(process.env.AI_MAX_TOKENS || '1000'),
        temperature: parseFloat(process.env.AI_TEMPERATURE || '0.7'),
    };
}

/**
 * Get AI API key from environment variables
 * Note: Google AI SDK automatically picks up GEMINI_API_KEY from environment
 */
export function getAIAPIKey(): string {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        throw new Error('GEMINI_API_KEY environment variable is not set');
    }
    return apiKey;
}

/**
 * Validate AI configuration
 */
export function validateAIConfig(): boolean {
    try {
        const config = getAIConfig();
        const apiKey = getAIAPIKey();

        // Basic validation
        if (!apiKey || apiKey === 'your_gemini_api_key_here') {
            console.error('AI_API_KEY is not properly configured');
            return false;
        }

        if (config.maxTokens < 1 || config.maxTokens > 10000) {
            console.error('AI_MAX_TOKENS must be between 1 and 10000');
            return false;
        }

        if (config.temperature < 0 || config.temperature > 2) {
            console.error('AI_TEMPERATURE must be between 0 and 2');
            return false;
        }

        return true;
    } catch (error) {
        console.error('AI configuration validation failed:', error);
        return false;
    }
}
