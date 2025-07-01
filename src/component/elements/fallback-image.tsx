'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export function FallbackImage({ src }: { src: string | undefined | null }) {
    const [imageSrc, setImageSrc] = useState(src || '/images/no-image.svg');

    useEffect(() => {
        if (!src) {
            setImageSrc('/images/no-image.svg');
        } else {
            setImageSrc(src);
        }
    }, [src]);
    return (
        <Image
            src={imageSrc}
            alt="images"
            height="1000"
            width="1000"
            className="object-fit h-60 w-full rounded-xl group-hover/card:shadow-xl"
            priority
            unoptimized
            onError={() => setImageSrc('/images/no-image.svg')}
        />
    );
}
