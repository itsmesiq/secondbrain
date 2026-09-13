import { and, eq } from 'drizzle-orm';

import { NotionAdapter } from '../adapters/notion/notion.adapter.js';
import { db } from '../db/index.js';
import { account } from '../db/schema.js';
import { DataSourceNotFoundError, NotionNotConnectedError } from '../errors/indes.js';

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

    const notion = new NotionAdapter(accessToken);

    const response = await notion.searchDataSources('Tarefas');

    const dataSource = response.find(result => result.object === 'data_source');

    if (!dataSource) {
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

    const page = await notion.createPage(dataSource.id, properties);

    return {
        id: page.id,
        url: 'url' in page ? page.url : '',
    };
}
