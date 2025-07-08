'use client';

import { useEffect } from 'react';

import { UserType } from '@/type/login/loginType';
import { httpGet } from '@/lib/api-module';
import { userStore } from '@/lib/user-store';

export default function InitUser() {
    /*const setUser = userStore((state) => state.setUser);

    useEffect(() => {
        async function getUser() {
            const user: UserType = await httpGet('/user/token-user');

            if (user) {
                if (!user.picture) {
                    user.picture = '/images/default-user.png';
                }
                setUser({ ...user, isAuthenticated: true });
            } else {
                setUser({ user: null, isAuthenticated: false });
            }
        }

        getUser();
    }, [setUser]);*/
    return null;
}
