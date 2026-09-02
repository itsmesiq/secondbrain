import { and, eq } from 'drizzle-orm';
import type { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';

import { db } from '../db/index.js';
import { account } from '../db/schema.js';
import { requireAuth } from '../plugins/requireAuth.js';
import { ErrorSchema, NotionStatusSchema } from '../schemas/index.js';

export async function notionRoutes(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().route({
        method: 'GET',
        url: '/api/notion/status',
        preHandler: requireAuth,
        schema: {
            operationId: 'getNotionStatus',
            description: 'Get the Notion connection status for the authenticated user',
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
}
