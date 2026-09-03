import type { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';

import { requireWidgetAuth } from '../plugins/requireWidgetAuth.js';
import { ErrorSchema, WidgetClockSchema } from '../schemas/index.js';

export async function widgetRoutes(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().route({
        method: 'GET',
        url: '/api/widgets/clock',
        preHandler: requireWidgetAuth,
        schema: {
            operationId: 'getWidgetClock',
            summary: 'Get the clock widget data for the authenticated user.',
            tags: ['Widgets'],
            response: {
                200: WidgetClockSchema,
                401: ErrorSchema,
                500: ErrorSchema,
            },
        },
        handler: async request => {
            return {
                message: 'Clock widget athenticated',
                userId: request.user!.id,
            };
        },
    });
}
