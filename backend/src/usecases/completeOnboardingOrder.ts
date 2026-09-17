import { DataSourceNotFoundError, ProfileNotFoundError } from '../errors/index.js';
import { getNotionAdapter, getSelect } from '../lib/notion.js';
import type { CompleteOnboardingOrder } from '../schemas/onboarding.js';

async function getProfilePage(userId: string) {
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

    for await (const page of notion.queryDataSource(dataSource.id)) {
        return page;
    }

    throw new ProfileNotFoundError();
}

export async function completeOnboardingOrder(
    userId: string,
    { mysticOrder }: CompleteOnboardingOrder,
) {
    const profile = await getProfilePage(userId);

    const currentMysticOrder = getSelect(profile.properties['Mystic Order']);

    if (currentMysticOrder) {
        return {
            profileId: profile.id,
            mysticOrder: currentMysticOrder,
        };
    }

    const notion = await getNotionAdapter(userId);

    const updatedProfile = await notion.updatePage(profile.id, {
        properties: {
            'Mystic Order': {
                select: {
                    name: mysticOrder,
                },
            },
        },
    });

    return {
        profileId: updatedProfile.id,
        mysticOrder,
    };
}
