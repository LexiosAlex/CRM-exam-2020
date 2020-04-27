import {ActivityStatus, EmployeeId} from "common/index";

export interface ICard {
  id: string;
  title: string;
  description: string;
  assignee?: EmployeeId;
  estimation: number;
  status: ActivityStatus
}

export interface IList {
  title: string;
  status: ActivityStatus,
  cards: ICard[];
}
