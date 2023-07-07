import { getPhotos } from '@/lib/actions'
import Image from 'next/image'
import groupBy from '@/utils/groupBy'

type PhotoType = {
    id: string;
    media_url: string;
    permalink: string;
};

const Photos = async () => {
    const photos = await getPhotos();
    const group = groupBy(photos, (_, index: number) => {
        return String(index % 4);
    });
    const groupAry = Array.from(group.values());

    return (
        <div className="photos-grid">
            {
                groupAry.map((photosGroup, index) => {
                    return (
                        <div key={index} className="photos-grid-sub">
                            {
                                photosGroup.map(({ id, media_url, permalink }: { id: string; media_url: string; permalink: string }) => {
                                    return (
                                        <a key={id} target="_blank" href={permalink} className="flex h-auto relative group" rel="noopener noreferrer">
                                            <Image
                                                src={media_url}
                                                width={300}
                                                height={200}
                                                className="object-cover rounded-md"
                                                alt="photos"
                                                loading="lazy"
                                            />
                                            <div className="hidden group-hover:flex photos-link">
                                                Instagram
                                                <Image
                                                    src="/external.svg"
                                                    width={18}
                                                    height={18}
                                                    alt="external link"
                                                />
                                            </div>
                                        </a>
                                    );

                                })
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Photos