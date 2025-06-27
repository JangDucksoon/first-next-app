import { HelperText } from 'flowbite-react';
import React from 'react';

import { postType, SearchFilterType } from '@/type/post/postType';
import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card';
import { PurseCell } from '@/component/post/table';

export default async function PostCard({ term }: SearchFilterType) {
    await new Promise<>((resolve) => setTimeout(resolve, 3000));
    const response = await fetch(`http://localhost:3000/data/card_posts.json`);
    const list = await response.json();

    const cards: Array<postType> = (
        term ? list.filter((data) => data.title.toUpperCase().includes(term.toUpperCase()) || data.content.toUpperCase().includes(term.toUpperCase())) : list
    ).filter((_, idx) => idx < 10);
    return (
        <>
            <div className="mb-6">
                <HelperText color={term ? 'success' : 'gray'}>{term ? 'Search completed successfully.' : 'Please enter a search term.'}</HelperText>
            </div>
            <div className="grid grid-cols-2 gap-4">
                {cards.map((card) => (
                    <CardContainer key={card.id} containerClassName="py-0" className="inter-var">
                        <CardBody className="group/card relative h-auto w-full rounded-xl border border-black/[0.1] bg-gray-50 p-6 dark:border-white/[0.2] dark:bg-black dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]">
                            <CardItem translateZ="50" className="text-xl font-bold text-neutral-600 dark:text-white">
                                <div className="flex justify-between">
                                    <p>{card.title}</p>
                                    <p>{card.category}</p>
                                </div>
                            </CardItem>
                            <CardItem as="p" translateZ="60" className="mt-2 max-w-sm text-sm text-neutral-500 dark:text-neutral-300">
                                {card.summary}
                            </CardItem>
                            <CardItem translateZ="150" className="mt-4 w-full">
                                {card.content}
                            </CardItem>
                            <CardItem translateZ="100" rotateX={20} rotateZ={-10} className="mt-4 w-full">
                                <img
                                    src={card.imageSrc}
                                    height="1000"
                                    width="1000"
                                    className="object-fit h-60 w-full rounded-xl group-hover/card:shadow-xl"
                                    alt="thumbnail"
                                />
                            </CardItem>
                            <div className="mt-20 flex items-center justify-between">
                                <CardItem translateZ={50} className="rounded-xl px-4 py-2 text-xs font-normal dark:text-white">
                                    {card.author}
                                </CardItem>
                                <CardItem translateZ={50} className="rounded-xl px-4 py-2 text-xs font-bold dark:bg-white dark:text-black">
                                    {card.createdAt}
                                </CardItem>
                            </div>
                        </CardBody>
                    </CardContainer>
                ))}
            </div>
        </>
    );
}

export function PostCardSkeleton() {
    const cards = Array.from({ length: 4 }).fill(null);
    return (
        <>
            <div className="mb-6">
                <HelperText color="info">Searching...</HelperText>
            </div>
            <div className="grid grid-cols-2 gap-4">
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
