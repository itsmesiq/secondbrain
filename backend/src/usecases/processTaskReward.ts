import { getNotionAdapter, getRelationId, getSelect } from '../lib/notion.js';
import { calculateTaskReward } from '../services/etherea/rewards.service.js';
import { getXPRules } from './getXPRules.js';

interface ProcessTaskReward {
    userId: string;
    taskId: string;
}

export async function processTaskReward({ userId, taskId }: ProcessTaskReward) {
    const notion = await getNotionAdapter(userId);

    const task = await notion.retrievePage(taskId);

    if (!('properties' in task)) {
        throw new Error('Task not found');
    }

    const difficulty = getSelect(task.properties.Difficulty);
    const objectiveId = getRelationId(task.properties.Objective);

    let objectivePriority: string | undefined;

    if (objectiveId) {
        const objective = await notion.retrievePage(objectiveId);

        if ('properties' in objective) {
            objectivePriority = getSelect(objective.properties.Priority);
        }
    }

    const rules = await getXPRules(userId);

    return calculateTaskReward({
        rules,
        difficulty: difficulty || undefined,
        objectivePriority: objectivePriority || undefined,
    });
}
