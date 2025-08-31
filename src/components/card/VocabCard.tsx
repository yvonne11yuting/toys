'use client';
interface VocabCardProps {
    frontText: string;
}

const VocabCard = ({ frontText }: VocabCardProps) => {
    return (
        <div className="flex w-full items-center justify-center">
            <div className="relative h-96 w-72 bg-slate-100 sm:h-[480px] sm:w-2/3">
                <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                    <div className="mb-4 text-left text-3xl font-medium text-gray-900">{frontText}</div>
                </div>
            </div>
        </div>
    );
};

export default VocabCard;
