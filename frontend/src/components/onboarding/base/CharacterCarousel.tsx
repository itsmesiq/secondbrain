'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import {
    CarouselNextButton,
    CarouselPagination,
    CarouselPrevButton,
} from '@/components/ui/CarouselControllers';
import { characters } from '@/data/characters';
import { Character } from '@/types/character.types';

import { CharacterCard } from './CharacterCard';

export function CharacterCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentCharacter, setCurrentCharacter] = useState<Character>(characters[0]);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % characters.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + characters.length) % characters.length);
    };

    return (
        <div className="flex w-full flex-col items-center gap-5">
            <div className="flex w-full items-center gap-6 py-6">
                <div className="h-[244px] w-full overflow-hidden border border-stroke-secondary opacity-40">
                    <Image
                        src="/images/characters/character-strategist.png"
                        alt="Character Strategist"
                        width={180}
                        height={270}
                        className="object-cover"
                    />
                </div>
                <div className="flex items-center justify-center gap-6">
                    <CarouselPrevButton onClick={handlePrev} />
                    <CharacterCard />
                    <CarouselNextButton onClick={handleNext} />
                </div>
                <div className="h-[244px] w-full overflow-hidden border border-stroke-secondary opacity-40">
                    <Image
                        src="/images/characters/character-creator.png"
                        alt="Character Creator"
                        width={180}
                        height={270}
                        className="object-cover"
                    />
                </div>
            </div>
            <span className="font-mono text-sm leading-[20px] tracking-[0.3px] text-text-secondary">
                Transforma curiosidade em descoberta e progresso constante.
            </span>
            <CarouselPagination />
        </div>
    );
}
