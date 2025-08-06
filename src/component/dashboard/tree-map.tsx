'use client';
import { useEffect, useState } from 'react';
import { ResponsiveContainer, Tooltip, Treemap } from 'recharts';

import { TreeType } from '@/type/dashboard/dashboardType';
import { DomainType, TermType, WordType } from '@/type/data/dataType';

export default function DictionaryTree({ words, domains, terms }: { words: WordType[]; domains: DomainType[]; terms: TermType[] }) {
    const data: TreeType[] = [
        { label: 'Words', value: words.length },
        { label: 'Domains', value: domains.length },
        { label: 'Terms', value: terms.length }
    ];

    const [treeData, setTreeData] = useState(data);

    //대시보드 갱신 테스트
    useEffect(() => {
        const newalWordCount = setInterval(() => {
            const currentWordValue = treeData.find((d) => d.label === 'Words')?.value || 0;
            setTreeData((prev) => [
                { label: 'Words', value: currentWordValue - 500 > 0 ? currentWordValue - 500 : words.length },
                ...prev.filter((item) => item.label !== 'Words')
            ]);
        }, 1000);
        return () => clearInterval(newalWordCount);
    });

    return (
        <ResponsiveContainer width="100%" height="100%">
            <Treemap data={treeData} dataKey="value" nameKey="label" isAnimationActive={false} stroke="#fff" fill="#8884d8">
                <Tooltip />
            </Treemap>
        </ResponsiveContainer>
    );
}
