'use client';
import React, { useState } from 'react';
import Link from 'next/link';

import { useRouter } from 'next/navigation';
import {
    Navbar,
    NavBody,
    NavItems,
    MobileNav,
    NavbarLogo,
    NavbarButton,
    MobileNavHeader,
    MobileNavToggle,
    MobileNavMenu
} from '@/component/elements/resizable-navbar';
import { userStore } from '@/lib/user-store';
import { AnimatedTooltip } from '@/component/elements/animated-tooltip';
import { httpLogout } from '@/lib/user-module';

export function MenuNavbar() {
    const isLogin = userStore((state) => state.isAuthenticated);
    const user = userStore((state) => state.user);
    const logout = userStore((state) => state.logout);
    const { push } = useRouter();

    async function logoutProcess() {
        await httpLogout();
        logout();
        push('/');
    }

    const navItems = [
        {
            name: 'Post',
            link: '/post'
        },
        {
            name: 'Category',
            link: '/category'
        },
        {
            name: 'Dashboard',
            link: '/dashboard'
        },
        {
            name: 'Settings',
            link: '/settings'
        },
        {
            name: 'Help',
            link: '/help'
        }
    ];

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="relative w-full">
            <Navbar>
                {/* Desktop Navigation */}
                <NavBody>
                    <NavbarLogo />
                    <NavItems items={navItems} />
                    <div className="flex items-center gap-4">
                        {isLogin ? (
                            <AnimatedTooltip
                                items={[
                                    {
                                        id: user.id,
                                        name: user.name,
                                        designation: user.orgnztNm,
                                        image: user.picture
                                    }
                                ]}
                                className="cursor-pointer"
                                onClick={logoutProcess}
                            />
                        ) : (
                            <NavbarButton variant="primary" href="/login">
                                Login
                            </NavbarButton>
                        )}
                    </div>
                </NavBody>

                {/* Mobile Navigation */}
                <MobileNav>
                    <MobileNavHeader>
                        <NavbarLogo />
                        <MobileNavToggle isOpen={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
                    </MobileNavHeader>

                    <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
                        {navItems.map((item, idx) => (
                            <Link
                                key={`mobile-link-${idx}`}
                                href={item.link}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="relative text-neutral-600 dark:text-neutral-300"
                            >
                                <span className="block">{item.name}</span>
                            </Link>
                        ))}
                        <div className="flex w-full flex-col gap-4">
                            {isLogin ? (
                                <div>{user.name}</div>
                            ) : (
                                <NavbarButton href="/login" onClick={() => setIsMobileMenuOpen(false)} variant="primary" className="w-auto">
                                    Login
                                </NavbarButton>
                            )}
                        </div>
                    </MobileNavMenu>
                </MobileNav>
            </Navbar>
        </div>
    );
}
