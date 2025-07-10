'use client';

export async function httpLogin(payload: any) {
    const result = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ payload })
    });

    return result.json();
}

export async function httpLogout() {
    const result = await fetch('/api/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return result.json();
}
