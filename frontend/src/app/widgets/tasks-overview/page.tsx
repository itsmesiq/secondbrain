'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

import TasksOverview from '@/components/widgets/tasksOverview';
import { getWidgetTheme } from '@/lib/widgets/config';

function TasksOverviewContent() {
    const searchParams = useSearchParams();
    const urlTheme = getWidgetTheme(searchParams.get('theme'));

    return (
        <section
            data-theme={urlTheme}
            className="flex h-screen w-full items-center justify-center bg-notion-background"
        >
            <TasksOverview />
        </section>
    );
}

export default function TasksOverviewPage() {
    return (
        <Suspense fallback={null}>
            <TasksOverviewContent />
        </Suspense>
    );
}
