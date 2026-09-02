import { isFullPage } from '@notionhq/client';
import { and, eq } from 'drizzle-orm';
import type { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';

import { db } from '../db/index.js';
import { account } from '../db/schema.js';
import { getNotionPageTitle } from '../lib/notion.js';
import { createNotionClient } from '../lib/notion.js';
import { requireAuth } from '../plugins/requireAuth.js';
import { ErrorSchema, NotionPagesSchema, NotionStatusSchema } from '../schemas/index.js';

export async function notionRoutes(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().route({
        method: 'GET',
        url: '/api/notion/status',
        preHandler: requireAuth,
        schema: {
            operationId: 'getNotionStatus',
            summary: 'Get the Notion connection status for the authenticated user',
            tags: ['Notion'],
            response: {
                200: NotionStatusSchema,
                401: ErrorSchema,
                500: ErrorSchema,
            },
        },
        handler: async request => {
            const notionAccount = await db
                .select({ id: account.id })
                .from(account)
                .where(and(eq(account.userId, request.user!.id), eq(account.providerId, 'notion')))
                .limit(1);
            return {
                connected: notionAccount.length > 0,
            };
        },
    });

    app.withTypeProvider<ZodTypeProvider>().route({
        method: 'GET',
        url: '/api/notion/pages',
        preHandler: requireAuth,
        schema: {
            operationId: 'getNotionPages',
            tags: ['Notion'],
            summary: 'List Notion pages for the authenticated user',
            response: {
                200: NotionPagesSchema,
                401: ErrorSchema,
                404: ErrorSchema,
                500: ErrorSchema,
            },
        },
        handler: async (request, reply) => {
            const notionAccount = await db
                .select({ accessToken: account.accessToken })
                .from(account)
                .where(and(eq(account.userId, request.user!.id), eq(account.providerId, 'notion')))
                .limit(1);

            const accessToken = notionAccount[0]?.accessToken;

            if (!accessToken) {
                return reply.status(404).send({
                    error: 'Notion account not connected',
                    message: 'No connected Notion account was found for this user.',
                    code: 'NOTION_NOT_CONNECTED',
                });
            }

            const notion = createNotionClient(accessToken);

            const response = await notion.search({
                filter: {
                    property: 'object',
                    value: 'page',
                },
            });

            return {
                pages: response.results.filter(isFullPage).map(page => ({
                    id: page.id,
                    title: getNotionPageTitle(page),
                    url: page.url,
                })),
            };
        },
    });
}
