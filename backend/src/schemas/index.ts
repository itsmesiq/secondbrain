import { z } from 'zod';

import {
    HabitCompletionSchema,
    HabitSchema,
    ProfileSchema,
    StatsSchema,
    TaskSchema,
} from './etherea/index.js';

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

export const NotionSearchQuerySchema = z.object({
    query: z.string().optional(),
});

export type NotionSearchQuery = z.infer<typeof NotionSearchQuerySchema>;

export const NotionSearchResultSchema = z.object({
    id: z.string(),
    type: z.enum(['page', 'data_source']),
    title: z.string(),
    url: z.url().optional(),
});

export const NotionSearchResponseSchema = z.object({
    results: z.array(NotionSearchResultSchema),
});

export type NotionSearchResponse = z.infer<typeof NotionSearchResponseSchema>;

export const NotionPageResponseSchema = z.object({
    id: z.string(),
    title: z.string(),
    url: z.url(),
    archived: z.boolean(),
    properties: z.record(z.string(), z.unknown()),
});

export type NotionPageResponse = z.infer<typeof NotionPageResponseSchema>;

export const ReadNotionPageParamsSchema = z.object({
    id: z.string(),
});

export type ReadNotionPageParams = z.infer<typeof ReadNotionPageParamsSchema>;

export const NotionPageContentResponseSchema = z.object({
    pageId: z.string(),
    blocks: z.array(z.unknown()),
});

export type NotionPageContentResponse = z.infer<typeof NotionPageContentResponseSchema>;

export const QueryNotionDataSourceParamsSchema = z.object({
    id: z.string(),
});

export type QueryNotionDataSourceParams = z.infer<typeof QueryNotionDataSourceParamsSchema>;

export const NotionDataSourcePageSchema = z.object({
    id: z.string(),
    title: z.string(),
    url: z.url(),
    archived: z.boolean(),
    properties: z.record(z.string(), z.unknown()),
});

export const NotionDataSourcePagesResponseSchema = z.object({
    dataSourceId: z.string(),
    pages: z.array(NotionDataSourcePageSchema),
});

export type NotionDataSourcePagesResponse = z.infer<typeof NotionDataSourcePagesResponseSchema>;

export const CreateNotionPageParamsSchema = z.object({
    id: z.string(),
});

export type CreateNotionPageParams = z.infer<typeof CreateNotionPageParamsSchema>;

export const CreateNotionPageSchema = z.object({
    properties: z.record(z.string(), z.unknown()),
    children: z.array(z.unknown()).optional(),
});

export type CreateNotionPage = z.infer<typeof CreateNotionPageSchema>;

export const CreateNotionPageResponseSchema = z.object({
    id: z.string(),
    url: z.url().optional(),
});

export type CreateNotionPageResponse = z.infer<typeof CreateNotionPageResponseSchema>;

export const CreateNotionChildPageParamsSchema = z.object({
    id: z.string(),
});

export type CreateNotionChildPageParams = z.infer<typeof CreateNotionChildPageParamsSchema>;

export const CreateNotionChildPageSchema = z.object({
    properties: z.record(z.string(), z.unknown()),
    children: z.array(z.unknown()).optional(),
});

export type CreateNotionChildPage = z.infer<typeof CreateNotionChildPageSchema>;

export const UpdateNotionPageParamsSchema = z.object({
    id: z.string(),
});

export type UpdateNotionPageParams = z.infer<typeof UpdateNotionPageParamsSchema>;

export const UpdateNotionPageSchema = z.object({
    properties: z.record(z.string(), z.unknown()),
});

export type UpdateNotionPage = z.infer<typeof UpdateNotionPageSchema>;

export const UpdateNotionPageResponseSchema = CreateNotionPageResponseSchema;

export type UpdateNotionPageResponse = z.infer<typeof UpdateNotionPageResponseSchema>;

export const AppendNotionPageContentParamsSchema = z.object({
    id: z.string(),
});

export type AppendNotionPageContentParams = z.infer<typeof AppendNotionPageContentParamsSchema>;

export const AppendNotionPageContentSchema = z.object({
    children: z.array(z.unknown()).min(1),
});

export type AppendNotionPageContent = z.infer<typeof AppendNotionPageContentSchema>;

export const UpdateNotionBlockParamsSchema = z.object({
    id: z.string(),
});

export type UpdateNotionBlockParams = z.infer<typeof UpdateNotionBlockParamsSchema>;

export const UpdateNotionBlockSchema = z.record(z.string(), z.unknown());

export type UpdateNotionBlock = z.infer<typeof UpdateNotionBlockSchema>;

export const UpdateNotionBlockResponseSchema = z.record(z.string(), z.unknown());

export type UpdateNotionBlockResponse = z.infer<typeof UpdateNotionBlockResponseSchema>;

export const ArchiveNotionBlockParamsSchema = z.object({
    id: z.string(),
});

export type ArchiveNotionBlockParams = z.infer<typeof ArchiveNotionBlockParamsSchema>;

export const ArchiveNotionBlockResponseSchema = z.record(z.string(), z.unknown());

export type ArchiveNotionBlockResponse = z.infer<typeof ArchiveNotionBlockResponseSchema>;

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
    status: z.enum(['active', 'completed']),
    date: z.iso.date().optional(),
    projectId: z.string().optional(),
    areaId: z.string().optional(),
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
    projectId: z.string().nullable().optional(),
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

export const UpdateTaskParamsSchema = z.object({
    id: z.string(),
});

export type UpdateTaskParams = z.infer<typeof UpdateTaskParamsSchema>;

export const GetHabitsQuerySchema = z.object({
    active: z.coerce.boolean().optional(),
});

export type GetHabitsQuery = z.infer<typeof GetHabitsQuerySchema>;

export const GetHabitsResponseSchema = z.object({
    habits: z.array(HabitSchema),
});

export type GetHabitsResponse = z.infer<typeof GetHabitsResponseSchema>;

export const CreateHabitCompletionParamsSchema = z.object({
    id: z.string(),
});

export type CreateHabitCompletionParams = z.infer<typeof CreateHabitCompletionParamsSchema>;

export const CreateHabitCompletionResponseSchema = HabitCompletionSchema;

export type CreateHabitCompletionResponse = z.infer<typeof CreateHabitCompletionResponseSchema>;

export const CreateHabitSchema = z.object({
    name: z.string().min(1),
    specializationIds: z.array(z.string()).optional(),
    objectiveId: z.string().nullable().optional(),
});

export type CreateHabit = z.infer<typeof CreateHabitSchema>;

export const CreateHabitResponseSchema = z.object({
    id: z.string(),
    url: z.url(),
});

export type CreateHabitResponse = z.infer<typeof CreateHabitResponseSchema>;

export const GetProfileResponseSchema = ProfileSchema;

export type GetProfileResponse = z.infer<typeof GetProfileResponseSchema>;

export const CreateProfileSchema = z.object({
    name: z.string().min(1),
    avatar: z.url(),
    mysticOrder: z.string().min(1),
});

export type CreateProfile = z.infer<typeof CreateProfileSchema>;

export const CreateProfileResponseSchema = ProfileSchema;

export type CreateProfileResponse = z.infer<typeof CreateProfileResponseSchema>;

export const GetStatsResponseSchema = z.object({
    stats: z.array(
        StatsSchema.extend({
            score: z.number(),
        }),
    ),
});

export type GetStatsResponse = z.infer<typeof GetStatsResponseSchema>;
