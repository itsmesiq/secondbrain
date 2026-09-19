import { DataSourceNotFoundError } from '../errors/index.js';
import {
    getCheckbox,
    getDate,
    getFileUrl,
    getNotionAdapter,
    getNumber,
    getRelationId,
    getRelationIds,
    getRichText,
    getStatus,
    getTitle,
} from '../lib/notion.js';

interface StatProgress {
    id: string;
    name: string;
    description: string;
    icon: string;
    index: number;
    possiblePoints: number;
    completedPoints: number;
}

function getBrazilDate(date: Date): string {
    return new Intl.DateTimeFormat('en-CA', {
        timeZone: 'America/Sao_Paulo',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).format(date);
}

function getDaysInclusive(startDate: string, endDate: string): number {
    const start = new Date(`${startDate}T00:00:00Z`);
    const end = new Date(`${endDate}T00:00:00Z`);

    if (start > end) {
        return 0;
    }

    return Math.floor((end.getTime() - start.getTime()) / 86400000) + 1;
}

export async function getWidgetStats(userId: string) {
    const notion = await getNotionAdapter(userId);

    const statsDataSources = await notion.searchDataSources('Stats');

    const statsDataSource = statsDataSources.find(
        result =>
            result.object === 'data_source' &&
            'title' in result &&
            result.title?.some(item => item.plain_text === 'Stats'),
    );

    if (!statsDataSource) {
        throw new DataSourceNotFoundError('Stats');
    }

    const stats: StatProgress[] = [];

    for await (const result of notion.queryDataSource(statsDataSource.id)) {
        stats.push({
            id: result.id,
            name: getTitle(result.properties.Nome),
            description: getRichText(result.properties.Description),
            icon: getFileUrl(result.properties.Icon) ?? '',
            index: getNumber(result.properties.Index),
            possiblePoints: 0,
            completedPoints: 0,
        });
    }

    const statMap = new Map(stats.map(stat => [stat.id, stat]));

    const specializationDataSources = await notion.searchDataSources('Specializations');

    const specializationDataSource = specializationDataSources.find(
        result =>
            result.object === 'data_source' &&
            'title' in result &&
            result.title?.some(item => item.plain_text === 'Specializations'),
    );

    if (!specializationDataSource) {
        throw new DataSourceNotFoundError('Specializations');
    }

    const specializationStatMap = new Map<string, string>();

    for await (const result of notion.queryDataSource(specializationDataSource.id)) {
        const statId = getRelationId(result.properties.Stat);

        if (statId) {
            specializationStatMap.set(result.id, statId);
        }
    }

    const taskDataSources = await notion.searchDataSources('Tasks');

    const taskDataSource = taskDataSources.find(
        result =>
            result.object === 'data_source' &&
            'title' in result &&
            result.title?.some(item => item.plain_text === 'Tasks'),
    );

    if (!taskDataSource) {
        throw new DataSourceNotFoundError('Tasks');
    }

    for await (const result of notion.queryDataSource(taskDataSource.id)) {
        const status = getStatus(result.properties.Status);

        if (status === 'Cancelada') {
            continue;
        }

        const specializationIds = getRelationIds(result.properties.Specializations);

        for (const specializationId of specializationIds) {
            const statId = specializationStatMap.get(specializationId);
            const stat = statId ? statMap.get(statId) : undefined;

            if (!stat) {
                continue;
            }

            stat.possiblePoints += 1;

            if (status === 'Concluída') {
                stat.completedPoints += 1;
            }
        }
    }

    const habitDataSources = await notion.searchDataSources('Habits');

    const habitDataSource = habitDataSources.find(
        result =>
            result.object === 'data_source' &&
            'title' in result &&
            result.title?.some(item => item.plain_text === 'Habits'),
    );

    if (!habitDataSource) {
        throw new DataSourceNotFoundError('Habits');
    }

    const today = getBrazilDate(new Date());

    const habits: Array<{
        id: string;
        specializationIds: string[];
        createdAt: string;
    }> = [];

    for await (const result of notion.queryDataSource(habitDataSource.id)) {
        if (!getCheckbox(result.properties.Active)) {
            continue;
        }

        const createdAt = getBrazilDate(new Date(result.created_time));

        habits.push({
            id: result.id,
            specializationIds: getRelationIds(result.properties.Specializations),
            createdAt,
        });
    }

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

    const completedHabitDates = new Map<string, Set<string>>();

    for await (const result of notion.queryDataSource(completionDataSource.id)) {
        if (!getCheckbox(result.properties.Completed)) {
            continue;
        }

        const habitId = getRelationId(result.properties.Habit);

        const date = getDate(result.properties.Date)?.slice(0, 10);

        if (!habitId || !date) {
            continue;
        }

        const dates = completedHabitDates.get(habitId) ?? new Set<string>();

        dates.add(date);
        completedHabitDates.set(habitId, dates);
    }

    for (const habit of habits) {
        const possibleDays = getDaysInclusive(habit.createdAt, today);
        const completedDates = completedHabitDates.get(habit.id) ?? new Set<string>();

        const completedDays = [...completedDates].filter(
            date => date >= habit.createdAt && date <= today,
        );

        for (const specializationId of habit.specializationIds) {
            const statId = specializationStatMap.get(specializationId);
            const stat = statId ? statMap.get(statId) : undefined;

            if (!stat) {
                continue;
            }

            stat.possiblePoints += possibleDays;
            stat.completedPoints += completedDays.length;
        }
    }

    const totalPossiblePoints = stats.reduce((total, stat) => total + stat.possiblePoints, 0);

    return {
        stats: stats
            .sort((a, b) => a.index - b.index)
            .map(stat => ({
                id: stat.id,
                name: stat.name,
                description: stat.description,
                icon: stat.icon,
                index: stat.index,
                score:
                    totalPossiblePoints > 0
                        ? Math.round((stat.completedPoints / totalPossiblePoints) * 100)
                        : 0,
            })),
    };
}
