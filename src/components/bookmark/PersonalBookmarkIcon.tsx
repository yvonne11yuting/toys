'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Star, Loader2, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PersonalBookmarkIconProps {
    question: string;
    answer: string;
    note?: string;
    isBookmarked?: boolean;
}

export function PersonalBookmarkIcon({ question, answer, note, isBookmarked = false }: PersonalBookmarkIconProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [bookmarkStatus, setBookmarkStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const { toast } = useToast();

    const handleBookmark = async () => {
        if (isLoading) return;
        if (isBookmarked) return;

        setIsLoading(true);
        setBookmarkStatus('idle');

        try {
            const response = await fetch('/api/bookmark/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    question,
                    answer,
                    note: note || '',
                }),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                setBookmarkStatus('success');
                toast({
                    title: 'Success',
                    description: 'Bookmark added successfully!',
                });
            } else {
                setBookmarkStatus('error');
                toast({
                    title: 'Error',
                    description: result.error || 'Failed to add bookmark',
                    variant: 'destructive',
                });
            }
        } catch (error) {
            setBookmarkStatus('error');
            toast({
                title: 'Error',
                description: 'An error occurred while adding bookmark',
                variant: 'destructive',
            });
            console.error('Bookmark error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const getIcon = () => {
        if (isLoading) {
            return <Loader2 className="h-4 w-4 animate-spin" />;
        }

        if (bookmarkStatus === 'success') {
            return <Check className="h-4 w-4 text-green-500" />;
        }

        if (bookmarkStatus === 'error') {
            return <X className="h-4 w-4 text-red-500" />;
        }

        return (
            <Star
                className={`h-4 w-4 ${
                    isBookmarked || (bookmarkStatus as string) === 'success'
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-400 hover:text-yellow-400'
                }`}
            />
        );
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={handleBookmark}
            disabled={isLoading}
            className="h-8 w-8 rounded-full"
            title={isBookmarked ? 'Already bookmarked' : 'Add to bookmarks'}
        >
            {getIcon()}
        </Button>
    );
}
