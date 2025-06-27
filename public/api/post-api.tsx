'use server';

import { postType } from '@/type/post/postType';

export async function getPost(id: number): Promise<postType> {
    const response = await fetch('http://localhost:3000/data/card_posts.json');
    const list = await response.json();

    const post = list.find((posts) => posts.id === id) || {};
    return { ...post };
}
