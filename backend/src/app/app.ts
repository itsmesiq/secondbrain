import Fastify from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';

import { registerCors } from '../lib/cors.js';
import { logger } from '../lib/logger.js';
import { registerSwagger } from '../lib/swagger.js';
import { healthRoute } from '../routes/health.js';

const app = Fastify({
    logger,
}).withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

await registerCors(app);

await registerSwagger(app);

await app.register(healthRoute, { prefix: '/health' });

export { app };
