import type { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';

import { requireAuth } from '../plugins/requireAuth.js';
import { ErrorSchema, UserSchema } from '../schemas/index.js';

export async function meRoute(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().route({
        method: 'GET',
        url: '/api/me',
        preHandler: requireAuth,
        schema: {
            operationId: 'getUserData',
            description: 'Get the authenticated user data',
            tags: ['User'],
            response: {
                200: UserSchema,
                401: ErrorSchema,
                500: ErrorSchema,
            },
        },
        handler: async request => {
            return {
                userId: request.user!.id,
                userName: request.user!.name,
                userEmail: request.user!.email,
            };
        },
    });
}
