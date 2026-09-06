import Fastify from 'fastify';

const app = Fastify();

app.get('/health', async () => {
    return { status: 'ok' };
});

await app.listen({
    port: Number(process.env.PORT) || 3000,
});
