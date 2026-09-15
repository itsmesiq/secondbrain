import { DataSourceNotFoundError } from '../errors/index.js';
import {
    getCheckbox,
    getCreatedTime,
    getDate,
    getNotionAdapter,
    getNumber,
    getRelationId,
    getSelect,
    getTitle,
} from '../lib/notion.js';
import type { HabitCompletion } from '../schemas/etherea/index.js';
import { calculateHabitReward, calculateHabitStreak } from '../services/etherea/habits.service.js';
import { getXPRules } from './getXPRules.js';
import { updateProfileProgress } from './updateProfileProgress.js';

interface CreateHabitCompletion {
    userId: string;
    habitId: string;
}

export async function createHabitCompletion({
    userId,
    habitId,
}: CreateHabitCompletion): Promise<HabitCompletion> {
    const notion = await getNotionAdapter(userId);

    const habit = await notion.retrievePage(habitId);

    if (!('properties' in habit)) {
        throw new Error('Invalid habit data');
    }

    const active = getCheckbox(habit.properties.Active);

    if (!active) {
        throw new Error('Habit is inactive and cannot be completed');
    }

    const today = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'America/Sao_Paulo',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).format(new Date());

    const completionDataSources = await notion.searchDataSources('Habit Completions');

    const completionDataSource = completionDataSources.find(
        result =>
            result.object === 'data_source' &&
            'title' in result &&
            result.title?.some(item => item.plain_text === 'Habit Completions'),
    );

    if (!completionDataSource) {
        throw new DataSourceNotFoundError('Habit Completions');
    }

    const completions: Array<{
        id: string;
        date: string;
        completed: boolean;
    }> = [];

    for await (const result of notion.queryDataSource(completionDataSource.id)) {
        if (getRelationId(result.properties.Habit) !== habitId) {
            continue;
        }

        completions.push({
            id: result.id,
            date: getDate(result.properties.Date)?.slice(0, 10) ?? '',
            completed: getCheckbox(result.properties.Completed),
        });
    }

    const completedDates = completions
        .filter(completion => completion.completed)
        .map(completion => completion.date);

    const streakResult = calculateHabitStreak(completedDates, today);

    if (streakResult.alreadyCompleted) {
        const existingCompletion = completions.find(
            completion => completion.date === today && completion.completed,
        );

        if (!existingCompletion) {
            throw new Error('Habit completion already exists for today');
        }

        const existingPage = await notion.retrievePage(existingCompletion.id);

        if (!('properties' in existingPage)) {
            throw new Error('Habit completion not found');
        }

        return {
            id: existingPage.id,
            name: getTitle(existingPage.properties.Nome),
            habitId: getRelationId(existingPage.properties.Habit) ?? '',
            date: getDate(existingPage.properties.Date) ?? today,
            completed: getCheckbox(existingPage.properties.Completed),
            streak: getNumber(existingPage.properties.Streak),
            xpEarned: getNumber(existingPage.properties['XP Earned']),
            goldEarned: getNumber(existingPage.properties['Gold Earned']),
            createdAt: getCreatedTime(existingPage),
        };
    }

    const objectiveId = getRelationId(habit.properties.Objective);

    let objectivePriority: string | undefined;

    if (objectiveId) {
        const objective = await notion.retrievePage(objectiveId);

        if ('properties' in objective) {
            objectivePriority = getSelect(objective.properties.Priority) || undefined;
        }
    }

    const rules = await getXPRules(userId);

    const reward = calculateHabitReward({
        rules,
        objectivePriority,
        streak: streakResult.currentStreak,
    });

    const completionProperties = {
        Nome: {
            title: [{ text: { content: getTitle(habit.properties.Nome) } }],
        },
        Habit: {
            relation: [{ id: habitId }],
        },
        Date: {
            date: {
                start: today,
            },
        },
        Completed: {
            checkbox: true,
        },
        Streak: {
            number: streakResult.currentStreak,
        },
        'XP Earned': {
            number: reward.xp,
        },
        'Gold Earned': {
            number: reward.gold,
        },
    };

    const completion = await notion.createPage(completionDataSource.id, completionProperties);

    const currentBestStreak = getNumber(habit.properties['Best Streak']);

    const bestStreak = Math.max(currentBestStreak, streakResult.currentStreak);

    await notion.updatePage(habitId, {
        'Current Streak': {
            number: streakResult.currentStreak,
        },
        'Best Streak': {
            number: bestStreak,
        },
        'Last Completed': {
            date: {
                start: today,
            },
        },
    });

    await updateProfileProgress({
        userId,
        xp: reward.xp,
        gold: reward.gold,
    });

    return {
        id: completion.id,
        name: getTitle(habit.properties.Nome),
        habitId,
        date: today,
        completed: true,
        streak: streakResult.currentStreak,
        xpEarned: reward.xp,
        goldEarned: reward.gold,
        createdAt: 'created_time' in completion ? completion.created_time : '',
    };
}
