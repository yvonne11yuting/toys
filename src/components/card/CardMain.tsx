"use client";

import { useState } from "react";
import { useGetVocabulariesQuery } from "@/store/tly/tlyVocApi";
import { Vocabulary } from "@/store/tly/type";
import { ChevronLeft, ChevronRight } from "lucide-react";

import VocabCard from "./VocabCard";
import Loading from "../common/Loading";

const CardMain = () => {
    const { data, isLoading, isError } = useGetVocabulariesQuery('') as { data: Vocabulary[], isLoading: boolean, isError: boolean };
    const [currentIdx, setCurrentIdx] = useState(0);

    const updateCard = (offset: number) => {
        const nextIdx = currentIdx + offset;
        if (nextIdx < 0 || nextIdx >= data.length) return;
        setCurrentIdx(nextIdx);
    };

    if (isLoading) return <div><Loading /></div>
    if (isError) return <div>Error</div>

    return (
        <>
            <div className="ml-3 mb-3">
                Question: {currentIdx + 1} / {data.length}
            </div>
            <div className="flex items-center">
                <button data-testId="leftCard" onClick={() => updateCard(-1)}>
                    <ChevronLeft color="#fcd34d" className="w-12 h-12 sm:w-24 sm:h-24 translate-x-0 sm:translate-x-full hover:stroke-amber-400" />
                </button>
                <VocabCard frontText={data[currentIdx].question} backText={data[currentIdx].answer} />
                <button data-testId="rightCard" onClick={() => updateCard(1)} >
                    <ChevronRight color="#fcd34d" className="w-12 h-12 sm:w-24 sm:h-24 translate-x-0 sm:-translate-x-full hover:stroke-amber-400" />
                </button>
            </div>
        </>
    )
}

export default CardMain
