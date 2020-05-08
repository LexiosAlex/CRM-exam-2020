import { ActivityStatus, IActivity } from 'common/index';

export type ActivityLists = {
  [key in ActivityStatus]: IActivity[];
};
