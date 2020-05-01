import { createSelector } from 'reselect';

import userSelectors from './user';
import { ActivityStatus, EmployeeType, IActivity } from 'common/index';
import { IAppState, IActivitiesState } from 'src/reducers/rootReducer';
import {
  isActivityVisible,
  TITLE_STATUS_MAP,
  VOLUNTEER_ACTIVITY_STATUSES,
} from 'src/utils/activities';

const getActivities = (state: IAppState): IActivitiesState => state.activities;

const getInitialLists = (type: EmployeeType, activities: IActivity[]) => {
  switch (type) {
    case EmployeeType.Admin:
      return VOLUNTEER_ACTIVITY_STATUSES.map(aStatus => {
        return { status: aStatus, list: [] };
      });
    case EmployeeType.Operator:
      return VOLUNTEER_ACTIVITY_STATUSES.map(aStatus => {
        return { status: aStatus, list: [] };
      });
    case EmployeeType.Volunteer:
      return VOLUNTEER_ACTIVITY_STATUSES.map(aStatus => {
        return {
          status: aStatus,
          list: activities ? activities.filter(activity => activity.status === aStatus) : [],
        };
      });
    default:
      return []
  }
};

const getHeap = createSelector([getActivities], activities => activities.heap);

const isEmpty = createSelector([getActivities], activities => !Object.keys(activities.heap).length);

const getFilteredHeap = createSelector([userSelectors.getEmployeeType, getHeap], (type, heap) =>
  Object.entries(heap).reduce(
    (acc: { [key: string]: IActivity }, [key, activity]) => ({
      ...acc,
      ...(isActivityVisible(type, activity) ? { [key]: activity } : {}),
    }),
    {} as any
  )
);

const getLists = createSelector([userSelectors.getEmployeeType, getFilteredHeap], (type, heap) =>
  getInitialLists(
    type,
    Object.entries(heap).map(([key, value]) => {
      return { ...value, id: key };
    })
  )
);

export default {
  getLists,
  isEmpty,
};
