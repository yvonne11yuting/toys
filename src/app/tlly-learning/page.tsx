import CardMain from './components/card-main';
import { AIProvider } from '@/components/ai/AIContext';
import { AIResult } from '@/components/ai/AIResult';
import { authOptions } from '@/lib/session';
import { getServerSession } from 'next-auth';
import type { SessionInterface } from '@/common.types';

const isProduction = process.env.NODE_ENV === 'production';
const serverUrl = isProduction ? process.env.NEXT_PUBLIC_SERVER_URL : 'http://localhost:3000';

interface PageProps {
    searchParams: Promise<{
        last_cell: string;
    }>;
}

const page = async ({ searchParams }: PageProps) => {
    const session = (await getServerSession(authOptions)) as SessionInterface;
    const { last_cell } = (await searchParams) ?? {};
    const lastCell = last_cell ? `&lastCell=${last_cell}` : '';
    const getAllData = Promise.all([
        fetch(`${serverUrl}/api/sheet?tabName=GP-phrase`).then((res) => res.json()),
        fetch(`${serverUrl}/api/sheet?tabName=BNN-phrase${lastCell}`, { cache: 'no-store' }).then((res) => res.json()),
    ]);
    const [GPData, BNNData] = await getAllData;

    return (
        <AIProvider>
            <div>
                <CardMain
                    rawData={{ gp: GPData.data ?? [], bnn: BNNData.data ?? [] }}
                    isAdmin={session?.isAdmin ?? false}
                />
            </div>
            <AIResult />
        </AIProvider>
    );
};

export default page;
