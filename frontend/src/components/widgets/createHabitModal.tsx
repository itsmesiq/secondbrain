'use client';

import { LoaderCircle, X } from 'lucide-react';
import { useState } from 'react';

import { PixelBorderBL, PixelBorderBR, PixelBorderTL, PixelBorderTR } from '../icons';

type SpecializationOption = {
    id: string;
    name: string;
};

type CreateHabitModalProps = {
    isOpen: boolean;
    isSubmitting: boolean;
    specializations: SpecializationOption[];
    onClose: () => void;
    onSubmit: (data: { name: string; specialization?: string[] }) => void;
};

export default function CreateHabitModal({
    isOpen,
    isSubmitting,
    specializations,
    onClose,
    onSubmit,
}: CreateHabitModalProps) {
    const [name, setName] = useState('');
    const [specializationId, setSpecializationId] = useState('');

    if (!isOpen) {
        return null;
    }

    const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        const trimmedName = name.trim();

        if (!trimmedName || isSubmitting) {
            return;
        }

        await onSubmit({
            name: trimmedName,
            specialization: specializationId ? [specializationId] : undefined,
        });
    };

    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="relative w-full max-w-[360px] border border-etherea-purple/60 bg-surface p-4 shadow-[0_0_30px_rgba(155,48,255,0.15)]">
                <PixelBorderTL className="absolute top-0 left-0 size-2.5" />
                <PixelBorderTR className="absolute top-0 right-0 size-2.5" />
                <PixelBorderBL className="absolute bottom-0 left-0 size-2.5" />
                <PixelBorderBR className="absolute right-0 bottom-0 size-2.5" />

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="size-1.5 bg-etherea-purple"></div>
                        <span className="font-orbitron text-[10px] tracking-[3px] text-etherea-purple uppercase">
                            Novo Hábito
                        </span>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Fechar criação"
                        className="cursor-pointer border border-stroke-secondary p-1 transition duration-300 ease-in-out hover:border-etherea-purple hover:bg-etherea-purple/10 hover:text-etherea-purple hover:shadow-etherea-purple/25"
                    >
                        <X className="size-3 text-text-muted" />
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="mt-4 flex flex-col gap-2.5 font-mono uppercase"
                >
                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="create-habit-name"
                            className="text-[10px] tracking-[2px] text-text-muted"
                        >
                            Nome
                        </label>
                        <input
                            type="text"
                            id="create-habit-name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            placeholder="Ex: MEDITAR"
                            autoFocus
                            disabled={isSubmitting}
                            className="border border-stroke-secondary bg-background px-3 py-2 text-xs text-text-primary outline-none placeholder:text-text-muted/60 focus:border-etherea-purple disabled:cursor-default disabled:opacity-50"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="create-habit-specialization"
                            className="text-[10px] tracking-[2px] text-text-muted"
                        >
                            Specialization
                        </label>
                        <select
                            id="create-habit-specialization"
                            value={specializationId}
                            onChange={(event) => setSpecializationId(event.target.value)}
                            disabled={isSubmitting}
                            className="border border-stroke-secondary bg-background px-3 py-2 text-xs text-text-primary outline-none placeholder:text-text-muted/60 focus:border-etherea-purple disabled:cursor-default disabled:opacity-50"
                        >
                            <option value="" disabled hidden>
                                Select
                            </option>

                            {specializations.map((specialization) => (
                                <option
                                    value={specialization.id}
                                    key={specialization.id}
                                    className="font-mono uppercase"
                                >
                                    {specialization.name}
                                </option>
                            ))}
                        </select>
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
                                    Create Habit
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
