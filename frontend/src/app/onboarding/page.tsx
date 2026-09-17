'use client';
import Image from 'next/image';
import { useState } from 'react';

import { EthereaLogo } from '@/components/images';
import TemplateStep from '@/components/onboarding/TemplateStep';
import { useGetOnboardingStatus } from '@/lib/api/generated/endpoints/onboarding/onboarding';
import type { OnboardingVisualStep } from '@/types/onboarding.types';

export default function OnboardingPage() {
    const [visualStep, setVisualStep] = useState<OnboardingVisualStep>('template');

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

    return <main className="flex min-h-screen">{renderStep(visualStep)}</main>;
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
