import { z } from 'zod';

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

export const WidgetTasksOverviewSchema = z.object({
    total: z.number(),
    completed: z.number(),
    pending: z.number(),
    completionRate: z.number(),
    currentStreak: z.number(),
});

export type WidgetTasksOverview = z.infer<typeof WidgetTasksOverviewSchema>;

export const WidgetTaskSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string().nullable(),
    dueDate: z.string().nullable(),
    category: z.string().nullable(),
    project: z
        .object({
            id: z.string(),
            name: z.string(),
        })
        .nullable(),
    status: z.string(),
    priority: z.string().nullable(),
    url: z.url(),
});

export const WidgetProjectSchema = z.object({
    id: z.string(),
    name: z.string(),
});

export const WidgetTasksSchema = z.object({
    tasks: z.array(WidgetTaskSchema),
    projects: z.array(WidgetProjectSchema),
});

export const WidgetTasksQuerySchema = z.object({
    date: z.iso.date(),
    projectId: z.string().optional(),
});

export type WidgetTask = z.infer<typeof WidgetTaskSchema>;
export type WidgetProject = z.infer<typeof WidgetProjectSchema>;
export type WidgetTasks = z.infer<typeof WidgetTasksSchema>;

export const CreateWidgetTaskSchema = z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    projectId: z.string().optional(),
    category: z.string().optional(),
    dueDate: z.iso.date().optional(),
    priority: z.string().optional(),
});

export const CreateWidgetTaskResponseSchema = z.object({
    id: z.string(),
    url: z.string(),
});

export type CreateWidgetTask = z.infer<typeof CreateWidgetTaskSchema>;
