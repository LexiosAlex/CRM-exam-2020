import { ActivityStatus, ActivityType, ActivityPriority } from 'common/index';

export const TITLE_STATUS_MAP = {
  [ActivityStatus.New]: 'statuses.created',
  [ActivityStatus.ReadyForAssignment]: 'statuses.backlog',
  [ActivityStatus.Assigned]: 'statuses.assigned',
  [ActivityStatus.InProgress]: 'statuses.inProgress',
  [ActivityStatus.Canceled]: 'statuses.canceled',
  [ActivityStatus.Done]: 'statuses.done',
  [ActivityStatus.Archived]: 'statuses.archived',
};

export const TITLE_TYPE_MAP = {
  [ActivityType.Other]: 'types.other',
  [ActivityType.shoppingDelivery]: 'types.shoppingDelivery',
  [ActivityType.HomeCare]: 'types.homeCare',
  [ActivityType.eco]: 'types.eco',
  [ActivityType.hospital]: 'types.hospital',
  [ActivityType.disabledPeople]: 'types.disabledPeople',
  [ActivityType.orphanage]: 'types.orphanage',
  [ActivityType.events]: 'types.events',
};

export const PRIORITY_TYPE_MAP = {
  [ActivityPriority.Low]: 'priority.low',
  [ActivityPriority.Middle]: 'priority.middle',
  [ActivityPriority.High]: 'priority.high',
};
