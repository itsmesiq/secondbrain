import { Client, PageObjectResponse } from '@notionhq/client';

export function createNotionClient(accessToken: string) {
    return new Client({
        auth: accessToken,
    });
}

export function getNotionPageTitle(page: PageObjectResponse) {
    const titleProperty = Object.values(page.properties).find(
        property => property.type === 'title',
    );

    if (!titleProperty || titleProperty.type !== 'title') {
        return 'Untitled';
    }

    return titleProperty.title[0]?.plain_text || 'Untitled';
}
