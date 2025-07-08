'use server';

import { NextRequest, NextResponse } from 'next/server';

const API_URL = 'http://127.0.0.1:8011/api';

export async function POST(req: NextRequest) {
    const url = `${API_URL}/logout`;

    const headers = new Headers({
        'Content-Type': 'application/json',
        Cookie: req.headers.get('Cookie') || ''
    });

    const config: RequestInit = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({})
    };

    try {
        const apiResponse = await fetch(url, config);
        const nextResponse = NextResponse.json({ status: 200 });

        apiResponse.headers.forEach((value, key) => {
            if (key.toLowerCase() === 'set-cookie') {
                nextResponse.headers.append(key, value);
            }
        });

        return nextResponse;
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
