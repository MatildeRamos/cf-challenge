export interface IEvent {
    id?: string;
    title?: string;
    status?: string;
    date?: Date;
    hosts?: [IHost];
}

export interface IEventPageInfo {
    page: number;
}

export interface IHost {
    name: string;
    avatar: string;
}

export enum EEventStatus {
    ALL = "ALL",
    DRAFT = "DRAFT",
    UPCOMING = "UPCOMING",
    PAST = "PAST"
}