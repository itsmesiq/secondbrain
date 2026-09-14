import { getNotionAdapter, getStatus } from '../lib/notion.js';
import { getWidgetTasks } from './getWidgetTasks.js';
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
        const reward = await processTaskReward({
            userId,
            taskId,
        });

        await notion.updatePage(taskId, {
            'Completed At': {
                date: {
                    start: new Date().toISOString(),
                },
            },
            'XP Earned': {
                number: reward.xp,
            },
            'Gold Earned': {
                number: reward.gold,
            },
            'Reward Processed': {
                checkbox: true,
            },
        });
    }

    const updatedPage = await notion.retrievePage(taskId);

    if (!('properties' in updatedPage)) {
        throw new Error('Task not found');
    }

    const updatedStatus = getStatus(updatedPage.properties.Status);

    const result = await getWidgetTasks({
        userId,
        status: updatedStatus === 'Concluído' ? 'completed' : 'active',
    });

    const task = result.tasks.find(task => task.id === taskId);

    if (!task) {
        throw new Error('Task not found');
    }

    return task;
}
