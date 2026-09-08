import { and, eq } from 'drizzle-orm';

import { db } from '../db/index.js';
import { account } from '../db/schema.js';
import { DataSourceNotFoundError, NotionNotConnectedError } from '../errors/indes.js';
import { createNotionClient } from '../lib/notion.js';

interface CreateWidgetTask {
    userId: string;
    title: string;
    description?: string;
    projectId?: string;
    category?: string;
    dueDate?: string;
    priority?: string;
}

export async function createWidgetTask({
    userId,
    title,
    description,
    projectId,
    category,
    dueDate,
    priority,
}: CreateWidgetTask) {
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

    const dataSorce = response.results.find(result => result.object === 'data_source');

    if (!dataSorce) {
        throw new DataSourceNotFoundError('Tarefas');
    }

    const properties = {
        Nome: {
            title: [
                {
                    text: {
                        content: title,
                    },
                },
            ],
        },
        Status: {
            status: {
                name: '📥 Inbox',
            },
        },
        ...(description && {
            Descrição: {
                rich_text: [
                    {
                        text: {
                            content: description,
                        },
                    },
                ],
            },
        }),
        ...(category && {
            Área: {
                select: {
                    name: category,
                },
            },
        }),
        ...(dueDate && {
            Prazo: {
                date: {
                    start: dueDate,
                },
            },
        }),
        ...(priority && {
            Prioridade: {
                select: {
                    name: priority,
                },
            },
        }),
        ...(projectId && {
            Projetos: {
                relation: [
                    {
                        id: projectId,
                    },
                ],
            },
        }),
    };

    const page = await notion.pages.create({
        parent: {
            data_source_id: dataSorce.id,
        },
        properties,
    });

    return {
        id: page.id,
        url: 'url' in page ? page.url : '',
    };
}
