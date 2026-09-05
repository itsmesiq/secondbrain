'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';

import { authClient } from '../_lib/auth-client';
import { WidgetAuthContext } from './_lib/context';

function WidgetsLayoutContent({ children }: Readonly<{ children: React.ReactNode }>) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const { data: session, isPending } = authClient.useSession();
    const token = searchParams.get('token');

    useEffect(() => {
        if (!isPending && !session && !token) {
            router.replace('/auth');
        }
    }, [isPending, session, token, router]);

    if (isPending) {
        return null;
    }

    if (!session && !token) {
        return null;
    }

    return <WidgetAuthContext.Provider value={{ token }}>{children}</WidgetAuthContext.Provider>;
}

export default function WidgetsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <Suspense fallback={null}>
            <WidgetsLayoutContent>{children}</WidgetsLayoutContent>
        </Suspense>
    );
}
