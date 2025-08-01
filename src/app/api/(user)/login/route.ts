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
    } catch (error: any) {
        return NextResponse.json({ message: error.meesage }, { status: 500 });
    }
}
