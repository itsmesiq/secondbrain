import 'dotenv/config';

import { defineConfig } from 'orval';

export default defineConfig({
    secondBrainApi: {
        input: `${process.env.NEXT_PUBLIC_API_URL}/swagger.json`,
        output: {
            target: './src/lib/api/generated/index.ts',
            client: 'react-query',
            mode: 'split',
            override: {
                mutator: {
                    path: './src/lib/api/fetch.ts',
                    name: 'customFetch',
                },
            },
        },
    },
});
