'use client';

import React from 'react';
import { useAI } from './AIContext';
import { Button } from '@/components/ui/button';
import { X, RefreshCw, Lightbulb } from 'lucide-react';
import { MarkdownRenderer } from './MarkdownRenderer';

export function AIResult() {
    const { isLoading, error, result, isOpen, closeModal, clearResult, generateContext, isCached, clearCache } =
        useAI();

    if (!isOpen) return null;

    const handleRetry = () => {
        if (result?.data?.context) {
            // Extract the original sentence from the result and retry
            // This is a simplified approach - in a real app you might want to store the original sentence
            generateContext(result.data.context);
        }
    };

    const handleClose = () => {
        closeModal();
        clearResult();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="mx-4 max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6">
                {/* Header */}
                <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Lightbulb className="h-6 w-6 text-yellow-500" />
                        <div className="flex items-center gap-2">
                            <h2 className="text-xl font-semibold">AI Context</h2>
                            {result?.success && result.data && (
                                <span className="text-sm text-gray-500">
                                    {isCached(result.data.context) ? '(Cached)' : '(Fresh)'}
                                </span>
                            )}
                        </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={handleClose} className="h-8 w-8 p-0">
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                {/* Content */}
                <div className="space-y-4">
                    {isLoading && (
                        <div className="flex items-center justify-center py-8">
                            <RefreshCw className="h-8 w-8 animate-spin text-blue-500" />
                            <span className="ml-2 text-gray-600">Generating context...</span>
                        </div>
                    )}

                    {error && (
                        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                            <div className="flex items-center gap-2 text-red-800">
                                <span className="font-medium">Error:</span>
                                <span>{error}</span>
                            </div>
                            <div className="mt-3 flex gap-2">
                                <Button onClick={handleRetry} variant="outline" size="sm">
                                    <RefreshCw className="mr-1 h-4 w-4" />
                                    Retry
                                </Button>
                                <Button onClick={handleClose} variant="outline" size="sm">
                                    Close
                                </Button>
                            </div>
                        </div>
                    )}

                    {result?.success && result.data && (
                        <div className="space-y-4">
                            {/* Context */}
                            <div>
                                <h3 className="mb-2 font-medium text-gray-900">Context</h3>
                                <div className="rounded-lg bg-gray-50 p-4 text-gray-700">
                                    <MarkdownRenderer content={result.data.context} />
                                </div>
                            </div>

                            {/* Examples */}
                            {result.data.examples && result.data.examples.length > 0 && (
                                <div>
                                    <h3 className="mb-2 font-medium text-gray-900">Examples</h3>
                                    <ul className="list-inside list-disc space-y-1 text-gray-700">
                                        {result.data.examples.map((example, index) => (
                                            <li key={index}>{example}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Timestamp */}
                            <div className="text-right text-sm text-gray-500">
                                Generated at: {new Date(result.data.timestamp).toLocaleString()}
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex justify-end gap-2 border-t pt-4">
                        <Button onClick={handleClose} variant="outline">
                            Close
                        </Button>
                        <Button onClick={clearCache} variant="outline" size="sm">
                            Clear Cache
                        </Button>
                        {result?.success && (
                            <Button onClick={handleRetry} variant="default">
                                <RefreshCw className="mr-1 h-4 w-4" />
                                Regenerate
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
