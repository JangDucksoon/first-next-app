import React from 'react';

export const dynamic = 'force-static';

export default async function StaticLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return <>{children}</>;
}
