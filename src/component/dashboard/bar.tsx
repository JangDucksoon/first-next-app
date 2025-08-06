'use client';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { TermType } from '@/type/data/dataType';
import { BarType, RandomUserType } from '@/type/dashboard/dashboardType';

export function TermsBar({ terms }: { terms: TermType[] }) {
    const referCount = terms.map((t) => `${t.wordTrmMpngList.length} 개`);
    const groupCount = referCount.reduce((acc: { [key: string]: number }, cur) => {
        acc[cur] = (acc[cur] || 0) + 1;
        return acc;
    }, {});

    const data: BarType[] = Object.keys(groupCount).map((key) => ({ label: key, value: groupCount[key] }));

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={data}
                margin={{
                    right: 10
                }}
                barSize={20}
            >
                <XAxis dataKey="label" scale="point" padding={{ left: 10, right: 10 }} />
                <YAxis />
                <Tooltip
                    content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                            return (
                                <div style={{ backgroundColor: 'white', border: '1px solid #ccc', padding: '5px', color: '#8884d8' }}>
                                    <p>{label}</p>
                                    <p>
                                        <b>Count:</b> {payload[0].value}
                                    </p>
                                </div>
                            );
                        }
                        return null;
                    }}
                />
                <CartesianGrid />
                <Bar dataKey="value" fill="#8884d8" background={{ fill: '#eee' }} />
            </BarChart>
        </ResponsiveContainer>
    );
}

export function FirstInitialBar({ users }: { users: RandomUserType[] }) {
    const firstInitialArray: string[] = users.map((u) => u.name.first.at(0)!);
    const firstInitialCount = firstInitialArray.reduce(
        (acc, curr) => {
            acc[curr] = (acc[curr] ?? 0) + 1;
            return acc;
        },
        {} as { [key: string]: number }
    );

    const barData = Object.keys(firstInitialCount)
        .map((key) => ({ label: key, value: firstInitialCount[key] }))
        .filter((i) => /^[A-Z]$/.test(i.label))
        .sort((a, b) => a.label.localeCompare(b.label));

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={barData}
                margin={{
                    right: 10
                }}
                barSize={20}
            >
                <XAxis dataKey="label" scale="point" padding={{ left: 10, right: 10 }} />
                <YAxis />
                <Tooltip
                    content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                            return (
                                <div style={{ backgroundColor: 'white', border: '1px solid #ccc', padding: '5px', color: '#8884d8' }}>
                                    <p>{label}</p>
                                    <p>
                                        <b>Count:</b> {payload[0].value}
                                    </p>
                                </div>
                            );
                        }
                        return null;
                    }}
                />
                <CartesianGrid stroke="#ccc" vertical={false} />
                <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    );
}
