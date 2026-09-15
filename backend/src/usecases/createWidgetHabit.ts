import { DataSourceNotFoundError } from '../errors/index.js';
import { getNotionAdapter } from '../lib/notion.js';

interface CreateWidgetHabit {
    userId: string;
    name: string;
    specializatonIds?: string[];
    objectiveId?: string | null;
}

export async function createWidgetHabit({
    userId,
    name,
    specializatonIds,
    objectiveId,
}: CreateWidgetHabit) {
    const notion = await getNotionAdapter(userId);

    const dataSources = await notion.searchDataSources('Habits');
    const dataSource = dataSources.find(result => result.object === 'data_source');

    if (!dataSource) {
        throw new DataSourceNotFoundError('Habits');
    }

    const properties = {
        Nome: {
            title: [
                {
                    text: {
                        content: name,
                    },
                },
            ],
        },
        Frequency: {
            select: {
                name: 'Daily',
            },
        },
        Active: {
            checkbox: true,
        },
        'Current Streak': {
            number: 0,
        },
        'Best Streak': {
            number: 0,
        },
        ...(specializatonIds?.length && {
            Specializations: {
                relation: specializatonIds.map(id => ({ id })),
            },
        }),
        ...(objectiveId && {
            Objective: {
                relation: [
                    {
                        id: objectiveId,
                    },
                ],
            },
        }),
    };

    const page = await notion.createPage(dataSource.id, properties);

    return {
        id: page.id,
        url: 'url' in page ? page.url : '',
    };
}
