export interface IEvent {
  id?: string;
  title?: string;
  status?: string;
  date?: Date;
  hosts?: IHost[];
  createdAt?: Date;
}

export interface IEventPageInfo {
  page: number;
}

export interface IHost {
  id: string;
  name: string;
  avatar: string;
}

export enum EEventStatus {
  ALL = "ALL",
  DRAFT = "DRAFT",
  UPCOMING = "UPCOMING",
  PAST = "PAST",
}
