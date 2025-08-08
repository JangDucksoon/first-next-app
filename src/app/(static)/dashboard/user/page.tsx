import { Metadata } from 'next';
import { Tooltip } from 'flowbite-react';

import RefreshCache from '@/component/dashboard/refresh-cache';
import { RandomUserType } from '@/type/dashboard/dashboardType';
import { httpGet } from '@/lib/api-module';
import { GenderPie } from '@/component/dashboard/pie';
import { NationalityTree } from '@/component/dashboard/tree-map';
import { FirstInitialBar, TopCitiesBar } from '@/component/dashboard/bar';
import { RandomUserRadar } from '@/component/dashboard/radar';
import { RandomLine } from '@/component/dashboard/line';

export const metadata: Metadata = {
    title: 'User Dashboard',
    description: 'user dashboard pages....'
};

export const revalidate = 5;

export default async function Page() {
    const top = 5;
    const users = await httpGet<RandomUserType[]>('/random-user-data', { count: 1000 });

    return (
        <>
            <RefreshCache interval={5000} />
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
                                <GenderPie {...{ users }} />
                            </div>
                        </div>
                        <div className="flex h-90 min-h-0 flex-col rounded-lg border border-gray-200 p-3">
                            <div className="flex w-full items-center border-b border-b-gray-200">
                                <Tooltip style="dark" content="사용자 국가 분포">
                                    <h3 className="cursor-default pb-3 text-2xl font-bold">User Nationality Distribution</h3>
                                </Tooltip>
                            </div>
                            <div className="flex w-full flex-1 pt-3">
                                <NationalityTree {...{ users }} />
                            </div>
                        </div>
                        <div className="flex h-90 min-h-0 flex-col rounded-lg border border-gray-200 p-3">
                            <div className="flex w-full items-center border-b border-b-gray-200">
                                <Tooltip style="dark" content="이름 첫 글자 분포 (알파벳)">
                                    <h3 className="cursor-default pb-3 text-2xl font-bold">First Name Initial Distribution (Alphabet)</h3>
                                </Tooltip>
                            </div>
                            <div className="flex w-full flex-1 pt-3">
                                <FirstInitialBar {...{ users }} />
                            </div>
                        </div>
                        <div className="flex h-90 min-h-0 flex-col rounded-lg border border-gray-200 p-3">
                            <div className="flex w-full items-center border-b border-b-gray-200">
                                <Tooltip style="dark" content="사용자 아이디 길이 분포">
                                    <h3 className="cursor-default pb-3 text-2xl font-bold">Username Length Distribution</h3>
                                </Tooltip>
                            </div>
                            <div className="flex w-full flex-1 pt-3">
                                <RandomUserRadar {...{ users }} />
                            </div>
                        </div>
                        <div className="flex h-90 min-h-0 flex-col rounded-lg border border-gray-200 p-3">
                            <div className="flex w-full items-center border-b border-b-gray-200">
                                <Tooltip style="dark" content="사용자 도시 상위 TOP 5">
                                    <h3 className="cursor-default pb-3 text-2xl font-bold">Top 5 Cities by Users</h3>
                                </Tooltip>
                            </div>
                            <div className="flex w-full flex-1 pt-3">
                                <TopCitiesBar {...{ users, top }} />
                            </div>
                        </div>
                        <div className="flex h-90 min-h-0 flex-col rounded-lg border border-gray-200 p-3">
                            <div className="flex w-full items-center border-b border-b-gray-200">
                                <Tooltip style="dark" content="연도별 가입자 변화 추이">
                                    <h3 className="cursor-default pb-3 text-2xl font-bold">Annual User Registration Trends</h3>
                                </Tooltip>
                            </div>
                            <div className="flex w-full flex-1 pt-3">
                                <RandomLine {...{ users }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
