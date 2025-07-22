import { Badge, HelperText } from 'flowbite-react';
import React from 'react';
import Link from 'next/link';

import { PurseCell } from '@/component/post/table';
import { PostType, SearchFilterType } from '@/type/post/postType';
import { CardBody, CardContainer, CardItem } from '@/component/elements/3d-card';
import { FallbackImage } from '@/component/elements/fallback-image';
import { getAllPosts } from '@/lib/post-api';

export default async function PostCards({ term }: SearchFilterType) {
    const cards = await getAllPosts(term || '');

    return (
        <>
            <div className="mb-6">
                <HelperText color={term ? 'success' : 'gray'}>{term ? 'Search completed successfully.' : 'Please enter a search term.'}</HelperText>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {cards.length === 0 ? <div>sorry, we can not find post by your term</div> : cards.map((card) => <PostCard key={card.id} {...card} />)}
            </div>
        </>
    );
}

export function PostCard(card: PostType) {
    return (
        <CardContainer containerClassName="py-0" className="inter-var">
            <CardBody className="group/card relative h-auto w-full rounded-xl border border-black/[0.1] bg-gray-50 p-6 dark:border-white/[0.2] dark:bg-black dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]">
                <CardItem translateZ="100" className="w-full text-xl font-bold text-neutral-600 dark:text-white">
                    <div className="flex justify-between">
                        <span>{card.title}</span>
                        <Badge color="success">{card.category}</Badge>
                    </div>
                </CardItem>
                <CardItem as="p" translateZ="60" className="mt-2 max-w-sm text-sm text-neutral-500 dark:text-neutral-300">
                    {card.summary}
                </CardItem>
                <CardItem translateZ="60" className="mt-4 w-full">
                    {card.content}
                </CardItem>
                <CardItem translateZ="100" className="mt-4 w-full">
                    <Link href={`/post/${card.id}`}>
                        <FallbackImage src={card.imageSrc} />
                    </Link>
                </CardItem>
                <div className="mt-20 flex items-center justify-between">
                    <CardItem translateZ={40} className="rounded-xl px-4 py-2 text-xs font-normal dark:text-white">
                        {card.author}
                    </CardItem>
                    <CardItem translateZ={40} className="rounded-xl px-4 py-2 text-xs font-bold dark:bg-white dark:text-black">
                        {card.createdAt}
                    </CardItem>
                </div>
            </CardBody>
        </CardContainer>
    );
}

export function PostCardSkeleton() {
    const cards = Array.from({ length: 4 }).fill(null);
    return (
        <>
            <div className="mb-6">
                <HelperText color="info">Searching...</HelperText>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {cards.map((_, idx) => (
                    <CardContainer key={idx} containerClassName="flex rounded-xl bg-gray-100 p-0 shadow-xl">
                        <CardBody className="pb-3">
                            <CardItem className="mt-4 w-full">
                                <PurseCell />
                            </CardItem>
                            <CardItem className="mt-4 w-full">
                                <PurseCell />
                            </CardItem>
                            <CardItem className="mt-4 w-full">
                                <PurseCell />
                            </CardItem>
                            <CardItem className="mt-4 w-full">
                                <PurseCell />
                            </CardItem>
                            <CardItem className="mt-4 w-full">
                                <PurseCell />
                            </CardItem>
                        </CardBody>
                    </CardContainer>
                ))}
            </div>
        </>
    );
}
