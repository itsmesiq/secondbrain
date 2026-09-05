import { app } from './app/app.js';

if (process.env.NODE_ENV !== 'production') {
    try {
        await app.listen({
            port: 3000,
        });
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
}

export default app;
