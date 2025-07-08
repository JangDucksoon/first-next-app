'use server';

import { cookies } from 'next/headers';

const API_BASE_URL = 'http://localhost:8011/api';

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${path}`;
    const cookiesStore = await cookies();
    const cookieHeader = cookiesStore
        .getAll()
        .map(({ name, value }) => `${name}=${value}`)
        .join('; ');

    const headers = new Headers({
        'Content-Type': 'application/json',
        ...(cookieHeader ? { Cookie: cookieHeader } : {})
    });

    if (options.headers) {
        const customHeaders = new Headers(options.headers);
        customHeaders.forEach((value, key) => {
            headers.append(key, value);
        });
    }

    const config: RequestInit = {
        ...options,
        headers: headers
    };

    if ((config.method === 'POST' || config.method === 'PUT') && typeof config.body === 'object' && config.body !== null) {
        config.body = JSON.stringify(config.body);
    }

    try {
        const response = await fetch(url, config);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: response.statusText }));
            throw new Error(`API Error: ${response.status} - ${errorData.message || 'An unknown error occurred'}`);
        }

        if (response.status === 204) {
            return null as T;
        }

        return (await response.json()) as T;
    } catch (error) {
        console.error('API Client Error:', error);
        throw error;
    }
}

export async function httpGet<T>(path: string, options?: RequestInit): Promise<T> {
    return request<T>(path, { ...options, method: 'GET' });
}

export async function httpPost<T>(path: string, payload: any, options?: RequestInit): Promise<T> {
    return request<T>(path, { ...options, method: 'POST', body: payload });
}

export async function httpPut<T>(path: string, payload: any, options?: RequestInit): Promise<T> {
    return request<T>(path, { ...options, method: 'PUT', body: payload });
}

export async function httpDelete<T>(path: string, options?: RequestInit): Promise<T> {
    return request<T>(path, { ...options, method: 'DELETE' });
}
