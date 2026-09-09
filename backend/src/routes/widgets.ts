import type { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';

import { requireWidgetAuth } from '../plugins/requireWidgetAuth.js';
import {
    CreateWidgetTaskResponseSchema,
    CreateWidgetTaskSchema,
    ErrorSchema,
    WidgetClockSchema,
    WidgetTasksOverviewSchema,
    WidgetTasksQuerySchema,
    WidgetTasksSchema,
} from '../schemas/index.js';
import { createWidgetTask } from '../usecases/createWidgetTask.js';
import { getWidgetTasks } from '../usecases/getWidgetTasks.js';
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

    app.withTypeProvider<ZodTypeProvider>().route({
        method: 'GET',
        url: '/api/widgets/tasks',
        preHandler: requireWidgetAuth('tasks'),
        schema: {
            operationId: 'getWidgetTasks',
            summary: 'Get tasks for the authenticated user, optionally filtered by project.',
            tags: ['Widgets'],
            querystring: WidgetTasksQuerySchema,
            response: {
                200: WidgetTasksSchema,
                401: ErrorSchema,
                404: ErrorSchema,
                500: ErrorSchema,
            },
        },
        handler: async request => {
            return getWidgetTasks({
                userId: request.user!.id,
                date: request.query.date,
                projectId: request.query.projectId,
            });
        },
    });

    app.withTypeProvider<ZodTypeProvider>().route({
        method: 'POST',
        url: '/api/widgets/tasks',
        preHandler: requireWidgetAuth('tasks'),
        schema: {
            operationId: 'createWidgetTask',
            summary: 'Create a new task for the authenticated user.',
            tags: ['Widgets'],
            body: CreateWidgetTaskSchema,
            response: {
                201: CreateWidgetTaskResponseSchema,
                400: ErrorSchema,
                401: ErrorSchema,
                404: ErrorSchema,
                500: ErrorSchema,
            },
        },
        handler: async (request, reply) => {
            const result = await createWidgetTask({
                userId: request.user!.id,
                ...request.body,
            });
            return reply.status(201).send(result);
        },
    });
}
