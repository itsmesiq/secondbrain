import type { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';

import { requireWidgetAuth } from '../plugins/requireWidgetAuth.js';
import {
    CreateHabitCompletionParamsSchema,
    CreateHabitCompletionResponseSchema,
    CreateHabitResponseSchema,
    CreateHabitSchema,
    CreateTaskResponseSchema,
    CreateTaskSchema,
    ErrorSchema,
    GetHabitsQuerySchema,
    GetHabitsResponseSchema,
    GetTasksQuerySchema,
    GetTasksResponseSchema,
    UpdateTaskParamsSchema,
    UpdateTaskResponseSchema,
    UpdateTaskSchema,
    WidgetClockSchema,
} from '../schemas/index.js';
import { createHabitCompletion } from '../usecases/createHabitCompletion.js';
import { createWidgetHabit } from '../usecases/createWidgetHabit.js';
import { createWidgetTask } from '../usecases/createWidgetTask.js';
import { getWidgetHabits } from '../usecases/getWidgetHabits.js';
import { getWidgetTasks } from '../usecases/getWidgetTasks.js';
import { updateWidgetTask } from '../usecases/updateWidgetTask.js';

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

    app.withTypeProvider<ZodTypeProvider>().route({
        method: 'PATCH',
        url: '/api/widgets/tasks/:id',
        preHandler: requireWidgetAuth('tasks'),
        schema: {
            operationId: 'updateWidgetTask',
            summary: 'Update a task for the authenticated user.',
            tags: ['Widgets'],
            params: UpdateTaskParamsSchema,
            body: UpdateTaskSchema,
            response: {
                200: UpdateTaskResponseSchema,
                400: ErrorSchema,
                401: ErrorSchema,
                404: ErrorSchema,
                500: ErrorSchema,
            },
        },
        handler: async request => {
            const task = await updateWidgetTask({
                userId: request.user!.id,
                taskId: request.params.id,
                ...request.body,
            });

            return task;
        },
    });

    app.withTypeProvider<ZodTypeProvider>().route({
        method: 'GET',
        url: '/api/widgets/habits',
        preHandler: requireWidgetAuth('habits'),
        schema: {
            operationId: 'getWidgetHabits',
            summary: 'Get habits for the authenticated user',
            tags: ['Widgets'],
            querystring: GetHabitsQuerySchema,
            response: {
                200: GetHabitsResponseSchema,
                401: ErrorSchema,
                404: ErrorSchema,
                500: ErrorSchema,
            },
        },
        handler: async request => {
            return {
                habits: await getWidgetHabits({
                    userId: request.user!.id,
                    ...request.query,
                }),
            };
        },
    });

    app.withTypeProvider<ZodTypeProvider>().route({
        method: 'POST',
        url: '/api/widgets/habits/:id/completions',
        preHandler: requireWidgetAuth('habits'),
        schema: {
            operationId: 'createHabitCompletion',
            summary: 'Complete a habit for the authenticated user.',
            tags: ['Widgets'],
            params: CreateHabitCompletionParamsSchema,
            response: {
                201: CreateHabitCompletionResponseSchema,
                400: ErrorSchema,
                401: ErrorSchema,
                404: ErrorSchema,
                500: ErrorSchema,
            },
        },
        handler: async (request, reply) => {
            const completion = await createHabitCompletion({
                userId: request.user!.id,
                habitId: request.params.id,
            });
            return reply.status(201).send(completion);
        },
    });

    app.withTypeProvider<ZodTypeProvider>().route({
        method: 'POST',
        url: '/api/widgets/habits',
        preHandler: requireWidgetAuth('habits'),
        schema: {
            operationId: 'createWidgetHabit',
            summary: 'Create a new habit for the authenticated user.',
            tags: ['Widgets'],
            body: CreateHabitSchema,
            response: {
                201: CreateHabitResponseSchema,
                400: ErrorSchema,
                401: ErrorSchema,
                404: ErrorSchema,
                500: ErrorSchema,
            },
        },
        handler: async (request, reply) => {
            const result = await createWidgetHabit({
                userId: request.user!.id,
                ...request.body,
            });

            return reply.status(201).send(result);
        },
    });
}
