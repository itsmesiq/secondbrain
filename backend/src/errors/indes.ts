export class NotionNotConnectedError extends Error {
    constructor() {
        super('No connected Notion account was found for this user.');
        this.name = 'NotionNotConnectedError';
    }
}

export class DatabaseNotFoundError extends Error {
    constructor(name: string) {
        super(`${name} database was not found in the connected Notion workspace.`);
        this.name = 'DatabaseNotFoundError';
    }
}

export class DataSourceNotFoundError extends Error {
    constructor(name: string) {
        super(`${name} data source was not found in the connected Notion workspace.`);
        this.name = 'DataSourceNotFoundError';
    }
}
