'use client';
import { useQueryClient } from '@tanstack/react-query';
import { Check, ListFilter, LoaderCircle, Plus, Trash, X } from 'lucide-react';
import { useState } from 'react';

import { useWidgetAuth } from '@/app/widgets/_lib/context';
import {
    getGetWidgetTasksQueryKey,
    useCreateWidgetTask,
    useGetWidgetTasks,
    useUpdateWidgetTask,
} from '@/lib/api/generated/endpoints/widgets/widgets';
import { formatDueDate } from '@/lib/widgets/formatDueDate';

type Tab = 'active' | 'completed';

type PriorityFilter = 'all' | 'High' | 'Medium' | 'Low';

const priorityLabel: Record<PriorityFilter, string> = {
    all: 'All',
    High: 'High',
    Medium: 'Medium',
    Low: 'Low',
};

const priorityClass: Record<string, string> = {
    High: 'text-power-pink',
    Medium: 'text-body-yellow',
    Low: 'text-mind-cyan',
};

const priorityBackgroundClass: Record<string, string> = {
    High: 'bg-power-pink',
    Medium: 'bg-body-yellow',
    Low: 'bg-mind-cyan',
};

export default function TasksWidget() {
    const { token } = useWidgetAuth();
    const queryClient = useQueryClient();

    const [activeTab, setActiveTab] = useState<Tab>('active');
    const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('all');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isCreateModelOpen, setIsCreateModelOpen] = useState(false);

    const status = activeTab === 'active' ? 'active' : 'completed';

    const {
        data: tasksResponse,
        isPending,
        isFetching,
    } = useGetWidgetTasks(
        {
            status,
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

    const updateTaskMutation = useUpdateWidgetTask({
        request: {
            headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        },
    });

    const createTaskMutation = useCreateWidgetTask({
        request: {
            headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        },
    });

    const isInitialLoading = isPending && !tasksResponse;
    const isUpdating = isFetching && !!tasksResponse;

    const data = tasksResponse?.status === 200 ? tasksResponse.data : null;

    const tasks = data?.tasks ?? [];

    const activeCount = data?.overview.pending ?? 0;
    const completedCount = data?.overview.completed ?? 0;

    const filteredTasks = tasks.filter((task) => {
        if (priorityFilter === 'all') {
            return true;
        }

        return task.priority === priorityFilter;
    });

    const handleTabChange = (tab: Tab) => {
        setActiveTab(tab);
        setPriorityFilter('all');
        setIsFilterOpen(false);
    };

    const handleCompleteTask = async (taskId: string) => {
        if (updateTaskMutation.isPending) {
            return;
        }

        const response = await updateTaskMutation.mutateAsync({
            id: taskId,
            data: {
                status: 'Concluído',
            },
        });

        if (response.status !== 200) {
            return;
        }

        await queryClient.invalidateQueries({
            queryKey: getGetWidgetTasksQueryKey({
                status: 'active',
            }),
        });

        await queryClient.invalidateQueries({
            queryKey: getGetWidgetTasksQueryKey({
                status: 'completed',
            }),
        });
    };

    const handleCreateTask = async ({
        name,
        priority,
        dueDate,
    }: {
        name: string;
        priority?: string;
        dueDate?: string;
    }) => {
        const response = await createTaskMutation.mutateAsync({
            data: {
                name,
                priority,
                dueDate,
            },
        });

        if (response.status !== 201) {
            return;
        }

        await queryClient.invalidateQueries({
            queryKey: getGetWidgetTasksQueryKey({
                status: 'active',
            }),
        });

        await queryClient.invalidateQueries({
            queryKey: getGetWidgetTasksQueryKey({
                status: 'completed',
            }),
        });

        setIsCreateModelOpen(false);
        return true;
    };

    if (isInitialLoading) {
        return (
            <article className="relative flex h-full max-h-[520px] w-full max-w-[400px] items-center justify-center border border-etherea-purple/25 bg-background px-6 text-center">
                <span className="font-mono text-xs text-error-red">
                    Não foi possível carregar suas tarefas.
                </span>
            </article>
        );
    }

    return (
        <article className="relative h-full max-h-[520px] w-full max-w-[400px] border border-etherea-purple/25 bg-background">
            <div className="flex items-center justify-between border-b border-stroke-secondary bg-surface px-4 py-3">
                <div className="flex flex-col">
                    <span className="font-orbitron text-xs tracking-[4px] text-etherea-magenta uppercase">
                        Tasks
                    </span>
                    <span className="font-mono text-[10px] tracking-[3px] text-text-muted uppercase">
                        Active Quests
                    </span>
                </div>
                <button
                    type="button"
                    onClick={() => setIsCreateModelOpen(true)}
                    aria-label="Adicionar Tarefa"
                    className="border border-stroke-secondary p-2 text-text-muted transition duration-300 ease-in-out hover:border-etherea-purple hover:bg-etherea-purple/10 hover:text-etherea-purple hover:shadow-etherea-purple/25"
                >
                    <Plus className="size-4" />
                </button>
            </div>

            <div className="flex items-center gap-4 border-b border-stroke-secondary px-4 py-2">
                <div className="flex items-end gap-2">
                    <span className="font-orbitron text-base text-etherea-purple">
                        {String(activeCount).padStart(2, '0')}
                    </span>
                    <span className="mb-0.5 font-mono text-[10px] tracking-[2px] text-text-muted uppercase">
                        active
                    </span>
                </div>
                <div className="h-4 w-0.5 bg-stroke-secondary"></div>
                <div className="flex items-end gap-2">
                    <span className="font-orbitron text-base text-text-muted">
                        {String(completedCount).padStart(2, '0')}
                    </span>
                    <span className="mb-0.5 font-mono text-[10px] tracking-[2px] text-text-muted uppercase">
                        completed
                    </span>
                </div>
            </div>

            <div className="flex items-center justify-between border-b border-stroke-secondary px-4 text-text-muted uppercase">
                <div className="flex items-center font-orbitron">
                    <button
                        type="button"
                        onClick={() => handleTabChange('active')}
                        className={`cursor-pointer border-b p-2.5 text-[10px] tracking-[2px] uppercase ${
                            activeTab === 'active'
                                ? 'border-etherea-purple text-etherea-purple'
                                : 'border-transparent text-text-muted'
                        }`}
                    >
                        Active
                    </button>
                    <button
                        type="button"
                        onClick={() => handleTabChange('completed')}
                        className={`cursor-pointer border-b p-2.5 text-[10px] tracking-[2px] uppercase ${
                            activeTab === 'completed'
                                ? 'border-etherea-purple text-etherea-purple'
                                : 'border-transparent text-text-muted'
                        }`}
                    >
                        Completed
                    </button>
                </div>
                <button
                    type="button"
                    onClick={() => setIsFilterOpen((previous) => !previous)}
                    className={`flex cursor-pointer items-center gap-1.5 py-1 text-[10px] tracking-[2px] uppercase transition-colors ${priorityFilter !== 'all' ? 'text-etherea-purple' : 'text-text-muted hover:text-text-primary'}`}
                >
                    <ListFilter className="size-3" />
                    <span>Filter</span>
                </button>

                {isFilterOpen && (
                    <div className="absolute top-full right-4 z-30 mt-1 w-32 border border-stroke-secondary bg-surface p-1 shadow-lg">
                        {(Object.keys(priorityLabel) as PriorityFilter[]).map((filter) => (
                            <button
                                key={filter}
                                type="button"
                                onClick={() => {
                                    setPriorityFilter(filter);
                                    setIsFilterOpen(false);
                                }}
                                className={`block w-full px-2 py-1.5 text-left font-mono text-[10px] uppercase transition-colors hover:bg-etherea-purple/10 ${
                                    priorityFilter === filter
                                        ? 'text-etherea-purple'
                                        : 'text-text-muted'
                                }`}
                            >
                                {priorityLabel[filter]}
                            </button>
                        ))}
                    </div>
                )}
            </div>
            <div className="relative max-h-[350px] overflow-auto font-mono">
                {isUpdating && (
                    <div className="absolute inset-0 z-20 flex items-start justify-center bg-background/30 pt-6 backdrop-blur-[1px]">
                        <LoaderCircle className="size-4 animate-spin text-etherea-purple" />
                    </div>
                )}

                {filteredTasks.length === 0 ? (
                    <div className="flex h-[250px] items-center justify-center px-6 text-center">
                        <span className="font-mono text-[10px] tracking-[1.5px] text-text-muted uppercase">
                            {priorityFilter !== 'all'
                                ? 'Nenhuma tarefa encontrada com o filtro selecionado.'
                                : activeTab === 'active'
                                  ? 'Nenhuma tarefa ativa.'
                                  : 'Nenhuma tarefa concluída.'}
                        </span>
                    </div>
                ) : (
                    filteredTasks.map((task) => {
                        const isCompleted = task.status === 'Concluído';

                        return (
                            <div
                                key={task.id}
                                className="group flex items-center gap-4 bg-transparent px-4 py-2 transition-colors hover:bg-surface/50"
                            >
                                <button
                                    type="button"
                                    disabled={isCompleted || updateTaskMutation.isPending}
                                    onClick={() => handleCompleteTask(task.id)}
                                    className={`flex size-4 shrink-0 items-center justify-center border transition-colors ${
                                        isCompleted
                                            ? 'border-etherea-purple bg-etherea-purple text-background'
                                            : 'border-stroke-secondary hover:border-etherea-purple'
                                    } disabled:cursor-default`}
                                    aria-label={
                                        isCompleted ? 'Tarefa concluída' : 'Marcar como concluída'
                                    }
                                >
                                    {isCompleted && <Check className="size-3" />}
                                </button>

                                <div className="min-w-0 flex-1">
                                    <span
                                        className={`block truncate text-sm ${
                                            isCompleted
                                                ? 'text-text-muted line-through'
                                                : 'text-text-primary'
                                        }`}
                                    >
                                        {task.name}
                                    </span>

                                    <div className="my-1 flex flex-wrap items-center gap-3 text-[10px] text-text-muted uppercase">
                                        {task.specializations.length > 0 && (
                                            <span className="border border-text-muted px-1.5 py-0.5">
                                                {task.specializations[0].name}
                                            </span>
                                        )}

                                        {task.dueDate && <span>{formatDueDate(task.dueDate)}</span>}

                                        {task.priority && (
                                            <div
                                                className={`flex items-center gap-1 ${
                                                    priorityClass[task.priority] ??
                                                    'text-text-muted'
                                                }`}
                                            >
                                                <div
                                                    className={`size-1 ${
                                                        priorityBackgroundClass[task.priority] ??
                                                        'bg-text-muted'
                                                    }`}
                                                ></div>
                                                <span>{task.priority}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
            <div className="absolute bottom-0 flex w-full items-center justify-between border-t border-stroke-secondary bg-surface px-4 py-2 font-mono text-[10px] tracking-[1.5px] text-text-muted uppercase">
                <span>ETHEREA // QUEST LOG</span>
                <div className="flex items-center gap-1">
                    <div className="size-1 bg-etherea-purple"></div>
                    <div className="size-1 bg-etherea-purple"></div>
                    <div className="size-1 bg-etherea-purple"></div>
                    <div className="size-1 bg-etherea-purple"></div>
                </div>
            </div>
        </article>
    );
}
