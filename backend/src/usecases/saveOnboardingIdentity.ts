import { DataSourceNotFoundError, ProfileAlreadyExistsError } from '../errors/index.js';
import { getNotionAdapter } from '../lib/notion.js';
import type { SaveOnboardingIdentity } from '../schemas/onboarding.js';
import { createWidgetProfile } from './createWidgetProfile.js';

async function createPrimaryObjective(userId: string, objective: string) {
    const notion = await getNotionAdapter(userId);

    const dataSources = await notion.searchDataSources('Objectives');

    const dataSource = dataSources.find(
        result =>
            result.object === 'data_source' &&
            'title' in result &&
            result.title?.some(item => item.plain_text === 'Objectives'),
    );

    if (!dataSource) {
        throw new DataSourceNotFoundError('Objectives');
    }

    return notion.createPage(dataSource.id, {
        Nome: {
            title: [
                {
                    text: {
                        content: objective,
                    },
                },
            ],
        },
        Priority: {
            select: {
                name: 'Primary',
            },
        },
        Active: {
            checkbox: true,
        },
    });
}

export async function saveOnboardingIdentity(
    userId: string,
    { name, avatar, objective }: SaveOnboardingIdentity,
) {
    const notion = await getNotionAdapter(userId);

    const profileDataSources = await notion.searchDataSources('Profile');

    const profileDataSource = profileDataSources.find(
        result =>
            result.object === 'data_source' &&
            'title' in result &&
            result.title?.some(item => item.plain_text === 'Profile'),
    );

    if (!profileDataSource) {
        throw new DataSourceNotFoundError('Profile');
    }

    const profileIterator = notion.queryDataSource(profileDataSource.id);

    const firstProfile = await profileIterator.next();

    if (!firstProfile.done) {
        throw new ProfileAlreadyExistsError();
    }

    const profile = await createWidgetProfile({
        userId,
        name,
        avatar,
    });

    const objectivePage = await createPrimaryObjective(userId, objective);

    return {
        profileId: profile.id,
        objectivePageId: objectivePage.id,
    };
}
