'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { z } from 'zod';
import { AlertCircleIcon } from 'lucide-react';

import { SignupLabel } from '@/component/elements/signup-label';
import { Input } from '@/component/elements/input';
import { cn } from '@/lib/utils';
import { LoginType } from '@/type/login/loginType';
import { Alert, AlertDescription, AlertTitle } from '@/component/elements/alert';
import { alertBox } from '@/lib/alert-store';

export default function SigninForm() {
    const [loginForm, setLoginForm] = useState<LoginType>({ id: '', password: '' });
    const [firstRender, setFirstRender] = useState(true);

    const validateResult = loginSchema.safeParse(loginForm);
    const errorArray: Array<string> = validateResult.success ? [] : Object.values(validateResult.error.flatten().fieldErrors).flat(1);

    function stateChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        const name = e.target.name;
        const value = e.target.value;

        setLoginForm({ ...loginForm, [name]: value });
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (firstRender) {
            setFirstRender(false);
        }

        if (validateResult.success) {
            //todo :: login
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
                    <SignupLabel htmlFor="email">Email Address</SignupLabel>
                    <Input id="email" placeholder="user@nextapp.com" type="text" name="id" value={loginForm.id} onChange={stateChangeHandler} />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <SignupLabel htmlFor="password">Password</SignupLabel>
                    <Input id="password" placeholder="••••••••" type="password" name="password" value={loginForm.password} onChange={stateChangeHandler} />
                </LabelInputContainer>

                <button
                    className="group/btn relative block h-10 w-full cursor-pointer rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
                    type="submit"
                >
                    Sign in &rarr;
                    <BottomGradient />
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

const BottomGradient = () => {
    return (
        <>
            <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
            <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
        </>
    );
};

const LabelInputContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return <div className={cn('flex w-full flex-col space-y-2', className)}>{children}</div>;
};

const loginSchema = z.object({
    id: z.string().min(1, 'Email Address is required').email('This is not a email format'),
    password: z.string().min(1, 'Password is required')
});
