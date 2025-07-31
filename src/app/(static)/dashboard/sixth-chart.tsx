import { TermsBar } from '@/component/dashboard/bar';
import { httpGet } from '@/lib/api-module';
import { TermType } from '@/type/data/dataType';

export default async function SixthChart() {
    const terms = await httpGet<TermType[]>('/term');
    return <TermsBar terms={terms} />;
}
