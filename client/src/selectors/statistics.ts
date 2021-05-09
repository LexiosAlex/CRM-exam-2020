import { createSelector } from 'reselect';
import { TimeChartData } from '../interfaces/statistics';
import activitiesSelector from './activities';
import { ActivityStatus } from 'common/index';
import { TITLE_STATUS_MAP } from '../utils/activities';
import { IActivitiesHeapState } from '../interfaces/state';

const TIME_NOW = Date.now();
const DAY_TIMESTAMP = 60 * 60 * 24 * 1000;
const DAY_TIME = TIME_NOW - DAY_TIMESTAMP;
const WEEK_TIME = TIME_NOW - DAY_TIMESTAMP * 7;
const MONTH_TIME = TIME_NOW - DAY_TIMESTAMP * 30;

const getStatistic = (heap: IActivitiesHeapState, timeStamp: number): TimeChartData => {
  let done = 0;
  let created = 0;
  let canceled = 0;

  Object.entries(heap).map(([_, activityProps]) => {
    const firstHistoryObject = Object.keys(activityProps.history)[0];
    const createdData = activityProps.history[firstHistoryObject];
    if (createdData.time >= timeStamp) {
      switch (createdData.status) {
        case ActivityStatus.New:
          created += 1;
          return;

        case ActivityStatus.Canceled:
          canceled += 1;
          return;

        case ActivityStatus.Done:
          done += 1;
          return;

        default:
          return;
      }
    }
  });

  return [
    { name: TITLE_STATUS_MAP[ActivityStatus.New], value: created, textColor: '#323232' },
    { name: TITLE_STATUS_MAP[ActivityStatus.Canceled], value: canceled },
    { name: TITLE_STATUS_MAP[ActivityStatus.Done], value: done },
  ];
};

const getActivitiesByDay = createSelector([activitiesSelector.getHeap], (heap) =>
  getStatistic(heap, DAY_TIME),
);

const getActivitiesByWeek = createSelector([activitiesSelector.getHeap], (heap) =>
  getStatistic(heap, WEEK_TIME),
);

const getActivitiesByMonth = createSelector([activitiesSelector.getHeap], (heap) =>
  getStatistic(heap, MONTH_TIME),
);

export default {
  getActivitiesByDay,
  getActivitiesByWeek,
  getActivitiesByMonth,
};
