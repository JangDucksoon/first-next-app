import SigninForm from '@/component/login/signin-form';

export default function Page() {
    return (
        <div className="flex h-[calc(100vh-54px)] items-center justify-center bg-gray-100 p-6">
            <div className="mx-auto min-w-2xl rounded-2xl bg-white p-6 shadow-lg">
                <SigninForm />
            </div>
        </div>
    );
}
