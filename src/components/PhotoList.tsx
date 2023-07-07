/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { getPhotos } from '@/lib/actions';
import groupBy from '@/utils/groupBy';

type PhotoType = {
    id: string;
    media_url: string;
    permalink: string;
};

const PhotoList = () => {
    const [photos, setPhotos] = useState<PhotoType[][]>([])

    useEffect(() => {
        async function fetchPhotos() {
            const res = await getPhotos();
            const group = groupBy(res, (_, index: number) => {
                return String(index % 4);
            });
            const groupAry = Array.from(group.values());
            setPhotos(groupAry);
        }
        fetchPhotos();
    }, [])

    return photos.map((photosGroup, index) => {
        return (
            <div key={index} className="photos-grid-sub">
                {
                    photosGroup.map(({ id, media_url, permalink }: { id: string; media_url: string; permalink: string }) => {
                        return (
                            <a key={id} target="_blank" href={permalink} className="flex h-auto relative group" rel="noopener noreferrer">
                                <img
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

export default PhotoList