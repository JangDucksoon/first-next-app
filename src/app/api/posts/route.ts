'use server';

import path from 'path';
import { promises as fs } from 'fs';

import { NextRequest, NextResponse } from 'next/server';
import { isNumber } from 'lodash';

import { postType } from '@/type/post/postType';

const jsonPath = path.resolve('./src/data/card_posts.json');

async function readPosts(): Promise<postType[]> {
    const fileContents = await fs.readFile(jsonPath, 'utf8');
    return JSON.parse(fileContents);
}

async function writePosts(posts: postType[]) {
    await fs.writeFile(jsonPath, JSON.stringify(posts, null, 2), 'utf8');
}

export async function GET(nextRequest: NextRequest) {
    const posts = await readPosts();
    const term = nextRequest.nextUrl.searchParams.get('term');
    const list = term
        ? posts.filter((data) => data.title?.toUpperCase().includes(term.toUpperCase()) || data.content?.toUpperCase().includes(term.toUpperCase()))
        : posts;
    return NextResponse.json(list);
}

export async function POST(nextRequest: NextRequest) {
    const { payload } = await nextRequest.json();

    const posts = await readPosts();
    const idArrays = posts.map((post) => post.id || 0);
    const maxId = Math.max(...idArrays);
    const newId = maxId + 1;

    if (!isNumber(newId)) {
        return NextResponse.json({ error: 'Failed to generate ID' }, { status: 500 });
    }

    const newPost = { ...payload, id: newId };
    const newPosts = [...posts, newPost];
    await writePosts(newPosts);

    return NextResponse.json({ success: true, id: newId });
}
