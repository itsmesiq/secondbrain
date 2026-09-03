import { eq } from 'drizzle-orm';
import type { FastifyReply, FastifyRequest } from 'fastify';

import { db } from '../db/index.js';
import { user } from '../db/schema.js';
import { validateEmbedToken } from '../services/embedToken.js';

export function requireWidgetAuth(widgetId: string) {
    return async (request: FastifyRequest, reply: FastifyReply) => {
        if (request.user) {
            return;
        }

        const authorization = request.headers.authorization;

        if (!authorization?.startsWith('Bearer ')) {
            return reply.status(401).send({
                error: 'Unauthorized',
                message:
                    'You must be logged in or provide a valid Embed Token to access this resource.',
                code: 'WIDGET_UNAUTHORIZED',
            });
        }

        const token = authorization.slice('Bearer '.length).trim();

        if (!token) {
            return reply.status(401).send({
                error: 'Unauthorized',
                message:
                    'You must be logged in or provide a valid Embed Token to access this resource.',
                code: 'WIDGET_UNAUTHORIZED',
            });
        }

        const result = await validateEmbedToken(token);

        if (!result || result.widgetId !== widgetId) {
            return reply.status(401).send({
                error: 'Unauthorized',
                message:
                    'You must be logged in or provide a valid Embed Token to access this resource.',
                code: 'WIDGET_UNAUTHORIZED',
            });
        }

        const [userData] = await db.select().from(user).where(eq(user.id, result.userId)).limit(1);

        if (!userData) {
            return reply.status(401).send({
                error: 'Unauthorized',
                message:
                    'You must be logged in or provide a valid Embed Token to access this resource.',
                code: 'WIDGET_UNAUTHORIZED',
            });
        }

        request.user = userData;
    };
}
