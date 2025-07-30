import React from 'react';

export const dynamic = 'force-dynamic';

export default async function DynamicLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return <>{children}</>;
}
