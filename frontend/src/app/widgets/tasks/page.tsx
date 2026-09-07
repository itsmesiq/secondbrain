'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

import { getWidgetTheme } from '@/lib/widgets/config';

import { useWidgetApi } from '../_lib/api';

function TasksContent() {
    const { widgetApi } = useWidgetApi();
    const [authenticated, setAuthenticated] = useState<boolean | null>(null);

    const searchParams = useSearchParams();
    const urlTheme = getWidgetTheme(searchParams.get('theme'));

    useEffect(() => {
        widgetApi('/api/widgets/tasks').then((response) => {
            if (!response.ok) {
                console.error('Failed to authenticate widget');
                return;
            }

            setAuthenticated(true);
        });
    }, [widgetApi]);

    if (authenticated !== true) {
        return null;
    }

    return (
        <section
            data-theme={urlTheme}
            className="flex h-screen w-full items-center justify-center bg-notion-background"
        >
            <h1>Tasks</h1>
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
