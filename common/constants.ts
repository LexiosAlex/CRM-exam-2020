export enum ActivityType {
  Other = 0,
  shoppingDelivery,
  HomeCare,
  eco,
  hospital,
  disabledPeople,
  orphanage,
  events,
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

export enum ActivityPriority {
  Low = 0,
  Middle,
  High,
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

const ADMIN_ACTIVITY_STATUSES: ActivityStatus[] = [
  ActivityStatus.New,
  ActivityStatus.ReadyForAssignment,
  ActivityStatus.Assigned,
  ActivityStatus.InProgress,
  ActivityStatus.Canceled,
  ActivityStatus.Done,
  ActivityStatus.Archived,
];

export const VISIBLE_STATUSES: { [key in EmployeeType]: ActivityStatus[] } = {
  [EmployeeType.Volunteer]: VOLUNTEER_ACTIVITY_STATUSES,
  [EmployeeType.Operator]: OPERATOR_ACTIVITY_STATUSES,
  [EmployeeType.Admin]: ADMIN_ACTIVITY_STATUSES,
};

export const ACTIVITY_TYPES: ActivityType[] = Object.entries(ActivityType)
  .filter(([key, value]) => isNaN(Number(key)))
  .map(([key, value]) => value as ActivityType);

export const ACTIVITY_PRIORITIES: ActivityPriority[] = Object.entries(ActivityPriority)
  .filter(([key, value]) => isNaN(Number(key)))
  .map(([key, value]) => value as ActivityPriority);

export const enum Language {
  EN = 'en',
  RU = 'ru',
}
