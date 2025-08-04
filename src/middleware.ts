import { NextRequest, NextResponse } from 'next/server';
import { RequestCookies, ResponseCookies } from 'next/dist/compiled/@edge-runtime/cookies';

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
            nextResponse = NextResponse.next();
        } else {
            nextResponse = NextResponse.redirect(loginUrl);
        }

        newCookies.forEach((c) => {
            nextResponse.headers.append('Set-Cookie', c!);
        });

        applySetCookie(request, nextResponse);
        return nextResponse;
    }

    return NextResponse.redirect(loginUrl);
}

// 쿠키 갱신 요청 헤더 오버라이드
function applySetCookie(req: NextRequest, res: NextResponse): void {
    const setCookies = new ResponseCookies(res.headers);
    const newReqHeaders = new Headers(req.headers);
    const newReqCookies = new RequestCookies(newReqHeaders);

    setCookies.getAll().forEach((cookie) => newReqCookies.set(cookie));

    NextResponse.next({ request: { headers: newReqHeaders } }).headers.forEach((value, key) => {
        if (key === 'x-middleware-override-headers' || key.startsWith('x-middleware-request-')) {
            res.headers.set(key, value);
        }
    });
}

export const config = {
    matcher: ['/data/:path*', '/user/:path*', '/dashboard/:path*', '/:path*/create', '/:path*/modify', '/login']
};
