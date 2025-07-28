import { AxiosHeaders } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

import { loginIntance } from '@/lib/axios-instance-module';

export async function GET(req: NextRequest) {
    const url = `/user/access-token`;
    const cookiesStore = req.cookies;
    const cookieHeader = cookiesStore
        .getAll()
        .map(({ name, value }) => `${name}=${value}`)
        .join('; ');

    const axiosHeaders = new AxiosHeaders();
    axiosHeaders.set('Cookie', cookieHeader);

    try {
        const apiResponse = await loginIntance.get(url, { headers: axiosHeaders });
        return NextResponse.json(apiResponse.data, { status: apiResponse.status });
    } catch (error: any) {
        console.error('API /api/token: Error calling Mock Auth Server:', error.message);
        console.error('API /api/token: Axios Error Response:', error.response?.data);
        console.error('API /api/token: Axios Error Status:', error.response?.status);
        return NextResponse.json(null, { status: error.response?.status || 400 });
    }
}

export async function POST(req: NextRequest) {
    const url = `/user/refresh-token`;

    const cookiesStore = req.cookies;
    const cookieHeader = cookiesStore
        .getAll()
        .map(({ name, value }) => `${name}=${value}`)
        .join('; ');

    const axiosHeaders = new AxiosHeaders();
    axiosHeaders.set('Cookie', cookieHeader);

    try {
        const apiResponse = await loginIntance.post(url, {}, { headers: axiosHeaders });
        const nextResponse = NextResponse.json(apiResponse.data, { status: apiResponse.status });
        const cookies = apiResponse.headers['set-cookie'] || [];

        cookies.forEach((c) => {
            nextResponse.headers.append('Set-Cookie', c);
        });
        return nextResponse;
    } catch (error: any) {
        console.error('API /api/token: Error calling Mock Auth Server:', error.message);
        console.error('API /api/token: Axios Error Response:', error.response?.data);
        console.error('API /api/token: Axios Error Status:', error.response?.status);
        return NextResponse.json(null, { status: error.response?.status || 400 });
    }
}
