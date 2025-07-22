'use client';

import { useEffect } from 'react';

import { userStore } from '@/lib/user-store';
import { UserType } from '@/type/login/loginType';

export default function InitUser({ user }: { user: UserType | null }) {
    const setUser = userStore((state) => state.setUser);

    useEffect(() => {
        setUser(user);
    }, [setUser, user]);

    return null;
}
