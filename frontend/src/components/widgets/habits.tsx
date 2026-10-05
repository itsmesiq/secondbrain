'use client';
import { useQueryClient } from '@tanstack/react-query';
import { Check, LoaderCircle, Plus } from 'lucide-react';
import { useState } from 'react';

import { useWidgetAuth } from '@/app/widgets/_lib/context';
import {
    getGetWidgetHabitsQueryKey,
    getGetWidgetHabitsQueryOptions,
    useCreateHabitCompletion,
    useCreateWidgetHabit,
    useGetWidgetHabits,
} from '@/lib/api/generated/endpoints/widgets/widgets';

import { PixelBorderBL, PixelBorderBR, PixelBorderTL, PixelBorderTR } from '../icons';

export default function HabitsWidget() {
    const { token } = useWidgetAuth();
    const queryClient = useQueryClient();

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [completedHabitIds, setCompletedHabitIds] = useState<Set<string>>(new Set());

    const {
        data: habitsResponse,
        isPending,
        isError,
    } = useGetWidgetHabits(undefined, {
        request: token
            ? {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              }
            : undefined,
    });

    const data = habitsResponse?.status === 200 ? habitsResponse.data : null;

    const habits = data?.habits ?? [];

    const createHabitMutation = useCreateWidgetHabit({
        request: token
            ? {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              }
            : undefined,
    });

    const createHabitCompletionMutation = useCreateHabitCompletion({
        request: token
            ? {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              }
            : undefined,
    });

    const getDateKey = (date: Date) => {
        return [
            date.getFullYear(),
            String(date.getMonth() + 1).padStart(2, '0'),
            String(date.getDate()).padStart(2, '0'),
        ].join('-');
    };

    const todayKey = getDateKey(new Date());

    const isHabitCompletedToday = (habitId: string) => {
        if (completedHabitIds.has(habitId)) {
            return true;
        }

        const habit = habits.find((habit) => habit.id === habitId);

        if (!habit || !habit.lastCompletedAt) {
            return false;
        }

        return habit.lastCompletedAt.slice(0, 10) === todayKey;
    };

    const handleCompleteHabit = async (habitId: string) => {
        if (createHabitCompletionMutation.isPending) {
            return;
        }

        setCompletedHabitIds((prev) => {
            const next = new Set(prev);
            next.add(habitId);
            return next;
        });

        try {
            const response = await createHabitCompletionMutation.mutateAsync({
                id: habitId,
            });

            if (response.status !== 201) {
                setCompletedHabitIds((prev) => {
                    const next = new Set(prev);
                    next.delete(habitId);
                    return next;
                });

                return;
            }

            queryClient.invalidateQueries({
                queryKey: getGetWidgetHabitsQueryKey(),
            });
        } catch {
            setCompletedHabitIds((prev) => {
                const next = new Set(prev);
                next.delete(habitId);
                return next;
            });
        }
    };

    const completedHabits = habits.filter((habit) => isHabitCompletedToday(habit.id)).length;

    const handleCreateHabit = async ({
        name,
        objectiveId,
        specializationIds,
    }: {
        name: string;
        objectiveId?: string;
        specializationIds?: string[];
    }) => {
        const response = await createHabitMutation.mutateAsync({
            data: {
                name,
                objectiveId,
                specializationIds,
            },
        });

        if (response.status !== 201) {
            return;
        }

        setIsCreateModalOpen(false);
        return true;
    };

    if (isPending) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-notion-background">
                <LoaderCircle
                    className="size-6 animate-spin text-etherea-purple"
                    aria-label="Loading Profile"
                />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-notion-background">
                <span className="font-mono text-xs text-error-red">Failed to load habits.</span>
            </div>
        );
    }

    return (
        <article className="relative min-h-[624px] w-[400px] border border-etherea-purple/30 bg-background">
            <div className="flex w-full items-center justify-between bg-etherea-purple/10 px-4 py-3">
                <div>
                    <div className="flex items-start gap-3 font-mono uppercase">
                        <div className="my-1 size-2 bg-etherea-purple shadow-[0_0_6px_0_#9B30FF]"></div>
                        <div className="flex flex-col">
                            <span className="text-xs tracking-[4px] text-etherea-magenta">
                                Habit Tracker
                            </span>
                            <span className="text-[10px] text-text-muted">Daily System</span>
                        </div>
                    </div>
                </div>
                <button
                    type="button"
                    aria-label="Add new Habit"
                    className="flex h-7 w-7 items-center justify-center border border-stroke-secondary"
                >
                    <Plus className="size-4 text-text-muted" />
                </button>
            </div>
            <div>
                <div className="flex items-center justify-between px-4 py-3 uppercase">
                    <span className="font-mono text-[10px] tracking-[3px] text-text-muted">
                        Today&apos;s Progress
                    </span>
                    <span className="font-orbitron text-xs tracking-[1px] text-etherea-cyan">
                        {completedHabits} / {habits.length}
                    </span>
                </div>
                <div></div>
            </div>
            <div className="flex flex-col gap-2 px-3 py-2.5">
                {habits.map((habit) => {
                    const isCompleted = isHabitCompletedToday(habit.id);

                    return (
                        <div key={habit.id} className="border border-stroke-secondary bg-surface">
                            <div className="flex w-full items-center justify-between px-3 py-2.5 font-mono text-[10px] tracking-[2px] text-text-muted uppercase">
                                <span>{habit.name}</span>
                                <button
                                    type="button"
                                    disabled={
                                        isCompleted || createHabitCompletionMutation.isPending
                                    }
                                    onClick={() => handleCompleteHabit(habit.id)}
                                    className={`flex size-5 items-center justify-center border transition-colors ${isCompleted ? 'border-etherea-purple bg-etherea-purple text-background' : 'border border-stroke-secondary text-text-muted hover:border-etherea-purple/50 hover:text-text-primary'} disabled:cursor-default`}
                                    aria-label={
                                        isCompleted ? 'Hábito completado' : 'Marcar como completado'
                                    }
                                >
                                    {isCompleted && <Check className="size-4 text-background" />}
                                </button>
                            </div>
                            <div></div>
                        </div>
                    );
                })}
            </div>
            <div className="absolute bottom-0 z-0 flex w-full flex-col bg-etherea-purple/5 px-4 py-2.5 font-mono text-[10px] tracking-[2px] text-text-muted">
                <span className="text-etherea-purple">SMALL ACTIONS.</span>
                <span>GREATER EVOLUTION.</span>
            </div>
            <PixelBorderBL className="absolute bottom-0 left-0 z-20 size-2" />
            <PixelBorderBR className="absolute right-0 bottom-0 z-20 size-2" />
            <PixelBorderTL className="absolute top-0 left-0 z-20 size-2" />
            <PixelBorderTR className="absolute top-0 right-0 z-20 size-2" />
        </article>
    );
}
