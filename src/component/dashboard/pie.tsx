'use client';

import React, { useEffect, useState } from 'react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Sector, SectorProps } from 'recharts';
import { PieSectorData } from 'recharts/types/polar/Pie';

import { DomainType, TermType, WordType } from '@/type/data/dataType';
import { PieType } from '@/type/dashboard/dashboardType';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

export default function DictionaryPie({ words, domains, terms }: { words: WordType[]; domains: DomainType[]; terms: TermType[] }) {
    const data: PieType[] = [
        { label: 'Words', value: words.length },
        { label: 'Domains', value: domains.length },
        { label: 'Terms', value: terms.length }
    ];

    const [pieData, setPieData] = useState(data);

    //대시보드 갱신 테스트
    useEffect(() => {
        const newalWordCount = setInterval(() => {
            const currentWordValue = pieData.find((d) => d.label === 'Words')?.value || 0;
            setPieData((prev) => [
                { label: 'Words', value: currentWordValue - 500 > 0 ? currentWordValue - 500 : words.length },
                ...prev.filter((item) => item.label !== 'Words')
            ]);
        }, 1000);
        return () => clearInterval(newalWordCount);
    });

    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                    activeShape={renderActiveShape}
                    data={pieData}
                    dataKey="value"
                    nameKey="label"
                    cx="50%"
                    cy="90%"
                    isAnimationActive={false}
                    startAngle={180}
                    endAngle={0}
                    outerRadius={150}
                    labelLine={false}
                    label={({ cx, cy, midAngle, innerRadius, outerRadius, payload }) => {
                        const RADIAN = Math.PI / 180;
                        const radius = innerRadius + (outerRadius - innerRadius) / 2;
                        const x = cx + radius * Math.cos(-midAngle! * RADIAN);
                        const y = cy + radius * Math.sin(-midAngle! * RADIAN);

                        return (
                            <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight="bold">
                                {payload.label}
                            </text>
                        );
                    }}
                >
                    {data.map((d, idx) => (
                        <Cell key={idx} fill={COLORS[idx]} cursor="pointer" />
                    ))}
                </Pie>
                <Legend align="right" layout="vertical" verticalAlign="top" iconType="circle" />
            </PieChart>
        </ResponsiveContainer>
    );
}

export function WordsPie({ words }: { words: WordType[] }) {
    const data: PieType[] = [
        { label: 'Informal Word', value: words.filter((w) => w.frmWordYn === 'N').length },
        { label: 'Formal Word', value: words.filter((w) => w.frmWordYn === 'Y').length }
    ];
    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                    activeShape={renderActiveShape}
                    data={data}
                    dataKey="value"
                    nameKey="label"
                    cx="50%"
                    cy="90%"
                    isAnimationActive={false}
                    startAngle={180}
                    endAngle={0}
                    outerRadius={150}
                    labelLine={false}
                    label={({ cx, cy, midAngle, innerRadius, outerRadius, payload }) => {
                        const RADIAN = Math.PI / 180;
                        const radius = innerRadius + (outerRadius - innerRadius) / 2;
                        const x = cx + radius * Math.cos(-midAngle! * RADIAN);
                        const y = cy + radius * Math.sin(-midAngle! * RADIAN);

                        return (
                            <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight="bold">
                                {payload.label}
                            </text>
                        );
                    }}
                >
                    {data.map((d, idx) => (
                        <Cell key={idx} fill={COLORS[idx]} cursor="pointer" />
                    ))}
                </Pie>
                <Legend align="right" layout="vertical" verticalAlign="top" iconType="wye" />
            </PieChart>
        </ResponsiveContainer>
    );
}

type PieSectorDataItem = React.SVGProps<SVGPathElement> & Partial<SectorProps> & PieSectorData;
const renderActiveShape = ({ cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value }: PieSectorDataItem) => {
    const RADIAN = Math.PI / 180;
    const sin = Math.sin(-RADIAN * (midAngle ?? 1));
    const cos = Math.cos(-RADIAN * (midAngle ?? 1));
    const sx = (cx ?? 0) + ((outerRadius ?? 0) + 10) * cos;
    const sy = (cy ?? 0) + ((outerRadius ?? 0) + 10) * sin;
    const mx = (cx ?? 0) + ((outerRadius ?? 0) + 30) * cos;
    const my = (cy ?? 0) + ((outerRadius ?? 0) + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                {payload.name}
            </text>
            <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius} startAngle={startAngle} endAngle={endAngle} fill={fill} />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={(outerRadius ?? 0) + 6}
                outerRadius={(outerRadius ?? 0) + 10}
                fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`Count ${value?.toLocaleString() || 0}`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                {`(Rate ${((percent ?? 1) * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};
