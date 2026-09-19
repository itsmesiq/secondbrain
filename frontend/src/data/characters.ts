import type { Character } from '../types/character.types';

export const characters: Character[] = [
    {
        codename: 'The Echo',
        archetype: 'messenger',
        type: 'frequency',
        description: 'Entre ruídos e silêncios, encontra a voz que te conecta ao mundo.',
        mainImage: '/images/characters/character-messenger.jpg',
        secondaryImage: '/images/characters/character-messenger.png',
    },
    {
        codename: 'The Strider',
        archetype: 'paladin',
        type: 'light',
        description: 'Fiel em cada passo, livre em cada horizonte.',
        mainImage: '/images/characters/character-strider.jpg',
        secondaryImage: '/images/characters/character-strider.png',
    },
    {
        codename: 'The Veyra',
        archetype: 'oracle',
        type: 'knowledge',
        description: 'Transforma imaginação em criação e progresso inovador.',
        mainImage: '/images/characters/character-oracle.jpg',
        secondaryImage: '/images/characters/character-oracle.png',
    },
];
