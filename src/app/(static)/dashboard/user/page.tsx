import { Metadata } from 'next';
import { Suspense } from 'react';
import { Tooltip } from 'flowbite-react';

import { FirstUserChart } from '../first-chart';
import { SecondUserChart } from '../second-chart';
import { ThirdUserChart } from '../third-chart';
import { FourthUserChart } from '../fourth-chart';
import { FifthUserChart } from '../fifth-chart';
import { SixthUserChart } from '../sixth-chart';

import Spinner from '@/component/elements/spinner';
import RefreshCache from '@/component/dashboard/refresh-cache';

export const metadata: Metadata = {
    title: 'Dashboard',
    description: 'dashboard pages....'
};

export const revalidate = 5;

export default function Page() {
    return (
        <>
            <RefreshCache />
            <div className="bg-gray-100 p-6">
                <div className="mx-auto rounded-2xl bg-white p-6 shadow-lg">
                    <div className="grid grid-cols-3 gap-3">
                        <div className="flex h-90 min-h-0 flex-col rounded-lg border border-gray-200 p-3">
                            <div className="flex w-full items-center border-b border-b-gray-200">
                                <Tooltip style="dark" content="사용자 성별 분포">
                                    <h3 className="cursor-default pb-3 text-2xl font-bold">User Gender Distribution</h3>
                                </Tooltip>
                            </div>
                            <div className="flex w-full flex-1 pt-3">
                                <Suspense fallback={<Spinner />}>
                                    <FirstUserChart />
                                </Suspense>
                            </div>
                        </div>
                        <div className="flex h-90 min-h-0 flex-col rounded-lg border border-gray-200 p-3">
                            <div className="flex w-full items-center border-b border-b-gray-200">
                                <Tooltip style="dark" content="사용자 국가 분포">
                                    <h3 className="cursor-default pb-3 text-2xl font-bold">User Nationality Distribution</h3>
                                </Tooltip>
                            </div>
                            <div className="flex w-full flex-1 pt-3">
                                <Suspense fallback={<Spinner />}>
                                    <SecondUserChart />
                                </Suspense>
                            </div>
                        </div>
                        <div className="flex h-90 min-h-0 flex-col rounded-lg border border-gray-200 p-3">
                            <div className="flex w-full items-center border-b border-b-gray-200">
                                <Tooltip style="dark" content="이름 첫 글자 분포 (알파벳)">
                                    <h3 className="cursor-default pb-3 text-2xl font-bold">First Name Initial Distribution (Alphabet)</h3>
                                </Tooltip>
                            </div>
                            <div className="flex w-full flex-1 pt-3">
                                <Suspense fallback={<Spinner />}>
                                    <ThirdUserChart />
                                </Suspense>
                            </div>
                        </div>
                        <div className="flex h-90 min-h-0 flex-col rounded-lg border border-gray-200 p-3">
                            <div className="flex w-full items-center border-b border-b-gray-200">
                                <Tooltip style="dark" content="사용자 아이디 길이 분포">
                                    <h3 className="cursor-default pb-3 text-2xl font-bold">Username Length Distribution</h3>
                                </Tooltip>
                            </div>
                            <div className="flex w-full flex-1 pt-3">
                                <Suspense fallback={<Spinner />}>
                                    <FourthUserChart />
                                </Suspense>
                            </div>
                        </div>
                        <div className="flex h-90 min-h-0 flex-col rounded-lg border border-gray-200 p-3">
                            <div className="flex w-full items-center border-b border-b-gray-200">
                                <Tooltip style="dark" content="사용자 도시 상위 TOP 5">
                                    <h3 className="cursor-default pb-3 text-2xl font-bold">Top 5 Cities by Users</h3>
                                </Tooltip>
                            </div>
                            <div className="flex w-full flex-1 pt-3">
                                <Suspense fallback={<Spinner />}>
                                    <FifthUserChart />
                                </Suspense>
                            </div>
                        </div>
                        <div className="flex h-90 min-h-0 flex-col rounded-lg border border-gray-200 p-3">
                            <div className="flex w-full items-center border-b border-b-gray-200">
                                <Tooltip style="dark" content="연도별 가입자 변화 추이">
                                    <h3 className="cursor-default pb-3 text-2xl font-bold">Annual User Registration Trends</h3>
                                </Tooltip>
                            </div>
                            <div className="flex w-full flex-1 pt-3">
                                <Suspense fallback={<Spinner />}>
                                    <SixthUserChart />
                                </Suspense>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
