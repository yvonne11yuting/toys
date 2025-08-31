# TLly Learning AI Context Feature Design Document

## Feature Overview

Add AI features to the TLly Learning system for admin users, including:

1. **AI Context Hints**: Lightbulb icon feature that provides usage context for English sentences through AI API
2. **AI Q&A System**: Question icon feature that allows admin users to ask any question and receive AI answers

## Feature Requirements

### Core Features

-   AI feature icons only visible to admin users
-   Lightbulb icon: Get usage context for English sentences
-   Question icon: Provide general AI Q&A functionality
-   Display API results in UI with Markdown rendering support

### Security Requirements

-   AI API calls must go through backend API
-   Frontend cannot directly call AI API
-   API Key must be securely stored in backend environment variables
-   Only admin users can access AI features

## User Flow

### 1. User Authentication

```
User Login → System checks user permissions → Determines if user is admin
```

### 2. Feature Display

```
Admin users → See lightbulb icon and question icon in control area
Regular users → AI feature icons not displayed
```

### 3. AI Context Hint Feature Usage

```
Click lightbulb icon → Show loading state → Call backend API → Get AI response → Display results
```

### 4. AI Q&A Feature Usage

```
Click question icon → Open Sheet interface → Input question → Submit → Display AI answer
```

### 5. Error Handling

```
API call fails → Display error message → Provide retry option
```

## Technical Architecture

### Frontend Components

-   `CardMain.tsx` - Add AI feature icons in control area
-   `AIBulbIcon.tsx` - Lightbulb icon component for context hints
-   `AIQuestionSheet.tsx` - Question icon component providing Q&A interface
-   `AIContext.tsx` - Manage AI API state
-   `AIResult.tsx` - Component to display API results
-   `MarkdownRenderer.tsx` - Shared Markdown rendering component

### Caching Strategy

-   Use Next.js built-in Route Handler Cache (`revalidate = 3600`)
-   Use HTTP Cache-Control headers for browser caching
-   Support stale-while-revalidate strategy
-   Automatically cache query results for same sentence for 1 hour
-   Frontend memory cache for improved response speed on repeated queries

### Backend API

-   `/api/ai/context` - Handle AI context hint requests
-   `/api/ai/question` - Handle AI Q&A requests
-   Environment variable configuration
-   Error handling and logging

### Dependencies

-   `@google/genai` - Google official Gemini API client
-   `react-markdown` - Markdown rendering component
-   `remark-gfm` - GitHub Flavored Markdown support
-   Existing Next.js and NextAuth architecture

## Task Breakdown

### Phase 1: Environment Setup and Dependency Installation

-   [x] Install `@google/genai` package
-   [x] Install `react-markdown` and `remark-gfm` packages
-   [x] Configure environment variables (GEMINI_API_KEY)
-   [x] Create docs folder

### Phase 2: Backend API Development

-   [x] Create `/api/ai/context` API route
-   [x] Create `/api/ai/question` API route
-   [x] Implement AI API call logic
-   [x] Add error handling and logging
-   [x] Implement API caching mechanism

### Phase 3: Frontend Component Development

-   [x] Modify `CardMain.tsx` to add AI feature icons in control area
-   [x] Create `AIBulbIcon.tsx` lightbulb icon component
-   [x] Create `AIQuestionSheet.tsx` Q&A component
-   [x] Create `AIContext.tsx` state management
-   [x] Create `AIResult.tsx` result display component
-   [x] Create `MarkdownRenderer.tsx` shared component
-   [x] Implement admin permission check logic

### Phase 4: State Management and UI Integration

-   [x] Integrate AI API calls to frontend
-   [x] Implement loading states and error handling
-   [x] Optimize UI/UX experience
-   [x] Add result caching mechanism
-   [x] Implement Markdown rendering functionality

### Phase 5: Testing and Optimization

-   [ ] Unit tests
-   [ ] Integration tests
-   [ ] Performance optimization
-   [ ] Error handling tests

## Test Cases

### Unit Tests

#### 1. Admin Permission Check

```typescript
describe('Admin Permission Check', () => {
    test('should show bulb icon for admin users', () => {});
    test('should hide bulb icon for non-admin users', () => {});
    test('should handle undefined user gracefully', () => {});
});
```

#### 2. AI API Integration

```typescript
describe('AI API Integration', () => {
    test('should call AI context API with correct parameters', () => {});
    test('should call AI question API with correct parameters', () => {});
    test('should handle API response correctly', () => {});
    test('should handle API errors gracefully', () => {});
    test('should handle network timeouts', () => {});
});
```

#### 3. UI Component Rendering

```typescript
describe('UI Components', () => {
    test('should render bulb icon correctly', () => {});
    test('should render question sheet correctly', () => {});
    test('should show loading state during API call', () => {});
    test('should display API results with Markdown rendering', () => {});
    test('should handle empty responses', () => {});
});
```

### Integration Tests

#### 1. End-to-End Flow

```typescript
describe('End-to-End Flow', () => {
    test('admin user can see and use bulb feature', () => {});
    test('admin user can see and use question feature', () => {});
    test('non-admin user cannot see AI features', () => {});
    test('complete flow from click to result display', () => {});
});
```

#### 2. API Integration

````typescript
describe('API Integration', () => {
    test('frontend correctly calls backend context API', () => {});
    test('frontend correctly calls backend question API', () => {});
    test('backend correctly calls AI API', () => {});
    test('error propagation from backend to frontend', () => {});
});

### Performance Tests

#### 1. API Response Time

-   Test AI API call response time
-   Test backend API processing time
-   Test frontend rendering performance

#### 2. Cache Effectiveness

-   Test if result caching works properly
-   Test cache hit rate
-   Test cache expiration handling

### Security Tests

#### 1. Permission Control

-   Test non-admin users cannot access features
-   Test API endpoint permission validation
-   Test frontend permission check bypass protection

#### 2. API Security

-   Test if API Key is properly protected
-   Test input validation and sanitization
-   Test admin permission validation

## Environment Variable Configuration

```bash
# .env
GEMINI_API_KEY=your_gemini_api_key_here
AI_MODEL=gemini-pro
AI_MAX_TOKENS=1000
AI_TEMPERATURE=0.7
````

## Error Handling Strategy

### Frontend Error Handling

-   Display user-friendly error messages when API calls fail
-   Provide retry options for network errors
-   Handle loading timeouts

### Backend Error Handling

-   Detailed logging of AI API call failures
-   User-friendly error responses
-   Admin permission validation

## Performance Considerations

### Caching Strategy

-   Use Next.js built-in Route Handler Cache
-   Cache expiration time set to 1 hour (`revalidate = 3600`)
-   Support stale-while-revalidate strategy for improved user experience
-   Automatic cache invalidation and updates
-   Frontend memory cache for improved response speed on repeated queries

## Monitoring and Logging

### Logging

-   API call success/failure records
-   User usage statistics
-   Error detail records

### Monitoring Metrics

-   API response time
-   Error rate
-   User usage frequency
-   Cache hit rate

## Deployment Checklist

-   [ ] Environment variables properly configured
-   [ ] AI API Key valid and has appropriate permissions
-   [ ] All tests passing
-   [ ] Error handling mechanisms tested
-   [ ] Performance tests meet standards
-   [ ] Security tests passed
-   [ ] Documentation updated
