import { DataSourceNotFoundError, ProfileAlreadyExistsError } from '../errors/index.js';
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
import { calculateLevel } from '../services/etherea/level.service.js';
import { getLevels } from './getLevels.js';

interface CreateWidgetProfile {
    userId: string;
    name: string;
    avatar: string;
    mysticOrder?: string;
}

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

export async function createWidgetProfile({
    userId,
    name,
    avatar,
    mysticOrder,
}: CreateWidgetProfile): Promise<Profile> {
    const notion = await getNotionAdapter(userId);

    const avatarUrl = new URL(avatar, process.env.WEB_APP_BASE_URL).toString();

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

    const profileIterator = notion.queryDataSource(dataSource.id);
    const firstProfile = await profileIterator.next();

    if (!firstProfile.done) {
        throw new ProfileAlreadyExistsError();
    }

    const levels = await getLevels(userId);
    const initialLevel = calculateLevel(levels, 0);

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
        Avatar: {
            files: [
                {
                    type: 'external' as const,
                    name: 'Avatar',
                    external: {
                        url: avatarUrl,
                    },
                },
            ],
        },
        ...(mysticOrder && {
            'Mystic Order': {
                select: {
                    name: mysticOrder,
                },
            },
        }),
        Level: {
            number: initialLevel.level,
        },
        XP: {
            number: 0,
        },
        Gold: {
            number: 0,
        },
        Title: {
            rich_text: [
                {
                    text: {
                        content: initialLevel.name,
                    },
                },
            ],
        },
    };

    const page = await notion.createPage(dataSource.id, properties);

    await notion.updatePage(initialLevel.id, {
        Active: {
            checkbox: true,
        },
    });

    return mapProfile(page);
}
