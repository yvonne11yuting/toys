'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const testMarkdown = `
# AI Context Example

This is a **bold** example of how AI responses will be rendered.

## Features

- **Markdown Support**: Full markdown syntax
- **Lists**: Both ordered and unordered
- **Code**: \`inline code\` and code blocks
- **Emphasis**: *italic* and **bold** text

## Code Example

\`\`\`javascript
function example() {
    return "Hello World!";
}
\`\`\`

## Usage Context

> This sentence is commonly used in **formal situations** and can be considered *business appropriate*.

### Examples:
1. "How are you doing?" - Casual greeting
2. "What's up?" - Very informal
3. "How do you do?" - Very formal

---

*Note: This is just a test to show markdown rendering capabilities.*
`;

export function MarkdownTest() {
    return (
        <div className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-2xl font-bold">Markdown Rendering Test</h2>
            <div className="prose prose-sm max-w-none">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        h1: ({ children }) => <h1 className="mb-2 text-lg font-semibold text-gray-900">{children}</h1>,
                        h2: ({ children }) => (
                            <h2 className="mb-2 text-base font-semibold text-gray-900">{children}</h2>
                        ),
                        h3: ({ children }) => <h3 className="mb-2 text-sm font-semibold text-gray-900">{children}</h3>,
                        p: ({ children }) => <p className="mb-2 text-gray-700">{children}</p>,
                        ul: ({ children }) => (
                            <ul className="mb-2 list-inside list-disc space-y-1 text-gray-700">{children}</ul>
                        ),
                        ol: ({ children }) => (
                            <ol className="mb-2 list-inside list-decimal space-y-1 text-gray-700">{children}</ol>
                        ),
                        li: ({ children }) => <li className="text-gray-700">{children}</li>,
                        strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
                        em: ({ children }) => <em className="italic text-gray-700">{children}</em>,
                        code: ({ children }) => (
                            <code className="rounded bg-gray-200 px-1 py-0.5 font-mono text-sm text-gray-800">
                                {children}
                            </code>
                        ),
                        pre: ({ children }) => (
                            <pre className="mb-2 overflow-x-auto rounded bg-gray-100 p-3 font-mono text-sm text-gray-800">
                                {children}
                            </pre>
                        ),
                        blockquote: ({ children }) => (
                            <blockquote className="mb-2 border-l-4 border-blue-300 pl-4 italic text-gray-600">
                                {children}
                            </blockquote>
                        ),
                    }}
                >
                    {testMarkdown}
                </ReactMarkdown>
            </div>
        </div>
    );
}
