import { HelperText } from 'flowbite-react';
import React from 'react';

import { postType, SearchFilterType } from '@/type/post/postType';
import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card';
import { FallbackImage } from '@/component/post/client-components';

export default async function PostCards({ term }: SearchFilterType) {
    await new Promise<>((resolve) => setTimeout(resolve, 1000));
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
                    <PostCard key={card.id} {...card} />
                ))}
            </div>
        </>
    );
}

export function PostCard(card: postType) {
    return (
        <CardContainer containerClassName="py-0" className="inter-var">
            <CardBody className="group/card relative h-auto w-full rounded-xl border border-black/[0.1] bg-gray-50 p-6 dark:border-white/[0.2] dark:bg-black dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]">
                <CardItem translateZ="100" className="text-xl font-bold text-neutral-600 dark:text-white">
                    <div className="flex justify-between">
                        <p>{card.title}</p>
                        <p>{card.category}</p>
                    </div>
                </CardItem>
                <CardItem as="p" translateZ="40" className="mt-2 max-w-sm text-sm text-neutral-500 dark:text-neutral-300">
                    {card.summary}
                </CardItem>
                <CardItem translateZ="60" className="mt-4 w-full">
                    {card.content}
                </CardItem>
                <CardItem translateZ="50" rotateX={-10} rotateZ={20} className="mt-4 w-full">
                    <FallbackImage src={card.imageSrc} />
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
