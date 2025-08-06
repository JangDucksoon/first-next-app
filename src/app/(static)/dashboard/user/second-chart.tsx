import { NationalityTree } from '@/component/dashboard/tree-map';
import { httpGet } from '@/lib/api-module';
import { RandomUserType } from '@/type/dashboard/dashboardType';

export default async function SecondChart() {
    const users = await httpGet<RandomUserType[]>('/random-user-data', { count: 4000 });
    return <NationalityTree {...{ users }} />;
}
