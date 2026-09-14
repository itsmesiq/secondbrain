import { DataSourceNotFoundError } from '../errors/index.js';
import { getNotionAdapter, getNumber, getSelect, getTitle } from '../lib/notion.js';
import type { XPRule } from '../schemas/etherea/index.js';

export async function getXPRules(userId: string): Promise<XPRule[]> {
    const notion = await getNotionAdapter(userId);

    const dataSources = await notion.searchDataSources('XP Rules');
    const dataSource = await dataSources.find(result => result.object === 'data_source');

    if (!dataSource) {
        throw new DataSourceNotFoundError('XP Rules');
    }

    const rules: XPRule[] = [];

    for await (const result of notion.queryDataSource(dataSource.id)) {
        rules.push({
            id: result.id,
            name: getTitle(result.properties.Nome),
            activityType: getSelect(result.properties['Activity Type']),
            difficulty: getSelect(result.properties.Difficulty) || null,
            baseXP: getNumber(result.properties['Base XP']),
            difficultyBonus: getNumber(result.properties['Difficulty Bonus']),
            objectivePriority: getSelect(result.properties['Objective Priority']) || null,
            objectiveBonus: getNumber(result.properties['Objective Bonus']),
            streakMultiplier: getNumber(result.properties['Streak Multiplier']),
            streakMilestone: getNumber(result.properties['Streak Milestone']),
            goldAmount: getNumber(result.properties['Gold Amount']),
        });
    }

    return rules;
}
