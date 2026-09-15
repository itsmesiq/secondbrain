import type { FastifyError, FastifyInstance } from 'fastify';
import { hasZodFastifySchemaValidationErrors } from 'fastify-type-provider-zod';

import {
    DatabaseNotFoundError,
    DataSourceNotFoundError,
    NotionNotConnectedError,
    ProfileNotFoundError,
} from '../errors/index.js';

export function registerErrorHandler(app: FastifyInstance) {
    app.setErrorHandler((error: FastifyError, request, reply) => {
        if (hasZodFastifySchemaValidationErrors(error)) {
            return reply.status(400).send({
                error: 'Bad Request',
                message: 'Invalid request data',
                details: error.validation,
            });
        }

        if (error instanceof NotionNotConnectedError) {
            return reply.status(404).send({
                error: 'Notion account not connected',
                message: error.message,
                code: 'NOTION_NOT_CONNECTED',
            });
        }

        if (error instanceof DatabaseNotFoundError) {
            return reply.status(404).send({
                error: 'Database not found',
                message: error.message,
                code: 'DATABASE_NOT_FOUND',
            });
        }

        if (error instanceof DataSourceNotFoundError) {
            return reply.status(404).send({
                error: 'Data source not found',
                message: error.message,
                code: 'DATA_SOURCE_NOT_FOUND',
            });
        }

        if (error instanceof ProfileNotFoundError) {
            return reply.status(404).send({
                error: 'Profile not found',
                message: error.message,
                code: 'PROFILE_NOT_FOUND',
            });
        }
    });
}
