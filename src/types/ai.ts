// AI API related types

export interface AIContextRequest {
    sentence: string;
    language?: string;
    context?: string;
}

export interface AIContextResponse {
    success: boolean;
    data?: {
        context: string;
        examples: string[];
        usage: string;
        timestamp: string;
    };
    error?: {
        message: string;
        code: string;
    };
}

export interface AIConfig {
    model: string;
    maxTokens: number;
    temperature: number;
}

export interface AIUsageStats {
    userId: string;
    requestCount: number;
    lastRequestTime: number;
    rateLimitResetTime: number;
}
