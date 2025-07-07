import { create } from 'zustand';

import { UserType } from '@/type/login/loginType';

type AuthState = {
    user: UserType | null;
    isAuthenticated: boolean;
    setUser: (user: UserType | null) => void;
    logout: () => void;
};

export const userStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    setUser: (user) => set({ user, isAuthenticated: true }),
    logout: () => set({ user: null, isAuthenticated: false })
}));
