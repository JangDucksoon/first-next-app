'use client';

import { useEffect } from 'react';

import { UserType } from '@/type/login/loginType';
import { userStore } from '@/lib/user-store';
import { httpUser } from '@/lib/user-module';

export default function InitUser() {
    const setUser = userStore((state) => state.setUser);

    useEffect(() => {
        async function getUser() {
            const user: UserType = await httpUser();

            if (user) {
                if (!user.picture) {
                    user.picture = '/images/default-user.png';
                }
                setUser({ ...user }, true);
            } else {
                setUser({ user: null }, false);
            }
        }

        getUser();
    }, [setUser]);
    return null;
}
