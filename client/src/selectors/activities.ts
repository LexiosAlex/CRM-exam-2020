import { createSelector } from 'reselect';

import userSelectors from './user';
import { IActivity } from 'common/index';
import { IAppState, IActivitiesState } from 'src/reducers/rootReducer';
import { ActivityLists } from 'src/interfaces/common';

const getActivities = (state: IAppState): IActivitiesState => state.activities;

const getHeap = createSelector([getActivities], (activities) => activities.heap);

const isEmpty = createSelector(
  [getActivities],
  (activities) => !Object.keys(activities.heap).length
);

const getFilteredHeap = createSelector(
  [userSelectors.getVisibleStatuses, getHeap],
  (statusList, heap) =>
    Object.entries(heap).reduce(
      (acc: { [key: string]: IActivity }, [key, activity]) => ({
        ...acc,
        ...(statusList.indexOf(activity.status) >= 0 ? { [key]: activity } : {}),
      }),
      {} as any
    )
);

const getLists = createSelector(
  [userSelectors.getVisibleStatuses, getFilteredHeap],
  (statusList, heap) =>
    Object.entries(heap).reduce(
      (acc: ActivityLists, [id, activity]) => ({
        ...acc,
        [activity.status]: [...acc[activity.status], { ...activity, id }],
      }),
      statusList.reduce((acc, status) => ({ ...acc, [status]: [] }), {} as any)
    )
);

export default {
  getLists,
  isEmpty,
};
