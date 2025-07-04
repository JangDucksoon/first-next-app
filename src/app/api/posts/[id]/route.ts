'use server';

import path from 'path';
import { promises as fs } from 'fs';

import { NextRequest, NextResponse } from 'next/server';

import { PostType } from '@/type/post/PostType';
import { format } from 'date-fns';

const jsonPath = path.resolve('./src/data/card_posts.json');

async function readPosts(): Promise<PostType[]> {
    const fileContents = await fs.readFile(jsonPath, 'utf8');
    return JSON.parse(fileContents);
}

async function writePosts(posts: PostType[]) {
    await fs.writeFile(jsonPath, JSON.stringify(posts, null, 2), 'utf8');
}

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const posts = await readPosts();
    const id = (await params).id;
    const postDetail = posts.find((post) => post.id === Number(id));
    return NextResponse.json(postDetail || {});
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { payload } = await req.json();
    const id = (await params).id;

    if (!Number(id)) {
        return NextResponse.json({ error: 'Update Failed' }, { status: 400 });
    }

    const createdAt = format(new Date(), 'yyyy-MM-dd');
    const posts = (await readPosts()).map((p) => (p.id === payload.id ? { ...p, ...payload, createdAt } : p));
    await writePosts(posts);
    return NextResponse.json({ success: true });
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const posts = await readPosts();
    const id = (await params).id;

    const postFilter = posts.filter((p) => p.id !== Number(id));
    await writePosts(postFilter);
    return NextResponse.json({ success: true });
}
