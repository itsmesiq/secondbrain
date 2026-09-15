import { isFullPage } from '@notionhq/client';

import { getNotionAdapter, getNotionPageTitle } from '../lib/notion.js';

interface ReadNotionPage {
    userId: string;
    pageId: string;
}

export async function readNotionPage({ userId, pageId }: ReadNotionPage) {
    const notion = await getNotionAdapter(userId);
    const page = await notion.retrievePage(pageId);

    if (!isFullPage(page)) {
        throw new Error('Notion page is not a full page');
    }

    return {
        id: page.id,
        title: getNotionPageTitle(page),
        url: page.url,
        archived: page.archived,
        properties: page.properties,
    };
}
