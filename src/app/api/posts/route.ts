'use server';

import path from 'path';
import { promises as fs } from 'fs';

import { NextRequest, NextResponse } from 'next/server';

import { postType } from '@/type/post/postType';

const jsonPath = path.resolve('./src/data/card_posts.json');

async function readPosts(): Promise<postType[]> {
    const fileContents = await fs.readFile(jsonPath, 'utf8');
    return JSON.parse(fileContents);
}

export async function GET(nextRequest: NextRequest) {
    const posts = await readPosts();
    const term = nextRequest.nextUrl.searchParams.get('term');
    const list = term
        ? posts.filter((data) => data.title?.toUpperCase().includes(term.toUpperCase()) || data.content?.toUpperCase().includes(term.toUpperCase()))
        : posts;
    return NextResponse.json(list);
}
