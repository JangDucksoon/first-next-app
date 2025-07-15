import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/component/elements/accordion';
import { httpGet } from '@/lib/api-module';
import { TermType } from '@/type/data/dataType';
import { PurseCell } from '@/component/post/table';

export default async function Terms() {
    const terms: Array<TermType> = (await httpGet<{ data: Array<TermType> }>('/standard/term', { pageSize: 100 })).data;
    return (
        <Accordion type="single" collapsible className="w-full cursor-pointer">
            {terms.map((term) => (
                <AccordionItem key={term.stdTrmId} value={term.stdTrmId}>
                    <AccordionTrigger className="cursor-pointer">{term.stdTrmEngAbbrNm}</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance">
                        <p>{term.stdTrmExpln}</p>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
}

export async function TermsSkeleton() {
    const dumpArray = Array.from({ length: 10 });

    return (
        <Accordion type="single" collapsible className="w-full cursor-pointer">
            {dumpArray.map((_, idx) => (
                <AccordionItem key={idx} value={idx + ''}>
                    <AccordionTrigger disabled className="cursor-pointer">
                        <div className="w-full">
                            <PurseCell />
                        </div>
                    </AccordionTrigger>
                </AccordionItem>
            ))}
        </Accordion>
    );
}
