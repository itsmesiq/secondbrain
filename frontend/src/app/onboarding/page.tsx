'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { EthereaLogo } from '@/components/images';
import IdentityStep from '@/components/onboarding/IdentityStep';
import NotionStep from '@/components/onboarding/NotionStep';
import OrderQuizStep from '@/components/onboarding/OrderQuizStep';
import SpecializationStep from '@/components/onboarding/SpecializationStep';
import TemplateStep from '@/components/onboarding/TemplateStep';
import { useGetNotionStatus } from '@/lib/api/generated/endpoints/notion/notion';
import { useGetOnboardingStatus } from '@/lib/api/generated/endpoints/onboarding/onboarding';
import type { OnboardingVisualStep } from '@/types/onboarding.types';

import { authClient } from '../_lib/auth-client';

export default function OnboardingPage() {
    const router = useRouter();

    const [visualStep, setVisualStep] = useState<OnboardingVisualStep>('template');

    const {
        data: onboardingStatus,
        isPending: isOnboardingPending,
        isError: isOnboardingError,
    } = useGetOnboardingStatus({
        query: {
            select: (response) => (response.status === 200 ? response.data : null),
        },
    });

    const {
        data: notionStatus,
        isPending: isNotionPending,
        isError: isNotionError,
    } = useGetNotionStatus({
        query: {
            select: (response) => (response.status === 200 ? response.data : null),
        },
    });

    const initialStep: OnboardingVisualStep | 'completed' | null = (() => {
        if (notionStatus === undefined || onboardingStatus === undefined) {
            return null;
        }

        if (notionStatus === null || onboardingStatus === null) {
            return null;
        }

        if (!notionStatus.connected) {
            return 'template';
        }

        switch (onboardingStatus.currentStep) {
            case 'notion':
                return 'notion';

            case 'identity':
                return 'identity';

            case 'specializations':
                return 'specializations';

            case 'order-quiz':
                return 'order-quiz';

            case 'completed':
                return 'completed';

            default:
                return 'template';
        }
    })();

    useEffect(() => {
        if (initialStep === 'completed') {
            router.push('/dashboard');
        }
    }, [initialStep, router]);

    if (isOnboardingPending || isNotionPending) {
        return (
            <div className="flex h-screen items-center justify-center bg-background">
                <Image src={EthereaLogo} alt="Etherea Logo" className="max-w-lg animate-pulse" />
            </div>
        );
    }

    if (
        isOnboardingError ||
        isNotionError ||
        !onboardingStatus ||
        !notionStatus ||
        initialStep === null
    ) {
        return (
            <div className="flex h-screen items-center justify-center bg-background">
                <p className="font-mono text-base text-error-red">
                    Error loading onboarding status.
                </p>
            </div>
        );
    }

    if (initialStep === 'completed') {
        return (
            <div className="flex h-screen items-center justify-center bg-background">
                <Image src={EthereaLogo} alt="Etherea Logo" className="max-w-lg animate-pulse" />
            </div>
        );
    }

    const currentStep = visualStep ?? initialStep;

    const handleNotionConnect = async () => {
        await authClient.linkSocial({
            provider: 'notion',
            callbackURL: `${process.env.NEXT_PUBLIC_BASE_URL}/onboarding`,
        });
    };

    const handleTemplateContinue = () => {
        setVisualStep('notion');
    };

    const renderStep = () => {
        switch (currentStep) {
            case 'template':
                return (
                    <TemplateStep
                        onContinue={handleTemplateContinue}
                        templateUrl={process.env.NEXT_PUBLIC_NOTION_TEMPLATE_URL}
                    />
                );

            case 'notion':
                return <NotionStep handleNotionConnect={handleNotionConnect} />;

            case 'identity':
                return <IdentityStep />;

            case 'specializations':
                return <SpecializationStep />;

            case 'order-quiz':
                return <OrderQuizStep />;
        }
    };

    return <main className="w-full">{renderStep()}</main>;
}
