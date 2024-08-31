"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Switch } from "@/components/ui/switch";
import { useGetVocabulariesQuery } from "@/store/tly/tlyVocApi";
import { Vocabulary } from "@/store/tly/type";
import VocabCard from "./VocabCard";
import Loading from "../common/Loading";
import { Button } from "../ui/button";
import Link from "next/link";

const CardMain = () => {
  const { data, isLoading, isError } = useGetVocabulariesQuery("") as {
    data: Vocabulary[];
    isLoading: boolean;
    isError: boolean;
  };
  const [viewedQuestions, setViewedQuestions] = useState<number[]>([]);
  const [isRandom, setIsRandom] = useState(true);

  const randomCard = useCallback(
    ({ isNew }: { isNew: boolean }) => {
      let nextIdx = Math.floor(Math.random() * data.length);
      if (!isNew) {
        while (viewedQuestions.includes(nextIdx)) {
          nextIdx = Math.floor(Math.random() * data.length);
        }
      }
      setViewedQuestions((prev) => (isNew ? [nextIdx] : [...prev, nextIdx]));
    },
    [data],
  );

  useEffect(() => {
    if (!data?.length) return;
    randomCard({ isNew: true });
  }, [data, randomCard]);

  useEffect(() => {
    if (!data?.length) return;
    if (isRandom) {
      randomCard({ isNew: true });
    } else {
      setViewedQuestions([0]);
    }
  }, [isRandom, data, randomCard]);

  const currentIdx = viewedQuestions?.at(-1) ?? 0;
  const updateCard = (offset: number) => {
    const nextIdx = currentIdx + offset;
    if (nextIdx >= data.length) return;
    setViewedQuestions((prev) => [...prev, nextIdx]);
  };

  const prevCard = () => {
    if (viewedQuestions.length === 1) return;
    setViewedQuestions((prev) => prev.slice(0, -1));
  };

  const nextCard = () => {
    if (isRandom) {
      randomCard({ isNew: false });
    } else {
      updateCard(1);
    }
  };

  if (isLoading)
    return (
      <div className="h-96 w-full pt-40 text-center">
        <Loading />
      </div>
    );
  if (isError) return <div>Error</div>;

  return (
    <>
      <div className="ml-3 mb-8">
        <span className="inline-block w-60">
          Viewed Questions: {viewedQuestions.length}
        </span>
        <span className="inline-flex items-center mx-6 gap-2">
          Sequential
          <Switch
            checked={isRandom}
            onCheckedChange={() => setIsRandom((prev) => !prev)}
            className="bg-sky-500"
          />
          Random
        </span>
        <Button variant="ghost">
          <Link href="/tlly-learning">Go to v2</Link>
        </Button>
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
