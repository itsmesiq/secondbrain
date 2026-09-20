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
import { createSpecializationStatsMap } from '../services/etherea/specializations.service.js';

interface GetWidgetTasks {
    userId: string;
    status: 'active' | 'completed';
    date?: string;
    projectId?: string;
    statsId?: string;
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

    const todayKey = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'America/Sao_Paulo',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).format(new Date());

    const todayDate = new Date(`${todayKey}T00:00:00Z`);
    todayDate.setUTCDate(todayDate.getUTCDate() - 1);

    const yesterdayKey = todayDate.toISOString().slice(0, 10);

    let streak = 0;

    const streakStart = completionDates.has(todayKey)
        ? todayKey
        : completionDates.has(yesterdayKey)
          ? yesterdayKey
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

export async function getWidgetTasks({ userId, status, date, projectId, statsId }: GetWidgetTasks) {
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
            statsId: getRelationId(result.properties.Stats)!,
        });
    }

    const specializationStatsMap = createSpecializationStatsMap(specializations);

    const specializationMap = new Map(
        specializations.map(specialization => [
            specialization.id,
            {
                id: specialization.id,
                name: specialization.name,
            },
        ]),
    );

    const statsDataSources = await notion.searchDataSources('Stats');

    const statsDataSource = statsDataSources.find(result => result.object === 'data_source');

    if (!statsDataSource) {
        throw new DataSourceNotFoundError('Stats');
    }

    const stats = [];

    for await (const result of notion.queryDataSource(statsDataSource.id)) {
        stats.push({
            id: result.id,
            name: getTitle(result.properties.Nome),
        });
    }

    const projectDataSources = await notion.searchDataSources('Projects');

    const projectDataSource = projectDataSources.find(result => result.object === 'data_source');

    const projects = [];

    if (projectDataSource) {
        for await (const result of notion.queryDataSource(projectDataSource.id)) {
            projects.push({
                id: result.id,
                name: getTitle(result.properties.Nome),
            });
        }
    }

    const overviewTasks = allTasks.filter(task => task.status !== 'Cancelada');

    const tasks = allTasks
        .filter(task => {
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

            if (statsId) {
                const belongsToStats = task.specializationIds.some(
                    specializationId => specializationStatsMap.get(specializationId) === statsId,
                );

                if (!belongsToStats) {
                    return false;
                }
            }

            return true;
        })
        .map(task => ({
            ...task,
            specializations: task.specializationIds
                .map(id => specializationMap.get(id))
                .filter(
                    (specialization): specialization is { id: string; name: string } =>
                        specialization !== undefined,
                ),
        }));

    return {
        overview: calculateOverview(overviewTasks),
        tasks,
        filters: {
            projects,
            stats,
        },
    };
}
