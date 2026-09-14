import { DataSourceNotFoundError } from '../errors/index.js';
import { getNotionAdapter } from '../lib/notion.js';

interface CreateProgressHistory {
    userId: string;
    name: string;
    taskId: string;
    xp: number;
    gold: number;
}

export async function createProgressHistory({
    userId,
    name,
    taskId,
    xp,
    gold,
}: CreateProgressHistory) {
    const notion = await getNotionAdapter(userId);

    const dataSources = await notion.searchDataSources('Progress History');
    const dataSource = await dataSources.find(result => result.object === 'data_source');

    if (!dataSource) {
        throw new DataSourceNotFoundError('Progress History');
    }

    const properties = {
        Nome: {
            title: [{ text: { content: name } }],
        },
        Task: {
            relation: [{ id: taskId }],
        },
        XP: {
            number: xp,
        },
        Gold: {
            number: gold,
        },
    };

    const page = await notion.createPage(dataSource.id, properties);

    return {
        id: page.id,
        url: 'url' in page ? page.url : '',
    };
}
