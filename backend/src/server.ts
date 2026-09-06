import { app } from './app/app.js';

app.listen({ port: 3000 }).catch(err => {
    app.log.error(err);
    process.exit(1);
});
