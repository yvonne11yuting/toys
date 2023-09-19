"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Switch } from "@/components/ui/switch"
import { useGetVocabulariesQuery } from "@/store/tly/tlyVocApi";
import { Vocabulary } from "@/store/tly/type";
import VocabCard from "./VocabCard";
import Loading from "../common/Loading";


const CardMain = () => {
    const { data, isLoading, isError } = useGetVocabulariesQuery('') as { data: Vocabulary[], isLoading: boolean, isError: boolean };
    const [currentIdx, setCurrentIdx] = useState(0);
    const [isRandom, setIsRandom] = useState(true);

    const updateCard = (offset: number) => {
        const nextIdx = currentIdx + offset;
        if (nextIdx < 0 || nextIdx >= data.length) return;
        setCurrentIdx(nextIdx);
    };

    const randomCard = () => {
        const nextIdx = Math.floor(Math.random() * data.length);
        setCurrentIdx(nextIdx);
    };

    if (isLoading) return <div className="h-96 w-full pt-40 text-center"><Loading /></div>
    if (isError) return <div>Error</div>

    return (
        <>
            <div className="ml-3 mb-3">
                <span className="inline-block w-40">Question: {currentIdx + 1} / {data.length}</span>
                <span className="inline-flex items-center ml-6 gap-2">
                    Sequential
                    <Switch checked={isRandom} onCheckedChange={() => setIsRandom(!isRandom)} className="bg-sky-500" />
                    Random
                </span>
            </div>
            <div className="flex items-center">
                <button data-testId="leftCard" onClick={isRandom ? randomCard : () => updateCard(-1)}>
                    <ChevronLeft color="#fda4af" className="w-12 h-12 sm:w-24 sm:h-24 translate-x-0 sm:translate-x-full hover:stroke-rose-400" />
                </button>
                <VocabCard frontText={data[currentIdx].question} backText={data[currentIdx].answer} />
                <button data-testId="rightCard" onClick={isRandom ? randomCard : () => updateCard(1)} >
                    <ChevronRight color="#fda4af" className="w-12 h-12 sm:w-24 sm:h-24 translate-x-0 sm:-translate-x-full hover:stroke-rose-400" />
                </button>
            </div>
        </>
    )
}

export default CardMain
