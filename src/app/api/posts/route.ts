'use server';

import { NextRequest, NextResponse } from 'next/server';

import { PostType } from '@/type/post/postType';
import { httpGet, httpPost } from '@/lib/api-module';

export async function GET(nextRequest: NextRequest) {
    const posts = await httpGet<Array<PostType>>('/post');
    const term = nextRequest.nextUrl.searchParams.get('term');
    const list = term
        ? posts.filter((data) => data.title?.toUpperCase().includes(term.toUpperCase()) || data.content?.toUpperCase().includes(term.toUpperCase()))
        : posts;
    return NextResponse.json(list);
}

export async function POST(nextRequest: NextRequest) {
    const { payload } = await nextRequest.json();

    const newData = await httpPost<PostType>('/post', payload);
    return NextResponse.json({ success: true, id: newData.id });
}
