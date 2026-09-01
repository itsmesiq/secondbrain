import Fastify from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';

import { registerCors } from './lib/cors.js';
import { logger } from './lib/logger.js';
import { registerSwagger } from './lib/swagger.js';

const app = Fastify({
    logger,
}).withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

await registerCors(app);

await registerSwagger(app);

try {
    await app.listen({
        port: 3000,
    });
} catch (err) {
    app.log.error(err);
    process.exit(1);
}
