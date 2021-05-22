import { ActivityStatus, ActivityType } from 'common/index';
import i18n from '../i18n';

export const TITLE_STATUS_MAP = {
  [ActivityStatus.New]: i18n.t('statuses.created'),
  [ActivityStatus.ReadyForAssignment]: i18n.t('statuses.backlog'),
  [ActivityStatus.Assigned]: i18n.t('statuses.assigned'),
  [ActivityStatus.InProgress]: i18n.t('statuses.inProgress'),
  [ActivityStatus.Canceled]: i18n.t('statuses.canceled'),
  [ActivityStatus.Done]: i18n.t('statuses.done'),
  [ActivityStatus.Archived]: i18n.t('statuses.archived'),
};

export const TITLE_TYPE_MAP = {
  [ActivityType.Delivery]: i18n.t('types.delivery'),
  [ActivityType.HomeCare]: i18n.t('types.homeCare'),
  [ActivityType.Other]: i18n.t('types.other'),
  [ActivityType.Shopping]: i18n.t('types.shopping'),
};
