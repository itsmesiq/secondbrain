'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { EthereaLogo } from '@/components/images';
import NotionStep from '@/components/onboarding/NotionStep';
import TemplateStep from '@/components/onboarding/TemplateStep';
import { useGetOnboardingStatus } from '@/lib/api/generated/endpoints/onboarding/onboarding';
import type { OnboardingVisualStep } from '@/types/onboarding.types';

import { authClient } from '../_lib/auth-client';

export default function OnboardingPage() {
    const [visualStep, setVisualStep] = useState<OnboardingVisualStep>('template');
    const [notionConnected, setNotionConnected] = useState<boolean | null>(null);

    useEffect(() => {
        const fetchNotionStatus = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/notion/status`,
                    {
                        credentials: 'include',
                    },
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch Notion status');
                }

                const data = await response.json();
                setNotionConnected(data.connected);
            } catch (error) {
                console.error('Error fetching Notion status:', error);
            }
        };
        fetchNotionStatus();
    }, []);

    const {
        data: onboardingStatus,
        isPending,
        isError,
    } = useGetOnboardingStatus({
        query: {
            select: (response) => (response.status === 200 ? response.data : null),
        },
    });

    if (isPending) {
        return (
            <div className="flex h-screen items-center justify-center bg-background">
                <Image src={EthereaLogo} alt="Etherea Logo" className="max-w-lg animate-pulse" />
            </div>
        );
    }

    if (isError || !onboardingStatus) {
        return (
            <div className="font-mono text-base text-error-red">
                Error loading onboarding status.
            </div>
        );
    }

    const handleNotionConnect = async () => {
        await authClient.linkSocial({
            provider: 'notion',
            callbackURL: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,
        });
    };

    return (
        <main className="w-full">
            <NotionStep handleNotionConnect={handleNotionConnect} />
        </main>
    );
}

function renderStep(step: OnboardingVisualStep) {
    switch (step) {
        case 'template':
            return <TemplateStep />;

        case 'notion':
            return <div>Notion Step</div>;

        case 'identity':
            return <div>Identity Step</div>;

        case 'specializations':
            return <div>Specializations Step</div>;

        case 'order-quiz':
            return <div>Order Quiz Step</div>;

        default:
            break;
    }
}
