'use client';
import { LoaderCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

import ProfileCard from '@/components/widgets/profileCard';
import { useGetWidgetProfile } from '@/lib/api/generated/endpoints/widgets/widgets';
import { getWidgetTheme } from '@/lib/widgets/config';

import { useWidgetAuth } from '../_lib/context';

function ProfileContent() {
    const searchParams = useSearchParams();
    const urlTheme = getWidgetTheme(searchParams.get('theme'));
    const { token } = useWidgetAuth();

    const {
        data: profileResponse,
        isPending,
        isError,
    } = useGetWidgetProfile({
        request: token
            ? {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              }
            : undefined,
    });

    const profile = profileResponse?.status === 200 ? profileResponse.data : null;

    if (isPending) {
        return (
            <section
                data-theme={urlTheme}
                className="flex h-screen w-full items-center justify-center bg-notion-background"
            >
                <LoaderCircle
                    className="size-6 animate-spin text-etherea-purple"
                    aria-label="Loading Profile"
                />
            </section>
        );
    }

    if (isError || !profile) {
        return (
            <section
                data-theme={urlTheme}
                className="flex h-screen w-full items-center justify-center bg-notion-background"
            >
                <span className="font-mono text-xs text-error-red">Failed to load profile.</span>
            </section>
        );
    }

    return (
        <section
            data-theme={urlTheme}
            className="flex h-screen w-full items-center justify-center bg-notion-background"
        >
            <ProfileCard
                name={profile.name}
                avatar={profile.avatar}
                mysticOrder={profile.mysticOrder}
                level={profile.level}
                xp={profile.xp}
                requiredXp={profile.requiredXp ?? profile.xp}
                gold={profile.gold}
                title={profile.title}
            />
        </section>
    );
}

export default function ProfilePage() {
    return (
        <Suspense fallback={null}>
            <ProfileContent />
        </Suspense>
    );
}
