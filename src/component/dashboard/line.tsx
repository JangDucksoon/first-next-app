'use client';

import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { LineType, RandomUserType } from '@/type/dashboard/dashboardType';

export function RandomLine({ users }: { users: RandomUserType[] }) {
    const regYears = users.map((u) => u.registered.date.slice(0, 4));
    const regYearsCount = regYears.reduce(
        (acc, curr) => {
            acc[curr] = (acc[curr] ?? 0) + 1;
            return acc;
        },
        {} as { [key: string]: number }
    );
    const lineData: LineType[] = Object.keys(regYearsCount)
        .map((key) => ({ label: key, value: regYearsCount[key] }))
        .sort((a, b) => Number(a.label) - Number(b.label));

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                width={500}
                height={300}
                data={lineData}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
        </ResponsiveContainer>
    );
}
