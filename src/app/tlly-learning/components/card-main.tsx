'use client';

import VocabCard from '@/components/card/VocabCard';
import { ChevronLeft, ChevronRight, TableProperties } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import VocabNote from './vocab-note';
import SheetSetting from './sheet-setting';
import { Skeleton } from '@/components/ui/skeleton';
import createRandomOrder from '@/utils/randomOrder';
import { AIBulbIcon, AIQuestionSheet } from '@/components/ai';

type QuestionFormat = { question: string; answer: string; note?: string };
interface CardMainProps {
    rawData: {
        gp: QuestionFormat[];
        bnn: QuestionFormat[];
    };
    isAdmin: boolean;
}

const CardMain = ({ rawData, isAdmin }: CardMainProps) => {
    const { gp, bnn } = rawData;
    const [data, setData] = useState<QuestionFormat[]>([]);
    const [setting, setSetting] = useState({
        bnnLast: '',
        bnnRatio: 0.3,
        total: 30,
    });
    const [currentIdx, setCurrentIdx] = useState<number>(0);
    let bnnLastIdx = useMemo(() => {
        const idx = bnn.findIndex((item) => encodeURIComponent(item.question) === encodeURIComponent(setting.bnnLast));
        return idx > -1 ? idx : bnn.length - 1;
    }, [bnn, setting.bnnLast]);

    const bnnLastQ = bnn?.[bnnLastIdx]?.question || '';

    useEffect(() => {
        const bnnFinalData = bnn.slice(0, bnnLastIdx > -1 ? bnnLastIdx + 1 : bnn.length);
        const BNN_QUANTITY = Math.floor(setting.total * setting.bnnRatio);
        const gpData = createRandomOrder(gp.length)
            .slice(0, setting.total - BNN_QUANTITY)
            .map((idx) => gp[idx]);
        const bnnData = createRandomOrder(bnnFinalData.length)
            .slice(0, BNN_QUANTITY)
            .map((idx) => bnn[idx]);
        const finalDta = createRandomOrder([...gpData, ...bnnData].length).map((idx) => [...gpData, ...bnnData][idx]);
        setData(finalDta);
        setCurrentIdx(0);
    }, [setting, rawData]);

    const prevCard = () => {
        if (currentIdx === 0) {
            return;
        }
        setCurrentIdx((cur) => cur - 1);
    };

    const nextCard = () => {
        if (currentIdx === data.length - 1) {
            return;
        }
        setCurrentIdx((cur) => cur + 1);
    };

    return (
        <>
            <div className="m-5 flex gap-2 text-slate-500">
                <TableProperties className="stroke-yellow-400" />
                The last question is: <b>{bnnLastQ}</b>
            </div>
            <div className="m-5 flex items-center justify-between">
                <span>Viewed Questions: {currentIdx + 1}</span>
                <div className="inline-flex gap-2">
                    {isAdmin && <AIBulbIcon sentence={data[currentIdx]?.question ?? ''} />}
                    {data.length > 0 && <VocabNote curVocab={data[currentIdx]} />}
                    <SheetSetting setting={setting} setSetting={setSetting} />
                    {isAdmin && <AIQuestionSheet />}
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
                    <VocabCard frontText={data[currentIdx].question} />
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
