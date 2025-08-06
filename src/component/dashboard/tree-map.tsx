'use client';
import { ResponsiveContainer, Tooltip, Treemap } from 'recharts';

import { RandomUserType, TreeType } from '@/type/dashboard/dashboardType';
import { DomainType, TermType, WordType } from '@/type/data/dataType';

export default function DictionaryTree({ words, domains, terms }: { words: WordType[]; domains: DomainType[]; terms: TermType[] }) {
    const data: TreeType[] = [
        { label: 'Words', value: words.length },
        { label: 'Domains', value: domains.length },
        { label: 'Terms', value: terms.length }
    ];

    return (
        <ResponsiveContainer width="100%" height="100%">
            <Treemap data={data} dataKey="value" nameKey="label" isAnimationActive={false} stroke="#fff" fill="#8884d8">
                <Tooltip />
            </Treemap>
        </ResponsiveContainer>
    );
}

export function NationalityTree({ users }: { users: RandomUserType[] }) {
    const nationalityArray: string[] = users.map((u) => u.location.country);
    const natonalityCount = nationalityArray.reduce(
        (acc, curr) => {
            acc[curr] = (acc[curr] ?? 0) + 1;
            return acc;
        },
        {} as { [key: string]: number }
    );

    const treeData: TreeType[] = Object.keys(natonalityCount)
        .map((n) => ({
            label: n,
            value: natonalityCount[n],
            fill: getRandomColor(n)
        }))
        .sort((a, b) => a.label.localeCompare(b.label));

    return (
        <ResponsiveContainer width="100%" height="100%">
            <Treemap
                data={treeData}
                dataKey="value"
                nameKey="label"
                isAnimationActive={false}
                content={(props) => {
                    const { x, y, width, height, fill, label } = props;
                    return (
                        <g>
                            <rect
                                x={x}
                                y={y}
                                width={width}
                                height={height}
                                style={{
                                    fill: fill,
                                    stroke: '#fff'
                                }}
                            />
                            {width > 60 && height > 20 && (
                                <text x={x + 4} y={y + 20} fill="#fff" fontSize={12} fontWeight="bold">
                                    {label}
                                </text>
                            )}
                        </g>
                    );
                }}
            >
                <Tooltip />
            </Treemap>
        </ResponsiveContainer>
    );
}

function getRandomColor(seed: string): string {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash) % 360;
    return `hsl(${hue}, 50%, 50%)`;
}
