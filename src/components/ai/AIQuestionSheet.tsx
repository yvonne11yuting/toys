'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { MessageCircle, Send, Loader2 } from 'lucide-react';
import { useAI } from './AIContext';
import { MarkdownRenderer } from './MarkdownRenderer';

export function AIQuestionSheet() {
    const [question, setQuestion] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!question.trim()) return;

        setIsLoading(true);
        setResponse(null);

        try {
            const response = await fetch('/api/ai/question', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to get AI response');
            }

            const result = await response.json();

            if (result.success && result.data) {
                setResponse(result.data.context);
            } else {
                setResponse(result.error?.message || 'Failed to get AI response');
            }
        } catch (error) {
            setResponse('An error occurred while processing your question');
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        if (!open) {
            // Reset state when closing
            setQuestion('');
            setResponse(null);
            setIsLoading(false);
        }
    };

    return (
        <Sheet open={isOpen} onOpenChange={handleOpenChange}>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="h-10 w-10">
                    <MessageCircle className="h-5 w-5" />
                </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px]">
                <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                        <MessageCircle className="h-5 w-5 text-blue-500" />
                        AI Question & Answer
                    </SheetTitle>
                    <SheetDescription>Ask any question and get AI-powered answers</SheetDescription>
                </SheetHeader>

                <div className="mt-6 space-y-4">
                    {/* Question Input Form */}
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <div className="space-y-2">
                            <label htmlFor="question" className="text-sm font-medium text-gray-700">
                                Your Question
                            </label>
                            <Input
                                id="question"
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                placeholder="Type your question here..."
                                disabled={isLoading}
                                className="w-full"
                            />
                        </div>
                        <Button type="submit" disabled={isLoading || !question.trim()} className="w-full">
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <Send className="mr-2 h-4 w-4" />
                                    Ask AI
                                </>
                            )}
                        </Button>
                    </form>

                    {/* Loading State */}
                    {isLoading && (
                        <div className="flex items-center justify-center py-8">
                            <div className="text-center">
                                <Loader2 className="mx-auto mb-2 h-8 w-8 animate-spin text-blue-500" />
                                <p className="text-gray-600">AI is thinking...</p>
                            </div>
                        </div>
                    )}

                    {/* AI Response */}
                    {response && !isLoading && (
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                                <h3 className="font-medium text-gray-900">AI Response</h3>
                            </div>
                            <div className="rounded-lg bg-gray-50 p-4">
                                <MarkdownRenderer content={response} />
                            </div>
                        </div>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
}
