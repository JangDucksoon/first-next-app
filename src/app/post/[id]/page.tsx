import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';

import { getPost } from '@/lib/post-api';
import { PostType } from '@/type/post/PostType';
import { Card, CardContent, CardHeader, CardTitle } from '@/component/elements/card';
import { ScrollArea } from '@/component/elements/scroll-area';
import { Separator } from '@/component/elements/separator';
import { Label } from '@/component/elements/label';
import { FallbackImage } from '@/component/elements/fallback-image';

export const metadata: Metadata = {
    title: 'Post detail',
    description: 'post pages....'
};

export default async function Page(props: { params: Promise<PostType> }) {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    const { id } = (await props.params) || 0;
    const post = await getPost(+id);

    if (!post.id) {
        notFound();
    }
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-lg">
                <Card className="mx-auto max-w-3xl space-y-6">
                    <CardHeader>
                        <CardTitle>Post Detail</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <div className="relative h-60 w-full overflow-hidden rounded-xl">
                            <FallbackImage src={post.imageSrc} alt={post.title} />
                        </div>

                        <Separator />

                        <ScrollArea className="h-[400px] p-2">
                            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 md:grid-cols-2">
                                <div>
                                    <Label>ID</Label>
                                    <p className="mt-1 text-sm text-gray-700">{post.id}</p>
                                </div>
                                <div>
                                    <Label>Category</Label>
                                    <p className="mt-1 text-sm text-gray-700">{post.category}</p>
                                </div>
                                <div>
                                    <Label>Title</Label>
                                    <p className="mt-1 text-sm text-gray-700">{post.title}</p>
                                </div>
                                <div>
                                    <Label>Author</Label>
                                    <p className="mt-1 text-sm text-gray-700">{post.author}</p>
                                </div>
                                <div className="md:col-span-2">
                                    <Label>Summary</Label>
                                    <p className="mt-1 text-sm text-gray-700">{post.summary}</p>
                                </div>
                                <div className="md:col-span-2">
                                    <Label>Content</Label>
                                    <p className="mt-1 text-sm whitespace-pre-wrap text-gray-700">{post.content}</p>
                                </div>

                                <Separator className="md:col-span-2" />

                                <div className="flex justify-between md:col-span-2">
                                    <Link
                                        href={`/post`}
                                        className="rounded-xl px-4 py-2 font-normal transition-transform duration-400 hover:-translate-y-2 hover:underline"
                                    >
                                        ← Back
                                    </Link>
                                    <Link
                                        href={`/post/${post.id}/modify`}
                                        className="rounded-xl px-4 py-2 font-normal transition-transform duration-400 hover:-translate-y-2 hover:underline"
                                        replace
                                    >
                                        Modify →
                                    </Link>
                                </div>
                            </dl>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
