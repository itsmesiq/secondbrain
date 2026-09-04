'use client';

import { LoaderCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

import { useGetWidgetTasksOverview } from '@/lib/api/generated/endpoints/widgets/widgets';
import { GetWidgetTasksOverview200 } from '@/lib/api/generated/schemas';
import { getWidgetColor, getWidgetTheme } from '@/lib/widgets/config';
import type { WidgetProps } from '@/types/widgets.types';

export default function TasksOverview({ theme = 'dark', color = 'purple' }: WidgetProps) {
    const searchParams = useSearchParams();
    const urlTheme = searchParams.get('theme');
    const urlColor = searchParams.get('color');

    const resolvedTheme = urlTheme ? getWidgetTheme(urlTheme) : theme;
    const resolvedColor = urlColor ? getWidgetColor(urlColor) : color;

    const { data: tasksOverview, isLoading, isError } = useGetWidgetTasksOverview();

    if (isLoading) {
        return (
            <div>
                <LoaderCircle className="h-5 w-5 animate-spin" aria-label="Loading" />
            </div>
        );
    }

    if (isError || !tasksOverview) {
        return <div className="text-xs text-red-400">Error loading tasks overview</div>;
    }

    const tasks = tasksOverview.data as GetWidgetTasksOverview200;

    return (
        <div data-theme={resolvedTheme} data-color={resolvedColor}>
            <h1>Tasks Overview</h1>
            <p>Total: {tasks.total}</p>
            <p>Completed: {tasks.completed}</p>
            <p>Pending: {tasks.pending}</p>
            <p>Completion Rate: {tasks.completionRate}</p>
            <p>Streak: {tasks.currentStreak}</p>
        </div>
    );
}
