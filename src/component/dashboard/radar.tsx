'use client';
import { useEffect, useState } from 'react';
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip } from 'recharts';

import { RadarType } from '@/type/dashboard/dashboardType';
import { DomainType, TermType, WordType } from '@/type/data/dataType';

export default function DictionaryRadar({ words, domains, terms }: { words: WordType[]; domains: DomainType[]; terms: TermType[] }) {
    const fullMark = words.length + domains.length + terms.length;
    const data: RadarType[] = [
        { label: 'Words', value: words.length },
        { label: 'Domains', value: domains.length },
        { label: 'Terms', value: terms.length }
    ];

    const [radarData, setRadarData] = useState(data);

    //대시보드 갱신 테스트
    useEffect(() => {
        const newalWordCount = setInterval(() => {
            const currentWordValue = radarData.find((d) => d.label === 'Words')?.value || 0;
            setRadarData((prev) => [
                { label: 'Words', value: currentWordValue - 500 > 0 ? currentWordValue - 500 : words.length },
                ...prev.filter((item) => item.label !== 'Words')
            ]);
        }, 1000);
        return () => clearInterval(newalWordCount);
    });

    return (
        <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="70%" data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="label" />
                <PolarRadiusAxis domain={[0, fullMark]} />
                <Radar name="Count" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Tooltip />
            </RadarChart>
        </ResponsiveContainer>
    );
}

export function DomainsRadar({ domains }: { domains: DomainType[] }) {
    const groupCount = domains.reduce((acc: { [key: string]: number }, cur) => {
        acc[cur.stdDmnGrpNm] = (acc[cur.stdDmnGrpNm] || 0) + 1;
        return acc;
    }, {});

    const maxLength = Math.max(...Object.keys(groupCount).map((key) => groupCount[key]));
    const data: RadarType[] = Object.keys(groupCount).map((key) => ({ label: key, value: groupCount[key] }));
    return (
        <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" data={data}>
                <PolarGrid />
                <PolarAngleAxis dataKey="label" />
                <PolarRadiusAxis domain={[0, maxLength]} />
                <Radar name="Count" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Tooltip />
            </RadarChart>
        </ResponsiveContainer>
    );
}
