import { create } from 'zustand';

import { UserType } from '@/type/login/loginType';

type AuthState = {
    user?: UserType | null;
    setUser: (user: UserType | null) => void;
    logout: () => void;
};

export const userStore = create<AuthState>((set) => ({
    user: undefined,
    setUser: (user) => set({ user }),
    logout: () => set({ user: null })
}));
