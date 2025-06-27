import React from 'react';
import { HelperText } from 'flowbite-react';

import ViewToggle from '@/component/post/view-toggle';
import SearchFilter from '@/component/post/search-filter';

export default async function Loading() {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-lg">
                <div className="flex justify-between">
                    <h1 className="mb-6 text-3xl font-bold">POST</h1>
                    <ViewToggle view={'card'} />
                </div>

                <div>
                    <SearchFilter />
                    <div className="mb-6">
                        <HelperText color="info">loading...</HelperText>
                    </div>
                    <div className="grid grid-cols-2 gap-4">The page is currently loading.</div>
                </div>
            </div>
        </div>
    );
}
