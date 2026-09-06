import { app } from './app/app.js';

try {
    await app.listen({
        port: Number(process.env.PORT) || 3000,
    });
} catch (err) {
    app.log.error(err);
    process.exit(1);
}
