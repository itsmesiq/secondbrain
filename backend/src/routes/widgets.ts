import type { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';

import { requireWidgetAuth } from '../plugins/requireWidgetAuth.js';
import { ErrorSchema, WidgetClockSchema, WidgetTasksOverviewSchema } from '../schemas/index.js';
import { getWidgetTasksOverview } from '../usecases/getWidgetTasksOverview.js';

export async function widgetRoutes(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().route({
        method: 'GET',
        url: '/api/widgets/clock',
        preHandler: requireWidgetAuth('clock'),
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

    app.withTypeProvider<ZodTypeProvider>().route({
        method: 'GET',
        url: '/api/widgets/tasks-overview',
        preHandler: requireWidgetAuth('tasks-overview'),
        schema: {
            operationId: 'getWidgetTasksOverview',
            summary: 'Get task overview data for the authenticated user.',
            tags: ['Widgets'],
            response: {
                200: WidgetTasksOverviewSchema,
                401: ErrorSchema,
                404: ErrorSchema,
                500: ErrorSchema,
            },
        },
        handler: async request => {
            return getWidgetTasksOverview({ userId: request.user!.id });
        },
    });
}
