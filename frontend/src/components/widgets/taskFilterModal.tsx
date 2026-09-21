'use client';
import { X } from 'lucide-react';
import { useState } from 'react';

import { PixelBorderBL, PixelBorderBR, PixelBorderTL, PixelBorderTR } from '../icons';

export type TaskDateFilter = 'all' | 'today' | 'this-week' | 'overdue' | 'upcoming';

export type TaskFilters = {
    projectId: string | null;
    statsId: string | null;
    date: TaskDateFilter;
};

type FilterOption = {
    value: string;
    label: string;
};

type TaskFilterModalProps = {
    initialFilters: TaskFilters;
    projects: FilterOption[];
    stats: FilterOption[];
    onClose: () => void;
    onApply: (filters: TaskFilters) => void;
};

const dateOptions: FilterOption[] = [
    {
        value: 'all',
        label: 'All Dates',
    },
    {
        value: 'today',
        label: 'Today',
    },
    {
        value: 'this-week',
        label: 'This Week',
    },
    {
        value: 'overdue',
        label: 'Overdue',
    },
    {
        value: 'upcoming',
        label: 'Upcoming',
    },
];

export default function TaskFilterModal({
    initialFilters,
    projects,
    stats,
    onClose,
    onApply,
}: TaskFilterModalProps) {
    const [filters, setFilters] = useState<TaskFilters>(initialFilters);

    const projectOptions: FilterOption[] = [
        {
            value: 'all',
            label: 'All Projects',
        },
        ...projects,
    ];

    const statsOptions: FilterOption[] = [
        {
            value: 'all',
            label: 'All Areas',
        },
        ...stats,
    ];

    const updateProject = (value: string) => {
        setFilters((previous) => ({
            ...previous,
            projectId: value === 'all' ? null : value,
        }));
    };

    const updateStats = (value: string) => {
        setFilters((previous) => ({
            ...previous,
            statsId: value === 'all' ? null : value,
        }));
    };

    const updateDate = (value: string) => {
        setFilters((previous) => ({
            ...previous,
            date: value as TaskDateFilter,
        }));
    };

    const handleClear = () => {
        const clearedFilters: TaskFilters = {
            projectId: null,
            statsId: null,
            date: 'all',
        };
        setFilters(clearedFilters);
        onApply(clearedFilters);
        onClose();
    };

    const renderOptions = (
        options: FilterOption[],
        value: string,
        onChange: (value: string) => void,
    ) => {
        return (
            <div className="gao-1.5 flex flex-wrap">
                {options.map((option) => {
                    const isSelected = value === option.value;

                    return (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => onChange(option.value)}
                            className={`border px-2 py-1.5 font-mono text-[10px] tracking-[1px] uppercase transition-colors ${
                                isSelected
                                    ? 'border-etherea-purple bg-etherea-purple/10 text-etherea-purple'
                                    : 'border-stroke-secondary text-text-muted hover:border-etherea-purple/50 hover:text-text-primary'
                            }`}
                        >
                            {option.label}
                        </button>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm">
            <div className="w-full max-w-[360px] border border-etherea-purple/60 bg-background shadow-[0_0_30px_rgba(155,48,255,0.15)]">
                <div className="flex items-center justify-between border-b border-stroke-secondary px-4 py-3">
                    <span className="font-orbitron text-xs tracking-[2px] text-etherea-purple uppercase">
                        Filter Quests
                    </span>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Fechar filtros"
                        className="flex size-5 items-center justify-center border border-stroke-secondary text-text-muted transition-colors hover:border-etherea-purple hover:text-etherea-purple"
                    >
                        <X className="size-3" />
                    </button>
                </div>

                <div className="flex flex-col gap-4 p-4">
                    <div className="flex flex-col gap-2">
                        <span className="font-mono text-[10px] tracking-[1.5px]">Project</span>

                        {renderOptions(projectOptions, filters.projectId ?? 'all', updateProject)}
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="font-mono text-[9px] tracking-[1.5px] text-text-muted uppercase">
                            Stats
                        </span>

                        {renderOptions(statsOptions, filters.statsId ?? 'all', updateStats)}
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="font-mono text-[10px] tracking-[1.5px] text-text-muted uppercase">
                            Date
                        </span>

                        {renderOptions(dateOptions, filters.date, updateDate)}
                    </div>
                    <div className="flex items-center gap-2 border-t border-stroke-secondary pt-3">
                        <button
                            type="button"
                            onClick={handleClear}
                            className="flex-1 border border-stroke-secondary px-2 py-2 font-mono text-[10px] tracking-[1.5px] text-text-muted uppercase transition-colors hover:border-etherea-purple/50 hover:text-text-primary"
                        >
                            Clear
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                onApply(filters);
                                onClose();
                            }}
                            className="flex-1 border border-etherea-purple bg-etherea-purple/10 px-3 py-2 font-mono text-[9px] tracking-[1.5px] text-etherea-purple uppercase transition-colors hover:bg-etherea-purple/20"
                        >
                            Apply Filters
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
