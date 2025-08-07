import { TermsBar } from '@/component/dashboard/bar';
import { RandomLine } from '@/component/dashboard/line';
import { httpGet } from '@/lib/api-module';
import { RandomUserType } from '@/type/dashboard/dashboardType';
import { TermType } from '@/type/data/dataType';

export default async function SixthChart() {
    const terms = await httpGet<TermType[]>('/term');
    return <TermsBar terms={terms} />;
}

export async function SixthUserChart() {
    const users = await httpGet<RandomUserType[]>('/random-user-data', { count: 1000 });
    return <RandomLine {...{ users }} />;
}
