import { and, eq } from 'drizzle-orm';
import type { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';

import { NotionAdapter } from '../adapters/notion/notion.adapter.js';
import { db } from '../db/index.js';
import { account } from '../db/schema.js';
import { getNotionPageTitle } from '../lib/notion.js';
import { requireAuth } from '../plugins/requireAuth.js';
import {
    ErrorSchema,
    NotionPageContentResponseSchema,
    NotionPageResponseSchema,
    NotionPagesSchema,
    NotionSearchQuerySchema,
    NotionSearchResponseSchema,
    NotionStatusSchema,
    ReadNotionPageParamsSchema,
} from '../schemas/index.js';
import { readNotionPage } from '../usecases/readNotionPage.js';
import { readNotionPageContent } from '../usecases/readNotionPageContent.js';
import { searchNotion } from '../usecases/searchNotion.js';

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

            const notion = new NotionAdapter(accessToken);

            const pages = [];

            for await (const page of notion.searchPages()) {
                pages.push({
                    id: page.id,
                    title: getNotionPageTitle(page),
                    url: page.url,
                });
            }

            return {
                pages,
            };
        },
    });

    app.withTypeProvider<ZodTypeProvider>().route({
        method: 'GET',
        url: '/api/notion/search',
        preHandler: requireAuth,
        schema: {
            operationId: 'searchNotion',
            tags: ['Notion'],
            summary: 'Search Notion pages and data sources for the authenticated user',
            querystring: NotionSearchQuerySchema,
            response: {
                200: NotionSearchResponseSchema,
                401: ErrorSchema,
                500: ErrorSchema,
            },
        },
        handler: async request => {
            return searchNotion({
                userId: request.user!.id,
                query: request.query.query,
            });
        },
    });

    app.withTypeProvider<ZodTypeProvider>().route({
        method: 'GET',
        url: '/api/notion/pages/:id',
        preHandler: requireAuth,
        schema: {
            operationId: 'getNotionPage',
            tags: ['Notion'],
            summary: 'Read a Notion page and its properties',
            params: ReadNotionPageParamsSchema,
            response: {
                200: NotionPageResponseSchema,
                401: ErrorSchema,
                500: ErrorSchema,
            },
        },
        handler: async request => {
            return readNotionPage({
                userId: request.user!.id,
                pageId: request.params.id,
            });
        },
    });

    app.withTypeProvider<ZodTypeProvider>().route({
        method: 'GET',
        url: '/api/notion/pages/:id/content',
        preHandler: requireAuth,
        schema: {
            operationId: 'getNotionPageContent',
            tags: ['Notion'],
            summary: 'Read the recursive content blocks of a Notion page',
            params: ReadNotionPageParamsSchema,
            response: {
                200: NotionPageContentResponseSchema,
                401: ErrorSchema,
                500: ErrorSchema,
            },
        },
        handler: async request => {
            return readNotionPageContent({
                userId: request.user!.id,
                pageId: request.params.id,
            });
        },
    });
}
