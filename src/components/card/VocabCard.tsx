"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

interface VocabCardProps {
    frontText: string;
    backText: string;
}

const VocabCard = ({
    frontText,
    backText
}: VocabCardProps) => {
    const [flip, setFlip] = useState(false);

    const flipCard = () => {
        setFlip(!flip);
    }

    return (
        <div className="w-full flex items-center justify-center">
            <div onClick={flipCard} className={cn("w-72 h-96 sm:w-2/3 sm:h-[480px] bg-slate-100 relative transform-style-3d duration-500", {
                "transform-rotateY-180": flip
            })}>
                <div className="card">{frontText}</div>
                <div className="card transform-rotateY-180">{backText}</div>
            </div>
        </div>
    )
}

export default VocabCard