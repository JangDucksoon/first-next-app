import { PurseCell } from '@/component/post/table';

export default function Loading() {
    return (
        <div className="bg-gray-100 p-6">
            <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-lg">
                <div className="flex justify-between">
                    <h1 className="mb-6 text-3xl font-bold">Profile</h1>
                </div>

                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">User ID</div>
                        <div className="min-w-50 text-base font-medium text-gray-900">
                            <PurseCell />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">Name</div>
                        <div className="min-w-50 text-base font-medium text-gray-900">
                            <PurseCell />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">Author Code</div>
                        <div className="min-w-50 text-base font-medium text-gray-900">
                            <PurseCell />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
