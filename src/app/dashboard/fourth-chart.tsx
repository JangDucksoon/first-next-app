import { WordsPie } from '@/component/dashboard/pie';
import { httpGet } from '@/lib/api-module';
import { WordType } from '@/type/data/dataType';

export default async function FourthChart() {
    const words = await httpGet<WordType[]>('/word');
    return <WordsPie words={words} />;
}
