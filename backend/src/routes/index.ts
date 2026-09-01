import type { FastifyInstance } from 'fastify';

import { authRoutes } from './auth.js';
import { healthRoute } from './health.js';
import { meRoute } from './me.js';

export async function registerRoutes(app: FastifyInstance) {
    await app.register(healthRoute);
    await app.register(authRoutes);
    await app.register(meRoute);
}
