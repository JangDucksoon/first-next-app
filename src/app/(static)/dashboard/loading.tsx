import { PurseCell } from '@/component/post/table';

export default function DashboardLoading() {
    return (
        <div className="bg-gray-100 p-6">
            <div className="mx-auto rounded-2xl bg-white p-6 shadow-lg">
                <div className="grid grid-cols-3 gap-3">
                    <div className="flex h-90 min-h-0 flex-col rounded-lg border border-gray-200 p-3">
                        <div className="flex w-full items-center border-b border-b-gray-200">
                            <h3 className="w-full cursor-default pb-3 text-2xl font-bold">
                                <PurseCell />
                            </h3>
                        </div>
                        <div className="flex w-full flex-1 pt-3"></div>
                    </div>
                    <div className="flex h-90 min-h-0 flex-col rounded-lg border border-gray-200 p-3">
                        <div className="flex w-full items-center border-b border-b-gray-200">
                            <h3 className="w-full cursor-default pb-3 text-2xl font-bold">
                                <PurseCell />
                            </h3>
                        </div>
                        <div className="flex w-full flex-1 pt-3"></div>
                    </div>
                    <div className="flex h-90 min-h-0 flex-col rounded-lg border border-gray-200 p-3">
                        <div className="flex w-full items-center border-b border-b-gray-200">
                            <h3 className="w-full cursor-default pb-3 text-2xl font-bold">
                                <PurseCell />
                            </h3>
                        </div>
                        <div className="flex w-full flex-1 pt-3"></div>
                    </div>
                    <div className="flex h-90 min-h-0 flex-col rounded-lg border border-gray-200 p-3">
                        <div className="flex w-full items-center border-b border-b-gray-200">
                            <h3 className="w-full cursor-default pb-3 text-2xl font-bold">
                                <PurseCell />
                            </h3>
                        </div>
                        <div className="flex w-full flex-1 pt-3"></div>
                    </div>
                    <div className="flex h-90 min-h-0 flex-col rounded-lg border border-gray-200 p-3">
                        <div className="flex w-full items-center border-b border-b-gray-200">
                            <h3 className="w-full cursor-default pb-3 text-2xl font-bold">
                                <PurseCell />
                            </h3>
                        </div>
                        <div className="flex w-full flex-1 pt-3"></div>
                    </div>
                    <div className="flex h-90 min-h-0 flex-col rounded-lg border border-gray-200 p-3">
                        <div className="flex w-full items-center border-b border-b-gray-200">
                            <h3 className="w-full cursor-default pb-3 text-2xl font-bold">
                                <PurseCell />
                            </h3>
                        </div>
                        <div className="flex w-full flex-1 pt-3"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
