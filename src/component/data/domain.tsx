import React from 'react';
import Image from 'next/image';

import ExpandableCard from '@/component/elements/expandable-card';
import { httpGet } from '@/lib/api-module';
import { DomainType } from '@/type/data/dataType';
import { PurseCell } from '@/component/post/table';

export default async function Domains() {
    const domains = await httpGet<Array<DomainType>>('/domain');
    const cards = domains.map((dmn, idx) => ({
        title: dmn.stdDmnNm,
        description: `${dmn.stdDmnGrpNm} - ${dmn.stdDmnClsfNm} (${dmn.stdDmnDataTypeNm})`,
        src: `https://picsum.photos/${(((idx - 1) % 10) + 1) * 100}`,
        ctaText: 'Detail',
        ctaLink: '',
        content: dmn.stdDmnExpln
    }));

    return (
        <>
            <ExpandableCard cards={cards} />
        </>
    );
}

export function DomainSkeleton() {
    const skeletonArray = Array.from({ length: 6 });
    return (
        <ul className="mx-auto w-full max-w-2xl gap-4">
            {skeletonArray.map((_, idx) => (
                <div key={idx} className="pointer-events-none flex flex-col items-center justify-between rounded-xl p-4 md:flex-row">
                    <div className="flex flex-col gap-4 md:flex-row">
                        <div>
                            <Image
                                width="100"
                                height="100"
                                src="/images/no-image.svg"
                                alt="IDN10"
                                className="h-40 w-40 animate-pulse rounded-lg object-cover object-top md:h-14 md:w-14"
                            />
                        </div>
                        <div className="flex flex-col gap-y-3">
                            <div className="max-w-30 min-w-30">
                                <PurseCell />
                            </div>
                            <div className="min-w-100">
                                <PurseCell />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </ul>
    );
}
