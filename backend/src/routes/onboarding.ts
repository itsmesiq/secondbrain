import type { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';

import { requireAuth } from '../plugins/requireAuth.js';
import {
    CompleteOnboardingOrderResponseSchema,
    CompleteOnboardingOrderSchema,
    CreateOnboardingSpecializationResponseSchema,
    CreateOnboardingSpecializationsSchema,
    ErrorSchema,
    OnboardingStatusSchema,
    SaveOnboardingIdentityResponseSchema,
    SaveOnboardingIdentitySchema,
} from '../schemas/index.js';
import { completeOnboardingOrder } from '../usecases/completeOnboardingOrder.js';
import { createOnboardingSpecialization } from '../usecases/createOnboardingSpecialization.js';
import { getOnboardingStatus } from '../usecases/getOnboardingStatus.js';
import { saveOnboardingIdentity } from '../usecases/saveOnboardingIdentity.js';

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
            return getOnboardingStatus(request.user!.id);
        },
    });

    app.withTypeProvider<ZodTypeProvider>().route({
        method: 'POST',
        url: '/onboarding/identity',
        preHandler: requireAuth,
        schema: {
            operationId: 'saveOnboardingIdentity',
            summary: 'Save the identity data of the authenticated user during onboarding',
            tags: ['Onboarding'],
            body: SaveOnboardingIdentitySchema,
            response: {
                200: SaveOnboardingIdentityResponseSchema,
                400: ErrorSchema,
                401: ErrorSchema,
                404: ErrorSchema,
                409: ErrorSchema,
                500: ErrorSchema,
            },
        },
        handler: async request => {
            return saveOnboardingIdentity(request.user!.id, request.body);
        },
    });

    app.withTypeProvider<ZodTypeProvider>().route({
        method: 'POST',
        url: '/onboarding/order',
        preHandler: requireAuth,
        schema: {
            operationId: 'completeOnboardingOrder',
            summary: 'Complete the onboarding by selecting a Mystic Order',
            tags: ['Onboarding'],
            body: CompleteOnboardingOrderSchema,
            response: {
                200: CompleteOnboardingOrderResponseSchema,
                400: ErrorSchema,
                401: ErrorSchema,
                404: ErrorSchema,
                500: ErrorSchema,
            },
        },
        handler: async request => {
            return completeOnboardingOrder(request.user!.id, request.body);
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
