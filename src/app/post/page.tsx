import { Suspense } from 'react';

import SearchFilter from '@/component/post/searchFilter';
import { SearchFilterType } from '@/type/post/searchFilter';
import { PostTable, PostTableSkeleton } from '@/component/post/table';

export default async function Page(props: { searchParams: Promise<SearchFilterType> }) {
    let { term } = await props.searchParams;
    let helperText = '';

    if (term) {
        helperText = 'Search completed successfully.';
    } else {
        term = '';
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-lg">
                <h1 className="mb-6 text-3xl font-bold">POST</h1>

                <div className="mb-6">
                    <SearchFilter key={term} helperText={helperText} />
                </div>

                <Suspense key={term} fallback={<PostTableSkeleton />}>
                    <PostTable term={term} />
                </Suspense>
            </div>
        </div>
    );
}
