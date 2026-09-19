'use client';
import { useQueryClient } from '@tanstack/react-query';
import { LoaderCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { characters } from '@/data/characters';
import {
    getGetOnboardingStatusQueryKey,
    useSaveOnboardingIdentity,
} from '@/lib/api/generated/endpoints/onboarding/onboarding';
import type { Character } from '@/types/character.types';

import { PixelBorderBR } from '../icons';
import { PrimaryNextButton } from '../ui/NextButton';
import { CharacterCarousel } from './base/CharacterCarousel';
import { OnboardingSidebar, TopBarOnboarding } from './base/ComponentsAside';

const objectiveSuggestions = [
    'Organizar minha rotina',
    'Concluir minha graduação',
    'Melhorar minha saúde',
    'Criar meu portfólio',
    'Desenvolver um projeto',
];

export default function IdentityStep() {
    const router = useRouter();
    const queryClient = useQueryClient();

    const [selectedCharacter, setSelectedCharacter] = useState<Character>(characters[1]);

    const [name, setName] = useState('');
    const [objective, setObjective] = useState('');

    const saveIdentityMutation = useSaveOnboardingIdentity();

    const handleNextCharacter = () => {
        const currentIndex = characters.findIndex(
            (character) => character.archetype === selectedCharacter.archetype,
        );

        const nextIndex = (currentIndex + 1) % characters.length;

        setSelectedCharacter(characters[nextIndex]);
    };

    const handlePreviousCharacter = () => {
        const currentIndex = characters.findIndex(
            (character) => character.archetype === selectedCharacter.archetype,
        );

        const previousIndex = (currentIndex - 1 + characters.length) % characters.length;

        setSelectedCharacter(characters[previousIndex]);
    };

    const handleObjectiveSuggestion = (suggestion: string) => {
        setObjective(suggestion);
    };

    const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        const trimmedName = name.trim();
        const trimmedObjective = objective.trim();

        if (!trimmedName || !trimmedObjective) {
            return;
        }

        try {
            const response = await saveIdentityMutation.mutateAsync({
                data: {
                    name: trimmedName,
                    avatar: selectedCharacter.mainImage,
                    objective: trimmedObjective,
                },
            });

            if (response.status === 200) {
                return;
            }

            await queryClient.invalidateQueries({
                queryKey: getGetOnboardingStatusQueryKey(),
            });

            router.replace('/onboarding');
        } catch {}
    };

    const isSubmitting = saveIdentityMutation.isPending;

    const isFormValid = name.trim().length > 0 && objective.trim().length > 0;

    return (
        <div className="flex min-h-screen items-stretch">
            <OnboardingSidebar
                backgroundImage="/images/night-assassin-background.jpg"
                currentStep="identity"
            />
            <section className="relative flex min-h-screen flex-1 basis-2/3 flex-col items-center justify-center pt-20 pb-12">
                <TopBarOnboarding currentStep="identity" />
                <div className="flex w-full max-w-[840px] flex-col">
                    <div className="flex w-full flex-col gap-3 font-mono">
                        <span className="text-xs tracking-[3px] text-text-muted uppercase">
                            Configuração
                        </span>
                        <h1 className="font-orbitron text-2xl tracking-[1px] text-foreground">
                            CREATE YOUR IDENTITY
                        </h1>
                        <p className="text-base tracking-[0.3px] text-text-secondary">
                            Antes de começar sua jornada, crie a identidade que irá acompanhar sua
                            evolução.
                        </p>
                    </div>
                    <div className="my-8 h-0.5 w-full bg-[linear-gradient(90deg,#2A1F4A_0%,rgba(42,31,74,0.00)_100%)]"></div>
                    <div className="flex items-center justify-center gap-3">
                        <div className="h-0.5 w-full bg-[linear-gradient(90deg,rgba(42,31,74,0.00)_0%,#2A1F4A_100%)]"></div>
                        <span className="font-mono text-xs tracking-[3px] text-nowrap text-text-muted uppercase">
                            Character Select
                        </span>
                        <div className="h-0.5 w-full bg-[linear-gradient(90deg,#2A1F4A_0%,rgba(42,31,74,0.00)_100%)]"></div>
                    </div>
                    <CharacterCarousel
                        currentCharacter={selectedCharacter}
                        onNext={handleNextCharacter}
                        onPrev={handlePreviousCharacter}
                    />

                    <div className="my-8 h-0.5 w-full bg-[linear-gradient(90deg,#2A1F4A_0%,rgba(42,31,74,0.00)_100%)]"></div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5 font-mono text-xs">
                        <div className="flex flex-col gap-3.5">
                            <div className="flex items-center gap-2.5">
                                <div className="h-3 w-0.5 bg-etherea-purple shadow-[0_0_4px_0] shadow-etherea-purple"></div>
                                <h2 className="tracking-[0.3px] text-text-primary uppercase">
                                    Identity Profile
                                </h2>
                            </div>
                            <p className="tracking-[0.5px] text-text-muted">
                                Defina como você será reconhecido dentro do Etherea.
                            </p>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="name" className="text-text-secondary uppercase">
                                Nome
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                placeholder="Seu nome"
                                disabled={isSubmitting}
                                maxLength={100}
                                autoComplete="name"
                                className="border border-stroke-primary bg-surface/80 px-3.5 py-2.5 text-foreground shadow-[0_0_8px_0] shadow-etherea-purple/8 transition-colors duration-300 ease-in-out outline-none placeholder:text-text-muted focus:border-etherea-purple focus:shadow-etherea-purple/25"
                            />
                        </div>

                        <div className="my-3 h-0.5 w-full bg-[linear-gradient(90deg,#2A1F4A_0%,rgba(42,31,74,0.00)_100%)]"></div>

                        <div className="flex flex-col gap-3.5">
                            <div className="flex items-center gap-2.5">
                                <div className="h-3 w-0.5 bg-etherea-purple shadow-[0_0_4px_0] shadow-etherea-purple"></div>
                                <h2 className="tracking-[0.3px] text-text-primary uppercase">
                                    YOUR MAIN QUEST
                                </h2>
                            </div>
                            <p className="tracking-[0.5px] text-text-muted">
                                Qual é o principal objetivo que você quer alcançar nesta jornada?
                            </p>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="objective" className="text-text-secondary uppercase">
                                Objetivo Principal
                            </label>
                            <textarea
                                id="objective"
                                rows={3}
                                value={objective}
                                onChange={(event) => setObjective(event.target.value)}
                                placeholder="Seu nome"
                                maxLength={500}
                                disabled={isSubmitting}
                                className="border border-stroke-primary bg-surface/80 px-3.5 py-2.5 text-foreground shadow-[0_0_8px_0] shadow-etherea-purple/8 transition-colors duration-300 ease-in-out outline-none placeholder:text-text-muted focus:border-etherea-purple focus:shadow-etherea-purple/25"
                            />
                            <div className="mt-2 flex items-center justify-between text-center text-[10px] tracking-[0.5px] text-text-muted">
                                {objectiveSuggestions.map((suggestion) => {
                                    const isSelected = objective === suggestion;

                                    return (
                                        <button
                                            key={suggestion}
                                            type="button"
                                            onClick={() => handleObjectiveSuggestion(suggestion)}
                                            disabled={isSubmitting}
                                            className={`cursor-pointer border px-2.5 py-1 text-[10px] tracking-[0.5px] transition-colors duration-300 ease-in-out disabled:cursor-not-allowed disabled:opacity-50 ${
                                                isSelected
                                                    ? 'border-etherea-purple bg-etherea-purple/10 text-etherea-purple'
                                                    : 'border-stroke-secondary text-text-muted hover:border-stroke-primary hover:text-text-secondary'
                                            }`}
                                        >
                                            {suggestion}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {saveIdentityMutation.isError && (
                            <p className="font-mono text-xs tracking-[0.3px] text-error-red">
                                Não foi possível salvar sua identidade. Verifique os dados e tente
                                novamente.
                            </p>
                        )}

                        <div className="my-3 h-0.5 w-full bg-[linear-gradient(90deg,#2A1F4A_0%,rgba(42,31,74,0.00)_100%)]"></div>

                        <PrimaryNextButton
                            type="submit"
                            onClick={() => undefined}
                            disabled={!isFormValid || isSubmitting}
                            ctaText="Próxima Etapa"
                        />

                        {isSubmitting && (
                            <div className="flex items-center justify-center gap-2 font-mono text-text-muted">
                                <LoaderCircle className="size-3.5 animate-spin" />
                                <span>Salvando identidade...</span>
                            </div>
                        )}
                    </form>
                </div>
                <PixelBorderBR className="absolute right-0 bottom-0 h-3 w-3" />
            </section>
        </div>
    );
}
