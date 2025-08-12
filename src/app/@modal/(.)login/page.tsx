import { SigninFormBoundary } from '@/component/login/signin-form';

export default function ModalLoginPage() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/10 backdrop-blur-sm" />
            <div className="relative mx-4 w-full max-w-md rounded-2xl bg-white shadow-2xl">
                <SigninFormBoundary modal />
            </div>
        </div>
    );
}
