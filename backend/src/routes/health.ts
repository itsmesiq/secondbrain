import { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';

import { HealthCheck, HealthCheckSchema } from '../schemas/index.js';

export async function healthRoute(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().route({
        method: 'GET',
        url: '/health',
        schema: {
            operationId: 'healthCheck',
            tags: ['Health'],
            summary: 'Check the health of the application',
            response: {
                200: HealthCheckSchema,
            },
        },
        handler: async (): Promise<HealthCheck> => {
            return {
                status: 'ok',
            };
        },
    });
}
