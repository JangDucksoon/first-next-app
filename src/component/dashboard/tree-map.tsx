'use client';

import { ResponsiveContainer, Tooltip, Treemap } from 'recharts';

import { TreeType } from '@/type/dashboard/dashboardType';
import { DomainType, TermType, WordType } from '@/type/data/dataType';

export default function DictionaryTree({ words, domains, terms }: { words: WordType[]; domains: DomainType[]; terms: TermType[] }) {
    const data: TreeType[] = [
        { label: 'Words', value: words.length },
        { label: 'Domains', value: domains.length },
        { label: 'Terms', value: terms.length }
    ];
    return (
        <ResponsiveContainer width="100%" height="100%">
            <Treemap data={data} dataKey="value" nameKey="label" aspectRatio={4 / 3} stroke="#fff" fill="#8884d8">
                <Tooltip />
            </Treemap>
        </ResponsiveContainer>
    );
}
