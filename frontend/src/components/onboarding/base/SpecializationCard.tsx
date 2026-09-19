'use client';

import { LoaderCircle, Plus } from 'lucide-react';
import { useState } from 'react';

import { useCreateOnboardingSpecializations } from '@/lib/api/generated/endpoints/onboarding/onboarding';

type Specialization = {
    id: string;
    name: string;
};

type SpecializationCardProps = {
    statsId: string;
    name: string;
    description: string;
    specializations: Specialization[];
    onSpecializationCreated: (specialization: Specialization) => void;
};

const statsAppearance = {
    Corpo: {
        symbol: '◈',
        colorClass: 'text-body-yellow',
        borderClass: 'border-body-yellow/50',
        focusClass: 'focus:border-body-yellow focus:shadow-body-yellow/25',
        buttonClass: 'hover:border-body-yellow hover:bg-body-yellow/10 hover:shadow-body-yellow/25',
    },
    Mente: {
        symbol: '◆',
        colorClass: 'text-mind-cyan',
        borderClass: 'border-mind-cyan/50',
        focusClass: 'focus:border-mind-cyan focus:shadow-mind-cyan/25',
        buttonClass: 'hover:border-mind-cyan hover:bg-mind-cyan/10 hover:shadow-mind-cyan/25',
    },
    Alma: {
        symbol: '✦',
        colorClass: 'text-soul-purple',
        borderClass: 'border-soul-purple/50',
        focusClass: 'focus:border-soul-purple focus:shadow-soul-purple/25',
        buttonClass: 'hover:border-soul-purple hover:bg-soul-purple/10 hover:shadow-soul-purple/25',
    },
    Social: {
        symbol: '◉',
        colorClass: 'text-social-green',
        borderClass: 'border-social-green/50',
        focusClass: 'focus:border-social-green focus:shadow-social-green/25',
        buttonClass:
            'hover:border-social-green hover:bg-social-green/10 hover:shadow-social-green/25',
    },
    Poder: {
        symbol: '◇',
        colorClass: 'text-power-pink',
        borderClass: 'border-power-pink/50',
        focusClass: 'focus:border-power-pink focus:shadow-power-pink/25',
        buttonClass: 'hover:border-power-pink hover:bg-power-pink/10 hover:shadow-power-pink/25',
    },
} as const;

const defaultAppearance = {
    symbol: '◇',
    colorClass: 'text-etherea-purple',
    borderClass: 'border-etherea-purple/50',
    focusClass: 'focus:border-etherea-purple focus:shadow-etherea-purple/25',
    buttonClass:
        'hover:border-etherea-purple hover:bg-etherea-purple/10 hover:shadow-etherea-purple/25',
};

export function SpecializationCard({
    statsId,
    name,
    description,
    specializations,
    onSpecializationCreated,
}: SpecializationCardProps) {
    const [specializationName, setSpecializationName] = useState('');

    const createSpecializationMutation = useCreateOnboardingSpecializations();

    const appearance = statsAppearance[name as keyof typeof statsAppearance] ?? defaultAppearance;

    const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        const trimmedName = specializationName.trim();

        if (!trimmedName || createSpecializationMutation.isPending) {
            return;
        }

        try {
            const response = await createSpecializationMutation.mutateAsync({
                data: {
                    name: trimmedName,
                    statsId,
                },
            });

            if (response.status !== 200) {
                return;
            }

            onSpecializationCreated({
                id: response.data.id,
                name: response.data.name,
            });

            setSpecializationName('');
        } catch {}
    };

    return (
        <article className="flex min-h-[130px] w-full flex-col items-start justify-center gap-3 border border-stroke-secondary bg-surface/80 px-4 py-3.5">
            <div className={`flex items-center gap-2 text-sm ${appearance.colorClass} uppercase`}>
                <span className="font-mono">{appearance.symbol}</span>
                <h3 className="font-orbitron">{name}</h3>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-text-muted">
                <span>{description}</span>
            </div>
            <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
                <input
                    type="text"
                    value={specializationName}
                    onChange={(event) => setSpecializationName(event.target.value)}
                    placeholder="Adicionar especialização..."
                    disabled={createSpecializationMutation.isPending}
                    className={`w-full border border-stroke-primary bg-surface/80 px-3.5 py-2.5 text-foreground shadow-[0_0_8px_0] shadow-etherea-purple/8 transition-colors duration-300 ease-in-out outline-none placeholder:font-mono placeholder:text-xs placeholder:text-text-muted ${appearance.focusClass}`}
                />
                <button
                    type="submit"
                    aria-label="Adicionar"
                    disabled={!specializationName.trim() || createSpecializationMutation.isPending}
                    className={`flex cursor-pointer items-center border border-stroke-primary bg-surface/80 p-2.5 shadow-[0_0_8px_0] shadow-etherea-purple/8 transition-all duration-300 ease-in-out ${appearance.buttonClass} disabled:cursor-not-allowed disabled:opacity-50`}
                >
                    {createSpecializationMutation.isPending ? (
                        <LoaderCircle
                            className={`m-1 size-4 animate-spin ${appearance.colorClass}`}
                        />
                    ) : (
                        <Plus className={`m-1 size-4 ${appearance.colorClass}`} />
                    )}
                </button>
            </form>
            {specializations.length > 0 ? (
                <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] tracking-[0.5px] text-text-muted">
                    {specializations.map((specialization) => (
                        <span
                            key={specialization.id}
                            className="border border-stroke-primary bg-surface px-2 py-1 text-text-secondary"
                        >
                            {specialization.name}
                        </span>
                    ))}
                </div>
            ) : (
                <div className="mb-3 flex flex-wrap items-center gap-2 font-mono text-[10px] tracking-[0.5px] text-text-muted">
                    <span>Necessário cadastrar no mínimo 1 especialização</span>
                </div>
            )}
        </article>
    );
}
