import { getNotionAdapter } from '../lib/notion.js';

interface ArchiveNotionBlock {
    userId: string;
    blockId: string;
}

export async function archiveNotionBlock({ userId, blockId }: ArchiveNotionBlock) {
    const notion = await getNotionAdapter(userId);

    const block = await notion.updateBlock(blockId, {
        archived: true,
    });

    return block;
}
