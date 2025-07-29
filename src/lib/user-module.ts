'use server';

import { cookies } from 'next/headers';
import axios, { AxiosHeaders } from 'axios';

import { BASE_URL } from './env';

import { UserType } from '@/type/login/loginType';

export async function getUserStatus(): Promise<UserType | null> {
    const cookiesStore = await cookies();
    const cookieHeader = cookiesStore
        .getAll()
        .map(({ name, value }: { name: string; value: string }) => `${name}=${value}`)
        .join('; ');

    const axiosHeaders = new AxiosHeaders();
    axiosHeaders.set('Cookie', cookieHeader);

    try {
        const response = await axios.get(`${BASE_URL}/api/status`, { headers: axiosHeaders });
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}
