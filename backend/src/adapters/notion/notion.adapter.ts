import type { CreatePageParameters } from '@notionhq/client';
import { Client, isFullPage, iteratePaginatedAPI } from '@notionhq/client';

export class NotionAdapter {
    private readonly client: Client;

    constructor(accessToken: string) {
        this.client = new Client({
            auth: accessToken,
        });
    }

    async searchPages() {
        const response = await this.client.search({
            filter: {
                property: 'object',
                value: 'page',
            },
        });

        return response.results.filter(isFullPage);
    }

    async searchDataSources(query?: string) {
        const response = await this.client.search({
            ...(query && { query }),
            filter: {
                property: 'object',
                value: 'data_source',
            },
        });

        return response.results;
    }

    async *queryDataSource(
        dataSourceId: string,
        options?: Omit<Parameters<typeof this.client.dataSources.query>[0], 'data_source_id'>,
    ) {
        for await (const result of iteratePaginatedAPI(this.client.dataSources.query, {
            data_source_id: dataSourceId,
            ...options,
        })) {
            if (isFullPage(result)) {
                yield result;
            }
        }
    }

    async retrievePage(pageId: string) {
        return this.client.pages.retrieve({
            page_id: pageId,
        });
    }

    async createPage(dataSourceId: string, properties: CreatePageParameters['properties']) {
        return this.client.pages.create({
            parent: {
                data_source_id: dataSourceId,
            },
            properties,
        });
    }
}
