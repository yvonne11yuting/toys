import CardMain from './components/card-main';

const isProduction = process.env.NODE_ENV === 'production';
const serverUrl = isProduction ? process.env.NEXT_PUBLIC_SERVER_URL : 'http://localhost:3000';

interface PageProps {
    searchParams: Promise<{
        last_cell: string;
    }>;
}

const page = async ({ searchParams }: PageProps) => {
    const { last_cell } = (await searchParams) ?? {};
    const lastCell = last_cell ? `&lastCell=${last_cell}` : '';
    const getAllData = Promise.all([
        fetch(`${serverUrl}/api/sheet?tabName=GP-phrase`).then((res) => res.json()),
        fetch(`${serverUrl}/api/sheet?tabName=BNN-phrase${lastCell}`, { cache: 'no-store' }).then((res) => res.json()),
    ]);
    const [GPData, BNNData] = await getAllData;

    return (
        <div>
            <CardMain rawData={{ gp: GPData.data ?? [], bnn: BNNData.data ?? [] }} />
        </div>
    );
};

export default page;
