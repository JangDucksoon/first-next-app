import DictionaryPie, { GenderPie } from '@/component/dashboard/pie';
import { httpGet } from '@/lib/api-module';
import { RandomUserType } from '@/type/dashboard/dashboardType';
import { DomainType, TermType, WordType } from '@/type/data/dataType';

export default async function FirstChart() {
    const [words, domains, terms] = await Promise.all([httpGet<WordType[]>('/word'), httpGet<DomainType[]>('/domain'), httpGet<TermType[]>('/term')]);
    return <DictionaryPie {...{ words, domains, terms }} />;
}

export async function FirstUserChart() {
    const users = await httpGet<RandomUserType[]>('/random-user-data', { count: 1000 });
    return <GenderPie {...{ users }} />;
}
