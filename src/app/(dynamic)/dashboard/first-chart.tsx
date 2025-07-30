import DictionaryPie from '@/component/dashboard/pie';
import { httpGet } from '@/lib/api-module';
import { DomainType, TermType, WordType } from '@/type/data/dataType';

export default async function FirstChart() {
    const [words, domains, terms] = await Promise.all([httpGet<WordType[]>('/word'), httpGet<DomainType[]>('/domain'), httpGet<TermType[]>('/term')]);
    return <DictionaryPie {...{ words, domains, terms }} />;
}
