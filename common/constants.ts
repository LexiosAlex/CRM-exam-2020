export enum ActivityType {
  Other = 0,
  Delivery,
  Shopping,
  HomeCare,
}

export enum ActivityStatus {
  New = 0,
  ReadyForAssignment,
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

const VOLUNTEER_ACTIVITY_STATUSES: ActivityStatus[] = [
  ActivityStatus.ReadyForAssignment,
  ActivityStatus.Assigned,
  ActivityStatus.InProgress,
  ActivityStatus.Canceled,
  ActivityStatus.Done,
];

const OPERATOR_ACTIVITY_STATUSES: ActivityStatus[] = [
  ActivityStatus.New,
  ...VOLUNTEER_ACTIVITY_STATUSES,
  ActivityStatus.Archived,
];

const ADMIN_ACTIVITY_STATUSES: ActivityStatus[] = Object.keys(ActivityStatus)
  .filter((key) => isNaN(Number(key)))
  .map((key) => ActivityStatus[key]);

export const VISIBLE_STATUSES: { [key in EmployeeType]: ActivityStatus[] } = {
  [EmployeeType.Volunteer]: VOLUNTEER_ACTIVITY_STATUSES,
  [EmployeeType.Operator]: OPERATOR_ACTIVITY_STATUSES,
  [EmployeeType.Admin]: ADMIN_ACTIVITY_STATUSES,
};
