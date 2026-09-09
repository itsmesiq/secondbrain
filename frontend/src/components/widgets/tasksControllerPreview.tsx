'use client';

import { ChevronLeft, ChevronRight, Clock, Plus, SquareArrowOutUpRight, X } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { getWidgetColor, getWidgetTheme } from '@/lib/widgets/config';
import { formatDueDate } from '@/lib/widgets/formatDueDate';
import type { WidgetProps } from '@/types/widgets.types';

import Dropdown from '../ui/Dropdown';
import WaveGlowBackground from '../ui/WaveGlowBackground';

export default function TasksControllerPreview({ theme = 'dark', color = 'purple' }: WidgetProps) {
    const searchParams = useSearchParams();
    const urlTheme = searchParams.get('theme');
    const urlColor = searchParams.get('color');

    const resolvedTheme = urlTheme ? getWidgetTheme(urlTheme) : theme;
    const resolvedColor = urlColor ? getWidgetColor(urlColor) : color;

    const [selectedDate, setSelectedDate] = useState<Date>(() => new Date());
    const [selectedProject, setSelectedProject] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState(false);

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
            .replace(/\sde\s/, ' ')
            .replace(/^\w/, (letter) => letter.toUpperCase());
    };

    const isToday = (date: Date) => {
        return date.toDateString() === new Date().toDateString();
    };

    const isSelected = (date: Date) => {
        return date.toDateString() === selectedDate.toDateString();
    };

    const sortedTasks = [
        {
            id: '1',
            title: 'Tarefa 1',
            description: 'Descrição da tarefa 1',
            dueDate: '2026-09-09',
            category: '🎮 Hobbies',
            project: {
                id: '1',
                name: 'Projeto 1',
            },
            status: 'Em andamento',
            priority: '🔴 Alta',
            url: 'https://secondbrain-itsmesiq.vercel.app/auth/',
        },
        {
            id: '2',
            title: 'Tarefa 2',
            description: 'Descrição da tarefa 2',
            dueDate: '2026-09-09',
            category: '📚 Estudos',
            project: {
                id: '1',
                name: 'Projeto 1',
            },
            status: 'Concluído',
            priority: '🟡 Média',
            url: 'https://secondbrain-itsmesiq.vercel.app/auth/',
        },
        {
            id: '3',
            title: 'Tarefa 3',
            description: 'Descrição da tarefa 3',
            dueDate: '2026-09-09',
            category: '🏃 Saúde',
            project: {
                id: '2',
                name: 'Projeto 2',
            },
            status: 'A fazer',
            priority: '🟢 Baixa',
            url: 'https://secondbrain-itsmesiq.vercel.app/auth/',
        },
    ];

    const areaOptions = [
        { id: '🎮 Hobbies', name: '🎮 Hobbies' },
        { id: '💰 Finanças', name: '💰 Finanças' },
        { id: '🏃 Saúde', name: '🏃 Saúde' },
        { id: '🏠 Pessoal', name: '🏠 Pessoal' },
        { id: '💼 Carreira', name: '💼 Carreira' },
        { id: '📚 Estudos', name: '📚 Estudos' },
        { id: '🎓 Faculdade', name: '🎓 Faculdade' },
        { id: '💻 Dev', name: '💻 Dev' },
    ];

    const priorityOptions = [
        { id: '🟢 Baixa', name: '🟢 Baixa' },
        { id: '🟡 Média', name: '🟡 Média' },
        { id: '🔴 Alta', name: '🔴 Alta' },
    ];

    const projectsOption = [
        {
            id: '1',
            name: 'Projeto 1',
        },
        {
            id: '2',
            name: 'Projeto 2',
        },
        {
            id: '3',
            name: 'Projeto 3',
        },
    ];

    const [selectedArea, setSelectedArea] = useState('');
    const [priority, setPriority] = useState('');

    return (
        <div
            data-theme={resolvedTheme}
            data-color={resolvedColor}
            className="relative flex h-145 w-98 flex-col overflow-hidden rounded-4xl bg-widget-background px-6 py-6 shadow-[0_0_32px_0] shadow-[#0F0E0E]/20 2xl:h-175"
        >
            <div className="drop-shadow-[0_2px_8px_rgba(0, 0, 0, 0.25)] relative z-10 flex min-h-0 w-full grow flex-col gap-4 overflow-hidden rounded-2xl border border-widget-foreground/15 bg-notion-background/20 pt-5 shadow-[inset_0_0_16px_1px] shadow-widget-foreground/15 backdrop-blur-sm">
                <div className="flex flex-col gap-3 px-5">
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
                </div>
                <div className="mb-17 flex max-h-full flex-col items-center gap-2 overflow-auto pb-5">
                    {sortedTasks.map((task) => (
                        <div key={task.id} className="w-full px-5">
                            <a
                                href={task.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`relative flex w-full cursor-pointer flex-col items-start gap-2 rounded-2xl border border-foreground/20 bg-widget-background/60 p-3 shadow-[0_3px_0_0] transition-colors duration-300 hover:bg-widget-background/85 ${task.status === '📥 Inbox' ? 'shadow-status-inbox' : ''} ${task.status === 'A fazer' ? 'shadow-status-todo' : ''} ${task.status === 'Em andamento' ? 'shadow-status-inprogress' : ''} ${task.status === '❌ Cancelado' ? 'shadow-status-cancelled' : ''} ${task.status === 'Concluído' ? 'shadow-status-completed' : ''}`}
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

                                    {task.dueDate && (
                                        <div className="ml-auto flex items-center justify-end gap-2">
                                            <div
                                                className={`rounded-full px-2 py-0.5 text-xs ${task.priority === '🔴 Alta' ? 'bg-status-cancelled/50' : task.priority === '🟡 Média' ? 'bg-status-paused/50' : task.priority === '🟢 Baixa' ? 'bg-status-completed/50' : ''}`}
                                            >
                                                <span>{task.priority}</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-widget-foreground">
                                                <Clock className="size-3" />
                                                <span>{formatDueDate(task.dueDate)}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
            <div className="absolute bottom-0 left-0 z-20 mx-6 mb-5 w-[344px] rounded-b-2xl bg-widget-accent/30 px-4 py-3 backdrop-blur-md">
                <button
                    type="button"
                    onClick={() => setIsModalOpen((prev) => !prev)}
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-widget-background py-3 font-sans text-sm font-semibold tracking-[2.4px] transition-colors duration-500 ease-in-out hover:text-widget-accent"
                >
                    <Plus className="size-5" />
                    <span>Adicionar Tarefa</span>
                </button>
            </div>
            <div className="absolute top-1/2 left-1/2 z-0 -translate-x-1/2 -translate-y-1/2">
                <WaveGlowBackground />
            </div>

            {isModalOpen && (
                <div className="absolute bottom-0 left-0 z-50 h-full w-full shrink">
                    <div className="relative h-full w-full">
                        <div className="absolute bottom-0 z-10 flex max-h-[580px] w-full flex-col items-center justify-center gap-6 overflow-hidden rounded-t-4xl bg-widget-background py-6">
                            <div className="flex w-full items-center justify-between px-8">
                                <h2 className="font-mono text-lg">Adicionar Tarefa</h2>
                                <button
                                    type="button"
                                    aria-label="Close modal"
                                    onClick={() => setIsModalOpen(false)}
                                    className="cursor-pointer p-1 text-widget-foreground/60 transition-colors hover:text-widget-foreground"
                                >
                                    <X className="size-6" />
                                </button>
                            </div>
                            <form className="flex min-h-0 w-full flex-1 flex-col">
                                <div className="flex w-full flex-col gap-4 overflow-auto text-widget-foreground">
                                    <div className="flex flex-col gap-2 px-8">
                                        <label
                                            htmlFor="task-title"
                                            className="font-sans text-sm font-medium"
                                        >
                                            Título <span className="text-widget-accent">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="task-title"
                                            placeholder="Digite o título da tarefa"
                                            className="rounded-lg border border-widget-foreground/20 bg-widget-background px-4 py-2 font-sans text-sm transition-colors outline-none placeholder:text-foreground/40 focus:border-widget-accent"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2 px-8">
                                        <span className="font-sans text-sm font-medium">
                                            Projeto
                                        </span>
                                        <Dropdown
                                            options={projectsOption}
                                            value={selectedProject}
                                            onChange={setSelectedProject}
                                            placeholder="Selecione um projeto"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2 px-8">
                                        <span className="font-sans text-sm font-medium">Área</span>
                                        <Dropdown
                                            options={areaOptions}
                                            value={selectedArea}
                                            onChange={setSelectedArea}
                                            placeholder="Selecione uma área"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2 px-8">
                                        <span className="font-sans text-sm font-medium">
                                            Prioridade
                                        </span>
                                        <Dropdown
                                            options={priorityOptions}
                                            value={priority}
                                            onChange={setPriority}
                                            placeholder="Selecione uma prioridade"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2 px-8">
                                        <label
                                            htmlFor="task-due-date"
                                            className="font-sans text-sm font-medium"
                                        >
                                            Prazo
                                        </label>
                                        <input
                                            id="task-due-date"
                                            type="text"
                                            inputMode="numeric"
                                            placeholder="09/09/2026"
                                            maxLength={10}
                                            className="h-[41.6px] rounded-lg border border-widget-foreground/20 bg-widget-background px-4 py-2 font-sans text-sm transition-colors outline-none placeholder:text-foreground/40 focus:border-widget-accent"
                                        />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="mx-auto mt-6 flex w-full max-w-[328px] cursor-pointer justify-center rounded-lg bg-widget-accent py-3 font-sans text-sm font-semibold tracking-[2.4px] transition-all duration-500 ease-in-out hover:scale-103"
                                >
                                    <div className="flex items-center justify-center gap-2">
                                        <Plus className="size-5" />
                                        <span>Adicionar Tarefa</span>
                                    </div>
                                </button>
                            </form>
                        </div>
                        <button
                            type="button"
                            aria-label="Close modal"
                            className="absolute top-0 z-0 h-full w-full bg-widget-background/50 backdrop-blur-sm"
                            onClick={() => setIsModalOpen(false)}
                        ></button>
                    </div>
                </div>
            )}
        </div>
    );
}
