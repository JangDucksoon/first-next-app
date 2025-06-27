import { FloatingLabel } from 'flowbite-react';
import { notFound } from 'next/navigation';

import { getPost } from '../../../../public/api/post-api';

import { postType } from '@/type/post/postType';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from '@/component/elements/select';

export default async function Page(props: { params: Promise<postType> }) {
    const { id } = (await props.params) || 0;
    const post = await getPost(+id);

    if (!post.id) {
        notFound();
    }
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-lg">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FloatingLabel disabled variant="outlined" label="ID" defaultValue={post.id} />
                    <Select defaultValue={post.category}>
                        <SelectTrigger className="peer w-full appearance-none rounded-lg border border-gray-300 bg-transparent py-5.5">
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Categories</SelectLabel>
                                <SelectSeparator />
                                <SelectItem value="React">React</SelectItem>
                                <SelectItem value="프론트엔드">Front End</SelectItem>
                                <SelectItem value="협업 도구">협업 도구</SelectItem>
                                <SelectItem value="Node.js">Node.js</SelectItem>
                                <SelectItem value="DevOps">DevOps</SelectItem>
                                <SelectItem value="프로그래밍 언어">Programming Language</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <FloatingLabel variant="outlined" label="Title" defaultValue={post.title} />
                    <FloatingLabel variant="outlined" label="Author" defaultValue={post.author} />
                    <div className="md:col-span-2">
                        <FloatingLabel variant="outlined" label="Summary" defaultValue={post.summary} />
                    </div>
                    <div className="md:col-span-2">
                        <FloatingLabel variant="outlined" label="content" defaultValue={post.content} />
                    </div>
                    <div className="md:col-span-2">
                        <FloatingLabel variant="outlined" label="Image-URL" defaultValue={post.imageSrc} />
                    </div>
                </div>
            </div>
        </div>
    );
}
