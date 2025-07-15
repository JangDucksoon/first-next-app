'use client';

import { useEffect } from 'react';

import { alertBox } from '@/lib/alert-store';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
    useEffect(() => {
        alertBox.show(error.message);
    }, [error]);
    return (
        <div className="flex h-full flex-col items-center justify-center p-4">
            <h1 className="mb-2 text-2xl font-bold">문제가 발생했습니다.</h1>
            <p className="mb-4">{error.message}</p>
            <button
                className="btn"
                onClick={() => {
                    reset();
                }}
            >
                다시 시도
            </button>
        </div>
    );
}
