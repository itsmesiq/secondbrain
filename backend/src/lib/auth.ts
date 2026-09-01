import { drizzleAdapter } from '@better-auth/drizzle-adapter';
import { betterAuth } from 'better-auth';
import { openAPI } from 'better-auth/plugins';

import { db } from '../db/index.js';
import * as schema from '../db/schema.js';
import { env } from '../lib/env.js';

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: 'pg',
        schema,
    }),
    baseURL: env.BETTER_AUTH_URL! as string,
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google: {
            prompt: 'select_account',
            clientId: env.GOOGLE_CLIENT_ID! as string,
            clientSecret: env.GOOGLE_CLIENT_SECRET! as string,
        },
        notion: {
            clientId: env.NOTION_CLIENT_ID! as string,
            clientSecret: env.NOTION_CLIENT_SECRET! as string,
        },
    },

    trustedOrigins: [env.WEB_APP_BASE_URL! as string],
    plugins: [openAPI()],
});
