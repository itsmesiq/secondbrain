import { getNotionAdapter, getRelationId, getSelect, getTitle } from '../lib/notion.js';
import { calculateTaskReward } from '../services/etherea/rewards.service.js';
import { createProgressHistory } from './createProgressHistory.js';
import { getProgressHistory } from './getProgressHistory.js';
import { getXPRules } from './getXPRules.js';
import { updateProfileProgress } from './updateProfileProgress.js';

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

    const reward = calculateTaskReward({
        rules,
        difficulty: difficulty || undefined,
        objectivePriority: objectivePriority || undefined,
    });

    const history = await getProgressHistory(userId);
    const existingReward = history.find(item => item.taskId === taskId);

    if (existingReward) {
        return {
            xp: existingReward.xp,
            gold: existingReward.gold,
        };
    }

    const taskName = getTitle(task.properties.Nome);

    await createProgressHistory({
        userId,
        name: taskName,
        taskId,
        xp: reward.xp,
        gold: reward.gold,
    });

    await updateProfileProgress({
        userId,
        xp: reward.xp,
        gold: reward.gold,
    });

    return reward;
}
