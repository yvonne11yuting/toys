import axios from 'axios';
import Image from 'next/image';
import Tag from '@/components/common/tag';

interface Note {
    id: string;
    title: string;
    readPermission: string;
    createdAt: number;
    tags: string[];
    publishLink: string;
    lastChangeAt: number;
    lastChangeUser: {
        name: string;
        photo: string;
    },
    publishType: string;
}

async function getHackmdNotes(token: string) {
    const config = {
        method: 'get',
        url: 'https://api.hackmd.io/v1/notes/',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    };

    const response = await axios.request(config)
    return response.data;
}

const Notes = async () => {
    const token = process.env.HACKMD_TOKEN || '';
    if (!token) {
        return <div>Oops...seems like something wrong</div>
    }
    const data = await getHackmdNotes(token) as Note[];
    let publicData = data.filter((note: any) => note.readPermission !== "owner")
    publicData.sort((a, b) => b.createdAt - a.createdAt);

    return (
        <div className="flex flex-col gap-2">
            {
                publicData.map((item: any) => {
                    const createdAtStr = new Date(item.createdAt).toLocaleDateString('zh-TW');
                    return (
                        <div key={item.id} className="p-5">
                            <div className="flex items-center text-sm gap-1">
                                <Image src={item.lastChangeUser.photo} width={20} height={20} alt={`${item.lastChangeUser.name}'s photo`} className="rounded-full" />
                                {item.lastChangeUser.name}
                            </div>
                            <h1 className="text-xl font-semibold my-2 hover:text-slate-600">
                                <a href={item.publishLink} target="_blank" rel="no-referrer no-opener">
                                    [{item.publishType}]&nbsp;
                                    {item.title}
                                </a>
                            </h1>
                            <div className="text-sm text-gray-500">
                                <span className="mr-2">{createdAtStr}</span>
                                {
                                    item.tags.map((tag: string) => (
                                        <Tag key={tag}>{tag}</Tag>
                                    ))
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Notes;

