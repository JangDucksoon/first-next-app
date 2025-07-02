'use client';

import { FloatingLabel } from 'flowbite-react';
import { useState } from 'react';
import Link from 'next/link';

import { postType } from '@/type/post/postType';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from '@/component/elements/select';
import { FallbackImage } from '@/component/elements/fallback-image';
import { Separator } from '@/component/elements/separator';
import { Button } from '@/component/elements/stateful-button';

export default function PostDetail(post: postType) {
    const [src, setSrc] = useState(post.imageSrc);

    function changeSrc(e) {
        setSrc(e.target.value);
    }

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex justify-between md:col-span-2">
                <Link
                    href={`/post/${post.id}`}
                    className="min-w-[120px] transform rounded-lg border border-2 border-gray-200 bg-transparent px-6 py-2 font-bold transition duration-400 hover:-translate-y-1"
                >
                    ← Back
                </Link>
                <Button className="rounded-md bg-blue-500 hover:ring-blue-500">Save</Button>
            </div>
            <div className="md:col-span-2">
                <Separator />
            </div>
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
                <FloatingLabel variant="outlined" label="Image-URL" defaultValue={post.imageSrc} onInput={changeSrc} />
            </div>
            <div className="md:col-span-2">
                <Separator />
            </div>
            <div className="md:col-span-2">
                <FallbackImage src={src} />
            </div>
        </div>
    );
}
