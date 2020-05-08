import { ActivityStatus, EmployeeType, ActivityType } from 'common/index';

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

export const ALLOWED_STATUSES: { [key in EmployeeType]: ActivityStatus[] } = {
  [EmployeeType.Volunteer]: VOLUNTEER_ACTIVITY_STATUSES,
  [EmployeeType.Operator]: OPERATOR_ACTIVITY_STATUSES,
  [EmployeeType.Admin]: ADMIN_ACTIVITY_STATUSES,
};

export const TITLE_STATUS_MAP = {
  [ActivityStatus.New]: 'Recently added',
  [ActivityStatus.ReadyForAssignment]: 'Backlog',
  [ActivityStatus.Assigned]: 'Assigned',
  [ActivityStatus.InProgress]: 'In Progress',
  [ActivityStatus.Canceled]: 'Canceled',
  [ActivityStatus.Done]: 'Done',
  [ActivityStatus.Archived]: 'Archived',
};

export const TITLE_TYPE_MAP = {
  [ActivityType.Delivery]: 'Delivery',
  [ActivityType.HomeCare]: 'Home care',
  [ActivityType.Other]: 'Other',
  [ActivityType.Shopping]: 'Shopping',
};
