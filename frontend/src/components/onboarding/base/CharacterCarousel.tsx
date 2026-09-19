'use client';
import Image from 'next/image';

import {
    CarouselNextButton,
    CarouselPagination,
    CarouselPrevButton,
} from '@/components/ui/CarouselControllers';
import { characters } from '@/data/characters';
import { Character } from '@/types/character.types';

import { CharacterCard } from './CharacterCard';

type CharacterCarouselProps = {
    currentCharacter: Character;
    onNext: () => void;
    onPrev: () => void;
};

export function CharacterCarousel({ currentCharacter, onNext, onPrev }: CharacterCarouselProps) {
    const currentIndex = characters.findIndex(
        (character) => character.archetype === currentCharacter.archetype,
    );

    const previousIndex = (currentIndex - 1 + characters.length) % characters.length;

    const nextIndex = (currentIndex + 1) % characters.length;

    const previousCharacter = characters[previousIndex];

    const nextCharacter = characters[nextIndex];

    return (
        <div className="flex w-full flex-col items-center gap-5">
            <div className="flex w-full items-center gap-6 py-6">
                <div className="h-[244px] w-full overflow-hidden border border-stroke-secondary opacity-40">
                    <Image
                        src={previousCharacter.secondaryImage}
                        alt={`Character ${previousCharacter.archetype}`}
                        width={180}
                        height={270}
                        className="object-cover"
                    />
                </div>
                <div className="flex items-center justify-center gap-6">
                    <CarouselPrevButton onClick={onPrev} />
                    <CharacterCard character={currentCharacter} />
                    <CarouselNextButton onClick={onNext} />
                </div>
                <div className="h-[244px] w-full overflow-hidden border border-stroke-secondary opacity-40">
                    <Image
                        src={nextCharacter.secondaryImage}
                        alt={`Character ${nextCharacter.archetype}`}
                        width={180}
                        height={270}
                        className="object-cover"
                    />
                </div>
            </div>
            <span className="font-mono text-sm leading-[20px] tracking-[0.3px] text-text-secondary">
                {currentCharacter.description}
            </span>
            <CarouselPagination currentIndex={currentIndex} totalItems={characters.length} />
        </div>
    );
}
