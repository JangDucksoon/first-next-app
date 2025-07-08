'use client';

import { useEffect } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/component/elements/card';
import { FallbackImage } from '@/component/elements/fallback-image';
import { Separator } from '@/component/elements/separator';
import { ScrollArea } from '@/component/elements/scroll-area';
import { Label } from '@/component/elements/label';
import { PurseCell } from '@/component/post/table';

export default function Loading() {
    useEffect(() => {
        scrollTo({ top: 0, behavior: 'smooth' }); // 부드럽게 위로
    }, []);
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-lg">
                <Card className="mx-auto max-w-3xl space-y-6">
                    <CardHeader>
                        <CardTitle>Post Detail</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <div className="relative h-60 w-full overflow-hidden rounded-xl">
                            <FallbackImage src="" alt="skeleton" />
                        </div>

                        <Separator />

                        <ScrollArea className="h-[400px] p-2">
                            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 md:grid-cols-2">
                                <div>
                                    <Label>ID</Label>
                                    <PurseCell />
                                </div>
                                <div>
                                    <Label>Category</Label>
                                    <PurseCell />
                                </div>
                                <div>
                                    <Label>Title</Label>
                                    <PurseCell />
                                </div>
                                <div>
                                    <Label>Author</Label>
                                    <PurseCell />
                                </div>
                                <div className="md:col-span-2">
                                    <Label>Summary</Label>
                                    <PurseCell />
                                </div>
                                <div className="md:col-span-2">
                                    <Label>Content</Label>
                                    <PurseCell />
                                </div>

                                <Separator className="md:col-span-2" />

                                <div className="flex justify-between md:col-span-2">
                                    <span className="rounded-xl px-4 py-2 font-normal">← Back</span>
                                    <span className="rounded-xl px-4 py-2 font-normal">Modify →</span>
                                </div>
                            </dl>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
