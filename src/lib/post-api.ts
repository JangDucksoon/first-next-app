'use server';

import { postType } from '@/type/post/postType';

export async function getAllPosts(term: string): Promise<postType[]> {
    const response = await fetch(`http://localhost:3000/api/posts?term=${term}`, { cache: 'no-store' });
    if (!response.ok) {
        throw new Error('Failed to fetch posts');
    }
    return response.json();
}

export async function getPost(id: number): Promise<postType> {
    const response = await fetch(`http://localhost:3000/api/posts/${id}`, { cache: 'no-store' });
    return response.json();
}

export async function insertPost(post: postType) {
    const result = await fetch('http://localhost:3000/api/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ payload: post })
    });

    return result.json();
}

export async function updatePost(post: postType) {
    const result = await fetch(`http://localhost:3000/api/posts/${post.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ payload: post })
    });
    return result.json();
}

export async function deletePost(id: number) {
    const result = await fetch(`http://localhost:3000/api/posts/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return result.json();
}
