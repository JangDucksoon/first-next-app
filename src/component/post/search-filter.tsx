'use client';

import { FloatingLabel } from 'flowbite-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function SearchFilter() {
    const router = useRouter();
    const useParam = useSearchParams();
    const searchParam = new URLSearchParams(useParam);
    const pathname = usePathname();

    const inputHandler = useDebouncedCallback((value: string) => {
        if (value) {
            searchParam.set('term', value);
        } else {
            searchParam.delete('term');
        }

        router.push(`${pathname}?${searchParam.toString()}`);
    }, 500);

    return (
        <div className="flex space-x-4">
            <div className="flex-grow basis-0">
                <FloatingLabel
                    variant="filled"
                    label="Search"
                    onInput={(e) => inputHandler(e.target.value)}
                    defaultValue={searchParam.get('term')?.toString()}
                />
            </div>
        </div>
    );
}
