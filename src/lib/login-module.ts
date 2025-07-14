'use client';

import axios from 'axios';

export async function httpLogin(payload: any) {
    try {
        const response = await axios.post('/api/login', { payload });
        return response.data;
    } catch (error: any) {
        return { message: error.response?.data?.message || 'Login failed' };
    }
}

export async function httpLogout() {
    try {
        const response = await axios.post('/api/logout', {});
        return { message: 'Logout successfully', status: response.status };
    } catch (error: any) {
        return { message: error.response?.data?.message || 'Logout failed' };
    }
}
