import { createHash, randomBytes } from 'node:crypto';

export function generateEmbedToken() {
    return randomBytes(32).toString('hex');
}

export function hashEmbedToken(token: string) {
    return createHash('sha256').update(token).digest('hex');
}
