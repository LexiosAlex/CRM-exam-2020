import { ActivityStatus, IActivity, EmployeeType } from 'common/index';

const VOLUNTEER_ACTIVITY_STATUSES = [
  ActivityStatus.Assigned,
  ActivityStatus.InProgress,
  ActivityStatus.Canceled,
  ActivityStatus.Done,
];

export const isActivityVisible = (type: EmployeeType, activity: IActivity) =>
  type === EmployeeType.Admin ||
  type === EmployeeType.Operator ||
  (type === EmployeeType.Volunteer && VOLUNTEER_ACTIVITY_STATUSES.indexOf(activity.status) > 0);

export const TITLE_STATUS_MAP = {
  [ActivityStatus.ReadyForAssignment]: 'Backlog',
  [ActivityStatus.Assigned]: 'Assigned',
  [ActivityStatus.InProgress]: 'In Progress',
  [ActivityStatus.Canceled]: 'Canceled',
  [ActivityStatus.Done]: 'Done',
  [ActivityStatus.Archived]: 'Archived',
};