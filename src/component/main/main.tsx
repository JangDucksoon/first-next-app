'use client';

import { Boxes } from '@/component/elements/background-boxes';
import { cn } from '@/lib/utils';

export default function Main() {
    return (
        <div className="relative flex h-[calc(100vh-54px)] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-gray-500">
            <div className="pointer-events-none absolute inset-0 z-20 h-full w-full bg-blue-100 [mask-image:radial-gradient(transparent,white)]" />

            <Boxes />
            <h1 className={cn('relative z-20 text-xl text-white md:text-4xl')}>This is Main page</h1>
            <p className="relative z-20 mt-2 text-center text-neutral-300">
                Empower your voice. Create, share, and connect with ease on our intuitive platform.
            </p>
        </div>
    );
}
