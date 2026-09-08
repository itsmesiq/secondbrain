'use client';

import {
    ChevronLeft,
    ChevronRight,
    Clock,
    LoaderCircle,
    Plus,
    SquareArrowOutUpRight,
} from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { useWidgetAuth } from '@/app/widgets/_lib/context';
import { useGetWidgetTasks } from '@/lib/api/generated/endpoints/widgets/widgets';
import { GetWidgetTasks200 } from '@/lib/api/generated/schemas';
import { getWidgetColor, getWidgetTheme } from '@/lib/widgets/config';
import type { WidgetProps } from '@/types/widgets.types';

import Dropdown from '../ui/Dropdown';
import WaveGlowBackground from '../ui/WaveGlowBackground';

export default function TasksController({ theme = 'dark', color = 'purple' }: WidgetProps) {
    const searchParams = useSearchParams();
    const urlTheme = searchParams.get('theme');
    const urlColor = searchParams.get('color');

    const resolvedTheme = urlTheme ? getWidgetTheme(urlTheme) : theme;
    const resolvedColor = urlColor ? getWidgetColor(urlColor) : color;

    const { token } = useWidgetAuth();

    const [selectedDate, setSelectedDate] = useState<Date>(() => new Date());
    const [selectedProject, setSelectedProject] = useState<string>('');

    const getWeekDays = (date: Date) => {
        const day = new Date(date);
        const dayOfWeek = day.getDay();
        const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

        day.setDate(day.getDate() + mondayOffset);

        return Array.from({ length: 7 }, (_, index) => {
            const weekDay = new Date(day);
            weekDay.setDate(day.getDate() + index);
            return weekDay;
        });
    };

    const weekDays = getWeekDays(selectedDate);

    const formatWeekDay = (date: Date) => {
        return new Intl.DateTimeFormat('pt-BR', {
            weekday: 'short',
        })
            .format(date)
            .replace('.', '')
            .replace(/^\w/, (letter) => letter.toUpperCase());
    };

    const formatMonthYear = (date: Date) => {
        return new Intl.DateTimeFormat('pt-BR', {
            month: 'long',
            year: 'numeric',
        })
            .format(date)
            .replace('de', '')
            .replace(/^\w/, (letter) => letter.toUpperCase());
    };

    const formatDate = (date: Date) => {
        return [
            date.getFullYear(),
            String(date.getMonth() + 1).padStart(2, '0'),
            String(date.getDate()).padStart(2, '0'),
        ].join('-');
    };

    const date = formatDate(selectedDate);

    const isToday = (date: Date) => {
        return date.toDateString() === new Date().toDateString();
    };

    const isSelected = (date: Date) => {
        return date.toDateString() === selectedDate.toDateString();
    };

    const {
        data: tasksResponse,
        isLoading,
        isFetching,
        isError,
    } = useGetWidgetTasks(
        {
            date,
            projectId: selectedProject,
        },
        {
            query: {
                placeholderData: (previousData) => previousData,
            },
            request: {
                headers: token ? { Authorization: `Bearer ${token}` } : undefined,
            },
        },
    );

    const isInitialLoading = isLoading && !tasksResponse;
    const isUpdating = isFetching && !!tasksResponse;

    if (isInitialLoading) {
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
    const projectsOption =
        projects.map((project) => ({
            id: project.id,
            name: project.name,
        })) ?? [];

    return (
        <div
            data-theme={resolvedTheme}
            data-color={resolvedColor}
            className="relative flex h-175 w-98 flex-col overflow-hidden rounded-4xl bg-widget-background px-6 py-6 shadow-[0_0_32px_0] shadow-[#0F0E0E]/20"
        >
            <div className="drop-shadow-[0_2px_8px_rgba(0, 0, 0, 0.25)] relative z-10 h-full w-full overflow-auto rounded-2xl border border-widget-foreground/15 bg-notion-background/20 px-5 py-5 shadow-[inset_0_0_16px_1px] shadow-widget-foreground/15 backdrop-blur-sm">
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between text-widget-foreground">
                        <button type="button" className="cursor-pointer">
                            <ChevronLeft className="size-8" />
                        </button>
                        <span className="font-orbitron tracking-[2.4px]">
                            {formatMonthYear(selectedDate)}
                        </span>
                        <button type="button" className="cursor-pointer">
                            <ChevronRight className="size-8" />
                        </button>
                    </div>
                    <div className="flex items-center justify-between px-2 font-mono text-sm">
                        {weekDays.map((day) => (
                            <button
                                key={day.toISOString()}
                                type="button"
                                onClick={() => setSelectedDate(day)}
                                className="flex cursor-pointer flex-col items-center gap-1"
                            >
                                <span className="opacity-50">{formatWeekDay(day)}</span>
                                <span
                                    className={`flex h-7 w-7 items-center justify-center rounded-full ${isSelected(day) ? 'bg-widget-accent font-bold text-notion-background' : isToday(day) ? 'bg-widget-accent/15 text-widget-foreground' : 'bg-transparent text-widget-foreground'}`}
                                >
                                    {day.getDate()}
                                </span>
                            </button>
                        ))}
                    </div>

                    <Dropdown
                        options={projectsOption}
                        value={selectedProject}
                        onChange={setSelectedProject}
                    />

                    <div className="flex flex-col items-center gap-2">
                        {isUpdating ? (
                            <LoaderCircle
                                className="h-5 w-5 animate-spin text-widget-accent"
                                aria-label="Loading"
                            />
                        ) : (
                            tasks.map((task) => (
                                <a
                                    href={task.url}
                                    target="_blank"
                                    key={task.id}
                                    className="flex w-full cursor-pointer flex-col items-start gap-2 rounded-2xl border border-foreground/20 bg-widget-background/60 p-3"
                                >
                                    <div className="flex w-full items-start justify-between">
                                        <div className="flex flex-col items-start gap-1 text-foreground">
                                            <span className="font-mono text-sm">{task.title}</span>
                                            {task.description && (
                                                <p className="font-sans text-xs opacity-60">
                                                    {task.description}
                                                </p>
                                            )}
                                        </div>
                                        <SquareArrowOutUpRight className="h-4 w-4" />
                                    </div>
                                    <div className="flex w-full items-center justify-between font-sans text-xs text-foreground">
                                        {task.category && (
                                            <span className="rounded-full border border-widget-accent bg-widget-accent/15 px-3 py-0.5 text-widget-accent">
                                                {task.category}
                                            </span>
                                        )}

                                        <div className="flex items-center gap-1 text-widget-foreground">
                                            <Clock className="size-3" />
                                            <span>{task.dueDate}</span>
                                        </div>
                                    </div>
                                </a>
                            ))
                        )}
                    </div>
                </div>
            </div>
            <button className="sticky bottom-0 left-0 z-20 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-widget-accent py-3 font-sans text-sm font-semibold tracking-[2.4px] transition-transform duration-500 ease-in-out hover:translate-y-0.5 hover:scale-99">
                <Plus className="size-5 text-widget-foreground" />
                <span>Adicionar Tarefa</span>
            </button>
            <div className="absolute top-1/2 left-1/2 z-0 -translate-x-1/2 -translate-y-1/2">
                <WaveGlowBackground />
            </div>
        </div>
    );
}
