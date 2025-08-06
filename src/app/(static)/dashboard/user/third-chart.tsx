import { FirstInitialBar } from '@/component/dashboard/bar';
import { httpGet } from '@/lib/api-module';
import { RandomUserType } from '@/type/dashboard/dashboardType';

export default async function ThirdChart() {
    const users = await httpGet<RandomUserType[]>('/random-user-data', { count: 4000 });
    return <FirstInitialBar {...{ users }} />;
}
