'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

import HabitsWidget from '@/components/widgets/habits';
import { getWidgetTheme } from '@/lib/widgets/config';

function HabitsContent() {
    const searchParams = useSearchParams();
    const urlTheme = getWidgetTheme(searchParams.get('theme'));

    return (
        <section
            data-theme={urlTheme}
            className="flex h-screen w-full items-center justify-center bg-notion-background px-16"
        >
            <HabitsWidget />
        </section>
    );
}

export default function HabitsPage() {
    return (
        <Suspense fallback={null}>
            <HabitsContent />
        </Suspense>
    );
}
