import type { FastifyInstance } from 'fastify';

import { authRoutes } from './auth.js';
import { embedTokenRoutes } from './embedToken.js';
import { healthRoute } from './health.js';
import { meRoute } from './me.js';
import { notionRoutes } from './notion.js';
import { widgetRoutes } from './widgets.js';

export async function registerRoutes(app: FastifyInstance) {
    await app.register(healthRoute);
    await app.register(authRoutes);
    await app.register(meRoute);
    await app.register(notionRoutes);
    await app.register(embedTokenRoutes);
    await app.register(widgetRoutes);
}
