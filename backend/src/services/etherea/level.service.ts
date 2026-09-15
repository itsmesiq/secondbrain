import type { Level } from '../../schemas/etherea/index.js';

export function calculateLevel(levels: Level[], xp: number): Level {
    const currentLevel = [...levels]
        .sort((a, b) => b.requiredXP - a.requiredXP)
        .find(level => xp >= level.requiredXP);

    if (!currentLevel) {
        throw new Error('No active levels were found');
    }

    return currentLevel;
}
