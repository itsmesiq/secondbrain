import { getNotionAdapter, getNotionDataSourceTitle, getNotionPageTitle } from '../lib/notion.js';

interface SearchNotion {
    userId: string;
    query?: string;
}

export async function searchNotion({ userId, query }: SearchNotion) {
    const notion = await getNotionAdapter(userId);

    const [pages, dataSources] = await Promise.all([
        notion.searchPages(),
        notion.searchDataSources(query),
    ]);

    const normalizeQuery = query?.trim().toLocaleLowerCase();

    const filteredPages = normalizeQuery
        ? pages.filter(page => getNotionPageTitle(page).toLowerCase().includes(normalizeQuery))
        : pages;

    return {
        results: [
            ...filteredPages.map(page => ({
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
