import { google } from 'googleapis';

// Interface for bookmark data
export interface BookmarkData {
    timestamp: string;
    question: string;
    answer: string;
    note: string;
}

// Get Google Sheets authentication
function getGoogleSheetsAuth() {
    try {
        // Parse the compressed JSON credentials
        const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS || '{}');

        // Fix private key format - replace \\n with \n
        if (credentials.private_key) {
            credentials.private_key = credentials.private_key.replace(/\\n/g, '\n');
        }

        const auth = new google.auth.GoogleAuth({
            credentials,
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        return auth;
    } catch (error) {
        console.error('Error parsing Google credentials:', error);
        throw new Error('Invalid Google credentials configuration');
    }
}

// Get Google Sheet ID for a specific user email
export function getGoogleSheetIdForUser(userEmail: string): string | null {
    try {
        const mapping = JSON.parse(process.env.ADMIN_GOOGLE_SHEETS_MAPPING || '{}');
        return mapping[userEmail] || null;
    } catch (error) {
        console.error('Error parsing Google Sheets mapping:', error);
        return null;
    }
}

// Insert bookmark data to Google Sheet
export async function insertBookmarkToSheet(sheetId: string, data: BookmarkData, userEmail?: string) {
    try {
        const auth = getGoogleSheetsAuth();
        const sheets = google.sheets({ version: 'v4', auth });

        // Generate tab name from email or use default
        let tabName = process.env.GOOGLE_SHEETS_TAB_NAME || '我的書籤';
        if (userEmail) {
            const emailPrefix = userEmail.split('@')[0];
            tabName = emailPrefix;
        }

        // First, try to get the sheet to check if tab exists
        let tabExists = false;
        try {
            await sheets.spreadsheets.get({
                spreadsheetId: sheetId,
                ranges: [`${tabName}!A1`],
            });
            tabExists = true;
        } catch (error) {
            // Tab doesn't exist, we'll create it
            tabExists = false;
        }

        // If tab doesn't exist, create it with headers
        if (!tabExists) {
            await sheets.spreadsheets.batchUpdate({
                spreadsheetId: sheetId,
                requestBody: {
                    requests: [
                        {
                            addSheet: {
                                properties: {
                                    title: tabName,
                                },
                            },
                        },
                    ],
                },
            });

            // Add headers to the new tab
            const headers = ['Question', 'Answer', 'Note', 'Timestamp'];
            await sheets.spreadsheets.values.update({
                spreadsheetId: sheetId,
                range: `${tabName}!A1:D1`,
                valueInputOption: 'RAW',
                requestBody: {
                    values: [headers],
                },
            });
        }

        // Insert the bookmark data
        const values = [[data.question, data.answer, data.note, data.timestamp]];

        const response = await sheets.spreadsheets.values.append({
            spreadsheetId: sheetId,
            range: `${tabName}!A:D`,
            valueInputOption: 'RAW',
            insertDataOption: 'INSERT_ROWS',
            requestBody: { values },
        });

        return response.data;
    } catch (error) {
        console.error('Error inserting bookmark to Google Sheets:', error);
        throw new Error('Failed to insert bookmark to Google Sheets');
    }
}

// Test Google Sheets connection
export async function testGoogleSheetsConnection(sheetId: string) {
    try {
        const auth = getGoogleSheetsAuth();
        const sheets = google.sheets({ version: 'v4', auth });

        const response = await sheets.spreadsheets.get({
            spreadsheetId: sheetId,
        });

        return {
            success: true,
            title: response.data.properties?.title,
        };
    } catch (error) {
        console.error('Error testing Google Sheets connection:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
}
