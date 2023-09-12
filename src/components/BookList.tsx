
import { ExternalLink } from "lucide-react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

interface BookListProps {
    data: {
        title: string
        slide: string
        sharer: string
    }[]
}

const BookList = ({ data }: BookListProps) => {
    const trimData = data.filter((item) => item.title !== "");

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-5"></TableHead>
                    <TableHead>書名</TableHead>
                    <TableHead className="w-12">分享人</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {trimData.map((data, index) => (
                    <TableRow key={index}>
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell>
                            {
                                data.slide ? (
                                    <a href={data.slide} target="_blank" rel="noreferrer noopener" className="flex gap-1 text-sky-700 hover:text-sky-600">
                                        {data.title}
                                        <ExternalLink className="flex-none w-4 h-4" />
                                    </a>
                                ) : (
                                    <span className="text-slate-700">{data.title}</span>
                                )
                            }

                        </TableCell>
                        <TableCell>{data.sharer}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default BookList