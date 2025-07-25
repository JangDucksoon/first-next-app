'use server';

import { cookies } from 'next/headers';
import { AxiosHeaders } from 'axios';

import apiInstance from './axios-instance-module';

async function request<T>(path: string, options: RequestInit = {}, payload?: any): Promise<T> {
    const cookiesStore = await cookies();
    const cookieHeader = cookiesStore
        .getAll()
        .map(({ name, value }: { name: string; value: string }) => `${name}=${value}`)
        .join('; ');

    const axiosHeaders = new AxiosHeaders();

    if (options.headers) {
        if (options.headers instanceof Headers) {
            options.headers.forEach((value, key) => {
                axiosHeaders.set(key, value);
            });
        } else if (Array.isArray(options.headers)) {
            options.headers.forEach(([key, value]) => {
                axiosHeaders.set(key, value);
            });
        } else {
            for (const key in options.headers) {
                if (Object.prototype.hasOwnProperty.call(options.headers, key)) {
                    axiosHeaders.set(key, (options.headers as Record<string, string>)[key]);
                }
            }
        }
    }
    axiosHeaders.set('Cookie', cookieHeader);
    let response;
    switch (options.method) {
        case 'GET':
            response = await apiInstance.get<T>(path, { headers: axiosHeaders, params: payload });
            break;
        case 'POST':
            response = await apiInstance.post<T>(path, payload, { headers: axiosHeaders });
            break;
        case 'PUT':
            response = await apiInstance.put<T>(path, payload, { headers: axiosHeaders });
            break;
        case 'DELETE':
            response = await apiInstance.delete<T>(path, { headers: axiosHeaders, params: payload });
            break;
    }

    return (response?.data || null) as T;
}

export async function httpGet<T>(path: string, payload?: any, options?: RequestInit): Promise<T> {
    try {
        return await request<T>(path, { ...options, method: 'GET' }, payload);
    } catch (error) {
        return { message: 'Internal Server Error', status: 500 } as T;
    }
}

export async function httpPost<T>(path: string, payload: any, options?: RequestInit): Promise<T> {
    try {
        return await request<T>(path, { ...options, method: 'POST' }, payload);
    } catch (error) {
        return { message: 'Internal Server Error', status: 500 } as T;
    }
}

export async function httpPut<T>(path: string, payload: any, options?: RequestInit): Promise<T> {
    try {
        return await request<T>(path, { ...options, method: 'PUT' }, payload);
    } catch (error) {
        return { message: 'Internal Server Error', status: 500 } as T;
    }
}

export async function httpDelete<T>(path: string, payload?: any, options?: RequestInit): Promise<T> {
    try {
        return await request<T>(path, { ...options, method: 'DELETE' }, payload);
    } catch (error) {
        return { message: 'Internal Server Error', status: 500 } as T;
    }
}
