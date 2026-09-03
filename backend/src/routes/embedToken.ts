import { eq } from 'drizzle-orm';
import type { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';

import { db } from '../db/index.js';
import { embedToken } from '../db/schema.js';
import { generateEmbedToken, hashEmbedToken } from '../lib/embedToken.js';
import { requireAuth } from '../plugins/requireAuth.js';
import { EmbedTokenSchema, ErrorSchema } from '../schemas/index.js';

export async function embedTokenRoutes(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().route({
        method: 'POST',
        url: '/api/embed-token',
        preHandler: requireAuth,
        schema: {
            operationId: 'generateEmbedToken',
            summary: 'Generate an embed token for the authenticated user',
            tags: ['Embed Token'],
            response: {
                200: EmbedTokenSchema,
                401: ErrorSchema,
                500: ErrorSchema,
            },
        },
        handler: async request => {
            const token = generateEmbedToken();
            const tokenHash = hashEmbedToken(token);

            await db.delete(embedToken).where(eq(embedToken.userId, request.user!.id));

            await db.insert(embedToken).values({
                id: crypto.randomUUID(),
                tokenHash,
                userId: request.user!.id,
            });

            return {
                token,
            };
        },
    });
}
