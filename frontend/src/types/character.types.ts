export type Archetypes = 'strategist' | 'explorer' | 'creator';

export type Character = {
    archetype: Archetypes;
    type: 'analytical' | 'enthusiastic' | 'expressive';
    mainImage: string;
    secondaryImage: string;
};
