import { DataSourceNotFoundError, ProfileNotFoundError } from '../errors/index.js';
import {
    getCreatedTime,
    getFileUrl,
    getLastEditedTime,
    getNotionAdapter,
    getNumber,
    getRichText,
    getSelect,
    getTitle,
} from '../lib/notion.js';
import type { Profile } from '../schemas/etherea/index.js';

function mapProfile(result: any): Profile {
    return {
        id: result.id,
        name: getTitle(result.properties.Nome),
        avatar: getFileUrl(result.properties.Avatar) ?? '',
        mysticOrder: getSelect(result.properties['Mystic Order']),
        level: getNumber(result.properties.Level),
        xp: getNumber(result.properties.XP),
        gold: getNumber(result.properties.Gold),
        title: getRichText(result.properties.Title),
        createdAt: getCreatedTime(result.properties['Created At']),
        updatedAt: getLastEditedTime(result.properties['Updated At']),
    };
}

export async function getWidgetProfile(userId: string): Promise<Profile> {
    const notion = await getNotionAdapter(userId);

    const dataSources = await notion.searchDataSources('Profile');
    const dataSource = dataSources.find(
        result =>
            result.object === 'data_source' &&
            'title' in result &&
            result.title?.some(item => item.plain_text === 'Profile'),
    );

    if (!dataSource) {
        throw new DataSourceNotFoundError('Profile');
    }

    for await (const result of notion.queryDataSource(dataSource.id)) {
        return mapProfile(result);
    }

    throw new ProfileNotFoundError();
}
