import { Metadata } from 'next';
import { Tooltip } from 'flowbite-react';

import { httpGet } from '@/lib/api-module';
import { DomainType, TermType, WordType } from '@/type/data/dataType';
import DictionaryPie, { WordsPie } from '@/component/dashboard/pie';
import DictionaryTree from '@/component/dashboard/tree-map';
import DictionaryRadar, { DomainsRadar } from '@/component/dashboard/radar';
import { TermsBar } from '@/component/dashboard/bar';

export const metadata: Metadata = {
    title: 'Dashboard',
    description: 'dashboard pages....'
};

export default async function Page() {
    const [words, domains, terms] = await Promise.all([httpGet<WordType[]>('/word'), httpGet<DomainType[]>('/domain'), httpGet<TermType[]>('/term')]);
    return (
        <>
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
                                <DictionaryPie {...{ words, domains, terms }} />;
                            </div>
                        </div>
                        <div className="flex h-90 min-h-0 flex-col rounded-lg border border-gray-200 p-3">
                            <div className="flex w-full items-center border-b border-b-gray-200">
                                <Tooltip style="dark" content="표준 사전 카테고리 분포 레이더 차트">
                                    <h3 className="cursor-default pb-3 text-2xl font-bold">Category Distribution of Dictionary Entries (Tree)</h3>
                                </Tooltip>
                            </div>
                            <div className="flex w-full flex-1 pt-3">
                                <DictionaryTree {...{ words, domains, terms }} />
                            </div>
                        </div>
                        <div className="flex h-90 min-h-0 flex-col rounded-lg border border-gray-200 p-3">
                            <div className="flex w-full items-center border-b border-b-gray-200">
                                <Tooltip style="dark" content="표준 사전 카테고리 분포 트리맵">
                                    <h3 className="cursor-default pb-3 text-2xl font-bold">Category Distribution of Dictionary Entries (Radar)</h3>
                                </Tooltip>
                            </div>
                            <div className="flex w-full flex-1 pt-3">
                                <DictionaryRadar {...{ words, domains, terms }} />
                            </div>
                        </div>
                        <div className="flex h-90 min-h-0 flex-col rounded-lg border border-gray-200 p-3">
                            <div className="flex w-full items-center border-b border-b-gray-200">
                                <Tooltip style="dark" content="표준 단어 형식단어여부별 비율">
                                    <h3 className="cursor-default pb-3 text-2xl font-bold">Distribution of Formality in Standard Words</h3>
                                </Tooltip>
                            </div>
                            <div className="flex w-full flex-1 pt-3">
                                <WordsPie words={words} />
                            </div>
                        </div>
                        <div className="flex h-90 min-h-0 flex-col rounded-lg border border-gray-200 p-3">
                            <div className="flex w-full items-center border-b border-b-gray-200">
                                <Tooltip style="dark" content="표준 도메인 대분류별 분포">
                                    <h3 className="cursor-default pb-3 text-2xl font-bold">Standard Domain Group Distribution</h3>
                                </Tooltip>
                            </div>
                            <div className="flex w-full flex-1 pt-3">
                                <DomainsRadar domains={domains} />;
                            </div>
                        </div>
                        <div className="flex h-90 min-h-0 flex-col rounded-lg border border-gray-200 p-3">
                            <div className="flex w-full items-center border-b border-b-gray-200">
                                <Tooltip style="dark" content="표준 용어 참조 단어 개수">
                                    <h3 className="cursor-default pb-3 text-2xl font-bold">Standard Term Reference Word Count</h3>
                                </Tooltip>
                            </div>
                            <div className="flex w-full flex-1 pt-3">
                                <TermsBar terms={terms} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
