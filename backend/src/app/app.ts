import Fastify from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';

import { registerCors } from '../lib/cors.js';
import { logger } from '../lib/logger.js';
import { registerSwagger } from '../lib/swagger.js';
import { authPlugin } from '../plugins/auth.js';
import { registerRoutes } from '../routes/index.js';

const app = Fastify({
    logger,
}).withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

await registerCors(app);

await registerSwagger(app);

await app.register(authPlugin);

await registerRoutes(app);

export { app };
