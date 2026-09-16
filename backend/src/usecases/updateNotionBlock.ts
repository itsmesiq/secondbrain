import { getNotionAdapter } from '../lib/notion.js';

interface UpdateNotionBlock {
    userId: string;
    blockId: string;
    data: Record<string, unknown>;
}

export async function updateNotionBlock({ userId, blockId, data }: UpdateNotionBlock) {
    const notion = await getNotionAdapter(userId);

    const block = await notion.updateBlock(
        blockId,
        data as Parameters<typeof notion.updateBlock>['1'],
    );

    return block;
}
