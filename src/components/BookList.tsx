
import { ExternalLink } from "lucide-react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const booksRecord = [
    {
        id: 1,
        week: 1,
        date: new Date('2023-04-30'),
        title: '當上主管後難道只能默默崩潰嗎',
        slide: 'https://hackmd.io/@yv/r1p30jqmh#/',
        sharer: 'Yvonne'
    },
    {
        id: 2,
        week: 1,
        date: new Date('2023-04-30'),
        title: '恰如其分的自尊',
        slide: 'https://docs.google.com/presentation/d/1j2wFxf5eKCLEjkHZnni-kFHWZxSlUdjz5zEYXxiKUAA/edit?usp=sharing',
        sharer: '啟綸'
    },
    {
        id: 3,
        week: 1,
        date: new Date('2023-04-30'),
        title: '刻意練習',
        slide: 'https://www.canva.com/design/DAFhfNUAF2o/vqlUcIjjyBo9pNc_Vvf5Wg/view?utm_content=DAFhfNUAF2o&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink',
        sharer: 'Judith'
    },
    {
        id: 4,
        week: 1,
        date: new Date('2023-04-30'),
        title: '宇宙大哉問',
        slide: 'https://docs.google.com/presentation/d/105ZISSddPe97OTSFmOZ3HLUVC60q4QQQ4d-82dY1N3w/edit?usp=sharing',
        sharer: 'Ray'
    },
]

interface BookListProps {
    data: {
        title: string
        slide: string
        sharer: string
    }[]
}

const BookList = ({ data }: BookListProps) => {
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
                {data.map((data, index) => (
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