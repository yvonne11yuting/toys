"use client"
import { ChevronDown } from "lucide-react"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import BookList from "./BookList"
import BOOKS_RECORD from "./books"

const BooksMain = () => {
    return (
        <div className="flex flex-col-reverse gap-2 mb-32">
            {BOOKS_RECORD.map(({ id, week, date, host, content }) => {
                const attendees = content.map((item) => item.sharer).filter(item => item !== host)
                const dateStr = date.toLocaleDateString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit' })
                return (
                    <Collapsible key={id}>
                        <CollapsibleTrigger className="flex justify-between flex-col sm:flex-row bg-slate-100 hover:bg-slate-200 py-3 px-4 rounded w-full text-left">
                            <h3 className="text-sm sm:text-base text-slate-800 font-medium whitespace-nowrap">Week {week} - {dateStr}</h3>
                            <div className="inline-flex items-center gap-6 w-[inherit] justify-between sm:justify-end">
                                <span className="text-slate-600 text-xs sm:text-sm">
                                    <b className="text-slate-700 mr-2 ">Host:</b>{host}
                                    <b className="ml-5 mr-2 text-slate-700">Attendees:</b>{attendees.join(', ')}
                                </span>
                                <ChevronDown color="#94a3b8" />
                            </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <BookList data={content} />
                        </CollapsibleContent>
                    </Collapsible>
                )
            })}
        </div>


    )
}

export default BooksMain
