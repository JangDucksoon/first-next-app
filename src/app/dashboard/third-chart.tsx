import DictoionaryTree from '@/component/dashboard/tree-map';
import { httpGet } from '@/lib/api-module';
import { DomainType, TermType, WordType } from '@/type/data/dataType';

export default async function ThirdChart() {
    const [words, domains, terms] = await Promise.all([httpGet<WordType[]>('/word'), httpGet<DomainType[]>('/domain'), httpGet<TermType[]>('/term')]);
    return <DictoionaryTree {...{ words, domains, terms }} />;
}
