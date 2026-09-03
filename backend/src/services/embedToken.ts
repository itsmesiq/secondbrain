import { eq } from 'drizzle-orm';

import { db } from '../db/index.js';
import { embedToken } from '../db/schema.js';
import { hashEmbedToken } from '../lib/embedToken.js';

export async function validateEmbedToken(token: string) {
    const tokenHash = hashEmbedToken(token);

    const result = await db
        .select({
            userId: embedToken.userId,
            widgetId: embedToken.widgetId,
        })
        .from(embedToken)
        .where(eq(embedToken.tokenHash, tokenHash))
        .limit(1);

    return result[0] ?? null;
}
