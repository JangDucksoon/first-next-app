import { Metadata } from 'next';
import { Suspense } from 'react';
import { Tooltip } from 'flowbite-react';

import FifthChart from './fifth-chart';
import FirstChart from './first-chart';
import FourthChart from './fourth-chart';
import SecondChart from './second-chart';
import SixthChart from './sixth-chart';
import ThirdChart from './third-chart';

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
                                <Tooltip style="dark" content="표준 사전 카테고리 분포 파이 차트">
                                    <h3 className="cursor-default pb-3 text-2xl font-bold">Category Distribution of Dictionary Entries (PIE)</h3>
                                </Tooltip>
                            </div>
                            <div className="flex w-full flex-1 pt-3">
                                <Suspense fallback={<Spinner />}>
                                    <FirstChart />
                                </Suspense>
                            </div>
                        </div>
                        <div className="flex h-90 min-h-0 flex-col rounded-lg border border-gray-200 p-3">
                            <div className="flex w-full items-center border-b border-b-gray-200">
                                <Tooltip style="dark" content="표준 사전 카테고리 분포 레이더 차트">
                                    <h3 className="cursor-default pb-3 text-2xl font-bold">Category Distribution of Dictionary Entries (Radar)</h3>
                                </Tooltip>
                            </div>
                            <div className="flex w-full flex-1 pt-3">
                                <Suspense fallback={<Spinner />}>
                                    <SecondChart />
                                </Suspense>
                            </div>
                        </div>
                        <div className="flex h-90 min-h-0 flex-col rounded-lg border border-gray-200 p-3">
                            <div className="flex w-full items-center border-b border-b-gray-200">
                                <Tooltip style="dark" content="표준 사전 카테고리 분포 트리맵">
                                    <h3 className="cursor-default pb-3 text-2xl font-bold">Category Distribution of Dictionary Entries (Tree)</h3>
                                </Tooltip>
                            </div>
                            <div className="flex w-full flex-1 pt-3">
                                <Suspense fallback={<Spinner />}>
                                    <ThirdChart />
                                </Suspense>
                            </div>
                        </div>
                        <div className="flex h-90 min-h-0 flex-col rounded-lg border border-gray-200 p-3">
                            <div className="flex w-full items-center border-b border-b-gray-200">
                                <Tooltip style="dark" content="표준 단어 형식단어여부별 비율">
                                    <h3 className="cursor-default pb-3 text-2xl font-bold">Distribution of Formality in Standard Words</h3>
                                </Tooltip>
                            </div>
                            <div className="flex w-full flex-1 pt-3">
                                <Suspense fallback={<Spinner />}>
                                    <FourthChart />
                                </Suspense>
                            </div>
                        </div>
                        <div className="flex h-90 min-h-0 flex-col rounded-lg border border-gray-200 p-3">
                            <div className="flex w-full items-center border-b border-b-gray-200">
                                <Tooltip style="dark" content="표준 도메인 대분류별 분포">
                                    <h3 className="cursor-default pb-3 text-2xl font-bold">Standard Domain Group Distribution</h3>
                                </Tooltip>
                            </div>
                            <div className="flex w-full flex-1 pt-3">
                                <Suspense fallback={<Spinner />}>
                                    <FifthChart />
                                </Suspense>
                            </div>
                        </div>
                        <div className="flex h-90 min-h-0 flex-col rounded-lg border border-gray-200 p-3">
                            <div className="flex w-full items-center border-b border-b-gray-200">
                                <Tooltip style="dark" content="표준 용어 참조 단어 개수">
                                    <h3 className="cursor-default pb-3 text-2xl font-bold">Standard Term Reference Word Count</h3>
                                </Tooltip>
                            </div>
                            <div className="flex w-full flex-1 pt-3">
                                <Suspense fallback={<Spinner />}>
                                    <SixthChart />
                                </Suspense>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
