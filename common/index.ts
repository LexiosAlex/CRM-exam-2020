export enum ActivityType {
  Other = 0,
  Delivery,
  Shopping,
  HomeCare,
}

export enum ActivityStatus {
  ReadyForAssignment = 0,
  Assigned,
  InProgress,
  Canceled,
  Done,
  Archived,
}

export enum EmployeeType {
  Admin = 0,
  Operator,
  Volunteer,
}

type Id = string;
export type EmployeeId = Id;

interface IActivityHistory {
  id?: Id;
  time: number;
  status: ActivityType;
}

export interface IActivity {
  id?: Id;
  type: ActivityType;
  description: string;
  address: string;
  estimation: number;
  operator?: EmployeeId; // who is curator (operator id)
  assignee?: EmployeeId; // who is assignee (volunteer id)
  status: ActivityStatus;
  history: IActivityHistory[];
}

export interface IEmployee {
  id?: EmployeeId;
  type: EmployeeType;
  email: string;
  password: string;
}
