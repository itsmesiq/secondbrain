import { and, eq } from 'drizzle-orm';
import type { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';

import { NotionAdapter } from '../adapters/notion/notion.adapter.js';
import { db } from '../db/index.js';
import { account } from '../db/schema.js';
import { getNotionPageTitle } from '../lib/notion.js';
import { requireAuth } from '../plugins/requireAuth.js';
import {
    CreateNotionChildPageParamsSchema,
    CreateNotionChildPageSchema,
    CreateNotionPageParamsSchema,
    CreateNotionPageResponseSchema,
    CreateNotionPageSchema,
    ErrorSchema,
    NotionDataSourcePagesResponseSchema,
    NotionPageContentResponseSchema,
    NotionPageResponseSchema,
    NotionPagesSchema,
    NotionSearchQuerySchema,
    NotionSearchResponseSchema,
    NotionStatusSchema,
    QueryNotionDataSourceParamsSchema,
    ReadNotionPageParamsSchema,
    UpdateNotionPageParamsSchema,
    UpdateNotionPageResponseSchema,
    UpdateNotionPageSchema,
} from '../schemas/index.js';
import { createNotionChildPage } from '../usecases/createNotionChildPage.js';
import { createNotionPage } from '../usecases/createNotionPage.js';
import { queryNotionDataSource } from '../usecases/queryNotionDataSource.js';
import { readNotionPage } from '../usecases/readNotionPage.js';
import { readNotionPageContent } from '../usecases/readNotionPageContent.js';
import { searchNotion } from '../usecases/searchNotion.js';
import { updateNotionPage } from '../usecases/updateNotionPage.js';

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

    app.withTypeProvider<ZodTypeProvider>().route({
        method: 'GET',
        url: '/api/notion/data-sources/:id/pages',
        preHandler: requireAuth,
        schema: {
            operationId: 'queryNotionDataSource',
            tags: ['Notion'],
            summary: 'Query a Notion data source for its pages',
            params: QueryNotionDataSourceParamsSchema,
            response: {
                200: NotionDataSourcePagesResponseSchema,
                401: ErrorSchema,
                500: ErrorSchema,
            },
        },
        handler: async request => {
            return queryNotionDataSource({
                userId: request.user!.id,
                dataSourceId: request.params.id,
            });
        },
    });

    app.withTypeProvider<ZodTypeProvider>().route({
        method: 'POST',
        url: '/api/notion/data-sources/:id/pages',
        preHandler: requireAuth,
        schema: {
            operationId: 'createNotionPage',
            tags: ['Notion'],
            summary: 'Create a new page in a Notion data source',
            params: CreateNotionPageParamsSchema,
            body: CreateNotionPageSchema,
            response: {
                201: CreateNotionPageResponseSchema,
                400: ErrorSchema,
                401: ErrorSchema,
                500: ErrorSchema,
            },
        },
        handler: async (request, reply) => {
            const page = await createNotionPage({
                userId: request.user!.id,
                dateSourceId: request.params.id,
                properties: request.body.properties,
                children: request.body.children,
            });

            return reply.status(201).send(page);
        },
    });

    app.withTypeProvider<ZodTypeProvider>().route({
        method: 'POST',
        url: '/api/notion/pages/:id/children',
        preHandler: requireAuth,
        schema: {
            operationId: 'createNotionChildPage',
            tags: ['Notion'],
            summary: 'Create a new child page under a Notion page',
            params: CreateNotionChildPageParamsSchema,
            body: CreateNotionChildPageSchema,
            response: {
                201: CreateNotionPageResponseSchema,
                400: ErrorSchema,
                401: ErrorSchema,
                500: ErrorSchema,
            },
        },
        handler: async (request, reply) => {
            const page = await createNotionChildPage({
                userId: request.user!.id,
                parentPageId: request.params.id,
                properties: request.body.properties,
                children: request.body.children,
            });

            return reply.status(201).send(page);
        },
    });

    app.withTypeProvider<ZodTypeProvider>().route({
        method: 'PATCH',
        url: '/api/notion/pages/:id',
        preHandler: requireAuth,
        schema: {
            operationId: 'updateNotionPage',
            tags: ['Notion'],
            summary: 'Update a Notion page properties',
            params: UpdateNotionPageParamsSchema,
            body: UpdateNotionPageSchema,
            response: {
                200: UpdateNotionPageResponseSchema,
                400: ErrorSchema,
                401: ErrorSchema,
                404: ErrorSchema,
                500: ErrorSchema,
            },
        },
        handler: async request => {
            return updateNotionPage({
                userId: request.user!.id,
                pageId: request.params.id,
                properties: request.body.properties,
            });
        },
    });
}
