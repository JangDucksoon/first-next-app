'use client';

import { FloatingLabel } from 'flowbite-react';
import React, { useState } from 'react';
import Link from 'next/link';
import lodash from 'lodash';

import { postType } from '@/type/post/postType';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from '@/component/elements/select';
import { FallbackImage } from '@/component/elements/fallback-image';
import { Separator } from '@/component/elements/separator';
import { Button } from '@/component/elements/stateful-button';

export default function PostModify(post: postType) {
    const [postForm, setPostForm] = useState({ ...post });
    const [errorForm, setErrorForm] = useState<Record<string, string>>(
        Object.keys(post).reduce(
            (acc, key) => {
                acc[`${key}Error`] = '';
                return acc;
            },
            {} as Record<string, string>
        )
    );
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
        await new Promise((resolve) => setTimeout(resolve, 1000));
        if (!isModified()) {
            return;
        }
        console.log(JSON.stringify(postForm));
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
                {errorForm.idError && <span className="p-2 text-red-700">{errorForm.idError}</span>}
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
                {errorForm.categoryError && <span className="p-2 text-red-700">{errorForm.categoryError}</span>}
            </div>
            <div>
                <FloatingLabel variant="outlined" name="title" label="Title" defaultValue={post.title} onChange={inputChangeHandler} />
                {errorForm.titleError && <span className="p-2 text-red-700">{errorForm.titleError}</span>}
            </div>
            <div>
                <FloatingLabel variant="outlined" name="author" label="Author" defaultValue={post.author} onChange={inputChangeHandler} />
                {errorForm.authorError && <span className="p-2 text-red-700">{errorForm.authorError}</span>}
            </div>
            <div className="md:col-span-2">
                <FloatingLabel variant="outlined" name="summary" label="Summary" defaultValue={post.summary} onChange={inputChangeHandler} />
                {errorForm.summaryError && <span className="p-2 text-red-700">{errorForm.summaryError}</span>}
            </div>
            <div className="md:col-span-2">
                <FloatingLabel variant="outlined" name="content" label="content" defaultValue={post.content} onChange={inputChangeHandler} />
                {errorForm.contentError && <span className="p-2 text-red-700">errorForm.contentError</span>}
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
