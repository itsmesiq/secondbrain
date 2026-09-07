'use client';

import { ChevronLeft, ChevronRight, LoaderCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { useWidgetAuth } from '@/app/widgets/_lib/context';
import { useGetWidgetTasks } from '@/lib/api/generated/endpoints/widgets/widgets';
import { GetWidgetTasks200 } from '@/lib/api/generated/schemas';
import { getWidgetColor, getWidgetTheme } from '@/lib/widgets/config';
import type { WidgetProps } from '@/types/widgets.types';

import WaveGlowBackground from '../ui/WaveGlowBackground';

export default function TasksController({ theme = 'dark', color = 'purple' }: WidgetProps) {
    const searchParams = useSearchParams();
    const urlTheme = searchParams.get('theme');
    const urlColor = searchParams.get('color');

    const resolvedTheme = urlTheme ? getWidgetTheme(urlTheme) : theme;
    const resolvedColor = urlColor ? getWidgetColor(urlColor) : color;

    const { token } = useWidgetAuth();

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedProject, setSelectedProject] = useState<string | undefined>();
    const today = new Date();

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
            className="relative flex h-107.5 w-98 flex-col overflow-hidden rounded-4xl bg-widget-background px-6 py-6 shadow-[0_0_32px_0] shadow-[#0F0E0E]/20"
        >
            <div className="drop-shadow-[0_2px_8px_rgba(0, 0, 0, 0.25)] relative z-10 h-full w-full rounded-2xl border border-widget-foreground/15 bg-notion-background/20 px-3 py-3 shadow-[inset_0_0_16px_1px] shadow-widget-foreground/15 backdrop-blur-sm">
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between text-widget-foreground">
                        <button type="button" className="cursor-pointer">
                            <ChevronLeft className="size-8" />
                        </button>
                        <span className="font-orbitron tracking-[2.4px]">Setembro 2026</span>
                        <button type="button" className="cursor-pointer">
                            <ChevronRight className="size-8" />
                        </button>
                    </div>
                    <ul className="flex items-center justify-between px-2 font-mono text-sm opacity-50">
                        <li>Seg</li>
                        <li>Ter</li>
                        <li>Qua</li>
                        <li>Qui</li>
                        <li>Sex</li>
                        <li>Sáb</li>
                        <li>Dom</li>
                    </ul>
                </div>
            </div>
            <div className="absolute top-1/2 left-1/2 z-0 -translate-x-1/2 -translate-y-1/2">
                <WaveGlowBackground />
            </div>
        </div>
    );
}
