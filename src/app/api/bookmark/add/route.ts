import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/session';
import { insertBookmarkToSheet, getGoogleSheetIdForUser } from '@/lib/google-sheets';
import type { SessionInterface } from '@/common.types';

export async function POST(request: NextRequest) {
    try {
        // Check if user is authenticated and is admin
        const session = (await getServerSession(authOptions)) as SessionInterface;
        if (!session?.isAdmin) {
            return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
        }

        // Parse request body
        const { question, answer, note } = await request.json();

        // Validate input data
        if (!question || !answer) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Get Google Sheet ID for user from session
        const userEmail = session.user?.email;
        if (!userEmail) {
            return NextResponse.json({ error: 'User email not found' }, { status: 400 });
        }

        const sheetId = getGoogleSheetIdForUser(userEmail);
        if (!sheetId) {
            return NextResponse.json({ error: 'User sheet not configured' }, { status: 404 });
        }

        // Insert data to Google Sheets
        const result = await insertBookmarkToSheet(
            sheetId,
            {
                timestamp: new Date().toISOString(),
                question,
                answer,
                note: note || '',
            },
            userEmail,
        );

        return NextResponse.json({
            success: true,
            data: result,
            message: 'Bookmark added successfully',
        });
    } catch (error) {
        console.error('Bookmark API error:', error);
        return NextResponse.json(
            {
                error: 'Internal server error',
                details: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 },
        );
    }
}
