import {
  DRAG_ACTIVITY_START,
  DRAG_ACTIVITY_DONE,
  // DRAG_ACTIVITY_FAIL,
  DRAG_ACTIVITY_CANCEL,
  dragActivitiesActions,
} from '../interfaces/actions/activities';
import { ActivityStatus, EmployeeType } from 'common/index';

export const dragStart = (type: EmployeeType, status: ActivityStatus): dragActivitiesActions => ({
  type: DRAG_ACTIVITY_START,
  payload: { type, status },
});

// export const dragFailed = (error: string): dragActivitiesActions => ({
//   type: DRAG_ACTIVITY_FAIL,
//   payload: error,
// });

export const dragCancel = (id: string): dragActivitiesActions => ({
  type: DRAG_ACTIVITY_CANCEL,
  payload: { id },
});

export const dragEnd = (id: string, status: ActivityStatus): dragActivitiesActions => ({
  type: DRAG_ACTIVITY_DONE,
  payload: { id, status },
});
