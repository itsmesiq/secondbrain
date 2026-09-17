import { and, eq } from 'drizzle-orm';

import { db } from '../db/index.js';
import { account } from '../db/schema.js';
import { getNotionAdapter, getSelect } from '../lib/notion.js';
import type { OnboardingStatus } from '../schemas/onboarding.js';

async function hasNotionConnection(userId: string): Promise<boolean> {
    const result = await db
        .select({ id: account.id })
        .from(account)
        .where(and(eq(account.userId, userId), eq(account.providerId, 'notion')))
        .limit(1);

    return result.length > 0;
}

async function getProfile(userId: string): Promise<{ id: string; mysticOrder: string } | null> {
    const notion = await getNotionAdapter(userId);

    const dataSources = await notion.searchDataSources('Profile');

    const dataSource = dataSources.find(
        result =>
            result.object === 'data_source' &&
            'title' in result &&
            result.title?.some(item => item.plain_text === 'Profile'),
    );

    if (!dataSource) {
        return null;
    }

    for await (const result of notion.queryDataSource(dataSource.id)) {
        return {
            id: result.id,
            mysticOrder: getSelect(result.properties['Mystic Order']),
        };
    }

    return null;
}

async function hasObjective(userId: string): Promise<boolean> {
    const notion = await getNotionAdapter(userId);

    const dataSources = await notion.searchDataSources('Objectives');

    const dataSource = dataSources.find(
        result =>
            result.object === 'data_source' &&
            'title' in result &&
            result.title?.some(item => item.plain_text === 'Objectives'),
    );

    if (!dataSource) {
        return false;
    }

    for await (const result of notion.queryDataSource(dataSource.id)) {
        if (result) {
            return true;
        }
    }

    return false;
}

async function hasSpecializations(userId: string): Promise<boolean> {
    const notion = await getNotionAdapter(userId);

    const dataSources = await notion.searchDataSources('Specializations');

    const dataSource = dataSources.find(
        result =>
            result.object === 'data_source' &&
            'title' in result &&
            result.title?.some(item => item.plain_text === 'Specializations'),
    );

    if (!dataSource) {
        return false;
    }

    for await (const result of notion.queryDataSource(dataSource.id)) {
        if (result) {
            return true;
        }
    }

    return false;
}

export async function getOnboardingStatus(userId: string): Promise<OnboardingStatus> {
    const notionConnected = await hasNotionConnection(userId);

    if (!notionConnected) {
        return {
            completed: false,
            currentStep: 'notion',
        };
    }

    const profile = await getProfile(userId);

    if (!profile) {
        return {
            completed: false,
            currentStep: 'identity',
        };
    }

    const objectiveExists = await hasObjective(userId);

    if (!objectiveExists) {
        return {
            completed: false,
            currentStep: 'identity',
        };
    }

    const specializationsExist = await hasSpecializations(userId);

    if (!specializationsExist) {
        return {
            completed: false,
            currentStep: 'specializations',
        };
    }

    if (profile.mysticOrder) {
        return {
            completed: true,
            currentStep: 'completed',
        };
    }

    return {
        completed: false,
        currentStep: 'order-quiz',
    };
}
