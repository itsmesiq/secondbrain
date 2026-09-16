import type { CreatePageParameters, UpdatePageParameters } from '@notionhq/client';
import { Client, isFullPage, iteratePaginatedAPI } from '@notionhq/client';

export class NotionAdapter {
    private readonly client: Client;

    constructor(accessToken: string) {
        this.client = new Client({
            auth: accessToken,
        });
    }

    async *searchPages(query?: string) {
        for await (const result of iteratePaginatedAPI(this.client.search, {
            ...(query && { query }),
            filter: {
                property: 'object',
                value: 'page',
            },
        })) {
            if (isFullPage(result)) {
                yield result;
            }
        }
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

    async *searchDataSourcesPaginated(query?: string) {
        for await (const result of iteratePaginatedAPI(this.client.search, {
            ...(query && { query }),
            filter: {
                property: 'object',
                value: 'data_source',
            },
        })) {
            yield result;
        }
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

    async *retrieveBlockChildren(blockId: string) {
        for await (const result of iteratePaginatedAPI(this.client.blocks.children.list, {
            block_id: blockId,
        })) {
            yield result;
        }
    }

    async appendBlockChildren(
        blockId: string,
        children: Parameters<typeof this.client.blocks.children.append>['0']['children'],
    ) {
        return this.client.blocks.children.append({
            block_id: blockId,
            children,
        });
    }

    async retrievePage(pageId: string) {
        return this.client.pages.retrieve({
            page_id: pageId,
        });
    }

    async createPage(
        dataSourceId: string,
        properties: CreatePageParameters['properties'],
        children?: CreatePageParameters['children'],
    ) {
        return this.client.pages.create({
            parent: {
                data_source_id: dataSourceId,
            },
            properties,
            ...(children && { children }),
        });
    }

    async createChildPage(
        parentPageId: string,
        properties: CreatePageParameters['properties'],
        children?: CreatePageParameters['children'],
    ) {
        return this.client.pages.create({
            parent: {
                page_id: parentPageId,
            },
            properties,
            ...(children && { children }),
        });
    }

    async updatePage(pageId: string, properties: UpdatePageParameters['properties']) {
        return this.client.pages.update({
            page_id: pageId,
            properties,
        });
    }
}
