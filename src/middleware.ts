import { NextRequest, NextResponse } from 'next/server';

import { API_URL } from './lib/env';

export async function middleware(request: NextRequest) {
    const fromUrl = request.nextUrl.pathname + request.nextUrl.search;
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', fromUrl);

    const cookiesStore = request.cookies;
    const cookieHeader = cookiesStore
        .getAll()
        .map(({ name, value }: { name: string; value: string }) => `${name}=${value}`)
        .join('; ');
    const fetchHeader = {
        Cookie: cookieHeader
    };
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
        const apiResponse = await fetch(`${API_URL}/user/access-token`, { method: 'GET', headers: fetchHeader, cache: 'no-store' });
        tokenStatus = apiResponse.status || 401;

        if (tokenStatus === 200) {
            return NextResponse.next();
        } else if (tokenStatus === 403 || tokenStatus === 400) {
            return NextResponse.redirect(loginUrl);
        }
    }

    if (refreshToken) {
        let newCookies: string[] = [];
        let refreshStatus: number;

        const authResponse = await fetch(`${API_URL}/user/refresh-token`, { method: 'POST', headers: fetchHeader, cache: 'no-store' });
        newCookies = authResponse.headers.getSetCookie();
        refreshStatus = authResponse.status;

        let nextResponse: NextResponse<unknown> | undefined;

        if (refreshStatus === 200) {
            nextResponse = NextResponse.redirect(new URL(fromUrl, request.url));
        } else {
            nextResponse = NextResponse.redirect(loginUrl);
        }

        newCookies.forEach((c) => {
            nextResponse.headers.append('Set-Cookie', c!);
        });

        return nextResponse;
    }

    return NextResponse.redirect(loginUrl);
}

export const config = {
    matcher: ['/data/:path*', '/user/:path*', '/dashboard/:path*', '/:path*/create', '/:path*/modify']
};
