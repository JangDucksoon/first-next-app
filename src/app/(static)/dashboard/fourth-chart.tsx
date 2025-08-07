import { WordsPie } from '@/component/dashboard/pie';
import { RandomUserRadar } from '@/component/dashboard/radar';
import { httpGet } from '@/lib/api-module';
import { RandomUserType } from '@/type/dashboard/dashboardType';
import { WordType } from '@/type/data/dataType';

export default async function FourthChart() {
    const words = await httpGet<WordType[]>('/word');
    return <WordsPie words={words} />;
}

export async function FourthUserChart() {
    const users = await httpGet<RandomUserType[]>('/random-user-data', { count: 1000 });
    return <RandomUserRadar {...{ users }} />;
}
