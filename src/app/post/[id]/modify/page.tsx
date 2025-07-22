import { notFound } from 'next/navigation';
import { Metadata } from 'next';

import { getPost } from '@/lib/post-api';
import { PostType } from '@/type/post/postType';
import PostModify from '@/component/post/post-modify';

export const metadata: Metadata = {
    title: 'Post modify',
    description: 'post pages....'
};

export default async function Page(props: { params: Promise<PostType> }) {
    const { id } = (await props.params) || 0;
    const post = await getPost(id!);

    if (!post.id) {
        notFound();
    }
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-lg">
                <PostModify {...post} />
            </div>
        </div>
    );
}
