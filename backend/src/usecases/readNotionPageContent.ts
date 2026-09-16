import { getNotionAdapter } from '../lib/notion.js';

interface ReadNotionPageContent {
    userId: string;
    pageId: string;
}

async function readBlockChildren(
    notion: Awaited<ReturnType<typeof getNotionAdapter>>,
    blockId: string,
): Promise<unknown[]> {
    const blocks = [];

    for await (const block of notion.retrieveBlockChildren(blockId)) {
        blocks.push(block);
    }

    return blocks;
}

async function readBlocksRecursively(
    notion: Awaited<ReturnType<typeof getNotionAdapter>>,
    blocks: any[],
): Promise<any[]> {
    return Promise.all(
        blocks.map(async block => {
            if (!block.has_children) {
                return block;
            }

            const children = await readBlocksRecursively(notion, block.id);

            return {
                ...block,
                children: await readBlocksRecursively(notion, children),
            };
        }),
    );
}

export async function readNotionPageContent({ userId, pageId }: ReadNotionPageContent) {
    const notion = await getNotionAdapter(userId);

    const blocks = await readBlockChildren(notion, pageId);

    return {
        pageId,
        blocks: await readBlocksRecursively(notion, blocks),
    };
}
