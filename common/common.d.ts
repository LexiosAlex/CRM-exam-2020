enum ActivityType {
  Delivery = 0,
  Shopping,
  Help,
  Other,
}
enum ActivityStatus {
  ReadyForAssigment = 0,
  Assigned,
  InProgress,
  Canceled,
  Done,
  Review,
  Archived,
}
enum EmployeeType {
  Volunteer = 0,
  Operator,
  Admin,
}

interface IactivityChange {
  id: string;
  time: number;
  status: ActivityType;
}

type statusHistory = IactivityChange[];

interface IActivity {
  id: string;
  type: ActivityType;
  description: string;
  status: ActivityStatus;
  assignedTo: string;
  address: string;
  estimation: number;
  changes: statusHistory;
}

interface IEmployee {
  id: string;
  type: EmployeeType;
  email: string;
  password: string;
}
