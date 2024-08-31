import CardMain from './components/card-main';

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

    // const totalBnnLen = BNNData?.data?.length - 1 ?? 0;
    // const lastQ = totalBnnLen ? BNNData.data[totalBnnLen]?.question : '';

    return (
        <div>
            <CardMain rawData={{ gp: GPData.data ?? [], bnn: BNNData.data ?? [] }} />
        </div>
    );
};

export default page;
