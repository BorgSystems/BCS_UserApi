export enum SqlCondition {
    AND = "and",
    OR = "or",
    LIKE = "like"
}

export class SqlQueryConditionBuilder {
    private _currentQuery: string;
    constructor() {
        this._currentQuery = '';
    }
    addField(fieldName: string, fieldValue: string) {
        this._currentQuery += `${fieldName}="${fieldValue}" `;
        return this;
    }
    addCondition(condition: SqlCondition) {
        this._currentQuery += `${condition.toString()} `;
        return this;
    }
    reset() {
        this._currentQuery = '';
        return this;
    }

    build() {
        const copy = this._currentQuery;
        this._currentQuery = '';
        return copy; 
    }
}