import { ActivityType, ActivityStatus, EmployeeType } from './index';

type Id = string;
export type EmployeeId = Id;

export interface IActivityHistory {
  operator?: IUser;
  assignee?: IUser;
  time: number;
  status: ActivityStatus;
}

export interface IRawActivity {
  type: ActivityType;
  description: string;
  address: string;
  estimation: number;
  operator?: IUser; // who is curator (operator id)
  assignee?: IUser; // who is assignee (volunteer id)
  status: ActivityStatus;
  history: { [id: string]: IActivityHistory };
}

export interface IDraftActivity extends Partial<IRawActivity> {}

export interface IActivity extends IRawActivity {
  id: Id;
}

export interface IAppUser {
  type: EmployeeType;
  name: string;
}

export interface IEmployee {
  id?: EmployeeId;
  type: EmployeeType;
  email: string;
  password: string;
  name: string;
}

export interface IUser {
  id: EmployeeId;
  name: string;
}

export interface ITypedUser extends IUser {
  type: EmployeeType;
}
