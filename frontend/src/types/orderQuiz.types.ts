export type MysticOrder =
    'Arcane' | 'Vanguard' | 'Verdant' | 'Verdant' | 'Forge' | 'Veil' | 'Ballad';

export type QuizAnswer = {
    id: string;
    label: string;
    order: MysticOrder;
};

export type QuizQuestion = {
    id: number;
    question: string;
    answers: QuizAnswer[];
};

export type OrderInfo = {
    name: string;
    archetype: string;
    element: string;
    color: string;
    description: string;
    lore: string;
    tags: string[];
    mainImage: string;
    portraitImage: string;
    spriteImage: string;
    symbolImage: string;
};
