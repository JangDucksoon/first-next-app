'use client';

import { Button, ButtonGroup } from 'flowbite-react';
import { BsCardHeading } from 'react-icons/bs';
import { FcCheckmark } from 'react-icons/fc';
import { ImTable } from 'react-icons/im';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function ViewToggle({ view }: { view: string }) {
    const pathname = usePathname();
    const useSearchParam = useSearchParams();
    const searchParam = new URLSearchParams(useSearchParam);
    const { replace } = useRouter();

    const viewChange = useDebouncedCallback((type) => {
        searchParam.set('view', type);
        replace(`${pathname}?${searchParam.toString()}`);
    }, 500);

    return (
        <ButtonGroup className="hidden md:inline-flex">
            <Button className="cursor-pointer" color="alternative" onClick={() => viewChange('card')}>
                <BsCardHeading className="text-xl" />
                {view === 'card' ? <FcCheckmark className="ml-2" /> : ''}
            </Button>
            <Button className="cursor-pointer" color="alternative" onClick={() => viewChange('table')}>
                <ImTable className="text-xl" />
                {view === 'table' ? <FcCheckmark className="ml-2" /> : ''}
            </Button>
        </ButtonGroup>
    );
}
