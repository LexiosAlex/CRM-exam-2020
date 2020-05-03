import { ActivityStatus, EmployeeType, IActivity, ActivityType } from 'common/index';

export const VOLUNTEER_ACTIVITY_STATUSES = [
  ActivityStatus.ReadyForAssignment,
  ActivityStatus.Assigned,
  ActivityStatus.InProgress,
  ActivityStatus.Canceled,
  ActivityStatus.Done,
];

export const OPERATOR_ACTIVITY_STATUSES = [...VOLUNTEER_ACTIVITY_STATUSES, ActivityStatus.Archived];

export const checkStatus = (type: EmployeeType, status: ActivityStatus) =>
  type === EmployeeType.Admin ||
  (type === EmployeeType.Operator && OPERATOR_ACTIVITY_STATUSES.indexOf(status) >= 0) ||
  (type === EmployeeType.Volunteer && VOLUNTEER_ACTIVITY_STATUSES.indexOf(status) >= 0);

export const TITLE_STATUS_MAP = {
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
