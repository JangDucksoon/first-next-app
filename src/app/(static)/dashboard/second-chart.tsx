import DictionaryTree, { NationalityTree } from '@/component/dashboard/tree-map';
import { httpGet } from '@/lib/api-module';
import { RandomUserType } from '@/type/dashboard/dashboardType';
import { DomainType, TermType, WordType } from '@/type/data/dataType';

export default async function SecondChart() {
    const [words, domains, terms] = await Promise.all([httpGet<WordType[]>('/word'), httpGet<DomainType[]>('/domain'), httpGet<TermType[]>('/term')]);
    return <DictionaryTree {...{ words, domains, terms }} />;
}

export async function SecondUserChart() {
    const users = await httpGet<RandomUserType[]>('/random-user-data', { count: 1000 });
    return <NationalityTree {...{ users }} />;
}
