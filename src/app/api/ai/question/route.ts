import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/session';
import { generateContext } from '@/lib/ai-service';
import type { SessionInterface } from '@/common.types';

// Next.js cache configuration
export const revalidate = 3600; // Cache for 1 hour

/**
 * POST /api/ai/question
 * Handle AI question and answer requests
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
        const body = await request.json();

        if (!body.question || typeof body.question !== 'string') {
            return NextResponse.json({ error: 'Invalid request: question is required' }, { status: 400 });
        }

        // Generate AI response
        const result = await generateContext({ sentence: body.question, context: '' });

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
        console.error('AI question API error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
