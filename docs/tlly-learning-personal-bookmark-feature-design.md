# TLly Learning Personal Bookmark Feature Design Document

## Feature Overview

Add a personal bookmark feature to the TLly Learning system for admin users, allowing them to save interesting questions, answers, and notes to their personal Google Sheets. Each admin user can have their own dedicated Google Sheet for storing bookmarked content.

## Feature Requirements

### Core Features

-   **Star Icon Display**: Show a star icon (⭐) next to each question card for admin users
-   **Personal Bookmarking**: Allow admin users to bookmark questions to their personal Google Sheets
-   **Data Storage**: Store question, answer, and note data in Google Sheets
-   **User Isolation**: Each admin user has their own Google Sheet (separate from main learning data)
-   **Visual Feedback**: Provide clear visual feedback when bookmarking (loading, success, error states)

### Security Requirements

-   **Admin Only Access**: Only admin users can see and use the bookmark feature
-   **User Data Isolation**: Each user's bookmarks are stored in their own Google Sheet
-   **Environment Configuration**: Google Sheet IDs are configured via environment variables
-   **Authentication Required**: User must be authenticated to use bookmark feature

## User Flow

### 1. Feature Display

```
Admin users → See star icon (⭐) next to question cards
Regular users → Star icon not displayed
```

### 2. Bookmark Usage Flow

```
Click star icon → Show loading state → Call backend API → Insert data to Google Sheet → Show success/error feedback
```

### 3. Data Storage Flow

```
Frontend → Backend API → Google Sheets API → Store question/answer/note → Return success/error
```

### 4. Error Handling

```
API call fails → Display error message → Provide retry option
Google Sheets error → Log error details → Show user-friendly message
```

## Technical Architecture

### Frontend Components

-   **`PersonalBookmarkIcon.tsx`** - Star icon component for bookmarking with built-in status feedback
-   **`CardMain.tsx`** - Integrate bookmark icon into existing card interface
-   **`page.tsx`** - Pass user email to components for Google Sheet mapping

### Backend API

-   **`/api/bookmark/add`** - Handle bookmark creation requests
-   **`/api/bookmark/list`** - Retrieve user's bookmarks (optional future feature)
-   **Google Sheets API integration** - Insert data into user's personal sheet

### Environment Configuration

```bash
# .env
# Google Sheets API credentials
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_PROJECT_ID=your-project-id

# Admin user email to Google Sheet ID mapping
ADMIN_GOOGLE_SHEETS_MAPPING={"admin1@example.com":"sheet_id_1","admin2@example.com":"sheet_id_2"}

# Google Sheets configuration
GOOGLE_SHEETS_TAB_NAME=Bookmarks
GOOGLE_SHEETS_HEADERS=["Timestamp","Question","Answer","Note"]
```

### Data Structure

#### Google Sheets Schema

| Column    | Description               | Example                                     |
| --------- | ------------------------- | ------------------------------------------- |
| Question  | The question text         | "What is the meaning of 'serendipity'?"     |
| Answer    | The answer text           | "A pleasant surprise or fortunate accident" |
| Note      | Additional notes          | "Great word for creative writing"           |
| Timestamp | When bookmark was created | 2024-01-15 14:30:00                         |

## Task Breakdown

### Phase 1: Environment Setup and Google Sheets Configuration

-   [x] Set up Google Cloud Project and enable Google Sheets API
-   [x] Create service account and download credentials
-   [x] Configure environment variables for Google Sheets mapping
-   [x] Create personal Google Sheets for each admin user
-   [x] Set up proper permissions and sharing

### Phase 2: Backend API Development

-   [x] Install Google Sheets API client library
-   [x] Create `/api/bookmark/add` API route
-   [x] Implement Google Sheets data insertion logic
-   [x] Add user authentication and admin permission validation
-   [x] Implement error handling and logging
-   [x] Add data validation and sanitization

### Phase 3: Frontend Component Development

-   [x] Create `PersonalBookmarkIcon.tsx` component
-   [x] Modify `CardMain.tsx` to include bookmark icon
-   [x] Update `page.tsx` to pass user email information
-   [x] Implement loading states and error handling
-   [x] Add visual feedback for bookmark actions

### Phase 4: Integration and Testing

-   [x] Integrate bookmark API with frontend
-   [x] Test admin permission logic
-   [x] Test Google Sheets data insertion
-   [x] Test error handling scenarios
-   [x] Performance testing and optimization

## Implementation Details

### 1. PersonalBookmarkIcon Component

```typescript
interface PersonalBookmarkIconProps {
    question: string;
    answer: string;
    note?: string;
    isBookmarked?: boolean;
}

export function PersonalBookmarkIcon({ question, answer, note, isBookmarked }: PersonalBookmarkIconProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [bookmarkStatus, setBookmarkStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleBookmark = async () => {
        // Implementation for bookmarking
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={handleBookmark}
            disabled={isLoading}
            className="h-8 w-8"
        >
            {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
                <Star className={`h-4 w-4 ${isBookmarked ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} />
            )}
        </Button>
    );
}
```

### 2. Backend API Route

```typescript
// /api/bookmark/add
export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.isAdmin) {
            return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
        }

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
        const result = await insertBookmarkToSheet(sheetId, {
            timestamp: new Date().toISOString(),
            question,
            answer,
            note: note || '',
        });

        return NextResponse.json({ success: true, data: result });
    } catch (error) {
        console.error('Bookmark API error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
```

### 3. Google Sheets Integration

```typescript
// lib/google-sheets.ts
export async function insertBookmarkToSheet(sheetId: string, data: BookmarkData) {
    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const values = [[data.timestamp, data.question, data.answer, data.note]];

    const response = await sheets.spreadsheets.values.append({
        spreadsheetId: sheetId,
        range: `${process.env.GOOGLE_SHEETS_TAB_NAME}!A:D`,
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        requestBody: { values },
    });

    return response.data;
}
```

## Test Cases

### Unit Tests

#### 1. Admin Permission Check

```typescript
describe('Admin Permission Check', () => {
    test('should show bookmark icon for admin users', () => {});
    test('should hide bookmark icon for non-admin users', () => {});
    test('should handle undefined user gracefully', () => {});
});
```

#### 2. Bookmark API Integration

```typescript
describe('Bookmark API Integration', () => {
    test('should call bookmark API with correct parameters', () => {});
    test('should handle API response correctly', () => {});
    test('should handle API errors gracefully', () => {});
    test('should validate required fields', () => {});
});
```

#### 3. Google Sheets Integration

```typescript
describe('Google Sheets Integration', () => {
    test('should insert data to correct sheet', () => {});
    test('should handle Google Sheets API errors', () => {});
    test('should format data correctly', () => {});
});
```

### Integration Tests

#### 1. End-to-End Flow

```typescript
describe('End-to-End Flow', () => {
    test('admin user can bookmark questions', () => {});
    test('bookmarked data appears in Google Sheets', () => {});
    test('non-admin user cannot access bookmark feature', () => {});
});
```

## Security Considerations

### Permission Validation

-   Verify user is authenticated and has admin role
-   Validate user email matches configured Google Sheet mapping
-   Sanitize input data before storing

### Data Privacy

-   Each user's bookmarks are stored in separate Google Sheets
-   No cross-user data access
-   User email is only used for Google Sheet mapping, not stored in data
-   Secure storage of Google API credentials

## Performance Considerations

### API Response Time

-   Google Sheets API calls may have latency
-   Implement proper loading states
-   Consider caching frequently accessed data

### Rate Limiting

-   Google Sheets API has rate limits
-   Implement request throttling if needed
-   Monitor API usage

## Monitoring and Logging

### Logging

-   Bookmark creation attempts (success/failure)
-   Google Sheets API call results
-   User activity tracking

### Monitoring Metrics

-   Bookmark creation success rate
-   API response time
-   Error rates and types
-   User engagement with bookmark feature

## Deployment Checklist

-   [x] Google Cloud Project configured with Sheets API enabled
-   [x] Service account credentials properly configured
-   [x] Environment variables set for all admin users
-   [x] Personal Google Sheets created and shared with service account
-   [x] All tests passing
-   [x] Error handling mechanisms tested
-   [x] Security validation tested
-   [x] Performance meets requirements
-   [x] Documentation updated

## Future Enhancements

### Phase 2 Features

-   **Bookmark Management**: View, edit, delete bookmarks
-   **Search and Filter**: Search through bookmarked content
-   **Export Functionality**: Export bookmarks to different formats
-   **Bookmark Categories**: Organize bookmarks by topics or tags
-   **Bulk Operations**: Select multiple items for bookmarking

### Integration Opportunities

-   **Learning Analytics**: Track which questions are most bookmarked
-   **Content Recommendations**: Suggest similar content based on bookmarks
-   **Progress Tracking**: Monitor learning progress through bookmarked items
