import { z } from 'zod';

export const ProfileSchema = z.object({
    id: z.string(),
    name: z.string(),
    avatar: z.string(),
    mysticOrder: z.string(),
    level: z.number(),
    xp: z.number(),
    gold: z.number(),
    title: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export type Profile = z.infer<typeof ProfileSchema>;

export const AreaSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    icon: z.string(),
    order: z.number(),
    active: z.boolean(),
});

export type Area = z.infer<typeof AreaSchema>;

export const SpecializationSchema = z.object({
    id: z.string(),
    name: z.string(),
    areaId: z.string(),
    createdAt: z.string(),
});

export type Specialization = z.infer<typeof SpecializationSchema>;

export const ObjectiveSchema = z.object({
    id: z.string(),
    name: z.string(),
    areaId: z.string(),
    priority: z.string(),
    active: z.boolean(),
    createdAt: z.string(),
});

export type Objective = z.infer<typeof ObjectiveSchema>;

export const XPRuleSchema = z.object({
    id: z.string(),
    name: z.string(),
    activityType: z.string(),
    difficulty: z.string().nullable(),
    baseXP: z.number(),
    difficultyBonus: z.number(),
    objectivePriority: z.number(),
    objectiveBonus: z.number(),
    streakMultiplier: z.number(),
    streakMilestone: z.number(),
    goldAmount: z.number(),
});

export type XPRule = z.infer<typeof XPRuleSchema>;

export const LevelSchema = z.object({
    id: z.string(),
    level: z.number(),
    requiredXP: z.number(),
    milestone: z.boolean(),
    reward: z.string(),
    active: z.boolean(),
});

export type Level = z.infer<typeof LevelSchema>;

export const RewardSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    icon: z.string(),
    rarity: z.string(),
});

export type Reward = z.infer<typeof RewardSchema>;

export const TaskSchema = z.object({
    id: z.string(),
    name: z.string(),
    status: z.string(),
    priority: z.string(),
    difficulty: z.string(),
    dueDate: z.string().nullable(),
    completedAt: z.string().nullable(),
    specializationIds: z.array(z.string()),
    objectiveId: z.string().nullable(),
    projectId: z.string().nullable(),
    xpEarned: z.number(),
    goldEarned: z.number(),
    rewardProcessed: z.boolean(),
    createdAt: z.string(),
});

export type Task = z.infer<typeof TaskSchema>;
