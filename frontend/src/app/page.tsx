'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { EthereaLogo } from '@/components/images';
import { useGetOnboardingStatus } from '@/lib/api/generated/endpoints/onboarding/onboarding';

import { authClient } from './_lib/auth-client';

export default function Home() {
    const router = useRouter();
    const { data: session, isPending: isSessionPending } = authClient.useSession();

    const {
        data: onboardingStatus,
        isPending: isOnboardingPending,
        isError: isOnboardingError,
    } = useGetOnboardingStatus({
        query: {
            enabled: !!session && !isSessionPending,
            select: (response) => (response.status === 200 ? response.data.completed : false),
        },
    });

    useEffect(() => {
        if (isSessionPending) {
            return;
        }

        if (!session) {
            router.replace('/auth');
            return;
        }

        if (isOnboardingPending) {
            return;
        }

        if (isOnboardingError) {
            router.replace('/onboarding');
            return;
        }

        router.replace(onboardingStatus ? '/dashboard' : '/onboarding');
    }, [
        isSessionPending,
        session,
        isOnboardingPending,
        isOnboardingError,
        onboardingStatus,
        router,
    ]);

    return (
        <div className="flex h-screen items-center justify-center bg-background">
            <Image src={EthereaLogo} alt="Etherea Logo" className="max-w-lg animate-pulse" />
        </div>
    );
}
