import { createSelector } from 'reselect';

import userSelectors from './user';
import { ActivityStatus, IActivity } from 'common/index';
import { IAppState, IActivitiesState } from 'src/reducers/rootReducer';
import { isActivityVisible } from 'src/utils/activities';

const getActivities = (state: IAppState): IActivitiesState => state.activities;

const getHeap = createSelector([getActivities], (activities) => activities.heap);

const getFilteredHeap = createSelector([userSelectors.getEmployeeType, getHeap], (type, heap) =>
  Object.entries(heap).reduce(
    (acc: { [key: string]: IActivity }, [key, activity]) => ({
      ...acc,
      ...(isActivityVisible(type, activity) ? { [key]: activity } : {}),
    }),
    {} as any
  )
);

const getLists = createSelector([getFilteredHeap], (heap) =>
  Object.entries(heap).reduce(
    (
      acc: {
        [key in ActivityStatus]: IActivity[];
      },
      [id, activity]
    ) => ({
      ...acc,
      [activity.status]: [...(acc[activity.status] || []), { ...activity, id }],
    }),
    {} as any
  )
);

export default {
  getLists,
};
