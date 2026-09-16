import { getNotionAdapter } from '../lib/notion.js';

interface UpdateNotionPage {
    userId: string;
    pageId: string;
    properties?: Record<string, unknown>;
    inTrash?: boolean;
}

export async function updateNotionPage({ userId, pageId, properties, inTrash }: UpdateNotionPage) {
    const notion = await getNotionAdapter(userId);

    const data = {
        ...(properties && { properties }),
        ...(inTrash !== undefined && { in_trash: inTrash }),
    };

    const page = await notion.updatePage(pageId, data as Parameters<typeof notion.updatePage>['1']);

    return {
        id: page.id,
        url: 'url' in page ? page.url : undefined,
    };
}
