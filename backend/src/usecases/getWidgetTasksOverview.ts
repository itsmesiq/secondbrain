import { isFullPage, iteratePaginatedAPI } from '@notionhq/client';
import { and, eq } from 'drizzle-orm';

import { db } from '../db/index.js';
import { account } from '../db/schema.js';
import { DataSourceNotFoundError, NotionNotConnectedError } from '../errors/indes.js';
import { createNotionClient } from '../lib/notion.js';

interface GetTaskOverview {
    userId: string;
}

export async function getWidgetTasksOverview({ userId }: GetTaskOverview) {
    const notionAccount = await db
        .select({ accessToken: account.accessToken })
        .from(account)
        .where(and(eq(account.userId, userId), eq(account.providerId, 'notion')))
        .limit(1);

    const accessToken = notionAccount[0]?.accessToken;

    if (!accessToken) {
        throw new NotionNotConnectedError();
    }

    const notion = createNotionClient(accessToken);

    const response = await notion.search({
        query: 'Tarefas',
        filter: {
            property: 'object',
            value: 'data_source',
        },
    });

    const dataSource = response.results.find(result => result.object === 'data_source');

    if (!dataSource) {
        throw new DataSourceNotFoundError('Tarefas');
    }

    const dataSourceId = dataSource.id;

    let total = 0;
    let completed = 0;
    let pending = 0;
    const completionDates: string[] = [];

    for await (const result of iteratePaginatedAPI(notion.dataSources.query, {
        data_source_id: dataSourceId,
    })) {
        if (!isFullPage(result)) {
            continue;
        }

        const parentItem = result.properties['Item principal'];

        if (parentItem?.type === 'relation' && parentItem.relation.length > 0) {
            continue;
        }

        total++;

        const status = result.properties.Status;

        if (status?.type === 'status') {
            if (status.status?.name === 'Concluído') {
                completed++;
            } else if (
                ['📥 Inbox', 'A fazer', '⏸️ Pausado', 'Em andamento'].includes(
                    status.status?.name ?? '',
                )
            ) {
                pending++;
            }
        }

        const completedAt = result.properties['Concluída em'];

        if (
            status?.type === 'status' &&
            status.status?.name === 'Concluído' &&
            completedAt?.type === 'date' &&
            completedAt.date?.start
        ) {
            completionDates.push(completedAt.date.start);
        }
    }

    const completionRate =
        completed + pending > 0 ? Math.round((completed / (completed + pending)) * 100) : 0;

    const uniqueCompletionDates = new Set(completionDates.map(date => date.slice(0, 10)));

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayKey = today.toISOString().slice(0, 10);
    const yesterday = new Date(today);
    yesterday.setUTCDate(yesterday.getUTCDate() - 1);
    const yesterdayKey = yesterday.toISOString().slice(0, 10);

    let streak = 0;
    const streakStart = uniqueCompletionDates.has(todayKey)
        ? today
        : uniqueCompletionDates.has(yesterdayKey)
          ? yesterday
          : null;

    if (streakStart) {
        const currentDate = new Date(streakStart);

        while (uniqueCompletionDates.has(currentDate.toISOString().slice(0, 10))) {
            streak++;
            currentDate.setUTCDate(currentDate.getUTCDate() - 1);
        }
    }

    return {
        total,
        completed,
        pending,
        completionRate,
        currentStreak: streak,
    };
}
