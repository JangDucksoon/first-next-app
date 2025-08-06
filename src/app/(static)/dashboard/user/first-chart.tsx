import { GenderPie } from '@/component/dashboard/pie';
import { httpGet } from '@/lib/api-module';
import { RandomUserType } from '@/type/dashboard/dashboardType';

export default async function FirstChart() {
    const users = await httpGet<RandomUserType[]>('/random-user-data', { count: 4000 });
    return <GenderPie {...{ users }} />;
}
