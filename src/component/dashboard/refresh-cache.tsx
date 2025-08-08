'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RefreshCache({ interval }: { interval: number }) {
    const { refresh } = useRouter();

    useEffect(() => {
        const intervalRefreshCache = setInterval(() => {
            refresh();
        }, interval);

        return () => {
            clearInterval(intervalRefreshCache);
        };
    }, [refresh, interval]);
    return null;
}
