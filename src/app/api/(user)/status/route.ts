'use server';

import { NextRequest, NextResponse } from 'next/server';

const API_URL = 'http://localhost:8011/api';
export async function GET(nextRequest: NextRequest) {
    const url = `${API_URL}/user/token-user`;

    const headers = new Headers({
        'Content-Type': 'application/json',
        Cookie: nextRequest.headers.get('Cookie')
    });

    const config = {
        method: 'GET',
        headers: headers
    };

    try {
        const apiResponse = await fetch(url, config);

        if (!apiResponse.ok) {
            return NextResponse.json(null, { status: apiResponse.status });
        }
        return NextResponse.json(await apiResponse.json(), { status: 200 });
    } catch (error) {
        return NextResponse.json(null, { status: 401 });
    }
}
