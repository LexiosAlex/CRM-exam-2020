import { ActivityType, ActivityStatus, EmployeeType } from './index';

type Id = string;
export type EmployeeId = Id;

interface IActivityHistory {
  id?: Id;
  time: number;
  status: ActivityType;
}

export interface IRawActivity {
  type: ActivityType;
  description: string;
  address: string;
  estimation: number;
  operator?: EmployeeId; // who is curator (operator id)
  assignee?: EmployeeId; // who is assignee (volunteer id)
  status: ActivityStatus;
  history: IActivityHistory[];
}

export interface IActivity extends IRawActivity {
  id: Id;
}

export interface IEmployee {
  id?: EmployeeId;
  type: EmployeeType;
  email: string;
  password: string;
}