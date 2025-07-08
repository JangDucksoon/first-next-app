'use server';

import { NextRequest, NextResponse } from 'next/server';

const API_URL = 'http://127.0.0.1:8011/api';
export async function POST(req: NextRequest) {
    const url = `${API_URL}/login`;
    const { payload } = await req.json();

    if (!payload) {
        return NextResponse.json({ error: 'Login Failed' }, { status: 400 });
    }

    const headers = new Headers({
        'Content-Type': 'application/json'
    });

    const config: RequestInit = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload)
    };

    try {
        const apiResponse = await fetch(url, config);
        const nextResponse = NextResponse.json(await apiResponse.json(), { status: 200 });

        apiResponse.headers.forEach((value, key) => {
            if (key.toLowerCase() === 'set-cookie') {
                nextResponse.headers.append(key, value);
            }
        });
        return nextResponse;
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
