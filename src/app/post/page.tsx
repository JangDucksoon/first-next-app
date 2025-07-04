import { Suspense } from 'react';
import { Metadata } from 'next';

import SearchFilter from '@/component/post/search-filter';
import { SearchFilterType } from '@/type/post/postType';
import { PostTable, PostTableSkeleton } from '@/component/post/table';
import ViewToggle from '@/component/post/view-toggle';
import PostCards, { PostCardSkeleton } from '@/component/post/post-card';

export const metadata: Metadata = {
    title: 'post',
    description: 'post pages....'
};

export default async function Page(props: { searchParams: Promise<SearchFilterType> }) {
    let { term, category, view } = (await props.searchParams) || '';
    view = view !== 'table' ? 'card' : view;

    return (
        <div className="bg-gray-100 p-6">
            <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-lg">
                <div className="flex justify-between">
                    <h1 className="mb-6 text-3xl font-bold">POST</h1>
                    <ViewToggle view={view} />
                </div>

                <div>
                    <SearchFilter />
                    {view === 'table' ? (
                        <Suspense key={term + view} fallback={<PostTableSkeleton />}>
                            <PostTable term={term} />
                        </Suspense>
                    ) : null}
                    {view === 'card' ? (
                        <Suspense key={term + view} fallback={<PostCardSkeleton />}>
                            <PostCards term={term} category={category} />
                        </Suspense>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
