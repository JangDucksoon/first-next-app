'use server';

import { NextRequest, NextResponse } from 'next/server';

import { PostType } from '@/type/post/postType';
import { httpDelete, httpGet, httpPut } from '@/lib/api-module';

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    const postDetail = await httpGet<PostType>(`/post/${id}`);
    return NextResponse.json(postDetail || {});
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { payload } = await req.json();
    const id = (await params).id;
    await httpPut(`/post/${id}`, payload);

    return NextResponse.json({ success: true });
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    await httpDelete(`/post/${id}`);
    return NextResponse.json({ success: true });
}
