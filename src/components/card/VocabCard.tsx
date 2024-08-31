'use client';

import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

interface VocabCardProps {
    frontText: string;
    backText: string;
}

const VocabCard = ({ frontText, backText }: VocabCardProps) => {
    const [flip, setFlip] = useState(false);

    useEffect(() => {
        setFlip(false);
    }, [frontText, backText]);

    const flipCard = () => {
        setFlip((prev) => !prev);
    };
    return (
        <div className="flex w-full items-center justify-center">
            <div
                onClick={flipCard}
                className={cn('transform-style-3d relative h-96 w-72 bg-slate-100 duration-500 sm:h-[480px] sm:w-2/3', {
                    'transform-rotateY-180': flip,
                })}
            >
                <div className="card relative">{frontText}</div>
                <div className="card transform-rotateY-180 gap-5">
                    <span>{backText}</span>
                </div>
            </div>
        </div>
    );
};

export default VocabCard;
