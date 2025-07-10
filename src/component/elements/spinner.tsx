import { Loader2 } from 'lucide-react';

export default function Spinner({ size }: { size?: number }) {
    size ||= 300;

    return (
        <div className="flex h-full w-full items-center justify-center">
            <Loader2 className={`text-muted-foreground h-[${size}px] w-[${size}px] animate-spin`} />
        </div>
    );
}
