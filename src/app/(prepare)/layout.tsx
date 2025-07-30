import React from 'react';

export const dynamic = 'force-dynamic';

export default async function PrepareLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return <>{children}</>;
}
