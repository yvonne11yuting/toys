/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { getPhotos } from '@/lib/actions';
import groupBy from '@/utils/groupBy';

type PhotoType = {
    imageId: string;
    photoUrl: string;
    thumbnailUrl: string;
    name: string;
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
            <div key={index} className="photos-grid-sub max-w-xs">
                {
                    photosGroup.map(({
                        imageId,
                        photoUrl,
                        thumbnailUrl,
                        name
                    }: PhotoType) => {
                        return (
                            <a key={imageId} target="_blank" href={photoUrl} className="flex h-auto max-w-xs relative group" rel="noopener noreferrer">
                                <img
                                    src={thumbnailUrl}
                                    width={320}
                                    className="w-[180px] sm:w-[320px] object-cover rounded-md"
                                    alt="photos"
                                    loading="lazy"
                                />
                                <div className="hidden group-hover:inline-flex photos-link">
                                    {name}
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