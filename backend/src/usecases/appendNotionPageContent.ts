import { getNotionAdapter } from '../lib/notion.js';

interface AppendNotionPageContent {
    userId: string;
    pageId: string;
    children: unknown[];
}

export async function appendNotionPageContent({
    userId,
    pageId,
    children,
}: AppendNotionPageContent) {
    const notion = await getNotionAdapter(userId);

    const response = await notion.appendBlockChildren(
        pageId,
        children as Parameters<typeof notion.appendBlockChildren>['1'],
    );

    return {
        pageId,
        blocks: response.results,
    };
}
