export type MysticOrder = 'Arcane' | 'Vanguard' | 'Verdant' | 'Forge' | 'Veil' | 'Ballad';

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

export type OrderData = {
    name: MysticOrder;

    symbol: string;
    leader: string;
    details: string;
    sprite: string;

    archetype: string;
    element: string;

    quote: string;
    lore: string;
    tags: string[];

    accent: string;
};
