'use client';

import VocabCard from '@/components/card/VocabCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import VocabNote from './vocab-note';
import SheetSetting from './sheet-setting';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import createRandomOrder from '@/utils/randomOrder';

type QuestionFormat = { question: string; answer: string; note?: string };
interface CardMainProps {
    rawData: {
        gp: QuestionFormat[];
        bnn: QuestionFormat[];
    };
}

const CardMain = ({ rawData }: CardMainProps) => {
    const { gp, bnn } = rawData;
    const TOTAL = 30;
    const GP_RATIO = 0.7;
    const GP_QUANTITY = Math.floor(TOTAL * GP_RATIO);
    const BNN_QUANTITY = TOTAL - GP_QUANTITY; // ratio 0.3

    const gpData = createRandomOrder(gp.length)
        .slice(0, GP_QUANTITY)
        .map((idx) => gp[idx]);
    const bnnData = createRandomOrder(bnn.length)
        .slice(0, BNN_QUANTITY)
        .map((idx) => bnn[idx]);

    const [data, setData] = useState<QuestionFormat[]>([]);
    const [setting, setSetting] = useState(null);
    const [currentIdx, setCurrentIdx] = useState<number>(1);

    useEffect(() => {
        setData([...gpData, ...bnnData]);
    }, [rawData]);

    const prevCard = () => {
        if (currentIdx === 1) return;
        setCurrentIdx((cur) => cur - 1);
    };

    const nextCard = () => {
        if (currentIdx === data.length) return;
        setCurrentIdx((cur) => cur + 1);
    };
    return (
        <>
            <div className="m-5 flex items-center justify-between">
                <span>Viewed Questions: {currentIdx}</span>
                <div className="inline-flex gap-2">
                    {data.length > 0 && <VocabNote curVocab={data[currentIdx]} />}
                    {/* <SheetSetting /> */}
                    <Button variant="ghost">
                        <Link href="/learning">Go to v1</Link>
                    </Button>
                </div>
            </div>
            <div className="flex items-center">
                <button data-testid="leftCard" onClick={prevCard}>
                    <ChevronLeft
                        color="#fda4af"
                        className="h-12 w-12 translate-x-0 hover:stroke-rose-400 sm:h-24 sm:w-24 sm:translate-x-full"
                    />
                </button>
                {data.length > 0 ? (
                    <VocabCard
                        frontText={data[currentIdx].question}
                        backText={data[currentIdx].answer}
                        qNum={currentIdx + 1}
                    />
                ) : (
                    <div className="flex w-full items-center justify-center">
                        <Skeleton className="h-[480px] w-2/3" />
                    </div>
                )}
                <button data-testid="rightCard" onClick={nextCard}>
                    <ChevronRight
                        color="#fda4af"
                        className="h-12 w-12 translate-x-0 hover:stroke-rose-400 sm:h-24 sm:w-24 sm:-translate-x-full"
                    />
                </button>
            </div>
            <div className="mt-16 text-right">Total: {data.length}</div>
        </>
    );
};

export default CardMain;
