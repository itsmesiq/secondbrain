import type { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';

import { requireWidgetAuth } from '../plugins/requireWidgetAuth.js';
import {
    CreateTaskResponseSchema,
    CreateTaskSchema,
    ErrorSchema,
    GetTasksQuerySchema,
    GetTasksResponseSchema,
    WidgetClockSchema,
} from '../schemas/index.js';
import { createWidgetTask } from '../usecases/createWidgetTask.js';
import { getWidgetTasks } from '../usecases/getWidgetTasks.js';

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
        url: '/api/widgets/tasks',
        preHandler: requireWidgetAuth('tasks'),
        schema: {
            operationId: 'getWidgetTasks',
            summary: 'Get tasks for the authenticated user',
            tags: ['Widgets'],
            querystring: GetTasksQuerySchema,
            response: {
                200: GetTasksResponseSchema,
                401: ErrorSchema,
                404: ErrorSchema,
                500: ErrorSchema,
            },
        },
        handler: async request => {
            return getWidgetTasks({
                userId: request.user!.id,
                ...request.query,
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
            body: CreateTaskSchema,
            response: {
                201: CreateTaskResponseSchema,
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
