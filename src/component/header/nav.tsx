'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Info, LogIn, LogOut } from 'lucide-react';

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
import { httpLogout } from '@/lib/login-module';
import { alertBox } from '@/lib/alert-store';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger
} from '@/component/elements/dropdown-menu';

export function MenuNavbar() {
    const { push } = useRouter();
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const user = userStore((state) => state.user);
    const logout = userStore((state) => state.logout);

    if (user === undefined) return null;

    async function logoutProcess() {
        const result = await httpLogout();
        if (result.status !== 200) {
            alertBox.show(result.message);
        }
        logout();
        push(pathname);
    }

    const navItems = [
        {
            name: 'Post',
            link: '/post'
        },
        {
            name: 'Data',
            link: '/data'
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

    return (
        <div className="relative w-full">
            <Navbar>
                {/* Desktop Navigation */}
                <NavBody>
                    <NavbarLogo />
                    <NavItems items={navItems} />
                    <div className="flex items-center gap-4">
                        {user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="focus:outline-none">
                                        <AnimatedTooltip
                                            items={[
                                                {
                                                    id: user.id,
                                                    name: user.name,
                                                    designation: '',
                                                    image: user.picture || ''
                                                }
                                            ]}
                                            className="z-10 cursor-pointer"
                                        />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="start">
                                    <DropdownMenuLabel className="font-bold">My Profile</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem className="cursor-pointer" asChild>
                                            <Link href="/user">
                                                Profile
                                                <DropdownMenuShortcut>
                                                    <Info />
                                                </DropdownMenuShortcut>
                                            </Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="cursor-pointer" onClick={logoutProcess}>
                                        Log out
                                        <DropdownMenuShortcut>
                                            <LogOut />
                                        </DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <NavbarButton variant="primary" href="/login">
                                <LogIn className="hover:text-blue-500" />
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
                            {user ? (
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
