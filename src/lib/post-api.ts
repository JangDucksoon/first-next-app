'use server';

import { cookies } from 'next/headers';

import { BASE_URL } from './env';

import { PostType } from '@/type/post/postType';

export async function getAllPosts(term: string): Promise<PostType[]> {
    const response = await fetch(`${BASE_URL}/api/posts?term=${term}`, { cache: 'no-store', headers: await getCookieHeader(), method: 'GET' });
    if (!response.ok) {
        throw new Error('Failed to fetch posts');
    }
    return response.json();
}

export async function getPost(id: string): Promise<PostType> {
    const response = await fetch(`${BASE_URL}/api/posts/${id}`, { cache: 'no-store', headers: await getCookieHeader(), method: 'GET' });
    return response.json();
}

export async function insertPost(post: PostType) {
    const result = await fetch(`${BASE_URL}/api/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(await getCookieHeader())
        },
        body: JSON.stringify({ payload: post })
    });

    return result.json();
}

export async function updatePost(post: PostType) {
    const result = await fetch(`${BASE_URL}/api/posts/${post.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            ...(await getCookieHeader())
        },
        body: JSON.stringify({ payload: post })
    });
    return result.json();
}

export async function deletePost(id: string) {
    const result = await fetch(`${BASE_URL}/api/posts/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            ...(await getCookieHeader())
        }
    });

    return result.json();
}

async function getCookieHeader() {
    const cookiesStore = await cookies();
    const cookieHeader = cookiesStore
        .getAll()
        .map(({ name, value }: { name: string; value: string }) => `${name}=${value}`)
        .join('; ');

    return {
        Cookie: cookieHeader
    };
}
