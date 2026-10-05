import { DataSourceNotFoundError } from '../errors/index.js';
import {
    getCheckbox,
    getCreatedTime,
    getDate,
    getNotionAdapter,
    getNumber,
    getRelationId,
    getRelationIds,
    getSelect,
    getTitle,
} from '../lib/notion.js';
import type { Habit } from '../schemas/etherea/index.js';

interface GetWidgetHabits {
    userId: string;
    active?: boolean;
}

const HEATMAP_DAYS = 90;

function getTodayInSaoPaulo(): string {
    return new Intl.DateTimeFormat('en-CA', {
        timeZone: 'America/Sao_Paulo',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).format(new Date());
}

function getHeatmapStartDate(): string {
    const today = getTodayInSaoPaulo();

    const date = new Date(`${today}T00:00:00Z`);

    date.setDate(date.getDate() - (HEATMAP_DAYS - 1));

    return date.toISOString().slice(0, 10);
}

function mapHabit(result: any, completionDates: string[]): Habit {
    return {
        id: result.id,
        name: getTitle(result.properties.Nome),
        frequency: getSelect(result.properties.Frequency),
        specializationIds: getRelationIds(result.properties.Specializations),
        objectiveId: getRelationId(result.properties.Objective),
        active: getCheckbox(result.properties.Active),
        currentStreak: getNumber(result.properties['Current Streak']),
        bestStreak: getNumber(result.properties['Best Streak']),
        lastCompletedAt: getDate(result.properties['Last Completed']),
        completionDates,
        createdAt: getCreatedTime(result),
    };
}

export async function getWidgetHabits({ userId, active }: GetWidgetHabits): Promise<Habit[]> {
    const notion = await getNotionAdapter(userId);

    const [habitDataSources, completionDataSources] = await Promise.all([
        notion.searchDataSources('Habits'),
        notion.searchDataSources('Habit Completions'),
    ]);

    const habitDataSource = habitDataSources.find(result => result.object === 'data_source');

    if (!habitDataSource) {
        throw new DataSourceNotFoundError('Habits');
    }

    const completionDataSource = completionDataSources.find(
        result =>
            result.object === 'data_source' &&
            'title' in result &&
            result.title?.some(item => item.plain_text === 'Habit Completions'),
    );

    if (!completionDataSource) {
        throw new DataSourceNotFoundError('Habit Completions');
    }

    const completionDatesByHabit = new Map<string, string[]>();

    const heatmapStartDate = getHeatmapStartDate();

    for await (const result of notion.queryDataSource(completionDataSource.id, {
        filter: {
            property: 'Date',
            date: {
                on_or_after: heatmapStartDate,
            },
        },
    })) {
        const habitId = getRelationId(result.properties.Habit);

        const date = getDate(result.properties.Date);

        if (!habitId || !date) {
            continue;
        }

        const completed = getCheckbox(result.properties.Completed);

        if (!completed) {
            continue;
        }

        const dateKey = date.slice(0, 10);

        const dates = completionDatesByHabit.get(habitId) ?? [];

        if (!dates.includes(dateKey)) {
            dates.push(dateKey);
        }

        completionDatesByHabit.set(habitId, dates);
    }

    const habits: Habit[] = [];

    for await (const result of notion.queryDataSource(habitDataSource.id)) {
        const completionDates = completionDatesByHabit.get(result.id) ?? [];

        const habit = mapHabit(result, completionDates);

        if (active !== undefined && habit.active !== active) {
            continue;
        }

        habits.push(habit);
    }

    return habits;
}
