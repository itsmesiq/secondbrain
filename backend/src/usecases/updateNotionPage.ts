import { getNotionAdapter } from '../lib/notion.js';

interface UpdateNotionPage {
    userId: string;
    pageId: string;
    properties: Record<string, unknown>;
}

export async function updateNotionPage({ userId, pageId, properties }: UpdateNotionPage) {
    const notion = await getNotionAdapter(userId);

    const page = await notion.updatePage(
        pageId,
        properties as Parameters<typeof notion.updatePage>['1'],
    );

    return {
        id: page.id,
        url: 'url' in page ? page.url : undefined,
    };
}
