import { DataSourceNotFoundError } from '../errors/index.js';
import { getNotionAdapter } from '../lib/notion.js';

interface CreateWidgetTask {
    userId: string;
    name: string;
    priority?: string;
    difficulty?: string;
    dueDate?: string;
    specializationIds?: string[];
    objectiveId?: string | null;
    projectId?: string | null;
}

export async function createWidgetTask({
    userId,
    name,
    priority,
    difficulty,
    dueDate,
    specializationIds,
    objectiveId,
    projectId,
}: CreateWidgetTask) {
    const notion = await getNotionAdapter(userId);

    const dataSources = await notion.searchDataSources('Tasks');

    const dataSource = dataSources.find(result => result.object === 'data_source');

    if (!dataSource) {
        throw new DataSourceNotFoundError('Tasks');
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
        Status: {
            status: {
                name: 'Não iniciada',
            },
        },
        ...(priority && {
            Priority: {
                select: {
                    name: priority,
                },
            },
        }),
        ...(difficulty && {
            Difficulty: {
                select: {
                    name: difficulty,
                },
            },
        }),
        ...(dueDate && {
            'Due Date': {
                date: {
                    start: dueDate,
                },
            },
        }),
        ...(specializationIds?.length && {
            Specializations: {
                relation: specializationIds.map(id => ({
                    id,
                })),
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
        ...(projectId && {
            Project: {
                relation: [
                    {
                        id: projectId,
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
