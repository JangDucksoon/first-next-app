'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const isValidUrl = (url: string | undefined | null): boolean => {
    if (!url) return false;

    if (!url.startsWith('http')) {
        return true;
    }

    try {
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
};

export function FallbackImage({ src }: { src: string | undefined | null }) {
    const [imageSrc, setImageSrc] = useState(isValidUrl(src) ? src : '/images/no-image.svg');

    useEffect(() => {
        if (isValidUrl(src)) {
            setImageSrc(src);
        } else {
            setImageSrc('/images/no-image.svg');
        }
    }, [src]);

    return (
        <Image
            src={imageSrc} // 이제 imageSrc는 항상 유효한 URL이거나 대체 이미지 경로
            alt="images"
            height="1000"
            width="1000"
            className="object-fit h-60 w-full rounded-xl group-hover/card:shadow-xl"
            unoptimized
            priority
            onError={() => setImageSrc('/images/no-image.svg')} // 혹시 모를 로드 실패에 대비
        />
    );
}
