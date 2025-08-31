'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import type { AIContextResponse } from '@/types/ai';

interface AIContextState {
    isLoading: boolean;
    error: string | null;
    result: AIContextResponse | null;
    isOpen: boolean;
    cache: Map<string, AIContextResponse>;
}

interface AIContextActions {
    generateContext: (sentence: string) => Promise<void>;
    clearResult: () => void;
    openModal: () => void;
    closeModal: () => void;
    isCached: (sentence: string) => boolean;
    clearCache: () => void;
}

interface AIContextValue extends AIContextState, AIContextActions {}

const AIContext = createContext<AIContextValue | undefined>(undefined);

export function AIProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<AIContextState>({
        isLoading: false,
        error: null,
        result: null,
        isOpen: false,
        cache: new Map(),
    });

    const generateContext = useCallback(
        async (sentence: string) => {
            // Normalize sentence for consistent caching
            const normalizedSentence = sentence.toLowerCase().trim();

            // Check cache first
            const cachedResult = state.cache.get(normalizedSentence);
            if (cachedResult) {
                setState((prev) => ({
                    ...prev,
                    result: cachedResult,
                    error: null,
                    isLoading: false,
                }));
                return;
            }

            try {
                setState((prev) => ({ ...prev, isLoading: true, error: null }));

                const response = await fetch('/api/ai/context', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ sentence }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Failed to generate context');
                }

                const result: AIContextResponse = await response.json();

                // Cache the result
                setState((prev) => ({
                    ...prev,
                    isLoading: false,
                    result,
                    error: null,
                    cache: new Map(prev.cache).set(normalizedSentence, result),
                }));
            } catch (error) {
                setState((prev) => ({
                    ...prev,
                    isLoading: false,
                    error: error instanceof Error ? error.message : 'Unknown error occurred',
                }));
            }
        },
        [state.cache],
    );

    const clearResult = useCallback(() => {
        setState((prev) => ({ ...prev, result: null, error: null }));
    }, []);

    const openModal = useCallback(() => {
        setState((prev) => ({ ...prev, isOpen: true }));
    }, []);

    const closeModal = useCallback(() => {
        setState((prev) => ({ ...prev, isOpen: false }));
    }, []);

    const isCached = useCallback(
        (sentence: string) => {
            const normalizedSentence = sentence.toLowerCase().trim();
            return state.cache.has(normalizedSentence);
        },
        [state.cache],
    );

    const clearCache = useCallback(() => {
        setState((prev) => ({ ...prev, cache: new Map() }));
    }, []);

    const value: AIContextValue = {
        ...state,
        generateContext,
        clearResult,
        openModal,
        closeModal,
        isCached,
        clearCache,
    };

    return <AIContext.Provider value={value}>{children}</AIContext.Provider>;
}

export function useAI() {
    const context = useContext(AIContext);
    if (context === undefined) {
        throw new Error('useAI must be used within an AIProvider');
    }
    return context;
}
