import { NextRequest, NextResponse } from 'next/server';
import axios, { AxiosHeaders } from 'axios';

import { BASE_URL } from './lib/env';

export async function middleware(request: NextRequest) {
    const fromUrl = request.nextUrl.pathname + request.nextUrl.search;
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', fromUrl);

    const cookiesStore = request.cookies;
    const cookieHeader = cookiesStore
        .getAll()
        .map(({ name, value }: { name: string; value: string }) => `${name}=${value}`)
        .join('; ');
    const axiosHeaders = new AxiosHeaders();
    axiosHeaders.set('Cookie', cookieHeader);
    const accessToken = cookiesStore.get('Authentication');
    const refreshToken = cookiesStore.get('Refresh');

    if (fromUrl.startsWith('/login')) {
        const response = NextResponse.next();
        cookiesStore.getAll().forEach((c) => {
            response.cookies.delete(c.name);
        });
        return response;
    }

    if (cookiesStore.getAll().length === 0) {
        return NextResponse.redirect(loginUrl);
    }

    if (accessToken) {
        let tokenStatus: number;
        try {
            const apiResponse = await axios.get(`${BASE_URL}/api/token`, { headers: axiosHeaders });
            tokenStatus = apiResponse.status;
        } catch (error: any) {
            tokenStatus = error.response?.status || 401;
        }
        if (tokenStatus === 200) {
            return NextResponse.next();
        } else if (tokenStatus === 403 || tokenStatus === 400) {
            return NextResponse.redirect(loginUrl);
        }
    }

    if (refreshToken) {
        let newCookies: Array<string | undefined> | string | undefined = [];
        let refreshStatus: number;

        try {
            const authResponse = await axios.post(`${BASE_URL}/api/token`, {}, { headers: axiosHeaders });
            newCookies = authResponse.headers['set-cookie'];
            refreshStatus = authResponse.status;
        } catch (error: any) {
            newCookies = [];
            refreshStatus = error.response?.status;
        }

        let nextResponse: NextResponse<unknown> | undefined;

        if (refreshStatus === 200) {
            nextResponse = NextResponse.redirect(new URL(fromUrl, request.url));
        } else {
            nextResponse = NextResponse.redirect(loginUrl);
        }

        let cookiesArr = [];
        if (!Array.isArray(newCookies)) {
            cookiesArr = [newCookies];
        } else {
            cookiesArr = newCookies;
        }

        cookiesArr.forEach((c) => {
            nextResponse.headers.append('Set-Cookie', c!);
        });

        return nextResponse;
    }

    return NextResponse.redirect(loginUrl);
}

export const config = {
    matcher: ['/data/:path*', '/user/:path*', '/dashboard/:path*', '/:path*/create', '/:path*/modify', '/login']
};
