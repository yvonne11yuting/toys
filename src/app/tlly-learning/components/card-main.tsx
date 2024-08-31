"use client";
import VocabCard from "@/components/card/VocabCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useCallback, useState } from "react";
import VocabNote from "./vocab-note";
import SheetSetting from "./sheet-setting";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface CardMainProps {
  srcData: { question: string; answer: string; note?: string }[];
}

const CardMain = ({ srcData }: CardMainProps) => {
  const [data, setData] = useState(srcData);
  const [setting, setSetting] = useState(null);
  const [viewedQuestions, setViewedQuestions] = useState<number[]>([]);

  const randomCard = useCallback(
    ({ isNew }: { isNew: boolean }) => {
      let nextIdx = Math.floor(Math.random() * data.length);
      if (!isNew) {
        while (
          viewedQuestions.includes(nextIdx) &&
          viewedQuestions.length < data.length
        ) {
          nextIdx = Math.floor(Math.random() * data.length);
        }
      }
      setViewedQuestions((prev) => (isNew ? [nextIdx] : [...prev, nextIdx]));
    },
    [data, viewedQuestions],
  );

  const currentIdx = viewedQuestions?.at(-1) ?? 0;
  const prevCard = () => {
    if (viewedQuestions.length === 1) return;
    setViewedQuestions((prev) => prev.slice(0, -1));
  };

  const nextCard = () => {
    randomCard({ isNew: false });
  };
  return (
    <>
      <div className="flex justify-between items-center m-5">
        <span>Viewed Questions: {viewedQuestions.length + 1}</span>
        <div className="inline-flex gap-2">
          <VocabNote curVocab={data[currentIdx]} />
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
            className="w-12 h-12 sm:w-24 sm:h-24 translate-x-0 sm:translate-x-full hover:stroke-rose-400"
          />
        </button>
        <VocabCard
          frontText={data[currentIdx].question}
          backText={data[currentIdx].answer}
          qNum={currentIdx + 1}
        />
        <button data-testid="rightCard" onClick={nextCard}>
          <ChevronRight
            color="#fda4af"
            className="w-12 h-12 sm:w-24 sm:h-24 translate-x-0 sm:-translate-x-full hover:stroke-rose-400"
          />
        </button>
      </div>
      <div className="mt-16 text-right">Total: {data.length}</div>
    </>
  );
};

export default CardMain;
