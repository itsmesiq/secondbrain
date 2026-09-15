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
import { calculateLevel } from '../services/etherea/level.service.js';
import { getLevels } from './getLevels.js';

interface UpdateProfileProgress {
    userId: string;
    xp: number;
    gold: number;
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

export async function updateProfileProgress({
    userId,
    xp,
    gold,
}: UpdateProfileProgress): Promise<Profile> {
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

    let profilePage;

    for await (const result of notion.queryDataSource(dataSource.id)) {
        profilePage = result;
        break;
    }

    if (!profilePage) {
        throw new ProfileNotFoundError();
    }

    const currentXP = getNumber(profilePage.properties.XP);
    const currentGold = getNumber(profilePage.properties.Gold);

    const totalXP = currentXP + xp;
    const totalGold = currentGold + gold;

    const levels = await getLevels(userId);
    const currentLevel = calculateLevel(levels, totalXP);

    await notion.updatePage(profilePage.id, {
        XP: {
            number: totalXP,
        },
        Gold: {
            number: totalGold,
        },
        Level: {
            number: currentLevel.level,
        },
    });

    return {
        ...mapProfile(profilePage),
        xp: totalXP,
        gold: totalGold,
        level: currentLevel.level,
    };
}
