import { PageObjectResponse } from '@notionhq/client';
import { and, eq } from 'drizzle-orm/sql/expressions/conditions';

import { NotionAdapter } from '../adapters/notion/notion.adapter.js';
import { db } from '../db/index.js';
import { account } from '../db/schema.js';
import { NotionNotConnectedError } from '../errors/index.js';

export function getNotionPageTitle(page: PageObjectResponse) {
    const titleProperty = Object.values(page.properties).find(
        property => property.type === 'title',
    );

    if (!titleProperty || titleProperty.type !== 'title') {
        return 'Untitled';
    }

    return titleProperty.title[0]?.plain_text || 'Untitled';
}

export function getTitle(property: any): string {
    if (property?.type !== 'title') {
        return 'Sem título';
    }

    return property.title.map((item: any) => item.plain_text).join('') || 'Sem título';
}

export function getDate(property: any): string | null {
    if (property?.type !== 'date') {
        return null;
    }
    return property.date?.start ?? null;
}

export function getSelect(property: any): string {
    if (property?.type !== 'select') {
        return '';
    }

    return property.select?.name ?? '';
}

export function getStatus(property: any): string {
    if (property?.type !== 'status') {
        return '';
    }

    return property.status?.name ?? '';
}

export function getRelationIds(property: any): string[] {
    if (property?.type !== 'relation') {
        return [];
    }

    return property.relation.map((item: any) => item.id);
}

export function getRelationId(property: any): string | null {
    return getRelationIds(property)[0] ?? null;
}

export function getNumber(property: any): number {
    if (property?.type !== 'number') {
        return 0;
    }

    return property.number ?? 0;
}

export function getCheckbox(property: any): boolean {
    if (property?.type !== 'checkbox') {
        return false;
    }

    return property.checkbox;
}

export function getCreatedTime(property: any): string {
    if (property?.type !== 'created_time') {
        return '';
    }

    return property.created_time;
}

export async function getNotionAdapter(userId: string) {
    const notionAccount = await db
        .select({ accessToken: account.accessToken })
        .from(account)
        .where(and(eq(account.userId, userId), eq(account.providerId, 'notion')))
        .limit(1);

    const accessToken = notionAccount[0]?.accessToken;

    if (!accessToken) {
        throw new NotionNotConnectedError();
    }

    return new NotionAdapter(accessToken);
}

export function getFileUrl(property: any): string {
    if (property?.type !== 'files') {
        return '';
    }

    const file = property.files[0];

    if (!file) {
        return '';
    }

    if (file.type === 'external') {
        return file.external?.url ?? '';
    }

    return file.file?.url ?? '';
}

export function getLastEditedTime(property: any): string {
    if (property?.type !== 'last_edited_time') {
        return '';
    }

    return property.last_edited_time;
}

export function getRichText(property: any): string {
    if (property?.type !== 'rich_text') {
        return '';
    }

    return property.rich_text.map((item: any) => item.plain_text).join('');
}
