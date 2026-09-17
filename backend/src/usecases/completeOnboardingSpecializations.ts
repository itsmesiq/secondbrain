import { DataSourceNotFoundError } from '../errors/index.js';
import { getNotionAdapter } from '../lib/notion.js';
import type { CompleteSpecializations } from '../schemas/onboarding.js';

export async function completeOnboardingSpecializations({
    userId,
    specializationIds,
}: CompleteSpecializations & { userId: string }) {
    if (specializationIds.length === 0) {
        throw new Error('At least one specialization is required.');
    }

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

    const existingIds = new Set<string>();

    for await (const result of notion.queryDataSource(dataSource.id)) {
        existingIds.add(result.id);
    }

    const allExist = specializationIds.every(id => existingIds.has(id));

    if (!allExist) {
        throw new Error('One or more specializations do not exist.');
    }

    return {
        completed: false,
        currentStep: 'order-quiz' as const,
    };
}
