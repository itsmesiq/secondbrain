import { DataSourceNotFoundError } from '../errors/index.js';
import { getCheckbox, getNotionAdapter, getNumber, getRichText, getTitle } from '../lib/notion.js';
import type { Level } from '../schemas/etherea/index.js';

export async function getLevels(userId: string): Promise<Level[]> {
    const notion = await getNotionAdapter(userId);

    const dataSources = await notion.searchDataSources('Levels');
    const dataSource = dataSources.find(
        result =>
            result.object === 'data_source' &&
            'title' in result &&
            result.title?.some(item => item.plain_text === 'Levels'),
    );

    if (!dataSource) {
        throw new DataSourceNotFoundError('Levels');
    }

    const levels: Level[] = [];

    for await (const result of notion.queryDataSource(dataSource.id)) {
        levels.push({
            id: result.id,
            name: getTitle(result.properties.Nome),
            level: getNumber(result.properties.Level),
            requiredXP: getNumber(result.properties['Required XP']),
            milestone: getCheckbox(result.properties.Milestone),
            reward: getRichText(result.properties.Reward),
            active: getCheckbox(result.properties.Active),
        });
    }

    return levels;
}
