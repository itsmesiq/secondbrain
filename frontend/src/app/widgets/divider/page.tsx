'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

import Divider from '@/components/widgets/divider';
import { getWidgetTheme } from '@/lib/widgets/config';

function DividerContent() {
    const searchParams = useSearchParams();
    const urlTheme = getWidgetTheme(searchParams.get('theme'));

    return (
        <section
            data-theme={urlTheme}
            className="flex h-screen w-full items-center justify-center bg-notion-background"
        >
            <Divider />
        </section>
    );
}

export default function DividerPage() {
    return (
        <Suspense fallback={null}>
            <DividerContent />
        </Suspense>
    );
}
