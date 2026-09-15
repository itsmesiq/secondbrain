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

function mapHabit(result: any): Habit {
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
        createdAt: getCreatedTime(result),
    };
}

export async function getWidgetHabits({ userId, active }: GetWidgetHabits): Promise<Habit[]> {
    const notion = await getNotionAdapter(userId);

    const dataSources = await notion.searchDataSources('Habits');
    const dataSource = dataSources.find(result => result.object === 'data_source');

    if (!dataSource) {
        throw new DataSourceNotFoundError('Habits');
    }

    const habits: Habit[] = [];

    for await (const result of notion.queryDataSource(dataSource.id)) {
        const habit = mapHabit(result);

        if (active !== undefined && habit.active !== active) {
            continue;
        }

        habits.push(habit);
    }

    return habits;
}
