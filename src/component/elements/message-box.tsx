'use client';

import React from 'react';
import { AlertCircleIcon } from 'lucide-react';

import { useAlertStore } from '@/lib/alert-store';
import { Button } from '@/component/elements/stateful-button';
import { Separator } from '@/component/elements/separator';
import { ScrollArea } from '@/component/elements/scroll-area';

export function AlertBox() {
    const { isOpen, message, hide } = useAlertStore();

    if (!isOpen) {
        return null;
    }

    return (
        <div className="bg-background/50 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
            <div className="flex w-full max-w-sm flex-col gap-y-4 rounded-lg border border-red-500 bg-white p-6 shadow-xl dark:bg-gray-800">
                <div className="flex items-center justify-center gap-x-4">
                    <div className="rounded-full bg-red-100 p-2 text-red-600">
                        <AlertCircleIcon size={16} />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-800">Alert</h2>
                </div>

                <Separator />

                <ScrollArea className="h-[100px]">
                    <p className="break-all whitespace-pre-wrap">{message}</p>
                </ScrollArea>

                <Separator />

                <div className="flex w-full justify-center">
                    <button
                        className="min-w-[120px] cursor-pointer items-center justify-center gap-2 rounded-md bg-red-500 px-4 py-2 font-medium text-white ring-offset-2 transition duration-200 hover:ring-2 hover:ring-red-500"
                        onClick={hide}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
