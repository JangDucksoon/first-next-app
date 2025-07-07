'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { FloatingLabel } from 'flowbite-react';
import { AlertCircleIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { LoginType } from '@/type/login/loginType';
import { Alert, AlertDescription, AlertTitle } from '@/component/elements/alert';
import { alertBox } from '@/lib/alert-store';
import { httpLogin } from '@/lib/user-module';
import { userStore } from '@/lib/user-store';

export default function SigninForm() {
    const [loginForm, setLoginForm] = useState<LoginType>({ id: '', password: '' });
    const [firstRender, setFirstRender] = useState(true);
    const { push } = useRouter();
    const validateResult = loginSchema.safeParse(loginForm);
    const errorForm = validateResult.success ? {} : validateResult.error.flatten().fieldErrors;
    const errorArray: Array<string> = validateResult.success ? [] : Object.values(errorForm).flat(1);

    //스토어 함수 구독
    const setUser = userStore((state) => state.setUser);

    function stateChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        const name = e.target.name;
        const value = e.target.value;

        setLoginForm({ ...loginForm, [name]: value });
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (firstRender) {
            setFirstRender(false);
        }

        if (validateResult.success) {
            const result = await httpLogin(loginForm);
            if (result.message) {
                alertBox.show(result.message);
                return;
            }

            if (!result.picture) {
                result.picture = '/images/default-user.png';
            }

            setUser(result);
            push('/');
        } else {
            const message = errorArray.map((err) => `· ${err}`).join('\r\n');
            alertBox.show(message);
        }
    }

    return (
        <div className="shadow-input mx-auto w-full rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
            <h2 className="flex gap-x-2 text-xl font-bold text-neutral-800 dark:text-neutral-200">
                <Image src="/images/logo.png" width={30} height={30} alt="logo" /> Welcome to Next App
            </h2>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300"></p>

            <form className="my-8" onSubmit={handleSubmit}>
                <LabelInputContainer className="mb-4">
                    <FloatingLabel
                        variant="outlined"
                        label="Email Adress"
                        name="id"
                        value={loginForm.id}
                        onChange={stateChangeHandler}
                        className={!firstRender && errorForm.id ? 'border-red-500' : ''}
                    />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <FloatingLabel
                        variant="outlined"
                        label="password"
                        name="password"
                        type="password"
                        value={loginForm.password}
                        onChange={stateChangeHandler}
                        className={!firstRender && errorForm.password ? 'border-red-500' : ''}
                    />
                </LabelInputContainer>

                <button type="submit" className="relative w-full cursor-pointer p-[3px]">
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-yellow-500 to-green-500" />
                    <div className="group relative rounded-[6px] bg-gray-500 px-8 py-2 text-white transition duration-200 hover:bg-transparent">
                        Sign in &rarr;
                    </div>
                </button>

                <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
            </form>

            {errorArray.length > 0 && !firstRender && (
                <div>
                    <Alert variant="destructive" className="border-red-500">
                        <AlertCircleIcon />
                        <AlertTitle>The required rules for login were not followed.</AlertTitle>
                        <AlertDescription>
                            <ul className="list-inside list-disc text-sm">
                                {errorArray.map((message) => (
                                    <li key={message}>{message}</li>
                                ))}
                            </ul>
                        </AlertDescription>
                    </Alert>
                </div>
            )}
        </div>
    );
}

const LabelInputContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return <div className={cn('flex w-full flex-col space-y-2', className)}>{children}</div>;
};

const loginSchema = z.object({
    id: z.string().min(1, 'Email Address is required').email('This is not a email format'),
    password: z.string().min(1, 'Password is required')
});
