import { Suspense } from 'react';

import Words, { WordsSkeleton } from '@/component/data/word';
import Domains, { DomainSkeleton } from '@/component/data/domain';

export default function Page() {
    return (
        <div className="bg-gray-100 p-6">
            <div className="mx-auto rounded-2xl bg-white p-6 shadow-lg">
                <div className="grid grid-cols-3 gap-3">
                    <div className="flex h-180 min-h-0 flex-col rounded-lg border border-gray-200 p-3">
                        <div className="flex w-full items-center border-b border-b-gray-200">
                            <h3 className="pb-3 text-2xl font-bold">Word</h3>
                        </div>
                        <div className="grid w-full flex-1 grid-cols-2 gap-4 overflow-y-auto pt-3">
                            <Suspense fallback={<WordsSkeleton />}>
                                <Words />
                            </Suspense>
                        </div>
                    </div>
                    <div className="flex h-180 min-h-0 flex-col rounded-lg border border-gray-200 p-3">
                        <div className="flex w-full items-center border-b border-b-gray-200">
                            <h3 className="pb-3 text-2xl font-bold">Domain</h3>
                        </div>
                        <div className="w-full flex-1 overflow-y-auto pt-3">
                            <Suspense fallback={<DomainSkeleton />}>
                                <Domains />
                            </Suspense>
                        </div>
                    </div>
                    <div className="flex h-180 min-h-0 flex-col rounded-lg border border-gray-200 p-3">
                        <div className="flex w-full items-center border-b border-b-gray-200">
                            <h3 className="pb-3 text-2xl font-bold">123123</h3>
                        </div>
                        <div className="w-full flex-1 overflow-y-scroll pt-3">
                            <Suspense fallback={<WordsSkeleton />}>
                                {Array.from({ length: 1000 }).map((_, idx) => (
                                    <div key={idx}>test</div>
                                ))}
                            </Suspense>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
