import { httpGet } from '@/lib/api-module';
import { WordType } from '@/type/data/dataType';
import { GlareCard } from '@/component/elements/glare-card';

export default async function Words() {
    const words: Array<WordType> = (await httpGet('/standard/word?pageSize=100')).data;
    if (!words) {
        return <WordsSkeleton />;
    }

    return (
        <>
            {words.map((word) => (
                <GlareCard key={word.stdWordId} className="w-full">
                    <div className="flex h-full flex-col items-center justify-center gap-3">
                        <p className="text-sm text-white">{word.stdWordId}</p>
                        <p className="text-lg font-bold text-white">{word.stdWordEngAbbrNm}</p>
                        <p className="text-base font-bold text-white">{word.stdWordNm}</p>
                        <p className="text-center text-base text-white">{word.stdWordEngNm}</p>
                    </div>
                </GlareCard>
            ))}
        </>
    );
}

export function WordsSkeleton() {
    return (
        <>
            <div className="grid h-full origin-center animate-pulse overflow-hidden rounded-[var(--radius)] bg-slate-800"></div>
            <div className="grid h-full origin-center animate-pulse overflow-hidden rounded-[var(--radius)] bg-slate-800"></div>
            <div className="grid h-full origin-center animate-pulse overflow-hidden rounded-[var(--radius)] bg-slate-800"></div>
            <div className="grid h-full origin-center animate-pulse overflow-hidden rounded-[var(--radius)] bg-slate-800"></div>
        </>
    );
}
