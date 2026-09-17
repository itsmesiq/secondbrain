import { z } from 'zod';

export const OnboardingStepsSchema = z.enum([
    'template',
    'notion',
    'identity',
    'specializations',
    'order-quiz',
    'completed',
]);

export type OnboardingSteps = z.infer<typeof OnboardingStepsSchema>;

export const OnboardingStatusSchema = z.object({
    completed: z.boolean(),
    currentStep: OnboardingStepsSchema,
});

export type OnboardingStatus = z.infer<typeof OnboardingStatusSchema>;

export const SaveOnboardingIdentitySchema = z.object({
    name: z.string().trim().min(1).max(100),
    avatar: z.url(),
    objective: z.string().trim().min(1).max(500),
});

export type SaveOnboardingIdentity = z.infer<typeof SaveOnboardingIdentitySchema>;

export const CreateOnboardingSpecializationsSchema = z.object({
    name: z.string().trim().min(1).max(100),
    statsId: z.string().min(1),
});

export type CreateOnboardingSpecializations = z.infer<typeof CreateOnboardingSpecializationsSchema>;

export const CreateOnboardingSpecializationResponseSchema = z.object({
    id: z.string(),
    name: z.string(),
    statsId: z.string(),
});

export type CreateOnboardingSpecializationResponse = z.infer<
    typeof CreateOnboardingSpecializationResponseSchema
>;

export const CompleteSpecializationsSchema = z.object({
    specializationIds: z.array(z.string()).min(1),
});

export type CompleteSpecializations = z.infer<typeof CompleteSpecializationsSchema>;

export const CompleteOnboardingOrderSchema = z.object({
    mysticOrder: z.enum(['Arcane', 'Vanguard', 'Verdant', 'Forge', 'Veil', 'Ballad']),
});

export type CompleteOnboardingOrder = z.infer<typeof CompleteOnboardingOrderSchema>;
