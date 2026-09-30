'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

import ProfileCard from '@/components/widgets/profileCard';
import { getWidgetTheme } from '@/lib/widgets/config';

function ProfileContent() {
    const searchParams = useSearchParams();
    const urlTheme = getWidgetTheme(searchParams.get('theme'));

    const profileTest = {
        name: 'Siq',
        avatar: '/images/characters/character-messenger.jpg',
        mysticOrder: 'Arcane',
        level: 1,
        xp: 35,
        requiredXp: 100,
        gold: 50,
        title: 'The Echo',
    };

    return (
        <section
            data-theme={urlTheme}
            className="flex h-screen w-full items-center justify-center bg-notion-background"
        >
            <ProfileCard {...profileTest} />
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
