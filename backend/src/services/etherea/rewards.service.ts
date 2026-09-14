import type { XPRule } from '../../schemas/etherea/index.js';

interface CalculateTaskReward {
    rules: XPRule[];
    difficulty?: string;
    objectivePriority?: string;
}

export function calculateTaskReward({ rules, difficulty, objectivePriority }: CalculateTaskReward) {
    const taskRules = rules.filter(rule => rule.activityType === 'Task');

    if (taskRules.length === 0) {
        throw new Error('No Task XP rules were found');
    }

    const baseRule = taskRules[0];

    const difficultyRule = difficulty
        ? taskRules.find(rule => rule.difficulty === difficulty)
        : undefined;

    const objectiveRule = objectivePriority
        ? taskRules.find(rule => rule.objectivePriority === objectivePriority)
        : undefined;

    const minimumGold = Math.min(
        ...taskRules.map(rule => rule.goldAmount).filter(amount => amount > 0),
    );

    return {
        xp:
            baseRule.baseXP +
            (difficultyRule?.difficultyBonus ?? 0) +
            (objectiveRule?.objectiveBonus ?? 0),
        gold: difficultyRule?.goldAmount ?? minimumGold,
    };
}
