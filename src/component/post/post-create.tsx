'use client';

import React, { useState } from 'react';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { clsx } from 'clsx';
import { FloatingLabel } from 'flowbite-react';
import Link from 'next/link';
import { AlertCircleIcon } from 'lucide-react';

import { PostType } from '@/type/post/postType';
import { insertPost } from '@/lib/post-api';
import { alertBox } from '@/lib/alert-store';
import { Button } from '@/component/elements/stateful-button';
import { Separator } from '@/component/elements/separator';
import { FallbackImage } from '@/component/elements/fallback-image';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from '@/component/elements/select';
import { Alert, AlertDescription, AlertTitle } from '@/component/elements/alert';

export default function PostCreate() {
    const postSchema = z.object({
        category: z
            .string({
                required_error: 'Category is required'
            })
            .min(1, 'Category is required'),
        title: z
            .string({
                required_error: 'Title is required'
            })
            .min(5, 'Title must be at least 5 characters'),
        author: z
            .string({
                required_error: 'Author is required'
            })
            .min(1, 'Author is required'),
        summary: z
            .string({
                required_error: 'Summary is required'
            })
            .min(10, 'Summary must be at 10 characters'),
        content: z
            .string({
                required_error: 'Content is required'
            })
            .min(20, 'Content must be at 20 characters')
    });
    const [postForm, setPostForm] = useState<PostType>({});
    const validationResult = postSchema.safeParse(postForm);
    const errorForm = validationResult.success ? {} : validationResult.error.flatten().fieldErrors;
    const { replace } = useRouter();

    function inputChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        const name = e.target.name;

        stateChangeHandler(value, name);
    }

    function stateChangeHandler(value: string, name: string) {
        setPostForm((prevState) => {
            return {
                ...prevState,
                [name]: value
            };
        });
    }

    async function sendPostProps() {
        if (validationResult.success) {
            const result = await insertPost(postForm);
            if (result.success) {
                replace(`/post/${result.id}`);
            } else {
                alertBox.show(result.error);
            }
        } else {
            const message = Object.values(errorForm)
                .map((msg) => `· ${msg}`)
                .flat(1)
                .join('\r\n');
            alertBox.show(message);
        }
    }
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex justify-between md:col-span-2">
                <Link
                    href={`/post`}
                    className="min-w-[120px] transform rounded-lg border-2 border-gray-200 bg-transparent px-6 py-2 font-bold transition duration-400 hover:-translate-y-1"
                >
                    ← Back
                </Link>
                <div className="flex gap-x-3">
                    <Button className="rounded-md bg-blue-500 hover:ring-blue-500" onClick={sendPostProps}>
                        Save
                    </Button>
                </div>
            </div>
            <div className="md:col-span-2">
                <Separator />
            </div>
            <div className="md:col-span-2">
                <FallbackImage src={postForm.imageSrc} />
            </div>
            <div className="md:col-span-2">
                <Separator />
            </div>
            <div>
                <FloatingLabel disabled variant="outlined" label="ID" value={postForm.id} />
            </div>
            <div>
                <Select value={postForm.category || ''} name="category" onValueChange={stateChangeHandler as any}>
                    <SelectTrigger
                        className={clsx('peer w-full appearance-none rounded-lg border border-gray-300 bg-transparent py-5.5', {
                            'border-red-600': errorForm.category
                        })}
                    >
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
            </div>
            <div>
                <FloatingLabel
                    variant="outlined"
                    name="title"
                    label="Title"
                    value={postForm.title || ''}
                    onChange={inputChangeHandler}
                    className={clsx({
                        'border-red-600': errorForm.title
                    })}
                />
            </div>
            <div>
                <FloatingLabel
                    variant="outlined"
                    name="author"
                    label="Author"
                    value={postForm.author || ''}
                    onChange={inputChangeHandler}
                    className={clsx({
                        'border-red-600': errorForm.author
                    })}
                />
            </div>
            <div className="md:col-span-2">
                <FloatingLabel
                    variant="outlined"
                    name="summary"
                    label="Summary"
                    value={postForm.summary || ''}
                    onChange={inputChangeHandler}
                    className={clsx({
                        'border-red-600': errorForm.summary
                    })}
                />
            </div>
            <div className="md:col-span-2">
                <FloatingLabel
                    variant="outlined"
                    name="content"
                    label="content"
                    value={postForm.content || ''}
                    onChange={inputChangeHandler}
                    className={clsx({
                        'border-red-600': errorForm.content
                    })}
                />
            </div>
            <div className="md:col-span-2">
                <FloatingLabel
                    variant="outlined"
                    name="imageSrc"
                    label="Image-URL"
                    value={postForm.imageSrc || ''}
                    onChange={inputChangeHandler}
                    onKeyDown={(e: React.KeyboardEvent) => {
                        if (e.key === ' ') e.preventDefault();
                    }}
                    onPaste={(e: React.ClipboardEvent) => {
                        e.preventDefault();
                        const noSpace = e.clipboardData.getData('text').replace(/\s+/gu, '');
                        stateChangeHandler(noSpace, (e.target as HTMLInputElement).name);
                    }}
                />
            </div>
            {(errorForm.category || errorForm.author || errorForm.title || errorForm.summary || errorForm.content) && (
                <>
                    <div className="md:col-span-2">
                        <Separator />
                    </div>
                    <div className="md:col-span-2">
                        <Alert variant="destructive" className="border-red-500">
                            <AlertCircleIcon />
                            <AlertTitle>The required rules for saving were not followed.</AlertTitle>
                            <AlertDescription>
                                <ul className="list-inside list-disc text-sm">
                                    {(Object.keys(errorForm) as Array<keyof typeof errorForm>).map((key) => {
                                        return errorForm[key] ? <li key={key}>{errorForm[key]}</li> : null;
                                    })}
                                </ul>
                            </AlertDescription>
                        </Alert>
                    </div>
                </>
            )}
        </div>
    );
}
