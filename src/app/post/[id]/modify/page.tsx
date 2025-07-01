import { notFound } from 'next/navigation';

import { getPost } from '../../../../../public/api/post-api';

import { postType } from '@/type/post/postType';
import PostDetail from '@/component/post/post-detail';

export default async function Page(props: { params: Promise<postType> }) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const { id } = (await props.params) || 0;
    const post = await getPost(+id);

    if (!post.id) {
        notFound();
    }
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-lg">
                <PostDetail {...post} />
            </div>
        </div>
    );
}
