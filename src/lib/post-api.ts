'use server';

import { postType } from '@/type/post/postType';

// 모든 게시물 가져오기 (기존 getPost는 단일 게시물이었으나, API 라우트가 전체 목록을 반환하므로 이름 변경)
export async function getAllPosts(term: string): Promise<postType[]> {
    const response = await fetch(`http://localhost:3000/api/posts?term=${term}`, { cache: 'no-store' });
    if (!response.ok) {
        throw new Error('Failed to fetch posts');
    }
    return response.json();
}

// 단일 게시물 가져오기
export async function getPost(id: number): Promise<postType> {
    const response = await fetch(`http://localhost:3000/api/posts/${id}`, { cache: 'no-store' });
    return response.json();
}

// 게시물 업데이트
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

// 게시물 삭제
export async function deletePost(id: number) {
    const result = await fetch(`http://localhost:3000/api/posts/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return result.json();
}
