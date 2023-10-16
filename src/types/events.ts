export interface IEvent {
    title: string;
    status: string;
    date: Date;
    hosts: [IHost];
}

export interface IHost {
    name: string;
    avatar: string;
}