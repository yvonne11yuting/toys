import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
    content: string;
    className?: string;
}

export function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
    return (
        <div className={`prose prose-sm max-w-none ${className}`}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    // 自定義 Markdown 組件樣式
                    h1: ({ children }) => (
                        <h1 className="mb-2 text-lg font-semibold text-gray-900">
                            {children}
                        </h1>
                    ),
                    h2: ({ children }) => (
                        <h2 className="mb-2 text-base font-semibold text-gray-900">
                            {children}
                        </h2>
                    ),
                    h3: ({ children }) => (
                        <h3 className="mb-2 text-sm font-semibold text-gray-900">
                            {children}
                        </h3>
                    ),
                    p: ({ children }) => <p className="mb-2 text-gray-700">{children}</p>,
                    ul: ({ children }) => (
                        <ul className="mb-2 list-inside list-disc space-y-1 text-gray-700">
                            {children}
                        </ul>
                    ),
                    ol: ({ children }) => (
                        <ol className="mb-2 list-inside list-decimal space-y-1 text-gray-700">
                            {children}
                        </ol>
                    ),
                    li: ({ children }) => <li className="text-gray-700">{children}</li>,
                    strong: ({ children }) => (
                        <strong className="font-semibold text-gray-900">{children}</strong>
                    ),
                    em: ({ children }) => (
                        <em className="italic text-gray-700">{children}</em>
                    ),
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
                {content}
            </ReactMarkdown>
        </div>
    );
}
