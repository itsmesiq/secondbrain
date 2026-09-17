import { and, eq } from 'drizzle-orm';
import type { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';

import { db } from '../db/index.js';
import { account } from '../db/schema.js';
import { requireAuth } from '../plugins/requireAuth.js';
import {
    CreateOnboardingSpecializationResponseSchema,
    CreateOnboardingSpecializationsSchema,
    ErrorSchema,
    OnboardingStatusSchema,
} from '../schemas/index.js';
import { createOnboardingSpecialization } from '../usecases/createOnboardingSpecialization.js';
import { getWidgetProfile } from '../usecases/getWidgetProfile.js';

export async function onboardingRoutes(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().route({
        method: 'GET',
        url: '/onboarding/status',
        preHandler: requireAuth,
        schema: {
            operationId: 'getOnboardingStatus',
            summary: 'Get the onboarding status of the authenticated user',
            tags: ['Onboarding'],
            response: {
                200: OnboardingStatusSchema,
                401: ErrorSchema,
                500: ErrorSchema,
            },
        },
        handler: async request => {
            const notionAccount = await db
                .select({ id: account.id })
                .from(account)
                .where(and(eq(account.userId, request.user!.id), eq(account.providerId, 'notion')))
                .limit(1);

            if (notionAccount.length === 0) {
                return {
                    completed: false,
                };
            }

            try {
                await getWidgetProfile(request.user!.id);

                return {
                    completed: true,
                };
            } catch {
                return {
                    completed: false,
                };
            }
        },
    });

    app.withTypeProvider<ZodTypeProvider>().route({
        method: 'POST',
        url: '/onboarding/specializations',
        preHandler: requireAuth,
        schema: {
            operationId: 'createOnboardingSpecializations',
            summary: 'Create onboarding specializations for the authenticated user',
            tags: ['Onboarding'],
            body: CreateOnboardingSpecializationsSchema,
            response: {
                200: CreateOnboardingSpecializationResponseSchema,
                400: ErrorSchema,
                401: ErrorSchema,
                500: ErrorSchema,
            },
        },
        handler: async request => {
            return createOnboardingSpecialization(request.user!.id, request.body);
        },
    });
}
