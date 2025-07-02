'use server';

import * as fs from 'fs/promises';

import { postType } from '@/type/post/postType';

export async function getPost(id: number): Promise<postType> {
    const response = await fetch('http://localhost:3000/data/card_posts.json');
    const list = await response.json();

    const post = list.find((posts) => posts.id === id) || {};
    return { ...post };
}

export async function updatePost(post: postType) {
    const raw = await fs.readFile('public/data/card_posts.json', 'utf-8');
    const list: postType[] = JSON.parse(raw);

    const newList = list.map((row) => (row.id === post.id ? { ...row, ...post } : { ...row }));
    await fs.writeFile('public/data/card_posts.json', JSON.stringify(newList), 'utf-8');
}
