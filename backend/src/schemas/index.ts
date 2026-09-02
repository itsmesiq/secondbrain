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
