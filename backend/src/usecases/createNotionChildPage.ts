import { getNotionAdapter } from '../lib/notion.js';

interface CreateNotionChildPage {
    userId: string;
    parentPageId: string;
    properties: Record<string, unknown>;
    children?: unknown[];
}

export async function createNotionChildPage({
    userId,
    parentPageId,
    properties,
    children,
}: CreateNotionChildPage) {
    const notion = await getNotionAdapter(userId);

    const page = await notion.createChildPage(
        parentPageId,
        properties as Parameters<typeof notion.createChildPage>['1'],
        children as Parameters<typeof notion.createChildPage>['2'],
    );

    return {
        id: page.id,
        url: 'url' in page ? page.url : undefined,
    };
}
