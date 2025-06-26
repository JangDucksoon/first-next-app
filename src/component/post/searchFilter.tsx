'use client';

import { FloatingLabel, HelperText } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

import { SearchFilterType } from '@/type/post/searchFilter';

export default function SearchFilter({ helperText }: SearchFilterType) {
    const router = useRouter();
    const useParam = useSearchParams();
    const searchParam = new URLSearchParams(useParam);
    const pathname = usePathname();

    const initialSearch = {
        message: helperText || 'Please enter a search term.',
        term: '',
        helperType: helperText ? 'success' : 'gray'
    };

    const [search, setSearch] = useState({ ...initialSearch });

    const inputHandler = useDebouncedCallback((term: string) => {
        if (term) {
            setSearch(() => ({
                helperType: 'info',
                message: `[${term}] Searching ...`,
                term: term
            }));

            searchParam.set('term', term);
        } else {
            setSearch(() => ({
                ...initialSearch
            }));

            searchParam.delete('term');
        }

        router.push(`${pathname}?${searchParam.toString()}`);
    }, 500);

    useEffect(() => {
        setSearch({
            message: helperText || 'Please enter a search term.',
            term: '',
            helperType: helperText ? 'success' : 'gray'
        });
    }, [helperText]);

    return (
        <div className="flex space-x-4">
            <div className="flex-grow basis-0">
                <FloatingLabel
                    variant="filled"
                    label="Search"
                    onInput={(e) => inputHandler(e.target.value)}
                    defaultValue={searchParam.get('term')?.toString()}
                />
                <HelperText color={search.helperType}>{search.message}</HelperText>
            </div>
        </div>
    );
}
