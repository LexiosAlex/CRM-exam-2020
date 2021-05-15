import { ActivityStatus, ActivityType } from 'common/index';

export const TITLE_STATUS_MAP = {
  [ActivityStatus.New]: 'Created',
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
