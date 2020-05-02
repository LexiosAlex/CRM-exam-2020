import { createSelector } from 'reselect';

import userSelectors from './user';
import { ActivityStatus, EmployeeType, IActivity } from 'common/index';
import { IAppState, IActivitiesState } from 'src/reducers/rootReducer';
import { checkStatus, TITLE_STATUS_MAP, VOLUNTEER_ACTIVITY_STATUSES } from 'src/utils/activities';

const getActivities = (state: IAppState): IActivitiesState => state.activities;

const getHeap = createSelector([getActivities], (activities) => activities.heap);

const isEmpty = createSelector(
  [getActivities],
  (activities) => !Object.keys(activities.heap).length
);

const getFilteredHeap = createSelector([userSelectors.getEmployeeType, getHeap], (type, heap) =>
  Object.entries(heap).reduce(
    (acc: { [key: string]: IActivity }, [key, activity]) => ({
      ...acc,
      ...(checkStatus(type, activity.status) ? { [key]: activity } : {}),
    }),
    {} as any
  )
);

const getLists = createSelector([userSelectors.getEmployeeType, getFilteredHeap], (type, heap) =>
  Object.entries(heap).reduce(
    (acc: { [key in ActivityStatus]: IActivity[] }, [id, activity]) => ({
      ...acc,
      [activity.status]: [...acc[activity.status], { ...activity, id }],
    }),
    Object.values(ActivityStatus).reduce(
      (acc, status) => ({
        ...acc,
        ...(typeof status === 'number' && checkStatus(type, status) ? { [status]: [] } : {}),
      }),
      {} as any
    )
  )
);

export default {
  getLists,
  isEmpty,
};
