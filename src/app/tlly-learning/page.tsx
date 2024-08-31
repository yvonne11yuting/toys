import CardMain from './components/card-main';
import { TableProperties } from 'lucide-react';

const isProduction = process.env.NODE_ENV === 'production';
const serverUrl = isProduction ? process.env.NEXT_PUBLIC_SERVER_URL : 'http://localhost:3000';

interface PageProps {
    searchParams: {
        last_cell: string;
    };
}

const page = async ({ searchParams }: PageProps) => {
    const { last_cell } = searchParams ?? {};
    const lastCell = last_cell ? `&lastCell=${last_cell}` : '';
    const getAllData = Promise.all([
        fetch(`${serverUrl}/api/sheet?tabName=GP-phrase`).then((res) => res.json()),
        fetch(`${serverUrl}/api/sheet?tabName=BNN-phrase${lastCell}`).then((res) => res.json()),
    ]);
    const [GPData, BNNData] = await getAllData;

    const totalBnnLen = BNNData?.data?.length - 1 ?? 0;
    const lastQ = totalBnnLen ? BNNData.data[totalBnnLen]?.question : '';

    return (
        <div>
            <div className="m-5 flex gap-2 text-slate-500">
                <TableProperties className="stroke-yellow-400" />
                The last question is: <b>{lastQ}</b>
            </div>
            <CardMain rawData={{ gp: GPData.data ?? [], bnn: BNNData.data ?? [] }} />
        </div>
    );
};

export default page;
