import { DataSourceNotFoundError } from '../errors/index.js';
import {
    getCheckbox,
    getDate,
    getNotionAdapter,
    getNumber,
    getRelationId,
    getRelationIds,
    getSelect,
    getStatus,
    getTitle,
} from '../lib/notion.js';
import { createSpecializationAreaMap } from '../services/etherea/specializations.service.js';

interface GetWidgetTasks {
    userId: string;
    status: 'active' | 'completed';
    date?: string;
    projectId?: string;
    areaId?: string;
}

function mapTask(result: any) {
    return {
        id: result.id,
        name: getTitle(result.properties.Nome),
        status: getStatus(result.properties.Status),
        priority: getSelect(result.properties.Priority),
        difficulty: getSelect(result.properties.Difficulty),
        dueDate: getDate(result.properties['Due Date']),
        completedAt: getDate(result.properties['Completed At']),
        specializationIds: getRelationIds(result.properties.Specializations),
        objectiveId: getRelationId(result.properties.Objective),
        projectId: getRelationId(result.properties.Project),
        xpEarned: getNumber(result.properties['XP Earned']),
        goldEarned: getNumber(result.properties['Gold Earned']),
        rewardProcessed: getCheckbox(result.properties['Reward Processed']),
        createdAt: result.properties['Created At']?.created_time ?? result.created_time,
    };
}

function calculateOverview(tasks: ReturnType<typeof mapTask>[]) {
    const total = tasks.length;

    const completed = tasks.filter(task => task.status === 'Concluído').length;

    const pending = tasks.filter(task => task.status !== 'Concluído').length;

    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    const completionDates = new Set(
        tasks.filter(task => task.completedAt).map(task => task.completedAt!.slice(0, 10)),
    );

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayKey = today.toISOString().slice(0, 10);

    const yesterday = new Date(today);
    yesterday.setUTCDate(yesterday.getUTCDate() - 1);

    const yesterdayKey = yesterday.toISOString().slice(0, 10);

    let streak = 0;

    const streakStart = completionDates.has(todayKey)
        ? today
        : completionDates.has(yesterdayKey)
          ? yesterday
          : null;

    if (streakStart) {
        const currentDate = new Date(streakStart);

        while (completionDates.has(currentDate.toISOString().slice(0, 10))) {
            streak++;
            currentDate.setUTCDate(currentDate.getUTCDate() - 1);
        }
    }

    return {
        total,
        completed,
        pending,
        completionRate,
        currentStreak: streak,
    };
}

export async function getWidgetTasks({ userId, status, date, projectId, areaId }: GetWidgetTasks) {
    const notion = await getNotionAdapter(userId);

    const tasksDataSources = await notion.searchDataSources('Tasks');

    const taskDataSource = tasksDataSources.find(result => result.object === 'data_source');

    if (!taskDataSource) {
        throw new DataSourceNotFoundError('Tasks');
    }

    const allTasks = [];

    for await (const result of notion.queryDataSource(taskDataSource.id)) {
        allTasks.push(mapTask(result));
    }

    const specializationDataSources = await notion.searchDataSources('Specializations');

    const specializationDataSource = specializationDataSources.find(
        result => result.object === 'data_source',
    );

    if (!specializationDataSource) {
        throw new DataSourceNotFoundError('Specializations');
    }

    const specializations = [];

    for await (const result of notion.queryDataSource(specializationDataSource.id)) {
        specializations.push({
            id: result.id,
            name: getTitle(result.properties.Nome),
            areaId: getRelationId(result.properties.Area)!,
        });
    }

    const specializationAreaMap = createSpecializationAreaMap(specializations);

    const overviewTasks = allTasks.filter(task => task.status !== 'Cancelada');

    const tasks = allTasks.filter(task => {
        if (task.status === 'Cancelada') {
            return false;
        }

        if (status === 'active' && task.status === 'Concluído') {
            return false;
        }

        if (status === 'completed' && task.status !== 'Concluído') {
            return false;
        }

        if (date && task.dueDate?.slice(0, 10) !== date) {
            return false;
        }

        if (projectId && task.projectId !== projectId) {
            return false;
        }

        if (areaId) {
            const belongsToArea = task.specializationIds.some(
                specializationId => specializationAreaMap.get(specializationId) === areaId,
            );

            if (!belongsToArea) {
                return false;
            }
        }

        return true;
    });

    return {
        overview: calculateOverview(overviewTasks),
        tasks,
    };
}
