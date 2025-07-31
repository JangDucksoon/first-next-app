import DictionaryRadar from '@/component/dashboard/radar';
import { httpGet } from '@/lib/api-module';
import { DomainType, TermType, WordType } from '@/type/data/dataType';

export default async function ThirdChart() {
    const [words, domains, terms] = await Promise.all([httpGet<WordType[]>('/word'), httpGet<DomainType[]>('/domain'), httpGet<TermType[]>('/term')]);
    return <DictionaryRadar {...{ words, domains, terms }} />;
}
