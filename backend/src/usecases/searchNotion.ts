import { getNotionAdapter, getNotionDataSourceTitle, getNotionPageTitle } from '../lib/notion.js';

interface SearchNotion {
    userId: string;
    query?: string;
}

export async function searchNotion({ userId, query }: SearchNotion) {
    const notion = await getNotionAdapter(userId);

    const pages = [];

    for await (const page of notion.searchPages(query)) {
        pages.push(page);
    }

    const dataSources = [];

    for await (const dataSource of notion.searchDataSourcesPaginated(query)) {
        dataSources.push(dataSource);
    }

    return {
        results: [
            ...pages.map(page => ({
                id: page.id,
                type: 'page' as const,
                title: getNotionPageTitle(page),
                url: page.url,
            })),
            ...dataSources.map(dataSource => ({
                id: dataSource.id,
                type: 'data_source' as const,
                title: getNotionDataSourceTitle(dataSource),
            })),
        ],
    };
}
