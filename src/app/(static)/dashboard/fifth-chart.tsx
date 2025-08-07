import { TopCitiesBar } from '@/component/dashboard/bar';
import { DomainsRadar } from '@/component/dashboard/radar';
import { httpGet } from '@/lib/api-module';
import { RandomUserType } from '@/type/dashboard/dashboardType';
import { DomainType } from '@/type/data/dataType';

export default async function FifthChart() {
    const domains = await httpGet<DomainType[]>('/domain');
    return <DomainsRadar domains={domains} />;
}

export async function FifthUserChart() {
    const users = await httpGet<RandomUserType[]>('/random-user-data', { count: 5000 });
    const top = 5;
    return <TopCitiesBar {...{ users, top }} />;
}
