import { DataSourceNotFoundError } from '../errors/index.js';
import {
    getCreatedTime,
    getNotionAdapter,
    getNumber,
    getRelationId,
    getTitle,
} from '../lib/notion.js';
import type { ProgressHistory } from '../schemas/etherea/index.js';

export async function getProgressHistory(userId: string): Promise<ProgressHistory[]> {
    const notion = await getNotionAdapter(userId);

    const dataSources = await notion.searchDataSources('Progress History');
    const dataSource = await dataSources.find(result => result.object === 'data_source');

    if (!dataSource) {
        throw new DataSourceNotFoundError('Progress History');
    }

    const history: ProgressHistory[] = [];

    for await (const result of notion.queryDataSource(dataSource.id)) {
        history.push({
            id: result.id,
            name: getTitle(result.properties.Nome),
            taskId: getRelationId(result.properties.Task) ?? '',
            xp: getNumber(result.properties.XP),
            gold: getNumber(result.properties.Gold),
            createdAt: getCreatedTime(result.properties['Created At']),
        });
    }

    return history;
}
