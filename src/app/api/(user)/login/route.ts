'use server';

import { NextRequest, NextResponse } from 'next/server';

import { loginIntance } from '@/lib/axios-instance-module';

export async function POST(req: NextRequest) {
    const { payload } = await req.json();

    if (!payload) {
        return NextResponse.json({ error: 'Login Failed' }, { status: 400 });
    }

    try {
        const apiResponse = await loginIntance.post('/login', payload);
        const nextResponse = NextResponse.json(apiResponse.data, { status: 200 });
        const cookies = apiResponse.headers['set-cookie'] || [];

        cookies.forEach((c) => {
            nextResponse.headers.append('Set-Cookie', c);
        });

        return nextResponse;
    } catch (error) {
        console.error('API Login Error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
