import { getNotionAdapter } from '../lib/notion.js';

interface CreateNotionPage {
    userId: string;
    dateSourceId: string;
    properties: Record<string, unknown>;
}

export async function createNotionPage({ userId, dateSourceId, properties }: CreateNotionPage) {
    const notion = await getNotionAdapter(userId);
    const page = await notion.createPage(
        dateSourceId,
        properties as Parameters<typeof notion.createPage>[1],
    );
    return {
        id: page.id,
        url: 'url' in page ? page.url : undefined,
    };
}
