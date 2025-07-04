import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 px-4 text-white">
            <h1 className="mb-4 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-7xl font-extrabold tracking-tight text-transparent">404</h1>
            <h2 className="mb-2 text-2xl font-semibold md:text-3xl">Page Not Found</h2>
            <p className="mb-6 max-w-md text-center text-gray-400">Sorry, the page you’re looking for doesn’t exist or has been moved.</p>
            <Link href="/" className="inline-block rounded-lg bg-white px-6 py-3 font-medium text-gray-900 transition hover:bg-gray-100">
                Go back home
            </Link>
        </div>
    );
}
