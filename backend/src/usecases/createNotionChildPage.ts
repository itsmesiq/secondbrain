import { getNotionAdapter } from '../lib/notion.js';

interface CreateNotionChildPage {
    userId: string;
    parentPageId: string;
    properties: Record<string, unknown>;
}

export async function createNotionChildPage({
    userId,
    parentPageId,
    properties,
}: CreateNotionChildPage) {
    const notion = await getNotionAdapter(userId);

    const page = await notion.createChildPage(
        parentPageId,
        properties as Parameters<typeof notion.createChildPage>['1'],
    );

    return {
        id: page.id,
        url: 'url' in page ? page.url : undefined,
    };
}
