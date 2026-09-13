import { z } from 'zod';

import { TaskSchema } from './etherea/index.js';

export const ErrorSchema = z.object({
    error: z.string(),
    message: z.string(),
    code: z.string(),
});

export const HealthCheckSchema = z.object({
    status: z.literal('ok'),
});

export type HealthCheck = z.infer<typeof HealthCheckSchema>;

export const UserSchema = z.object({
    userId: z.string(),
    userName: z.string(),
    userEmail: z.email(),
});

export type User = z.infer<typeof UserSchema>;

export const NotionStatusSchema = z.object({
    connected: z.boolean(),
});

export type NotionStatus = z.infer<typeof NotionStatusSchema>;

export const NotionPageSchema = z.object({
    id: z.string(),
    title: z.string(),
    url: z.url(),
});

export const NotionPagesSchema = z.object({
    pages: z.array(NotionPageSchema),
});

export type NotionPage = z.infer<typeof NotionPageSchema>;
export type NotionPages = z.infer<typeof NotionPagesSchema>;

export const EmbedTokenSchema = z.object({
    token: z.string(),
});

export type EmbedToken = z.infer<typeof EmbedTokenSchema>;

export const GenerateEmbedTokenSchema = z.object({
    widgetId: z.string(),
});

export type GenerateEmbedToken = z.infer<typeof GenerateEmbedTokenSchema>;

export const WidgetClockSchema = z.object({
    message: z.string(),
    userId: z.string(),
});

export type WidgetClock = z.infer<typeof WidgetClockSchema>;

export const GetTasksQuerySchema = z.object({
    date: z.iso.date().optional(),
    projectId: z.string().optional(),
});

export type GetTasksQuery = z.infer<typeof GetTasksQuerySchema>;

export const GetTasksResponseSchema = z.object({
    overview: z.object({
        total: z.number(),
        completed: z.number(),
        pending: z.number(),
        completionRate: z.number(),
        currentStreak: z.number(),
    }),
    tasks: z.array(TaskSchema),
});

export type GetTasksResponse = z.infer<typeof GetTasksResponseSchema>;

export const CreateTaskSchema = z.object({
    name: z.string().min(1),
    priority: z.string().optional(),
    difficulty: z.string().optional(),
    dueDate: z.iso.date().optional(),
    specializationIds: z.array(z.string()).optional(),
    objectiveId: z.string().nullable().optional(),
});

export type CreateTask = z.infer<typeof CreateTaskSchema>;

export const CreateTaskResponseSchema = z.object({
    id: z.string(),
    url: z.url(),
});

export type CreateTaskResponse = z.infer<typeof CreateTaskResponseSchema>;

export const UpdateTaskSchema = z.object({
    status: z.string().optional(),
});

export type UpdateTask = z.infer<typeof UpdateTaskSchema>;

export const UpdateTaskResponseSchema = TaskSchema;

export type UpdateTaskResponse = z.infer<typeof UpdateTaskResponseSchema>;
