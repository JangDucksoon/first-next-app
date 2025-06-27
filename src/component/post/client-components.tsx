'use client';

import { HelperText } from 'flowbite-react';
import React, { useState } from 'react';
import Image from 'next/image';

import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card';
import { PurseCell } from '@/component/post/table';

export function PostCardSkeleton() {
    const cards = Array.from({ length: 4 }).fill(null);
    return (
        <>
            <div className="mb-6">
                <HelperText color="info">Searching...</HelperText>
            </div>
            <div className="grid grid-cols-2 gap-4">
                {cards.map((_, idx) => (
                    <CardContainer key={idx} containerClassName="flex rounded-xl bg-gray-100 p-0 shadow-xl">
                        <CardBody className="pb-3">
                            <CardItem className="mt-4 w-full">
                                <PurseCell />
                            </CardItem>
                            <CardItem className="mt-4 w-full">
                                <PurseCell />
                            </CardItem>
                            <CardItem className="mt-4 w-full">
                                <PurseCell />
                            </CardItem>
                            <CardItem className="mt-4 w-full">
                                <PurseCell />
                            </CardItem>
                            <CardItem className="mt-4 w-full">
                                <PurseCell />
                            </CardItem>
                        </CardBody>
                    </CardContainer>
                ))}
            </div>
        </>
    );
}

export function FallbackImage({ src }: { src: string | undefined | null }) {
    const [imageSrc, setImageSrc] = useState(src);
    if (!imageSrc) {
        setImageSrc('/images/no-image.svg');
    }
    return <Image src={imageSrc} alt="images" height="1000" width="1000" className="object-fit h-60 w-full rounded-xl group-hover/card:shadow-xl" priority />;
}
