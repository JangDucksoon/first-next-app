'use server';

import { NextRequest, NextResponse } from 'next/server';

import { loginIntance } from '@/lib/axios-instance-module';

export async function POST(req: NextRequest) {
    try {
        const apiResponse = await loginIntance.post('/logout', {});
        const nextResponse = NextResponse.json({}, { status: apiResponse.status });
        const responseCookie = req.cookies.getAll();
        responseCookie.forEach(({ name }) => {
            nextResponse.cookies.delete(name);
        });

        return nextResponse;
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
