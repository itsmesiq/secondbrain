import type { Character } from '../types/character.types';

export const characters: Character[] = [
    {
        archetype: 'messenger',
        type: 'frequency',
        description: 'Entre ruídos e silêncios, encontra a voz que te conecta ao mundo.',
        mainImage: '/images/characters/character-messenger.jpg',
        secondaryImage: '/images/characters/character-messenger.png',
    },
    {
        archetype: 'explorer',
        type: 'enthusiastic',
        description: 'Transforma curiosidade em descoberta e progresso constante.',
        mainImage: '/images/characters/character-explorer.jpg',
        secondaryImage: '/images/characters/character-explorer.png',
    },
    {
        archetype: 'creator',
        type: 'expressive',
        description: 'Transforma imaginação em criação e progresso inovador.',
        mainImage: '/images/characters/character-creator.jpg',
        secondaryImage: '/images/characters/character-creator.png',
    },
];
