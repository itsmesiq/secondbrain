import 'dotenv/config';

import { defineConfig } from 'orval';

export default defineConfig({
    secondBrainApi: {
        input: `${process.env.NEXT_PUBLIC_API_URL}/swagger.json`,
        output: {
            target: './src/lib/api/generated/endpoints',
            mode: 'tags-split',
            schemas: './src/lib/api/generated/schemas',
            client: 'react-query',
            clean: true,
            override: {
                mutator: {
                    path: './src/lib/api/fetch.ts',
                    name: 'customFetch',
                },
            },
        },
        hooks: {
            afterAllFilesWrite: ['eslint --fix', 'prettier --write'],
        },
    },
});
