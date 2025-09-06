import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';
import { generateContext } from '@/lib/ai-service';
import type { AIContextRequest } from '@/types/ai';
import type { SessionInterface } from '@/common.types';

// Next.js cache configuration
export const revalidate = 3600; // Cache for 1 hour

/**
 * POST /api/ai/context
 * Generate AI context for an English sentence
 */
export async function POST(request: NextRequest) {
    try {
        // Check authentication
        const session = await getCurrentUser();
        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Check admin permission
        if (!(session as SessionInterface).isAdmin) {
            return NextResponse.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
        }

        // Parse request body
        const body: AIContextRequest = await request.json();

        if (!body.sentence || typeof body.sentence !== 'string') {
            return NextResponse.json({ error: 'Invalid request: sentence is required' }, { status: 400 });
        }

        // Generate AI context
        const result = await generateContext({
            sentence: `You are a English teacher, your student are Taiwanese. 1. Please provide a brief, natural hints for the English sentence. 2. Show the difficult words' hints and International Phonetic Alphabet. 3. Show the original sentence in the beginning. English Sentence: "${body.sentence}". Do not too obvious, we want the user to think a bit.`,
        });

        if (!result.success) {
            return NextResponse.json({ error: result.error?.message || 'AI generation failed' }, { status: 500 });
        }

        // Return successful response
        return NextResponse.json(result, {
            status: 200,
            headers: {
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
            },
        });
    } catch (error) {
        console.error('AI context API error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

/**
 * GET /api/ai/context
 * Get cached AI context (if available)
 */
export async function GET(request: NextRequest) {
    try {
        // Check authentication
        const session = await getCurrentUser();
        if (!session?.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Check admin permission
        if (!(session as SessionInterface).isAdmin) {
            return NextResponse.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
        }

        // Get sentence from query params
        const { searchParams } = new URL(request.url);
        const sentence = searchParams.get('sentence');

        if (!sentence) {
            return NextResponse.json({ error: 'Sentence parameter is required' }, { status: 400 });
        }

        // Generate AI context (will use Next.js cache if available)
        const result = await generateContext({ sentence });

        if (!result.success) {
            return NextResponse.json({ error: result.error?.message || 'AI generation failed' }, { status: 500 });
        }

        // Return successful response with caching headers
        return NextResponse.json(result, {
            status: 200,
            headers: {
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
            },
        });
    } catch (error) {
        console.error('AI context API error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
