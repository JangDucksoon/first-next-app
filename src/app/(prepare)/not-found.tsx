'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Boxes } from '@/component/elements/background-boxes';

export default function NotFound() {
    const pathname = usePathname();
    const routePath = pathname.split('/')[1];
    const pageName = routePath.charAt(0).toUpperCase() + routePath.slice(1);

    return (
        <div className="relative flex h-[calc(100vh-54px)] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-yellow-100">
            <div className="pointer-events-none absolute inset-0 z-20 h-full w-full bg-green-500 [mask-image:radial-gradient(transparent,white)]" />

            <Boxes />
            <h1 className="z-20 mb-4 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-7xl font-extrabold tracking-tight text-transparent">
                {pageName}
            </h1>
            <h2 className="z-20 mb-2 text-2xl font-semibold md:text-3xl">{"We're preparing this page"}</h2>
            <p className="z-20 mb-6 max-w-md text-center text-gray-900">This page is currently under preparation and will be available soon.</p>
            <Link href="/" className="z-20 inline-block rounded-lg bg-white px-6 py-3 font-medium text-gray-900 transition hover:bg-gray-400">
                Go back home
            </Link>
        </div>
    );
}
