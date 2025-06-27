'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export function FallbackImage({ src }: { src: string | undefined | null }) {
    const [imageSrc, setImageSrc] = useState(src);
    if (!imageSrc) {
        setImageSrc('/images/no-image.svg');
    }
    return <Image src={imageSrc} alt="images" height="1000" width="1000" className="object-fit h-60 w-full rounded-xl group-hover/card:shadow-xl" priority />;
}
