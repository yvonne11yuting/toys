"use client"
import React from 'react'
import Image from 'next/image'
import groupBy from '@/utils/groupBy';
import { PhotoType } from '@/common.types';


const PhotoList = ({ data }: { data: PhotoType[] }) => {
    const group = groupBy(data, (_, index: number) => String(index % 4));
    const photos = Array.from(group.values());

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
                                <Image
                                    src={thumbnailUrl}
                                    height={320}
                                    width={320}
                                    className="object-cover rounded-md"
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