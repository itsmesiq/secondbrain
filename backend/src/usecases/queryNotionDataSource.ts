import { getNotionAdapter, getNotionPageTitle } from '../lib/notion.js';

interface QueryNotionDataSource {
    userId: string;
    dataSourceId: string;
}

export async function queryNotionDataSource({ userId, dataSourceId }: QueryNotionDataSource) {
    const notion = await getNotionAdapter(userId);

    const pages = [];

    for await (const page of notion.queryDataSource(dataSourceId)) {
        pages.push({
            id: page.id,
            title: getNotionPageTitle(page),
            url: page.url,
            archived: page.archived,
            properties: page.properties,
        });
    }

    return {
        dataSourceId,
        pages,
    };
}
