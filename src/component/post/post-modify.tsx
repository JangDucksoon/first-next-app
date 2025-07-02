'use client';

import { FloatingLabel } from 'flowbite-react';
import React, { useState } from 'react';
import Link from 'next/link';
import lodash from 'lodash';
import { z } from 'zod';
import { useRouter } from 'next/navigation';

import { updatePost } from '../../../public/api/post-api';

import { postType } from '@/type/post/postType';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from '@/component/elements/select';
import { FallbackImage } from '@/component/elements/fallback-image';
import { Separator } from '@/component/elements/separator';
import { Button } from '@/component/elements/stateful-button';

export default function PostModify(post: postType) {
    const { replace } = useRouter();
    const [postForm, setPostForm] = useState({ ...post });
    const [errorForm, setErrorForm] = useState<Record<keyof postType, string>>({
        author: '',
        category: '',
        content: '',
        createdAt: '',
        id: '',
        imageSrc: '',
        likes: '',
        summary: '',
        title: '',
        views: ''
    });
    const [modified, setModified] = useState(true);

    function inputChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        const name = e.target.name;
        propsChangeHandler(value, name);
    }

    function propsChangeHandler(value, name) {
        setPostForm((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    async function sendPostProps() {
        //await new Promise((resolve) => setTimeout(resolve, 1000));
        if (!isModified()) {
            return;
        }

        if (validatePostInfo()) {
            await updatePost(postForm);
            replace(`/post/${postForm.id}`);
        }
    }

    function isModified() {
        if (lodash.isEqual(postForm, post)) {
            setModified(false);
            return false;
        } else {
            setModified(true);
            return true;
        }
    }

    const postSchema = z.object({
        id: z.coerce.number().min(1, 'ID is required'),
        category: z.string().min(1, 'Category is required'),
        title: z.string().min(5, 'Title must be at least 5 characters'),
        author: z.string().min(1, 'Author is required'),
        summary: z.string().min(10, 'Summary must be at 10 characters'),
        content: z.string().min(20, 'Content must be at 20 characters')
    });

    function validatePostInfo() {
        const result = postSchema.safeParse(postForm);
        if (!result.success) {
            const errors = result.error.flatten().fieldErrors;
            let errorRecord = {};
            Object.entries(errors).forEach((error) => {
                const [name, [message]] = error;
                errorRecord[name] = message;
            });

            setErrorForm({ ...errorForm, ...errorRecord });
            return false;
        }

        setErrorForm({
            author: '',
            category: '',
            content: '',
            createdAt: '',
            id: '',
            imageSrc: '',
            likes: '',
            summary: '',
            title: '',
            views: ''
        });
        return true;
    }

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {!modified && (
                <>
                    <div className="md:col-span-2">
                        <span className="text-left text-red-700">Information is not changed</span>
                    </div>
                    <div className="md:col-span-2">
                        <Separator />
                    </div>
                </>
            )}
            <div className="flex justify-between md:col-span-2">
                <Link
                    href={`/post/${post.id}`}
                    className="min-w-[120px] transform rounded-lg border border-2 border-gray-200 bg-transparent px-6 py-2 font-bold transition duration-400 hover:-translate-y-1"
                >
                    ← Back
                </Link>
                <Button className="rounded-md bg-blue-500 hover:ring-blue-500" onClick={sendPostProps}>
                    Save
                </Button>
            </div>
            <div className="md:col-span-2">
                <Separator />
            </div>
            <div>
                <FloatingLabel disabled variant="outlined" label="ID" defaultValue={post.id} />
                {errorForm.id && <span className="p-2 text-red-700">{errorForm.id}</span>}
            </div>
            <div>
                <Select defaultValue={post.category} name="category" onValueChange={propsChangeHandler}>
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
                {errorForm.category && <span className="p-2 text-red-700">{errorForm.category}</span>}
            </div>
            <div>
                <FloatingLabel variant="outlined" name="title" label="Title" defaultValue={post.title} onChange={inputChangeHandler} />
                {errorForm.title && <span className="p-2 text-red-700">{errorForm.title}</span>}
            </div>
            <div>
                <FloatingLabel variant="outlined" name="author" label="Author" defaultValue={post.author} onChange={inputChangeHandler} />
                {errorForm.author && <span className="p-2 text-red-700">{errorForm.author}</span>}
            </div>
            <div className="md:col-span-2">
                <FloatingLabel variant="outlined" name="summary" label="Summary" defaultValue={post.summary} onChange={inputChangeHandler} />
                {errorForm.summary && <span className="p-2 text-red-700">{errorForm.summary}</span>}
            </div>
            <div className="md:col-span-2">
                <FloatingLabel variant="outlined" name="content" label="content" defaultValue={post.content} onChange={inputChangeHandler} />
                {errorForm.content && <span className="p-2 text-red-700">{errorForm.content}</span>}
            </div>
            <div className="md:col-span-2">
                <FloatingLabel variant="outlined" name="imageSrc" label="Image-URL" defaultValue={post.imageSrc} onChange={inputChangeHandler} />
            </div>
            <div className="md:col-span-2">
                <Separator />
            </div>
            <div className="md:col-span-2">
                <FallbackImage src={postForm.imageSrc} />
            </div>
        </div>
    );
}
