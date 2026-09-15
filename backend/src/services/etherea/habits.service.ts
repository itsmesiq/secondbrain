import type { XPRule } from '../../schemas/etherea/index.js';

interface CalculateHabitReward {
    rules: XPRule[];
    objectivePriority?: string;
    streak: number;
}

export function calculateHabitStreak(
    completionDates: string[],
    today: string,
): {
    currentStreak: number;
    alreadyCompleted: boolean;
} {
    const dates = new Set(completionDates);

    if (dates.has(today)) {
        return {
            currentStreak: 0,
            alreadyCompleted: true,
        };
    }

    const todayDate = new Date(`${today}T00:00:00Z`);
    const yesterdayDate = new Date(todayDate);
    yesterdayDate.setUTCDate(yesterdayDate.getUTCDate() - 1);

    const yesterday = yesterdayDate.toISOString().slice(0, 10);

    if (!dates.has(yesterday)) {
        return {
            currentStreak: 1,
            alreadyCompleted: false,
        };
    }

    let streak = 1;

    const currentDate = yesterdayDate;

    while (true) {
        const previousDate = new Date(currentDate);
        previousDate.setUTCDate(previousDate.getUTCDate() - 1);

        const previous = previousDate.toISOString().slice(0, 10);

        if (!dates.has(previous)) {
            break;
        }

        streak++;
        currentDate.setTime(previousDate.getTime());
    }

    return {
        currentStreak: streak,
        alreadyCompleted: false,
    };
}

export function calculateHabitReward({ rules, objectivePriority, streak }: CalculateHabitReward) {
    const habitRules = rules.filter(rule => rule.activityType === 'Habit');

    if (habitRules.length === 0) {
        throw new Error('No Habit XP rules were found');
    }

    const baseRule = habitRules.find(
        rule => rule.streakMilestone === 0 && rule.objectivePriority === null,
    );

    if (!baseRule) {
        throw new Error('No base Habit XP rule was found');
    }

    const objectiveRule = objectivePriority
        ? habitRules.find(
              rule => rule.streakMilestone === 0 && rule.objectivePriority === objectivePriority,
          )
        : undefined;

    const streakRule = habitRules
        .filter(rule => rule.streakMilestone > 0)
        .sort((a, b) => b.streakMilestone - a.streakMilestone)
        .find(rule => rule.streakMilestone <= streak);

    const multiplier = streakRule?.streakMultiplier || 1;
    const streakGold = streakRule?.goldAmount || 0;

    const baseXP = baseRule.baseXP + (objectiveRule?.objectiveBonus ?? 0);

    return {
        xp: Math.round(baseXP * multiplier),
        gold: baseRule.goldAmount + streakGold,
    };
}
