'use server';

import { AxiosHeaders } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

import { loginIntance } from '@/lib/axios-instance-module';

export async function GET(req: NextRequest) {
    const url = `/user/token-user`;

    const cookiesStore = req.cookies;
    const cookieHeader = cookiesStore
        .getAll()
        .map(({ name, value }) => `${name}=${value}`)
        .join('; ');

    const axiosHeaders = new AxiosHeaders();
    axiosHeaders.set('Cookie', cookieHeader);

    try {
        const apiResponse = await loginIntance.get(url, { headers: axiosHeaders });
        return NextResponse.json(apiResponse.data, { status: 200 });
    } catch (error) {
        return NextResponse.json(null, { status: 200 });
    }
}
