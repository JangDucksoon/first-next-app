'use client';

import { useEffect } from 'react';

import { userStore } from '@/lib/user-store';
import { UserType } from '@/type/login/loginType';
import { usePathname } from 'next/navigation';
import { getUserStatus } from '@/lib/user-module';

export default function InitUser() {
    const setUser = userStore((state) => state.setUser);
    const user = userStore((state) => state.user);
    const pathname = usePathname();

    useEffect(() => {
        function isRefresh() {
            const isRefreshToken = document.cookie.includes('refresh_flag=1');
            document.cookie = 'refresh_flag=; Max-Age=0; Path=/';
            return isRefreshToken;
        }

        async function fetchUser() {
            const user: UserType | null = await getUserStatus();
            if (user) {
                if (!user.picture) {
                    user.picture = '/images/default-user.png';
                }
            }
            setUser(user);
        }

        if (!user || isRefresh()) {
            fetchUser();
        } else if (pathname.startsWith('/login')) {
            setUser(null);
        }
    }, [setUser, pathname]);

    return null;
}
