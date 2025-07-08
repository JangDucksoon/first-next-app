'use client';

export async function httpLogin(payload: any) {
    const result = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ payload })
    });

    return await result.json();
}

export async function httpLogout() {
    const result = await fetch('http://localhost:3000/api/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    });
    return await result.json();
}

export async function httpUser() {
    const result = await fetch('http://localhost:3000/api/status', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });

    return await result.json();
}
