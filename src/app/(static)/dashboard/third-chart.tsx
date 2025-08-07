import { FirstInitialBar } from '@/component/dashboard/bar';
import DictionaryRadar from '@/component/dashboard/radar';
import { httpGet } from '@/lib/api-module';
import { RandomUserType } from '@/type/dashboard/dashboardType';
import { DomainType, TermType, WordType } from '@/type/data/dataType';

export default async function ThirdChart() {
    const [words, domains, terms] = await Promise.all([httpGet<WordType[]>('/word'), httpGet<DomainType[]>('/domain'), httpGet<TermType[]>('/term')]);
    return <DictionaryRadar {...{ words, domains, terms }} />;
}

export async function ThirdUserChart() {
    const users = await httpGet<RandomUserType[]>('/random-user-data', { count: 1000 });
    return <FirstInitialBar {...{ users }} />;
}
