import { DataSourceNotFoundError } from '../errors/index.js';
import { getNotionAdapter } from '../lib/notion.js';
import type { CreateOnboardingSpecializations } from '../schemas/onboarding.js';

export async function createOnboardingSpecialization(
    userId: string,
    { name, statsId }: CreateOnboardingSpecializations,
) {
    const notion = await getNotionAdapter(userId);

    const dataSources = await notion.searchDataSources('Specializations');

    const dataSource = dataSources.find(
        result =>
            result.object === 'data_source' &&
            'title' in result &&
            result.title?.some(item => item.plain_text === 'Specializations'),
    );

    if (!dataSource) {
        throw new DataSourceNotFoundError('Specializations');
    }

    const statsDataSources = await notion.searchDataSources('Stats');

    const statsDataSource = statsDataSources.find(
        result =>
            result.object === 'data_source' &&
            'title' in result &&
            result.title?.some(item => item.plain_text === 'Stats'),
    );

    if (!statsDataSource) {
        throw new DataSourceNotFoundError('Stats');
    }

    let statsExists = false;

    for await (const result of notion.queryDataSource(statsDataSource.id)) {
        if (result.id === statsId) {
            statsExists = true;
            break;
        }
    }

    if (!statsExists) {
        throw new Error('Stats not found');
    }

    const page = await notion.createPage(dataSource.id, {
        Nome: {
            title: [
                {
                    text: {
                        content: name,
                    },
                },
            ],
        },

        Stats: {
            relation: [
                {
                    id: statsId,
                },
            ],
        },
    });

    return {
        id: page.id,
        name,
        statsId,
    };
}
