export class ResponseItem {
    public Status: StatusType | null;
    public Data: object | FailedReason | null;
    constructor(status: StatusType | null = null, data: object | FailedReason | null = null) {
        this.Status = status;
        this.Data = data;
    }
}

export class FailedReason {
    Reason: string;
    constructor(reason: string) {
        this.Reason = reason;
    }
}

export enum StatusType {
    SUCCESS = "SUCCESS",
    FAILED = "FAILED"
}