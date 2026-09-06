import { app } from './app/app.js';

if (!process.env.VERCEL) {
    await app.listen({
        port: Number(process.env.PORT) || 3000,
    });
}

export default app;
