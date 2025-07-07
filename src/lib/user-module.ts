'use server';

import { cookies } from 'next/headers';

const API_BASE_URL = 'http://localhost:8011/api';

function parseSetCookieHeader(setCookieString: string) {
    const parts = setCookieString.split(';');
    const [name, value] = parts[0].split('=');
    const options: { [key: string]: any } = {};

    for (let i = 1; i < parts.length; i++) {
        const part = parts[i].trim();
        const [key, val] = part.split('=');
        const lowerKey = key.toLowerCase();

        if (lowerKey === 'httponly') options.httpOnly = true;
        else if (lowerKey === 'secure') options.secure = true;
        else if (lowerKey === 'path') options.path = val || '/';
        else if (lowerKey === 'domain') options.domain = val;
        else if (lowerKey === 'expires') options.expires = new Date(val);
        else if (lowerKey === 'maxage') options.maxAge = parseInt(val, 10);
        else if (lowerKey === 'samesite') options.sameSite = val.toLowerCase() as 'lax' | 'strict' | 'none';
    }
    return { name, value, options };
}

async function authRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
    const cookiesStore = await cookies(); // cookies()를 await 전에 호출하여 컨텍스트 캡처

    const url = `${API_BASE_URL}${path}`;

    const headers = new Headers({
        'Content-Type': 'application/json'
    });

    if (options.headers) {
        const customHeaders = new Headers(options.headers);
        customHeaders.forEach((value, key) => {
            headers.append(key, value);
        });
    }

    const config: RequestInit = {
        ...options,
        headers: headers,
        credentials: 'include'
    };

    if ((config.method === 'POST' || config.method === 'PUT') && typeof config.body === 'object' && config.body !== null) {
        config.body = JSON.stringify(config.body);
    }

    try {
        const response = await fetch(url, config);

        const setCookieHeaders = response.headers.getSetCookie();

        if (setCookieHeaders && setCookieHeaders.length > 0) {
            setCookieHeaders.forEach((cookieString) => {
                const { name, value, options: cookieOptions } = parseSetCookieHeader(cookieString);
                try {
                    cookiesStore.set(name, value, cookieOptions);
                } catch (e) {
                    throw new Error(`Failed to set cookie ${name}:${e}`);
                }
            });

            if (response.status === 204) {
                return null as T;
            }

            return (await response.json()) as T;
        } else {
            cookiesStore.delete('Authentication');
            cookiesStore.delete('Refresh');
            return null as T;
        }
    } catch (error) {
        console.error('API Client Error:', error);
        throw error;
    }
}

export async function httpLogin<T>(payload: any, options?: RequestInit): Promise<T> {
    return authRequest<T>('/login', { ...options, method: 'POST', body: payload });
}

export async function httpLogout<T>(options?: RequestInit): Promise<T> {
    return authRequest<T>('/logout', { ...options, method: 'POST' });
}
