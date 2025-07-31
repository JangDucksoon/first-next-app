import { DomainsRadar } from '@/component/dashboard/radar';
import { httpGet } from '@/lib/api-module';
import { DomainType } from '@/type/data/dataType';

export default async function FifthChart() {
    const domains = await httpGet<DomainType[]>('/domain');
    return <DomainsRadar domains={domains} />;
}
