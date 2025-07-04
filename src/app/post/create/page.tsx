import { Metadata } from 'next';

import PostCreate from '@/component/post/post-create';

export const metadata: Metadata = {
    title: 'Post create',
    description: 'create page...'
};

export default function Page() {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-lg">
                <PostCreate />
            </div>
        </div>
    );
}
