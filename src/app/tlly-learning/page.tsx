import createRandomOrder from '@/utils/randomOrder';
import CardMain from './components/card-main';
const isProduction = process.env.NODE_ENV === 'production';
const serverUrl = isProduction ? process.env.NEXT_PUBLIC_SERVER_URL : 'http://localhost:3000';

interface PageProps {
    searchParams: {
        last_cell: string;
    };
}

const page = async ({ searchParams }: PageProps) => {
    const getAllData = Promise.all([
        fetch(`${serverUrl}/api/sheet?tabName=GP-phrase`).then((res) => res.json()),
        fetch(`${serverUrl}/api/sheet?tabName=BNN-phrase&lastCell=s1-ep2-phrase`).then((res) => res.json()),
    ]);
    const [GPData, BNNData] = await getAllData;

    const TOTAL = 20;
    const GP_RATIO = 0.7;
    const GP_QUANTITY = Math.floor(TOTAL * GP_RATIO);
    const BNN_QUANTITY = TOTAL - GP_QUANTITY; // ratio 0.3

    const gpData = createRandomOrder(GPData.data.length)
        .slice(0, GP_QUANTITY)
        .map((idx) => GPData.data[idx]);
    const bnnData = createRandomOrder(BNNData.data.length)
        .slice(0, BNN_QUANTITY)
        .map((idx) => BNNData.data[idx]);

    console.log('BNNData: ---', BNNData);

    return (
        <div>
            <CardMain srcData={[...gpData, ...bnnData]} />
        </div>
    );
};

export default page;
