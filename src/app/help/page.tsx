import Link from 'next/link';

export default function HelpPage() {
    const faqs = [
        {
            question: 'How do I reset my password?',
            answer: 'To reset your password, go to the login page and click on the "Forgot Password" link. Follow the instructions sent to your registered email address to set a new password.'
        },
        {
            question: 'Can I change my username?',
            answer: 'Usernames are unique and cannot be changed after registration to maintain account integrity. If you need to use a different username, you will need to create a new account.'
        },
        {
            question: 'How do I create a new post?',
            answer: 'Navigate to the "Post" section from the main menu and click on the "Create New Post" button. Fill in the required fields in the editor and click "Publish" to make it live.'
        },
        {
            question: 'What are the supported data formats for the dashboard?',
            answer: 'The dashboard currently supports data visualization from CSV, JSON, and XML files. You can upload your data files in the "Data" section to see them reflected in the dashboard charts.'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
            <main className="mx-auto max-w-4xl px-4 py-12">
                <div className="mb-12 text-center">
                    <h1 className="bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent md:text-5xl">
                        Help & Support
                    </h1>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">We&apos;re here to help you get the most out of our platform.</p>
                </div>

                <div>
                    <h2 className="mb-8 border-l-4 border-blue-500 pl-4 text-3xl font-bold">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        {faqs.map((faq, index) => (
                            <div key={index} className="rounded-lg bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg dark:bg-gray-800">
                                <h3 className="mb-3 text-xl font-semibold">{faq.question}</h3>
                                <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <h2 className="mb-4 text-3xl font-bold">Still need help?</h2>
                    <p className="mb-6 text-lg text-gray-600 dark:text-gray-400">
                        If you can&apos;t find the answer you&apos;re looking for, please don&apos;t hesitate to reach out to our support team.
                    </p>
                    <Link
                        href="/"
                        className="inline-flex transform items-center rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-transform hover:scale-105 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                    >
                        Contact Support
                        <svg className="ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path
                                fillRule="evenodd"
                                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </Link>
                </div>
            </main>
        </div>
    );
}
