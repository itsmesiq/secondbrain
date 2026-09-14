import { getNotionAdapter } from '../lib/notion.js';
import { processTaskReward } from './processTaskReward.js';

interface UpdateWidgetTask {
    userId: string;
    taskId: string;
    status?: string;
}

export async function updateWidgetTask({ userId, taskId, status }: UpdateWidgetTask) {
    const notion = await getNotionAdapter(userId);

    if (status) {
        await notion.updatePage(taskId, {
            Status: {
                status: {
                    name: status,
                },
            },
        });
    }

    if (status === 'Concluído') {
        await processTaskReward({
            userId,
            taskId,
        });
    }

    return notion.retrievePage(taskId);
}
