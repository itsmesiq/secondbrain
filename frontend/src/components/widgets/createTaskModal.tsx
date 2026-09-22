'use client';
import { LoaderCircle, X } from 'lucide-react';
import { useState } from 'react';

import { PixelBorderBL, PixelBorderBR, PixelBorderTL, PixelBorderTR } from '../icons';

type SpecializationOption = {
    id: string;
    name: string;
};

type ProjectOption = {
    id: string;
    name: string;
};

type CreateTaskModalProps = {
    isOpen: boolean;
    isSubmitting: boolean;
    specializations: SpecializationOption[];
    projects: ProjectOption[];
    onClose: () => void;
    onSubmit: (data: {
        name: string;
        difficulty?: string;
        specialization?: string[];
        projectId?: string;
        priority?: string;
        dueDate?: string;
    }) => void;
};

const priorityOptions = [
    {
        value: 'Low',
        label: 'Low',
        selectedClass:
            'text-mind-cyan border-mind-cyan bg-mind-cyan/35 shadow-[0_0_6px_0_rgba(0,229,255,0.35)]',
    },
    {
        value: 'Medium',
        label: 'Medium',
        selectedClass:
            'text-body-yellow border-body-yellow bg-body-yellow/35 shadow-[0_0_6px_0_rgba(255,215,0,0.35)]',
    },
    {
        value: 'High',
        label: 'High',
        selectedClass:
            'text-power-pink border-power-pink bg-power-pink/35 shadow-[0_0_6px_0_rgba(255,45,120,0.35)]',
    },
];

const difficultyOptions = [
    {
        value: 'Easy',
        label: 'Easy',
    },
    {
        value: 'Normal',
        label: 'Normal',
    },
    {
        value: 'Hard',
        label: 'Hard',
    },
];

export default function CreateTaskModal({
    isOpen,
    isSubmitting = false,
    projects,
    onClose,
    onSubmit,
    specializations,
}: CreateTaskModalProps) {
    const [name, setName] = useState('');
    const [projectId, setProjectId] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [specializationId, setSpecializationId] = useState('');
    const [priority, setPriority] = useState('');
    const [dueDate, setDueDate] = useState('');

    if (!isOpen) {
        return null;
    }

    const formatDueDate = (value: string) => {
        const digits = value.replace(/\D/g, '').slice(0, 8);

        if (digits.length <= 2) {
            return digits;
        }

        if (digits.length <= 4) {
            return `${digits.slice(0, 2)}/${digits.slice(2)}`;
        }

        return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
    };

    const parseDueDate = (value: string) => {
        if (!value) {
            return undefined;
        }

        const match = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);

        if (!match) {
            return undefined;
        }

        const [, day, month, year] = match;

        const date = new Date(Number(year), Number(month) - 1, Number(day));

        const isValidDate =
            date.getFullYear() === Number(year) &&
            date.getMonth() === Number(month) - 1 &&
            date.getDate() === Number(day);

        if (!isValidDate) {
            return undefined;
        }

        return `${year}-${month}-${day}`;
    };

    const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        const trimmedName = name.trim();

        if (!trimmedName || isSubmitting) {
            return;
        }

        const parsedDueDate = parseDueDate(dueDate);

        await onSubmit({
            name: trimmedName,
            difficulty: difficulty || undefined,
            specialization: specializationId ? [specializationId] : undefined,
            projectId: projectId || undefined,
            priority: priority || undefined,
            dueDate: parsedDueDate,
        });
    };

    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm">
            <div className="relative w-full max-w-[360px] border border-etherea-purple/60 bg-surface shadow-[0_0_30px_rgba(155,48,255,0.15)]">
                <PixelBorderTL className="absolute top-0 left-0 size-2.5" />
                <PixelBorderTR className="absolute top-0 right-0 size-2.5" />
                <PixelBorderBL className="absolute bottom-0 left-0 size-2.5" />
                <PixelBorderBR className="absolute right-0 bottom-0 size-2.5" />

                <div className="flex items-center justify-between border-b border-stroke-secondary px-4 py-3">
                    <div className="flex items-center gap-2">
                        <div className="size-1.5 bg-etherea-purple"></div>
                        <span className="font-orbitron text-[10px] tracking-[2px] text-etherea-purple uppercase">
                            New Quest
                        </span>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Fechar filtros"
                        className="flex size-5 items-center justify-center border border-stroke-secondary text-text-muted transition-colors hover:border-etherea-purple hover:text-etherea-purple"
                    >
                        <X className="size-3" />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2.5 p-4 font-mono">
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="create-task-name"
                                className="text-[10px] tracking-[2px] text-text-muted uppercase"
                            >
                                Task Name
                            </label>
                            <input
                                type="text"
                                id="create-task-name"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                placeholder="Enter quest name..."
                                autoFocus
                                disabled={isSubmitting}
                                className="border border-stroke-secondary bg-background px-3 py-2 text-xs text-text-primary outline-none placeholder:text-text-muted/60 focus:border-etherea-purple disabled:cursor-default disabled:opacity-50"
                            />
                        </div>
                        <div className="item-center flex gap-3">
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="create-task-project"
                                    className="text-[10px] tracking-[2px] text-text-muted uppercase"
                                >
                                    Project
                                </label>
                                <select
                                    id="create-task-project"
                                    value={projectId}
                                    onChange={(event) => setProjectId(event.target.value)}
                                    disabled={isSubmitting}
                                    className="appearance-none border border-stroke-secondary bg-background px-3 py-2 text-xs text-text-primary outline-none placeholder:text-text-muted/60 focus:border-etherea-purple disabled:cursor-default disabled:opacity-50"
                                >
                                    <option value="" disabled hidden>
                                        Select
                                    </option>

                                    {projects.map((project) => (
                                        <option
                                            key={project.id}
                                            value={project.id}
                                            className="font-mono uppercase"
                                        >
                                            {project.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex w-full flex-col gap-2">
                                <label
                                    htmlFor="create-task-specialization"
                                    className="w-full text-[10px] tracking-[2px] text-text-muted uppercase"
                                >
                                    Specialization
                                </label>
                                <select
                                    id="create-task-specialization"
                                    value={specializationId}
                                    onChange={(event) => setSpecializationId(event.target.value)}
                                    disabled={isSubmitting}
                                    className="w-full appearance-none border border-stroke-secondary bg-background px-3 py-2 text-xs text-text-primary outline-none placeholder:text-text-muted/60 focus:border-etherea-purple disabled:cursor-default disabled:opacity-50"
                                >
                                    <option value="" disabled hidden>
                                        Select
                                    </option>

                                    {specializations.map((specialization) => (
                                        <option
                                            key={specialization.id}
                                            value={specialization.id}
                                            className="font-mono uppercase"
                                        >
                                            {specialization.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="create-task-due-date"
                                className="text-[10px] tracking-[2px] text-text-muted uppercase"
                            >
                                Due Date
                            </label>
                            <input
                                type="text"
                                id="create-task-due-date"
                                value={dueDate}
                                onChange={(event) => setDueDate(formatDueDate(event.target.value))}
                                inputMode="numeric"
                                maxLength={10}
                                disabled={isSubmitting}
                                placeholder="DD/MM/AAAA"
                                className="w-full border border-stroke-secondary bg-background px-3 py-2 text-xs text-text-primary outline-none placeholder:text-text-muted/60 focus:border-etherea-purple disabled:cursor-default disabled:opacity-50"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="text-[10px] tracking-[2px] text-text-muted uppercase">
                                Priority
                            </span>
                            <div className="flex w-full items-center gap-2">
                                {priorityOptions.map((option) => {
                                    const isSelected = priority === option.value;

                                    return (
                                        <button
                                            key={option.value}
                                            type="button"
                                            onClick={() => setPriority(option.value)}
                                            disabled={isSubmitting}
                                            className={`w-full border bg-background py-2 font-orbitron text-[10px] tracking-[1.5px] uppercase transition-colors disabled:cursor-default ${
                                                isSelected
                                                    ? `${option.selectedClass}`
                                                    : 'border-stroke-secondary text-text-muted hover:border-etherea-purple/50 hover:text-text-primary'
                                            }`}
                                        >
                                            {option.label}
                                        </button>
                                    );
                                })}
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-[10px] tracking-[2px] text-text-muted uppercase">
                                    Difficulty
                                </span>
                                <div className="flex w-full items-center gap-2">
                                    {difficultyOptions.map((option) => {
                                        const isSelected = difficulty === option.value;

                                        return (
                                            <button
                                                key={option.value}
                                                type="button"
                                                onClick={() => setDifficulty(option.value)}
                                                disabled={isSubmitting}
                                                className={`w-full border bg-background py-2 font-orbitron text-[10px] tracking-[1.5px] uppercase transition-colors disabled:cursor-default ${
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
                            </div>
                            <div className="mt-4 flex w-full items-center gap-2">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    disabled={isSubmitting}
                                    className="flex-1 border border-stroke-secondary px-3 py-2 font-mono text-[9px] tracking-[1.5px] text-text-muted uppercase transition-colors hover:border-etherea-purple/50 hover:text-text-primary disabled:cursor-default disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={!name.trim() || isSubmitting}
                                    className="relative flex flex-1 items-center justify-center gap-2 border border-etherea-purple bg-etherea-purple/10 px-3 py-2 font-orbitron text-[9px] tracking-[2px] text-text-primary uppercase transition-colors hover:bg-etherea-purple/20 disabled:cursor-default disabled:opacity-50"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <LoaderCircle className="size-3 animate-spin" />
                                            Creating
                                        </>
                                    ) : (
                                        <>
                                            <PixelBorderBL className="absolute bottom-0 left-0 size-2" />
                                            <PixelBorderBR className="absolute right-0 bottom-0 size-2" />
                                            <PixelBorderTL className="absolute top-0 left-0 size-2" />
                                            <PixelBorderTR className="absolute top-0 right-0 size-2" />
                                            Create Quest
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
