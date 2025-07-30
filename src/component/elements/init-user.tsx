'use client';

import { useEffect } from 'react';

import { userStore } from '@/lib/user-store';
import { UserType } from '@/type/login/loginType';
import { usePathname } from 'next/navigation';
import { getUserStatus } from '@/lib/user-module';

export default function InitUser() {
    const setUser = userStore((state) => state.setUser);
    const pathname = usePathname();

    useEffect(() => {
        async function fetchUser() {
            const user: UserType | null = await getUserStatus();
            if (user) {
                if (!user.picture) {
                    user.picture = '/images/default-user.png';
                }
            }
            setUser(user);
        }

        fetchUser();
    }, [setUser, pathname]);

    return null;
}
