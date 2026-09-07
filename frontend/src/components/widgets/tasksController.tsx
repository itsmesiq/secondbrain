'use client';

import { ChevronLeft, ChevronRight, LoaderCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { useWidgetAuth } from '@/app/widgets/_lib/context';
import { useGetWidgetTasks } from '@/lib/api/generated/endpoints/widgets/widgets';
import { GetWidgetTasks200 } from '@/lib/api/generated/schemas';
import { getWidgetColor, getWidgetTheme } from '@/lib/widgets/config';
import type { WidgetProps } from '@/types/widgets.types';

export default function TasksController({ theme = 'dark', color = 'purple' }: WidgetProps) {
    const searchParams = useSearchParams();
    const urlTheme = searchParams.get('theme');
    const urlColor = searchParams.get('color');

    const resolvedTheme = urlTheme ? getWidgetTheme(urlTheme) : theme;
    const resolvedColor = urlColor ? getWidgetColor(urlColor) : color;

    const { token } = useWidgetAuth();

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedProject, setSelectedProject] = useState<string | undefined>();

    const date = selectedDate.toISOString().slice(0, 10);

    const {
        data: tasksResponse,
        isLoading,
        isError,
    } = useGetWidgetTasks(
        {
            date,
            projectId: selectedProject,
        },
        {
            request: {
                headers: token ? { Authorization: `Bearer ${token}` } : undefined,
            },
        },
    );

    if (isLoading) {
        return (
            <div>
                <LoaderCircle className="h-5 w-5 animate-spin" aria-label="Loading" />
            </div>
        );
    }

    if (isError || !tasksResponse) {
        return <div className="text-xs text-red-400">Error loading tasks</div>;
    }

    const tasksResponseResolved = tasksResponse?.data as GetWidgetTasks200;

    const tasks = tasksResponseResolved?.tasks ?? [];
    const projects = tasksResponseResolved?.projects ?? [];

    return (
        <div
            data-theme={resolvedTheme}
            data-color={resolvedColor}
            className="relative flex h-107.5 w-98 flex-col justify-center overflow-hidden rounded-4xl bg-widget-background shadow-[0_0_32px_0] shadow-[#0F0E0E]/20"
        >
            <div>
                <ChevronLeft className="size-8" />
                <span>Setembro</span>
                <ChevronRight className="size-8" />
            </div>
        </div>
    );
}
