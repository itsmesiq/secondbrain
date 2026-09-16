import { getNotionAdapter } from '../lib/notion.js';

interface UpdateNotionDataSource {
    userId: string;
    dataSourceId: string;
    inTrash: boolean;
}

export async function updateNotionDataSource({
    userId,
    dataSourceId,
    inTrash,
}: UpdateNotionDataSource) {
    const notion = await getNotionAdapter(userId);

    const dataSource = await notion.updateDataSource(dataSourceId, {
        in_trash: inTrash,
    });

    return {
        id: dataSource.id,
        url: 'url' in dataSource ? dataSource.url : undefined,
    };
}
