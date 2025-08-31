'use client';

import React from 'react';
import { Lightbulb } from 'lucide-react';
import { useAI } from './AIContext';
import { useSession } from 'next-auth/react';

interface AIBulbIconProps {
    sentence: string;
    className?: string;
}

export function AIBulbIcon({ sentence, className = '' }: AIBulbIconProps) {
    const { data: session } = useSession();
    const { generateContext, openModal, isLoading, isCached } = useAI();

    // Check if user is admin
    const isAdmin = (session as any)?.isAdmin;

    // Don't render if user is not admin
    if (!isAdmin) {
        return null;
    }

    const handleClick = async () => {
        try {
            await generateContext(sentence);
            openModal();
        } catch (error) {
            console.error('Failed to generate AI context:', error);
        }
    };

    return (
        <button
            onClick={handleClick}
            disabled={isLoading}
            className={`rounded-full p-2 transition-colors duration-200 hover:bg-yellow-100 disabled:cursor-not-allowed disabled:opacity-50 ${className} `}
            title="Get AI context for this sentence"
            data-testid="ai-bulb-icon"
        >
            <Lightbulb
                className={`h-5 w-5 ${
                    isLoading ? 'text-yellow-400' : isCached(sentence) ? 'text-green-500' : 'text-yellow-500'
                }`}
            />
        </button>
    );
}
