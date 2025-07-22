import { cookies } from 'next/headers';
import axios, { AxiosHeaders } from 'axios';

import { UserType } from '@/type/login/loginType';

export async function getUserStatus(): Promise<UserType> {
    const cookiesStore = await cookies();
    const cookieHeader = cookiesStore
        .getAll()
        .map(({ name, value }) => `${name}=${value}`)
        .join('; ');

    const axiosHeaders = new AxiosHeaders();
    axiosHeaders.set('Cookie', cookieHeader);

    try {
        const response = await axios.get('http://localhost:3000/api/status', { headers: axiosHeaders });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
