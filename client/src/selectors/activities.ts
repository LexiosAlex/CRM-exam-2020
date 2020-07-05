import { createSelector } from 'reselect';

import userSelectors from './user';
import { ActivityStatus, IActivity } from 'common/index';
import { IActivitiesState, IAppState } from '../interfaces/state';
import { ActivityLists } from 'src/interfaces/common';
import { IActivityStatistics } from 'common/types';

const dayTimeStamp = Date.now() - 60 * 60 * 24;
const weekTimeStamp = Date.now() - dayTimeStamp * 7;
const monthTimeStamp = Date.now() - dayTimeStamp * 30;

const getActivities = (state: IAppState): IActivitiesState => state.activities;

const getHeap = createSelector([getActivities], (activities) => activities.heap);

const getFormAsyncState = createSelector([getActivities], (activities) => activities.formAsync);

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

const getStatusState = createSelector([getActivities], (activities) => activities.status);

const getIsDragging = createSelector([getStatusState], (statusState) => statusState.dragging);
const getAllowedStatuses = createSelector([getStatusState], (statusState) => statusState.allowed);

const getStatusAsyncState = createSelector([getActivities], (activities) => activities.statusAsync);
const isStatusPending = createSelector(
  [getStatusAsyncState],
  (statusAsyncState) => statusAsyncState.pending
);

const getActivitiesStats = createSelector([getHeap], (heap) => {
  const dailyActivitiesStats: IActivityStatistics = {
    created: 0,
    canceled: 0,
    done: 0,
  };

  const weeklyActivitiesStats: IActivityStatistics = {
    created: 0,
    canceled: 0,
    done: 0,
  };

  const monthlyActivitiesStats: IActivityStatistics = {
    created: 0,
    canceled: 0,
    done: 0,
  };

  Object.entries(heap).map(([activityId, activityProps]) => {
    const { history } = activityProps;

    const historyArray = Object.entries(history);
    const created = historyArray[0][1].time;
    const canceled =
      activityProps.status === ActivityStatus.Canceled &&
      historyArray[historyArray.length - 1][1].time;
    const done =
      activityProps.status === ActivityStatus.Done && historyArray[historyArray.length - 1][1].time;

    switch (true) {
      case created >= dayTimeStamp:
        dailyActivitiesStats.created += 1;
        break;
      case created < dayTimeStamp && created > weekTimeStamp:
        weeklyActivitiesStats.created += 1;
        break;
      case created < weekTimeStamp && created > monthTimeStamp:
        monthlyActivitiesStats.created += 1;
        break;
    }

    switch (typeof canceled === 'number') {
      case canceled >= dayTimeStamp:
        dailyActivitiesStats.canceled += 1;
        break;
      case canceled < dayTimeStamp && canceled > weekTimeStamp:
        weeklyActivitiesStats.canceled += 1;
        break;
      case canceled < weekTimeStamp && canceled > monthTimeStamp:
        monthlyActivitiesStats.canceled += 1;
        break;
    }
    switch (typeof done === 'number') {
      case done >= dayTimeStamp:
        dailyActivitiesStats.done += 1;
        break;
      case done < dayTimeStamp && canceled > weekTimeStamp:
        weeklyActivitiesStats.done += 1;
        break;
      case done < weekTimeStamp && done > monthTimeStamp:
        monthlyActivitiesStats.done += 1;
        break;
    }
    //need to refactor it someHow
    //switch is working with (false) statement, idk
  });

  return { dailyActivitiesStats, weeklyActivitiesStats, monthlyActivitiesStats };
});

export default {
  getActivitiesStats,
  getFilteredHeap,
  getLists,
  isEmpty,
  getIsDragging,
  getAllowedStatuses,
  getFormAsyncState,
  isStatusPending,
};
