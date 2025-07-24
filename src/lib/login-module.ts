'use client';

import axios from 'axios';

import { BASE_URL } from './env';

export async function httpLogin(payload: any) {
    try {
        const response = await axios.post(`${BASE_URL}/api/login`, { payload });
        return response.data;
    } catch (error: any) {
        return { message: error.response?.data?.message || 'Login failed' };
    }
}

export async function httpLogout() {
    try {
        const response = await axios.post(`${BASE_URL}/api/logout`, {});
        return { message: 'Logout successfully', status: response.status };
    } catch (error: any) {
        return { message: error.response?.data?.message || 'Logout failed' };
    }
}
