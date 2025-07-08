'use client';

import { useEffect } from 'react';

import { userStore } from '@/lib/user-store';

export default function InitUser({ user }) {
    const setUser = userStore((state) => state.setUser);

    useEffect(() => {
        setUser(user);
    }, [setUser]);

    return null;
}
