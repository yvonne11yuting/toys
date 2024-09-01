import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { NotebookText } from 'lucide-react';

interface VocabNoteProps {
    curVocab: {
        question: string;
        answer: string;
        note?: string;
    };
}

export function VocabNote({ curVocab }: VocabNoteProps) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline">
                    <NotebookText />
                </Button>
            </SheetTrigger>
            <SheetContent className="overflow-scroll lg:max-w-lg">
                <SheetHeader>
                    <SheetTitle>{curVocab.question}</SheetTitle>
                    <SheetDescription className="text-base">{curVocab.answer}</SheetDescription>
                </SheetHeader>
                <div className="whitespace-pre-wrap pt-8">{curVocab.note || 'No note.'}</div>
            </SheetContent>
        </Sheet>
    );
}

export default VocabNote;
