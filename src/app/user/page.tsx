import { notFound } from 'next/navigation';

import { UserType } from '@/type/login/loginType';
import { getUserStatus } from '@/lib/user-module';

export default async function Page() {
    const user: UserType = await getUserStatus();
    if (!user) {
        notFound();
    }
    return (
        <div className="bg-gray-100 p-6">
            <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-lg">
                <div className="flex justify-between">
                    <h1 className="mb-6 text-3xl font-bold">Profile</h1>
                </div>

                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">User ID</div>
                        <div className="text-base font-medium text-gray-900">{user.id}</div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">Unique ID</div>
                        <div className="text-base font-medium text-gray-900">{user.uniqId}</div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">Name</div>
                        <div className="text-base font-medium text-gray-900">{user.name}</div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">Author Code</div>
                        <div className="text-base font-medium text-gray-900">
                            {user.authorCode}-{user.authorNm}
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">Email</div>
                        <div className="text-base font-medium text-gray-900">{user.email}</div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">Organization</div>
                        <div className="text-base font-medium text-gray-900">{user.orgnztNm}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
