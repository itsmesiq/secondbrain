import { isFullPage, iteratePaginatedAPI } from '@notionhq/client';
import { and, eq } from 'drizzle-orm';

import { db } from '../db/index.js';
import { account } from '../db/schema.js';
import { DataSourceNotFoundError, NotionNotConnectedError } from '../errors/indes.js';
import { createNotionClient } from '../lib/notion.js';

interface GetWidgetTasks {
    userId: string;
    date: string;
    projectId?: string;
}

function getPropertyText(property: any): string | null {
    if (property?.type !== 'rich_text' && property?.type !== 'title') {
        return null;
    }

    const items = property.type === 'title' ? property.title : property.rich_text;

    return items?.map((item: any) => item.plain_text).join('') || null;
}

function getProjectName(property: any): string | null {
    if (property?.type !== 'relation' || property.relation.length === 0) {
        return null;
    }

    return property.relation[0].id;
}

export async function getWidgetTasks({ userId, date, projectId }: GetWidgetTasks) {
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

    const projectsCache = new Map<string, { id: string; name: string } | null>();

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

    const tasks = [];

    for await (const result of iteratePaginatedAPI(notion.dataSources.query, {
        data_source_id: dataSourceId,
        filter: {
            property: 'Prazo',
            date: {
                equals: date,
            },
        },
    })) {
        if (!isFullPage(result)) {
            continue;
        }

        const parentItem = result.properties['Item principal'];

        if (parentItem?.type === 'relation' && parentItem.relation.length > 0) {
            continue;
        }

        const title = getPropertyText(result.properties.Nome) ?? 'Sem título';
        const description = getPropertyText(result.properties.Descrição);

        const dueDate =
            result.properties.Prazo?.type === 'date'
                ? (result.properties.Prazo.date?.start ?? null)
                : null;

        const category =
            result.properties.Área?.type === 'select'
                ? (result.properties.Área.select?.name ?? null)
                : null;

        const status =
            result.properties.Status?.type === 'status'
                ? (result.properties.Status.status?.name ?? '')
                : '';

        const priority =
            result.properties.Prioridade?.type === 'select'
                ? (result.properties.Prioridade.select?.name ?? null)
                : null;

        const projectRelation = result.properties.Projetos;

        const projectIdFromTask = getProjectName(projectRelation);

        if (projectId && projectIdFromTask !== projectId) {
            continue;
        }

        let project = null;

        if (projectIdFromTask) {
            if (projectsCache.has(projectIdFromTask)) {
                project = projectsCache.get(projectIdFromTask) ?? null;
            } else {
                const projectPage = await notion.pages.retrieve({
                    page_id: projectIdFromTask,
                });

                if ('properties' in projectPage) {
                    const titleProperty = Object.values(projectPage.properties).find(
                        property => property.type === 'title',
                    );

                    if (titleProperty?.type === 'title') {
                        project = {
                            id: projectIdFromTask,
                            name:
                                titleProperty.title.map(item => item.plain_text).join('') ||
                                'Sem título',
                        };
                    }
                }

                projectsCache.set(projectIdFromTask, project);
            }
        }

        tasks.push({
            id: result.id,
            title,
            description,
            dueDate,
            category,
            project,
            status,
            priority,
            url: result.url,
        });
    }

    const projectsMap = new Map<string, { id: string; name: string }>();

    for (const task of tasks) {
        if (task.project) {
            projectsMap.set(task.project.id, task.project);
        }
    }

    return {
        tasks,
        projects: Array.from(projectsMap.values()),
    };
}
