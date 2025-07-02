import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import { getPost } from '../../../../public/api/post-api';

import { postType } from '@/type/post/postType';
import { Card, CardContent, CardHeader, CardTitle } from '@/component/elements/card';
import { ScrollArea } from '@/component/elements/scroll-area';
import { Separator } from '@/component/elements/separator';
import { Label } from '@/component/elements/label';

export default async function Page(props: { params: Promise<postType> }) {
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
                            <Image src={post.imageSrc || '/images/no-image.svg'} alt={post.title} fill className="object-fit" priority />
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

                                <div className="text-center md:col-span-2 md:text-right">
                                    <Link href={`/post/${post.id}/modify`} className="rounded-xl px-4 py-2 font-normal hover:underline">
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
