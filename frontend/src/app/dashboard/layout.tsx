'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { authClient } from '../_lib/auth-client';

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();

    useEffect(() => {
        if (!isPending && !session) {
            router.replace('/auth');
        }
    }, [isPending, session, router]);

    if (isPending || !session) {
        return null;
    }

    return children;
}
