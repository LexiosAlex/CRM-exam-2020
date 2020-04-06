enum ActivityType {
  Delivery = 0,
  Shopping,
  HomeCare,
  Other,
}

enum ActivityStatus {
  ReadyForAssignment = 0,
  Assigned,
  InProgress,
  Canceled,
  Done,
  Archived,
}

enum EmployeeType {
  Admin = 0,
  Operator,
  Volunteer,
}

type Id = string;
type EmployeeId = Id;

interface IActivityHistory {
  id: Id;
  time: number;
  status: ActivityType;
}

export interface IActivity {
  id: Id;
  type: ActivityType;
  description: string;
  address: string;
  estimation: number;
  operatorId: EmployeeId; // who created
  assignee: string; // who is assignee
  status: ActivityStatus;
  history: IActivityHistory[];
}

interface IEmployee {
  id: EmployeeId;
  type: EmployeeType;
  email: string;
  password: string;
}
