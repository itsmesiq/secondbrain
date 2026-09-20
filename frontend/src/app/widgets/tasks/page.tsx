'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

import TasksWidget from '@/components/widgets/tasks';
import { getWidgetTheme } from '@/lib/widgets/config';

function TasksContent() {
    const searchParams = useSearchParams();
    const urlTheme = getWidgetTheme(searchParams.get('theme'));

    return (
        <section
            data-theme={urlTheme}
            className="flex h-screen w-full items-center justify-center bg-notion-background"
        >
            <TasksWidget />
        </section>
    );
}

export default function TasksPage() {
    return (
        <Suspense fallback={null}>
            <TasksContent />
        </Suspense>
    );
}
