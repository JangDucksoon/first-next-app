'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RefreshCache() {
    const { refresh } = useRouter();

    useEffect(() => {
        const intervalRefreshCache = setInterval(() => {
            refresh();
        }, 5000);
        return () => clearInterval(intervalRefreshCache);
    }, [refresh]);
    return null;
}
